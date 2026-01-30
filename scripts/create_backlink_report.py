#!/usr/bin/env python3
"""MesoWatch Backlink Report - Fixed Formatting"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

LEXGRO_GREEN = HexColor('#298C42')
DARK_GREEN = HexColor('#1a3d2e')
LIGHT_MINT = HexColor('#f0f9f4')
WHITE = HexColor('#FFFFFF')
DARK_TEXT = HexColor('#1a1a1a')

def create_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='Title1', fontSize=22, textColor=DARK_GREEN, spaceAfter=14, alignment=TA_CENTER, fontName='Helvetica-Bold'))
    styles.add(ParagraphStyle(name='Subtitle1', fontSize=11, textColor=LEXGRO_GREEN, spaceBefore=6, spaceAfter=12, alignment=TA_CENTER))
    styles.add(ParagraphStyle(name='Section1', fontSize=12, textColor=DARK_GREEN, spaceBefore=10, spaceAfter=5, fontName='Helvetica-Bold'))
    styles.add(ParagraphStyle(name='Subsection1', fontSize=9, textColor=LEXGRO_GREEN, spaceBefore=6, spaceAfter=3, fontName='Helvetica-Bold'))
    styles.add(ParagraphStyle(name='Body1', fontSize=8, textColor=DARK_TEXT, spaceAfter=4, leading=11))
    styles.add(ParagraphStyle(name='Callout1', fontSize=8, textColor=DARK_GREEN, spaceBefore=4, spaceAfter=4, leftIndent=8, fontName='Helvetica-Oblique', leading=11))
    styles.add(ParagraphStyle(name='Bullet1', fontSize=8, textColor=DARK_TEXT, spaceAfter=2, leftIndent=8, leading=10))
    styles.add(ParagraphStyle(name='TH', fontSize=7, textColor=WHITE, fontName='Helvetica-Bold', leading=9))
    styles.add(ParagraphStyle(name='TC', fontSize=7, textColor=DARK_TEXT, leading=9))
    styles.add(ParagraphStyle(name='Small1', fontSize=7, textColor=HexColor('#666666'), fontName='Helvetica-Oblique'))
    return styles

def ts():
    return TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), LEXGRO_GREEN),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('BACKGROUND', (0, 1), (-1, -1), LIGHT_MINT),
        ('GRID', (0, 0), (-1, -1), 0.5, LEXGRO_GREEN),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [LIGHT_MINT, WHITE]),
    ])

def p(text, style):
    return Paragraph(str(text), style)

def build_pdf():
    output = "/sessions/cool-nifty-noether/mnt/Projects/lexgro/docs/MesoWatch-Backlink-Report-Jan2026.pdf"
    doc = SimpleDocTemplate(output, pagesize=letter, rightMargin=0.5*inch, leftMargin=0.5*inch, topMargin=0.6*inch, bottomMargin=0.5*inch)
    s = create_styles()
    story = []

    # PAGE 1
    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph("MesoWatch.org", s['Title1']))
    story.append(Paragraph("Backlink Analysis & Link Building Strategy", s['Subtitle1']))
    story.append(Paragraph("Prepared by LEXGRO (LexxlyRank) — January 29, 2026", s['Small1']))
    story.append(Spacer(1, 0.15*inch))

    story.append(Paragraph("Executive Summary", s['Section1']))
    t = [[p('Metric', s['TH']), p('Value', s['TH']), p('Status', s['TH'])],
         [p('Referring Domains (.org)', s['TC']), p('164', s['TC']), p('Growing', s['TC'])],
         [p('Legacy Backlinks (.com)', s['TC']), p('1,248', s['TC']), p('Redirect in progress', s['TC'])],
         [p('Broken Links Found', s['TC']), p('81 (40.5%)', s['TC']), p('45 redirects generated ✓', s['TC'])],
         [p('Link Value Lost', s['TC']), p('43.4%', s['TC']), p('Being recovered ✓', s['TC'])],
         [p('Link Gap vs Competitors', s['TC']), p('1,607 domains', s['TC']), p('Outreach opportunity', s['TC'])],
         [p('Profile Links Missing', s['TC']), p('23 of 27', s['TC']), p('Action needed', s['TC'])]]
    story.append(Table(t, colWidths=[2.0*inch, 1.4*inch, 2.0*inch]))
    story[-1].setStyle(ts())
    story.append(Spacer(1, 0.1*inch))

    story.append(Paragraph("What We Delivered", s['Subsection1']))
    story.append(Paragraph("• 45 redirect rules — recovering ~5,000 pts lost link value", s['Bullet1']))
    story.append(Paragraph("• 1,607 link gap prospects identified", s['Bullet1']))
    story.append(Paragraph("• 24 resource pages ready for outreach", s['Bullet1']))
    story.append(Paragraph("• 27 profile platforms audited (23 opportunities)", s['Bullet1']))
    story.append(Paragraph("• Content gap analysis complete", s['Bullet1']))
    story.append(Paragraph("• Outreach templates ready", s['Bullet1']))
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("Brand Assets: mesowatch.org/data/", s['Subsection1']))
    story.append(Paragraph("All data exports, JSON files, and reports accessible to your team.", s['Small1']))
    story.append(PageBreak())

    # PAGE 2 - COMPETITION
    story.append(Paragraph("Competitive Landscape", s['Section1']))
    story.append(Paragraph("Competitors have 100x more backlinks — but they're law firm owned. Independence is your edge.", s['Callout1']))

    t = [[p('Competitor', s['TH']), p('Backlinks', s['TH']), p('Ref Domains', s['TH']), p('Owner', s['TH'])],
         [p('mesothelioma.com', s['TC']), p('139,497', s['TC']), p('8,647', s['TC']), p('Law firm network', s['TC'])],
         [p('asbestos.com', s['TC']), p('124,856', s['TC']), p('15,346', s['TC']), p('Law firm network', s['TC'])],
         [p('maacenter.org', s['TC']), p('104,324', s['TC']), p('1,876', s['TC']), p('Law firm', s['TC'])],
         [p('mesotheliomahope.com', s['TC']), p('18,071', s['TC']), p('4,637', s['TC']), p('Law firm', s['TC'])],
         [p('mesotheliomahelp.org', s['TC']), p('9,166', s['TC']), p('2,049', s['TC']), p('Patient advocacy', s['TC'])],
         [p('MesoWatch (you)', s['TC']), p('~1,400', s['TC']), p('~650', s['TC']), p('Independent ✓', s['TC'])]]
    story.append(Table(t, colWidths=[1.8*inch, 1.0*inch, 1.0*inch, 1.6*inch]))
    story[-1].setStyle(ts())
    story.append(Spacer(1, 0.1*inch))

    story.append(Paragraph("Your Competitive Advantages", s['Subsection1']))
    story.append(Paragraph("• Independent — not affiliated with law firms", s['Bullet1']))
    story.append(Paragraph("• Veteran-Focused — 1 in 3 patients are veterans", s['Bullet1']))
    story.append(Paragraph("• Research-First — daily clinical trials tracker", s['Bullet1']))
    story.append(Paragraph("• No Sales Pressure — educational, not pushing lawsuits", s['Bullet1']))
    story.append(Spacer(1, 0.1*inch))

    story.append(Paragraph("Content Gap Analysis", s['Subsection1']))
    t = [[p('Content Type', s['TH']), p('Competitor Links', s['TH']), p('Your Links', s['TH']), p('Gap', s['TH'])],
         [p('Exposure pages', s['TC']), p('37,685', s['TC']), p('4', s['TC']), p('HUGE', s['TC'])],
         [p('Treatment info', s['TC']), p('5,660', s['TC']), p('0', s['TC']), p('HUGE', s['TC'])],
         [p('Veterans content', s['TC']), p('4,120', s['TC']), p('0', s['TC']), p('HUGE', s['TC'])],
         [p('Legal resources', s['TC']), p('2,162', s['TC']), p('15', s['TC']), p('Large', s['TC'])],
         [p('Symptoms', s['TC']), p('1,898', s['TC']), p('0', s['TC']), p('Large', s['TC'])],
         [p('Statistics', s['TC']), p('152', s['TC']), p('0', s['TC']), p('Medium', s['TC'])]]
    story.append(Table(t, colWidths=[1.4*inch, 1.2*inch, 1.0*inch, 1.0*inch]))
    story[-1].setStyle(ts())
    story.append(PageBreak())

    # PAGE 3 - LINK GAP
    story.append(Paragraph("Link Gap Opportunities (1,607 Total)", s['Section1']))
    story.append(Paragraph("Sites linking to competitors but NOT you — pre-qualified prospects.", s['Callout1']))

    story.append(Paragraph("Veterans (4 prospects)", s['Subsection1']))
    t = [[p('Domain', s['TH']), p('Rank', s['TH']), p('Notes', s['TH'])],
         [p('glenwoodlegion.org', s['TC']), p('131', s['TC']), p('American Legion — veteran health', s['TC'])],
         [p('togetherwithveteranstaos.org', s['TC']), p('51', s['TC']), p('Veteran support org', s['TC'])],
         [p('racinelegion.org', s['TC']), p('38', s['TC']), p('Legion post resources', s['TC'])],
         [p('military-history.us', s['TC']), p('35', s['TC']), p('Shipyard exposure angle', s['TC'])]]
    story.append(Table(t, colWidths=[2.2*inch, 0.6*inch, 2.6*inch]))
    story[-1].setStyle(ts())
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("Labor/Unions (4 prospects)", s['Subsection1']))
    t = [[p('Domain', s['TH']), p('Rank', s['TH']), p('Notes', s['TH'])],
         [p('teamsters464.org', s['TC']), p('122', s['TC']), p('Teamsters — worker safety', s['TC'])],
         [p('ibew1579.org', s['TC']), p('63', s['TC']), p('Electrical workers', s['TC'])],
         [p('insulators2.org', s['TC']), p('60', s['TC']), p('Insulators — highest exposure', s['TC'])]]
    story.append(Table(t, colWidths=[2.2*inch, 0.6*inch, 2.6*inch]))
    story[-1].setStyle(ts())
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("Academic .edu (16 prospects)", s['Subsection1']))
    t = [[p('Domain', s['TH']), p('Rank', s['TH']), p('Notes', s['TH'])],
         [p('uab.edu', s['TC']), p('80', s['TC']), p('Univ Alabama Birmingham', s['TC'])],
         [p('umb.edu', s['TC']), p('72', s['TC']), p('UMass Boston', s['TC'])],
         [p('wisc.edu', s['TC']), p('33', s['TC']), p('Wisconsin — occupational health', s['TC'])],
         [p('utexas.edu', s['TC']), p('25', s['TC']), p('UT Austin — environmental', s['TC'])],
         [p('wustl.edu', s['TC']), p('23', s['TC']), p('Washington Univ St Louis', s['TC'])]]
    story.append(Table(t, colWidths=[2.2*inch, 0.6*inch, 2.6*inch]))
    story[-1].setStyle(ts())
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("Resource Pages (24 total — sample)", s['Subsection1']))
    t = [[p('URL', s['TH']), p('Type', s['TH'])],
         [p('windandwatercatholic.org/resources/', s['TC']), p('Catholic org', s['TC'])],
         [p('bustmold.com/resources/about-asbestos/', s['TC']), p('Asbestos info', s['TC'])],
         [p('americanlegionpost189.org/post/links', s['TC']), p('Legion links', s['TC'])],
         [p('avavets.com/.../militarys-use-of-asbestos/', s['TC']), p('Veteran info', s['TC'])],
         [p('vfwhobesound.org/informationforveterans', s['TC']), p('VFW Post', s['TC'])]]
    story.append(Table(t, colWidths=[3.5*inch, 1.4*inch]))
    story[-1].setStyle(ts())
    story.append(PageBreak())

    # PAGE 4 - PROFILES
    story.append(Paragraph("Profile Link Opportunities", s['Section1']))
    story.append(Paragraph("4 existing, 23 missing. Quick wins below.", s['Body1']))

    story.append(Paragraph("Existing ✓", s['Subsection1']))
    t = [[p('Platform', s['TH']), p('DA', s['TH'])],
         [p('YouTube', s['TC']), p('99', s['TC'])],
         [p('LinkedIn', s['TC']), p('98', s['TC'])],
         [p('Facebook', s['TC']), p('96', s['TC'])],
         [p('Pinterest', s['TC']), p('94', s['TC'])]]
    story.append(Table(t, colWidths=[1.5*inch, 0.6*inch]))
    story[-1].setStyle(ts())
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("Tier 1: Create Now (DA 90+)", s['Subsection1']))
    t = [[p('Platform', s['TH']), p('DA', s['TH']), p('Action', s['TH'])],
         [p('Reddit', s['TC']), p('97', s['TC']), p('Profile + participate', s['TC'])],
         [p('Medium', s['TC']), p('96', s['TC']), p('Publication', s['TC'])],
         [p('Twitter/X', s['TC']), p('94', s['TC']), p('Profile', s['TC'])],
         [p('Quora', s['TC']), p('93', s['TC']), p('Answer questions', s['TC'])],
         [p('Crunchbase', s['TC']), p('91', s['TC']), p('Org listing', s['TC'])],
         [p('BBB', s['TC']), p('90', s['TC']), p('Register', s['TC'])],
         [p('MedlinePlus', s['TC']), p('90', s['TC']), p('Submit to health topics', s['TC'])]]
    story.append(Table(t, colWidths=[1.3*inch, 0.5*inch, 2.0*inch]))
    story[-1].setStyle(ts())
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("Tier 2: Medical & Veterans", s['Subsection1']))
    t = [[p('Platform', s['TH']), p('DA', s['TH']), p('Action', s['TH'])],
         [p('Military.com', s['TC']), p('74', s['TC']), p('Partner listing', s['TC'])],
         [p('Cancer.net', s['TC']), p('67', s['TC']), p('Patient resource', s['TC'])],
         [p('LUNGevity', s['TC']), p('55', s['TC']), p('Partner listing', s['TC'])],
         [p('GO2 Foundation', s['TC']), p('54', s['TC']), p('Resource partner', s['TC'])],
         [p('Cure Meso', s['TC']), p('48', s['TC']), p('Contact for listing', s['TC'])]]
    story.append(Table(t, colWidths=[1.3*inch, 0.5*inch, 2.0*inch]))
    story[-1].setStyle(ts())
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("Tier 3: Unions", s['Subsection1']))
    t = [[p('Platform', s['TH']), p('DA', s['TH']), p('Notes', s['TH'])],
         [p('Navy League', s['TC']), p('52', s['TC']), p('Navy veteran focus', s['TC'])],
         [p('Boilermakers', s['TC']), p('42', s['TC']), p('High exposure trade', s['TC'])],
         [p('Insulators Union', s['TC']), p('40', s['TC']), p('Highest exposure', s['TC'])]]
    story.append(Table(t, colWidths=[1.3*inch, 0.5*inch, 2.0*inch]))
    story[-1].setStyle(ts())
    story.append(PageBreak())

    # PAGE 5 - OUTREACH
    story.append(Paragraph("Outreach Strategy", s['Section1']))

    story.append(Paragraph("Link Building Methods", s['Subsection1']))
    story.append(Paragraph("• Resource Page Inclusion — request addition to existing pages", s['Bullet1']))
    story.append(Paragraph("• Link Insertion — offer your page as additional resource", s['Bullet1']))
    story.append(Paragraph("• Broken Link Replacement — offer content for dead links", s['Bullet1']))
    story.append(Paragraph("• Profile Creation — build presence on high-DA platforms", s['Bullet1']))
    story.append(Paragraph("• Guest Posting — contribute to medical/veteran publications", s['Bullet1']))
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("How We Work With Your Team", s['Subsection1']))
    story.append(Paragraph("• Weekly outreach batches (20-30 emails)", s['Bullet1']))
    story.append(Paragraph("• Shared tracking spreadsheet", s['Bullet1']))
    story.append(Paragraph("• Content requests when gaps identified", s['Bullet1']))
    story.append(Paragraph("• Monthly reporting", s['Bullet1']))
    story.append(Paragraph("• Quarterly full audits", s['Bullet1']))
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("Email Templates (at mesowatch.org/data/)", s['Subsection1']))
    story.append(Paragraph("<b>Resource Page:</b> \"I found your [page] — we've created an independent alternative at MesoWatch.org. Unlike law firm sites, we're purely educational with a daily clinical trials tracker. Would you consider adding us?\"", s['Small1']))
    story.append(Spacer(1, 0.05*inch))
    story.append(Paragraph("<b>Veteran Org:</b> \"1 in 3 mesothelioma patients are veterans. We've built a resource specifically for them — independent, focused on VA benefits and shipyard exposure. We'd be honored to be included in your member resources.\"", s['Small1']))
    story.append(Spacer(1, 0.05*inch))
    story.append(Paragraph("<b>Union:</b> \"[Trade] workers have among the highest asbestos exposure rates. We've built a free resource — independent, occupation-specific, no sales tactics. Would you share with members?\"", s['Small1']))
    story.append(PageBreak())

    # PAGE 6 - ACTION PLAN
    story.append(Paragraph("90-Day Action Plan", s['Section1']))

    story.append(Paragraph("Week 1-2: Foundation", s['Subsection1']))
    t = [[p('Task', s['TH']), p('Owner', s['TH']), p('Status', s['TH'])],
         [p('Deploy 45 redirects', s['TC']), p('Dev', s['TC']), p('Ready', s['TC'])],
         [p('Create Reddit profile', s['TC']), p('Marketing', s['TC']), p('Pending', s['TC'])],
         [p('Create Medium publication', s['TC']), p('Marketing', s['TC']), p('Pending', s['TC'])],
         [p('Create Twitter profile', s['TC']), p('Marketing', s['TC']), p('Pending', s['TC'])],
         [p('Create Quora profile', s['TC']), p('Marketing', s['TC']), p('Pending', s['TC'])],
         [p('Create Crunchbase listing', s['TC']), p('Marketing', s['TC']), p('Pending', s['TC'])]]
    story.append(Table(t, colWidths=[2.2*inch, 1.0*inch, 1.0*inch]))
    story[-1].setStyle(ts())
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("Week 3-4: Outreach Launch", s['Subsection1']))
    t = [[p('Task', s['TH']), p('Owner', s['TH']), p('Target', s['TH'])],
         [p('Veteran org outreach', s['TC']), p('LEXGRO', s['TC']), p('4 sites', s['TC'])],
         [p('Union outreach', s['TC']), p('LEXGRO', s['TC']), p('4 sites', s['TC'])],
         [p('Resource page requests', s['TC']), p('LEXGRO', s['TC']), p('10 pages', s['TC'])],
         [p('Submit to MedlinePlus', s['TC']), p('Marketing', s['TC']), p('1', s['TC'])],
         [p('Submit to Military.com', s['TC']), p('Marketing', s['TC']), p('1', s['TC'])]]
    story.append(Table(t, colWidths=[2.2*inch, 1.0*inch, 1.0*inch]))
    story[-1].setStyle(ts())
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("Month 2-3: Scale", s['Subsection1']))
    story.append(Paragraph("• Academic (.edu) outreach — 16 sites", s['Bullet1']))
    story.append(Paragraph("• Cancer org partnerships — 5 orgs", s['Bullet1']))
    story.append(Paragraph("• Create linkable exposure content", s['Bullet1']))
    story.append(Paragraph("• Create linkable veterans content", s['Bullet1']))
    story.append(Paragraph("• Enhance statistics page for citations", s['Bullet1']))
    story.append(Spacer(1, 0.1*inch))

    story.append(Paragraph("Success Metrics", s['Subsection1']))
    t = [[p('Metric', s['TH']), p('Current', s['TH']), p('90-Day Target', s['TH'])],
         [p('Referring Domains', s['TC']), p('164', s['TC']), p('250+', s['TC'])],
         [p('Profile Links', s['TC']), p('4', s['TC']), p('15+', s['TC'])],
         [p('Link Gap Closed', s['TC']), p('0', s['TC']), p('50+ domains', s['TC'])],
         [p('Broken Links Fixed', s['TC']), p('0', s['TC']), p('45', s['TC'])]]
    story.append(Table(t, colWidths=[1.8*inch, 1.2*inch, 1.2*inch]))
    story[-1].setStyle(ts())
    story.append(Spacer(1, 0.15*inch))

    story.append(Paragraph("—", s['Body1']))
    story.append(Paragraph("Prepared by: LEXGRO (LexxlyRank)", s['Body1']))
    story.append(Paragraph("Client: MesoWatch.org", s['Body1']))
    story.append(Paragraph("Data Location: mesowatch.org/data/", s['Body1']))
    story.append(Paragraph("Next audit: February 2026", s['Small1']))

    doc.build(story)
    print(f"PDF created: {output}")

if __name__ == "__main__":
    build_pdf()
