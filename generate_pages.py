import json, re, pathlib
root = pathlib.Path(__file__).parent
agents_js = (root/'assets/js/agents.js').read_text()
# crude extract not needed; define filenames manually from JS maybe parse via regex
files = re.findall(r"file:\s*'([^']+)'", agents_js)
ids = re.findall(r"id:\s*'([^']+)'", agents_js)

def page(title, page_id):
    return f"""<!doctype html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\" />
  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />
  <title>{title} | AIONOS × Kyndryl Manufacturing Agents</title>
  <meta name=\"description\" content=\"Interactive AIONOS × Kyndryl manufacturing agent demo with live synthetic telemetry, governance controls and agent intelligence.\" />
  <link rel=\"stylesheet\" href=\"assets/css/styles.css\" />
</head>
<body data-page=\"{page_id}\">
  <div class=\"app-shell\">
    <aside class=\"sidebar\" id=\"sidebar\"></aside>
    <main class=\"main\" id=\"content\"></main>
  </div>
  <div id=\"toast\" class=\"toast\"></div>
  <script src=\"assets/js/agents.js\"></script>
  <script src=\"assets/js/app.js\"></script>
</body>
</html>
"""

(root/'index.html').write_text(page('Agent Governance Command Center', 'command'))
# exact titles from data are populated by JS; here use short titles
for f, i in zip(files, ids):
    (root/f).write_text(page(i.replace('-', ' ').title(), i))
print('generated', 1+len(files), 'pages')
