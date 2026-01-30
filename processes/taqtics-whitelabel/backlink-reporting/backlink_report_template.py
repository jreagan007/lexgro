#!/usr/bin/env python3
"""
LEXGRO Backlink Report Template
White-label for Taqtics clients

Usage:
    1. Copy this file and rename for client
    2. Update CLIENT_CONFIG section
    3. Update DATA section with client's backlink audit data
    4. Run: python3 client_backlink_report.py
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from datetime import datetime

# =============================================================================
# CLIENT CONFIG - UPDATE FOR EACH CLIENT
# =============================================================================
CLIENT_CONFIG = {
    "name": "ClientName.org",
    "domain": "clientname.org",
    "output_path": "./ClientName-Backlink-Report.pdf",
    "data_location": "clientname.org/data/",
    "brand_color": "#298C42",  # Primary brand green
    "positioning": "Independent resource",  # Their key differentiator
    "niche_angle": "veteran-focused",  # e.g., "veteran-focused", "local business", etc.
}

# =============================================================================
# CURRENT METRICS - UPDATE WITH AUDIT DATA
# =============================================================================
METRICS = {
    "referring_domains": 164,
    "legacy_backlinks": 1248,
    "broken_links_found": 81,
    "broken_link_pct": "40.5%",
    "redirects_generated": 45,
    "link_value_lost": "43.4%",
    "link_gap_total": 1607,
    "profile_links_existing": 4,
    "profile_links_missing": 23,
}

# =============================================================================
# COMPETITOR DATA - UPDATE WITH CLIENT COMPETITORS
# =============================================================================
COMPETITORS = [
    {"name": "competitor1.com", "backlinks": 139497, "ref_domains": 8647, "rank": 377, "owner": "Company A"},
    {"name": "competitor2.com", "backlinks": 124856, "ref_domains": 15346, "rank": 392, "owner": "Company B"},
    # Add more competitors...
]

# =============================================================================
# LINK GAP DATA - UPDATE WITH AUDIT RESULTS
# =============================================================================
LINK_GAP_VETERANS = [
    {"domain": "example-legion.org", "rank": 131, "links": 132, "notes": "American Legion post"},
    # Add more...
]

LINK_GAP_LABOR = [
    {"domain": "example-union.org", "rank": 122, "links": 4, "notes": "Union local"},
    # Add more...
]

LINK_GAP_MEDICAL = [
    {"domain": "example-health.org", "rank": 130, "links": 241, "notes": "Health org"},
    # Add more...
]

LINK_GAP_ACADEMIC = [
    {"domain": "example.edu", "rank": 80, "links": 68, "notes": "University health dept"},
    # Add more...
]

# =============================================================================
# RESOURCE PAGES - UPDATE WITH AUDIT RESULTS
# =============================================================================
RESOURCE_PAGES = [
    {"url": "example.org/resources/", "domain": "Health org", "rank": 161},
    # Add more...
]

# =============================================================================
# PROFILE LINKS - UPDATE WITH AUDIT RESULTS
# =============================================================================
EXISTING_PROFILES = [
    {"platform": "YouTube", "da": 99, "status": "Active"},
    {"platform": "LinkedIn", "da": 98, "status": "Active"},
    # Add existing profiles...
]

TIER1_PROFILES = [
    {"platform": "Reddit", "da": 97, "type": "Community", "action": "Create profile, participate"},
    {"platform": "Medium", "da": 96, "type": "Content", "action": "Create publication"},
    # Add more...
]

TIER2_PROFILES = [
    {"platform": "VA.gov", "da": 85, "type": "Government", "action": "Veteran resource submission"},
    # Add more...
]

TIER3_PROFILES = [
    {"platform": "AFL-CIO", "da": 62, "type": "Labor", "action": "Worker safety resource"},
    # Add more...
]

# =============================================================================
# STYLES - GENERALLY DON'T MODIFY
# =============================================================================
def get_brand_colors(primary_hex):
    return {
        "primary": HexColor(primary_hex),
        "dark": HexColor('#1a3d2e'),
        "mint": HexColor('#f0f9f4'),
        "white": HexColor('#FFFFFF'),
        "text": HexColor('#1a1a1a'),
        "gray": HexColor('#666666'),
    }

def create_styles(colors):
    s = getSampleStyleSheet()
    s.add(ParagraphStyle(name='T', fontSize=20, textColor=colors['dark'], spaceBefore=0, spaceAfter=8, alignment=TA_CENTER, fontName='Helvetica-Bold'))
    s.add(ParagraphStyle(name='ST', fontSize=10, textColor=colors['primary'], spaceBefore=0, spaceAfter=6, alignment=TA_CENTER))
    s.add(ParagraphStyle(name='H1', fontSize=11, textColor=colors['dark'], spaceBefore=8, spaceAfter=4, fontName='Helvetica-Bold'))
    s.add(ParagraphStyle(name='H2', fontSize=9, textColor=colors['primary'], spaceBefore=6, spaceAfter=3, fontName='Helvetica-Bold'))
    s.add(ParagraphStyle(name='B', fontSize=8, textColor=colors['text'], spaceAfter=3, leading=10))
    s.add(ParagraphStyle(name='Q', fontSize=8, textColor=colors['dark'], spaceBefore=3, spaceAfter=3, leftIndent=6, fontName='Helvetica-Oblique', leading=10))
    s.add(ParagraphStyle(name='BL', fontSize=7, textColor=colors['text'], spaceAfter=2, leftIndent=8, leading=9))
    s.add(ParagraphStyle(name='TH', fontSize=6, textColor=colors['white'], fontName='Helvetica-Bold', leading=8))
    s.add(ParagraphStyle(name='TC', fontSize=6, textColor=colors['text'], leading=8))
    s.add(ParagraphStyle(name='SM', fontSize=6, textColor=colors['gray'], fontName='Helvetica-Oblique'))
    return s

def create_table_style(colors):
    return TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors['primary']),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors['white']),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 3),
        ('RIGHTPADDING', (0, 0), (-1, -1), 3),
        ('GRID', (0, 0), (-1, -1), 0.5, colors['primary']),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors['mint'], colors['white']]),
    ])

def p(text, style):
    return Paragraph(str(text), style)

# =============================================================================
# REPORT BUILDER
# =============================================================================
def build_report():
    colors = get_brand_colors(CLIENT_CONFIG['brand_color'])
    st = create_styles(colors)
    ts = create_table_style(colors)

    doc = SimpleDocTemplate(
        CLIENT_CONFIG['output_path'],
        pagesize=letter,
        rightMargin=0.4*inch,
        leftMargin=0.4*inch,
        topMargin=0.5*inch,
        bottomMargin=0.4*inch
    )

    story = []
    today = datetime.now().strftime("%B %d, %Y")

    # PAGE 1 - COVER
    story.append(Spacer(1, 0.3*inch))
    story.append(p(CLIENT_CONFIG['name'], st['T']))
    story.append(Spacer(1, 0.1*inch))
    story.append(p("Backlink Analysis & Link Building Strategy", st['ST']))
    story.append(p(f"Prepared by LEXGRO (LexxlyRank) — {today}", st['SM']))
    story.append(Spacer(1, 0.15*inch))

    story.append(p("Executive Summary", st['H1']))
    t = [[p('Metric', st['TH']), p('Value', st['TH']), p('Status', st['TH'])],
         [p('Referring Domains', st['TC']), p(str(METRICS['referring_domains']), st['TC']), p('Growing', st['TC'])],
         [p('Link Gap vs Competitors', st['TC']), p(f"{METRICS['link_gap_total']} domains", st['TC']), p('Outreach opportunity', st['TC'])],
         [p('Profile Links Missing', st['TC']), p(f"{METRICS['profile_links_missing']} of {METRICS['profile_links_existing'] + METRICS['profile_links_missing']}", st['TC']), p('Action needed', st['TC'])]]
    tbl = Table(t, colWidths=[2.0*inch, 1.3*inch, 2.0*inch])
    tbl.setStyle(ts)
    story.append(tbl)

    story.append(p("Brand Assets Location", st['H2']))
    story.append(p(f"All raw data and templates: {CLIENT_CONFIG['data_location']}", st['B']))
    story.append(PageBreak())

    # PAGE 2 - COMPETITION
    story.append(p("Competitive Landscape", st['H1']))

    t = [[p('Competitor', st['TH']), p('Backlinks', st['TH']), p('Ref Domains', st['TH']), p('Owner', st['TH'])]]
    for c in COMPETITORS:
        t.append([p(c['name'], st['TC']), p(f"{c['backlinks']:,}", st['TC']), p(f"{c['ref_domains']:,}", st['TC']), p(c['owner'], st['TC'])])
    tbl = Table(t, colWidths=[1.5*inch, 1.0*inch, 1.0*inch, 1.5*inch])
    tbl.setStyle(ts)
    story.append(tbl)
    story.append(PageBreak())

    # Continue adding pages for link gaps, profiles, outreach, etc.
    # (Simplified for template - expand based on mesowatch_full_report.py)

    # FINAL PAGE - FOOTER
    story.append(p("—", st['B']))
    story.append(p("Prepared by: LEXGRO (LexxlyRank)", st['B']))
    story.append(p(f"Client: {CLIENT_CONFIG['name']}", st['B']))
    story.append(p(f"Report Date: {today}", st['B']))
    story.append(p(f"Data Location: {CLIENT_CONFIG['data_location']}", st['B']))

    doc.build(story)
    print(f"PDF generated: {CLIENT_CONFIG['output_path']}")

if __name__ == "__main__":
    build_report()
