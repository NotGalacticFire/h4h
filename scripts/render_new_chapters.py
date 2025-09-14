import json
from plan_chapter_additions import links

for pill in sorted(links.keys()):
    info=links[pill]
    name=info['name']
    slug=info['slug']
    href=info['href']
    img=f"{slug}.jpg"
    print(f"<!-- {pill} Chapter -->")
    print(f"<div id=\"{slug}-chapter\" class=\"chapter-group\">")
    print("  <div class=\"chapter-divider top\"></div>")
    print(f"  <h3 class=\"chapter-title\"><span class=\"chapter-pill\">{pill}</span></h3>")
    print("  <div class=\"chapter-divider bottom\"></div>")
    print("  <div class=\"team-grid\">")
    print(f"    <div id=\"member-{slug}\" class=\"team-card\">")
    print(f"      <a href=\"{href}\" class=\"team-image-link\">")
    print(f"        <img src=\"{img}\" alt=\"{name}\" onerror=\"this.onerror=null; this.src='Hearts for healing .jpg'; this.style.objectFit='contain';\">")
    print("      </a>")
    print("      <div class=\"team-info\">")
    print(f"        <h3>{name}</h3>")
    print(f"        <p class=\"role\">Founder</p>")
    print(f"        <a href=\"{href}\" class=\"btn btn-small\">View Profile</a>")
    print("      </div>")
    print("    </div>")
    print("  </div>")
    print("</div>\n")
