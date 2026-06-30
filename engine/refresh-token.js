// Refresh Cloudflare OAuth token using refresh_token
// Called from CI pipeline before deploy steps.
// Uses CLOUDFLARE_REFRESH_TOKEN and CLOUDFLARE_OAUTH_CLIENT_ID secrets.
// Writes new CLOUDFLARE_API_TOKEN and CLOUDFLARE_REFRESH_TOKEN to GITHUB_ENV.

const CLOUD_CLIENT_ID = process.env.CLOUDFLARE_OAUTH_CLIENT_ID || '54d11594-84e4-41aa-b438-e81b8fa78ee7';
const TOKEN_URL = 'https://dash.cloudflare.com/oauth2/token';

async function main() {
  const refreshToken = process.env.CLOUDFLARE_REFRESH_TOKEN;
  if (!refreshToken) {
    console.log('No CLOUDFLARE_REFRESH_TOKEN found, skipping refresh');
    process.exit(0);
  }

  const currentToken = process.env.CLOUDFLARE_API_TOKEN;
  if (currentToken) {
    // Test if current token is still valid
    try {
      const testRes = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      if (testRes.ok) {
        console.log('Current token is still valid, no refresh needed');
        // Still refresh if close to expiry (within 2 hours)
        const body = await testRes.json();
        if (body.result && body.result.expires_on) {
          const expiry = new Date(body.result.expires_on);
          const now = new Date();
          const hoursLeft = (expiry - now) / 3600000;
          console.log(`Token expires at ${body.result.expires_on} (${hoursLeft.toFixed(1)} hours left)`);
          if (hoursLeft > 2) {
            return;
          }
          console.log('Token expires within 2 hours, refreshing...');
        }
      }
    } catch {
      console.log('Token validation failed, attempting refresh...');
    }
  }

  console.log('Refreshing Cloudflare OAuth token...');
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: CLOUD_CLIENT_ID
  });

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error(`Token refresh failed: ${response.status} ${errText}`);
    process.exit(1);
  }

  const data = await response.json();
  const { access_token, refresh_token } = data;

  if (!access_token) {
    console.error('No access_token in refresh response');
    process.exit(1);
  }

  console.log(`Token refreshed successfully (expires_in: ${data.expires_in}s)`);
  if (data.scope) {
    console.log(`Scope: ${data.scope.split(' ').length} permissions`);
  }

  // Write to GITHUB_ENV for subsequent steps
  const githubEnv = process.env.GITHUB_ENV;
  const fs = require('fs');
  if (githubEnv) {
    fs.appendFileSync(githubEnv, `CLOUDFLARE_API_TOKEN=${access_token}\n`);
    if (refresh_token) {
      fs.appendFileSync(githubEnv, `CLOUDFLARE_REFRESH_TOKEN=${refresh_token}\n`);
    }
    console.log('Updated CLOUDFLARE_API_TOKEN + CLOUDFLARE_REFRESH_TOKEN in GITHUB_ENV');
  } else {
    console.log('No GITHUB_ENV found, printing token for manual use');
    console.log(`NEW_TOKEN=${access_token}`);
    if (refresh_token) console.log(`NEW_REFRESH=${refresh_token}`);
  }

  // Persist new tokens back to GitHub secrets so future CI runs have valid tokens
  // Uses gh CLI with GH_REPO_ADMIN_TOKEN (our PAT stored as a repo secret)
  if (githubEnv && refresh_token && process.env.GH_REPO_ADMIN_TOKEN) {
    try {
      const { execSync } = require('child_process');
      console.log('Persisting new tokens to GitHub secrets...');
      execSync(`echo "${process.env.GH_REPO_ADMIN_TOKEN}" | gh auth login --with-token`, { stdio: 'pipe' });
      execSync(`gh secret set CLOUDFLARE_REFRESH_TOKEN --body "${refresh_token}" --repo maggie19850205-ctrl/usdt-verifier`, { stdio: 'pipe' });
      execSync(`gh secret set CLOUDFLARE_API_TOKEN --body "${access_token}" --repo maggie19850205-ctrl/usdt-verifier`, { stdio: 'pipe' });
      console.log('GitHub secrets updated successfully for next CI run');
    } catch (e) {
      console.log('Warning: failed to persist secrets automatically:', e.message);
      console.log('This does not affect the current deploy - tokens are set in GITHUB_ENV');
    }
  } else if (githubEnv && refresh_token && !process.env.GH_REPO_ADMIN_TOKEN) {
    console.log('GH_REPO_ADMIN_TOKEN not set - new refresh token will not persist for next CI run');
  }
}

main().catch(err => {
  console.error('Token refresh failed:', err);
  process.exit(1);
});
