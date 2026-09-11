from pathlib import Path
import re, shutil, datetime

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "HTML"
BACKUP = ROOT / ("_backup_before_menu_refactor_" + datetime.datetime.now().strftime("%Y%m%d_%H%M%S"))
BACKUP.mkdir(exist_ok=True)

skip = {"menun8n.html", "home.html"}
changed = 0

for p in HTML.glob("*.html"):
    if p.name in skip:
        continue
    text = p.read_text(encoding="utf-8")
    if '<main class="content">' not in text:
        continue

    shutil.copy2(p, BACKUP / p.name)
    title_match = re.search(r"<title>(.*?)</title>", text, re.S | re.I)
    title = title_match.group(1).strip() if title_match else p.stem
    main_match = re.search(r'(<main class="content">.*?</main>)', text, re.S | re.I)
    if not main_match:
        continue
    main = main_match.group(1)

    out = (
        '<!doctype html>\n<html lang="ko">\n<head>\n'
        '<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
        f'<title>{title}</title>\n'
        '<link rel="stylesheet" href="../CSS/style.css">\n'
        '</head>\n<body class="content-page">\n'
        + main +
        '\n<script src="../JavaScript/content.js"></script>\n'
        '</body>\n</html>\n'
    )
    p.write_text(out, encoding="utf-8")
    changed += 1

print(f"Changed HTML files: {changed}")
print(f"Backup folder: {BACKUP}")
print("Common menu file: HTML/menun8n.html")
