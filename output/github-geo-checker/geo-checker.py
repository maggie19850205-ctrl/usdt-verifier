#!/usr/bin/env python3
import sys, json, urllib.request, re, ssl

def check(url):
    ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'GEO-Checker/1.0'})
        resp = urllib.request.urlopen(req, timeout=15, context=ctx)
        html = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f'Error fetching {url}: {e}'); return

    score = 0; total = 100; details = []
    if '<title>' in html: score += 10; details.append(('Meta Title', 10, 'Found'))
    if 'description' in html: score += 10; details.append(('Meta Description', 10, 'Found'))
    if 'viewport' in html: score += 5; details.append(('Viewport', 5, 'Found'))
    og = len(re.findall(r'property="og:', html))
    if og >= 4: score += 10; details.append(('Open Graph Tags', 10, f'{og} found'))
    schema = len(re.findall(r'application/ld\+json', html))
    if schema >= 1: score += 15; details.append(('Schema.org JSON-LD', 15, f'{schema} found'))
    if 'BreadcrumbList' in html: score += 5; details.append(('BreadcrumbList', 5, 'Found'))
    if 'Article' in html: score += 5; details.append(('Article Schema', 5, 'Found'))
    if 'FAQPage' in html: score += 5; details.append(('FAQPage Schema', 5, 'Found'))
    h1 = len(re.findall(r'<h1[^>]*>', html))
    if h1 >= 1: score += 5; details.append(('H1 Headings', 5, f'{h1} found'))
    h2 = len(re.findall(r'<h2[^>]*>', html))
    if h2 >= 3: score += 5; details.append(('H2 Headings', 5, f'{h2} found'))
    text = re.sub(r'<[^>]+>', '', html).strip()
    words = len(text.split())
    if words >= 500: score += 5; details.append(('Word Count', 5, f'{words} words'))
    if words >= 2000: score += 5; details.append(('Deep Content', 5, f'{words} words'))
    links = len(re.findall(r'href="https?://', html))
    if links >= 5: score += 5; details.append(('Internal/External Links', 5, f'{links} found'))
    if 'canonical' in html: score += 5; details.append(('Canonical URL', 5, 'Found'))
    total = 100

    print(f'\nGEO Readiness Report for {url}')
    print('=' * 50)
    for name, pts, status in details:
        bar = '?' * (pts // 5) if pts > 0 else ''
        print(f'  {name:30s} {bar:10s} ({pts}pts)')
    print(f'\n  Overall Score: {score}/{total}')
    if score >= 80: print('  Status: Excellent GEO readiness')
    elif score >= 50: print('  Status: Needs improvement')
    else: print('  Status: Poor ¡ª major issues found')

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python3 geo-checker.py <url>')
        sys.exit(1)
    check(sys.argv[1])