#!/usr/bin/env python3
"""MesoWatch Comprehensive Backlink Report"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

GREEN = HexColor('#298C42')
DARK = HexColor('#1a3d2e')
MINT = HexColor('#f0f9f4')
WHITE = HexColor('#FFFFFF')
TEXT = HexColor('#1a1a1a')

def styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle(name='T', fontSize=20, textColor=DARK, spaceBefore=0, spaceAfter=8, alignment=TA_CENTER, fontName='Helvetica-Bold'))
    s.add(ParagraphStyle(name='ST', fontSize=10, textColor=GREEN, spaceBefore=0, spaceAfter=6, alignment=TA_CENTER))
    s.add(ParagraphStyle(name='H1', fontSize=11, textColor=DARK, spaceBefore=8, spaceAfter=4, fontName='Helvetica-Bold'))
    s.add(ParagraphStyle(name='H2', fontSize=9, textColor=GREEN, spaceBefore=6, spaceAfter=3, fontName='Helvetica-Bold'))
    s.add(ParagraphStyle(name='B', fontSize=8, textColor=TEXT, spaceAfter=3, leading=10))
    s.add(ParagraphStyle(name='Q', fontSize=8, textColor=DARK, spaceBefore=3, spaceAfter=3, leftIndent=6, fontName='Helvetica-Oblique', leading=10))
    s.add(ParagraphStyle(name='BL', fontSize=7, textColor=TEXT, spaceAfter=2, leftIndent=8, leading=9))
    s.add(ParagraphStyle(name='TH', fontSize=6, textColor=WHITE, fontName='Helvetica-Bold', leading=8))
    s.add(ParagraphStyle(name='TC', fontSize=6, textColor=TEXT, leading=8))
    s.add(ParagraphStyle(name='SM', fontSize=6, textColor=HexColor('#666'), fontName='Helvetica-Oblique'))
    return s

def ts():
    return TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), GREEN),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 3),
        ('RIGHTPADDING', (0, 0), (-1, -1), 3),
        ('GRID', (0, 0), (-1, -1), 0.5, GREEN),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [MINT, WHITE]),
    ])

def p(t, st): return Paragraph(str(t), st)

def build():
    out = "/sessions/cool-nifty-noether/mnt/Projects/lexgro/docs/MesoWatch-Backlink-Report-Jan2026.pdf"
    doc = SimpleDocTemplate(out, pagesize=letter, rightMargin=0.4*inch, leftMargin=0.4*inch, topMargin=0.5*inch, bottomMargin=0.4*inch)
    st = styles()
    story = []

    # PAGE 1 - COVER
    story.append(Spacer(1, 0.3*inch))
    story.append(p("MesoWatch.org", st['T']))
    story.append(Spacer(1, 0.1*inch))
    story.append(p("Backlink Analysis & Link Building Strategy", st['ST']))
    story.append(p("Prepared by LEXGRO (LexxlyRank) — January 29, 2026", st['SM']))
    story.append(Spacer(1, 0.15*inch))

    story.append(p("Executive Summary", st['H1']))
    t = [[p('Metric', st['TH']), p('Value', st['TH']), p('Status', st['TH'])],
         [p('Referring Domains (.org)', st['TC']), p('164', st['TC']), p('Growing', st['TC'])],
         [p('Legacy Backlinks (.com)', st['TC']), p('1,248', st['TC']), p('Redirect in progress', st['TC'])],
         [p('Broken Links Found', st['TC']), p('81 (40.5%)', st['TC']), p('45 redirects generated ✓', st['TC'])],
         [p('Link Value Lost to 404s', st['TC']), p('43.4%', st['TC']), p('Being recovered ✓', st['TC'])],
         [p('Link Gap vs Competitors', st['TC']), p('1,607 domains', st['TC']), p('Outreach opportunity', st['TC'])],
         [p('Profile Links Missing', st['TC']), p('23 of 27', st['TC']), p('Action needed', st['TC'])]]
    story.append(Table(t, colWidths=[2.0*inch, 1.3*inch, 2.0*inch]))
    story[-1].setStyle(ts())

    story.append(p("What We Delivered This Month", st['H2']))
    story.append(p("• 45 redirect rules generated — recovering ~5,000 points of lost link value", st['BL']))
    story.append(p("• 1,607 link gap prospects — sites linking to competitors but not you", st['BL']))
    story.append(p("• 24 resource pages identified — already link to competitors", st['BL']))
    story.append(p("• 27 profile platforms audited — 23 opportunities identified", st['BL']))
    story.append(p("• Content gap analysis — 8 topic gaps where competitors earn links", st['BL']))
    story.append(p("• 70-90 registration link opportunities mapped by tier", st['BL']))
    story.append(p("• Outreach templates ready for each vertical", st['BL']))

    story.append(p("Brand Assets Location", st['H2']))
    story.append(p("All raw data, JSON exports, and outreach templates: mesowatch.org/data/", st['B']))
    story.append(PageBreak())

    # PAGE 2 - COMPETITION
    story.append(p("Competitive Landscape", st['H1']))
    story.append(p("Competitors have 100x more backlinks — but they're law firm owned. Independence is your edge.", st['Q']))

    t = [[p('Competitor', st['TH']), p('Backlinks', st['TH']), p('Ref Domains', st['TH']), p('Rank', st['TH']), p('Owner', st['TH'])],
         [p('mesothelioma.com', st['TC']), p('139,497', st['TC']), p('8,647', st['TC']), p('377', st['TC']), p('Law firm network', st['TC'])],
         [p('asbestos.com', st['TC']), p('124,856', st['TC']), p('15,346', st['TC']), p('392', st['TC']), p('Law firm network', st['TC'])],
         [p('maacenter.org', st['TC']), p('104,324', st['TC']), p('1,876', st['TC']), p('309', st['TC']), p('Law firm', st['TC'])],
         [p('mesotheliomahope.com', st['TC']), p('18,071', st['TC']), p('4,637', st['TC']), p('328', st['TC']), p('Law firm', st['TC'])],
         [p('mesotheliomahelp.org', st['TC']), p('9,166', st['TC']), p('2,049', st['TC']), p('270', st['TC']), p('Patient advocacy', st['TC'])],
         [p('MesoWatch.org (you)', st['TC']), p('~1,400', st['TC']), p('~650', st['TC']), p('216', st['TC']), p('Independent ✓', st['TC'])]]
    story.append(Table(t, colWidths=[1.5*inch, 0.8*inch, 0.8*inch, 0.5*inch, 1.3*inch]))
    story[-1].setStyle(ts())

    story.append(p("Your Competitive Advantages (Use in Outreach)", st['H2']))
    story.append(p("• Independent — Not affiliated with law firms (competitors are lead-gen sites)", st['BL']))
    story.append(p("• Veteran-Focused — 1 in 3 mesothelioma patients are veterans", st['BL']))
    story.append(p("• Research-First — Daily clinical trials tracker (unique to you)", st['BL']))
    story.append(p("• No Sales Pressure — Educational resource, not pushing lawsuits", st['BL']))
    story.append(p("• Trust Fund Data — Comprehensive state-by-state deadline information", st['BL']))

    story.append(p("Content Gap Analysis", st['H2']))
    t = [[p('Content Type', st['TH']), p('Competitor Links', st['TH']), p('Your Links', st['TH']), p('Gap Size', st['TH'])],
         [p('Exposure pages', st['TC']), p('37,685', st['TC']), p('4', st['TC']), p('HUGE — priority', st['TC'])],
         [p('Treatment info', st['TC']), p('5,660', st['TC']), p('0', st['TC']), p('HUGE — priority', st['TC'])],
         [p('Veterans content', st['TC']), p('4,120', st['TC']), p('0', st['TC']), p('HUGE — your niche', st['TC'])],
         [p('Legal resources', st['TC']), p('2,162', st['TC']), p('15', st['TC']), p('Large gap', st['TC'])],
         [p('Symptoms', st['TC']), p('1,898', st['TC']), p('0', st['TC']), p('Large gap', st['TC'])],
         [p('Prognosis', st['TC']), p('771', st['TC']), p('0', st['TC']), p('Medium gap', st['TC'])],
         [p('Clinical trials', st['TC']), p('195', st['TC']), p('1', st['TC']), p('Small gap', st['TC'])],
         [p('Statistics', st['TC']), p('152', st['TC']), p('0', st['TC']), p('Small gap', st['TC'])]]
    story.append(Table(t, colWidths=[1.2*inch, 1.1*inch, 0.8*inch, 1.2*inch]))
    story[-1].setStyle(ts())
    story.append(PageBreak())

    # PAGE 3 - LINK GAP: VETERANS & LABOR
    story.append(p("Link Gap Opportunities — 1,607 Total Prospects", st['H1']))
    story.append(p("Sites linking to competitors but NOT you — pre-qualified prospects.", st['Q']))

    story.append(p("Veterans (4 prospects) — YOUR DIFFERENTIATOR", st['H2']))
    story.append(p("Outreach angle: \"Veteran-focused mesothelioma resource, 1 in 3 patients served\"", st['SM']))
    t = [[p('Domain', st['TH']), p('Rank', st['TH']), p('Links', st['TH']), p('Notes', st['TH'])],
         [p('glenwoodlegion.org', st['TC']), p('131', st['TC']), p('132', st['TC']), p('American Legion — veteran health resources', st['TC'])],
         [p('togetherwithveteranstaos.org', st['TC']), p('51', st['TC']), p('4', st['TC']), p('Veteran support organization', st['TC'])],
         [p('racinelegion.org', st['TC']), p('38', st['TC']), p('24', st['TC']), p('Legion post — member resources', st['TC'])],
         [p('military-history.us', st['TC']), p('35', st['TC']), p('2', st['TC']), p('Military history — shipyard exposure angle', st['TC'])]]
    story.append(Table(t, colWidths=[1.8*inch, 0.5*inch, 0.5*inch, 2.5*inch]))
    story[-1].setStyle(ts())

    story.append(p("Labor/Unions (4 prospects) — HIGH EXPOSURE INDUSTRIES", st['H2']))
    story.append(p("Outreach angle: \"Independent resource for workers exposed to asbestos\"", st['SM']))
    t = [[p('Domain', st['TH']), p('Rank', st['TH']), p('Links', st['TH']), p('Notes', st['TH'])],
         [p('teamsters464.org', st['TC']), p('122', st['TC']), p('4', st['TC']), p('Teamsters local — worker safety resources', st['TC'])],
         [p('getscribeware.com', st['TC']), p('78', st['TC']), p('8', st['TC']), p('Workplace safety software company', st['TC'])],
         [p('ibew1579.org', st['TC']), p('63', st['TC']), p('34', st['TC']), p('Electrical workers — asbestos in old wiring', st['TC'])],
         [p('insulators2.org', st['TC']), p('60', st['TC']), p('2', st['TC']), p('Insulators union — highest exposure trade', st['TC'])]]
    story.append(Table(t, colWidths=[1.8*inch, 0.5*inch, 0.5*inch, 2.5*inch]))
    story[-1].setStyle(ts())

    story.append(p("Medical Organizations (5 prospects)", st['H2']))
    story.append(p("Outreach angle: \"Independent patient resource, clinical trials tracker\"", st['SM']))
    t = [[p('Domain', st['TH']), p('Rank', st['TH']), p('Links', st['TH']), p('Notes', st['TH'])],
         [p('sk-livingwithlungcancer.blogspot.com', st['TC']), p('130', st['TC']), p('241', st['TC']), p('Lung cancer patient blog', st['TC'])],
         [p('iiar-anticancer.org', st['TC']), p('120', st['TC']), p('68', st['TC']), p('Intl Institute for Anticancer Research', st['TC'])],
         [p('lescavalierescontrelecancer.org', st['TC']), p('76', st['TC']), p('4', st['TC']), p('Cancer organization (French)', st['TC'])],
         [p('appendix-cancer.org', st['TC']), p('69', st['TC']), p('27', st['TC']), p('Cancer patient resource site', st['TC'])],
         [p('lungcancertreatmentstage4.blogspot.com', st['TC']), p('44', st['TC']), p('33', st['TC']), p('Stage 4 lung cancer blog', st['TC'])]]
    story.append(Table(t, colWidths=[2.2*inch, 0.5*inch, 0.5*inch, 2.1*inch]))
    story[-1].setStyle(ts())
    story.append(PageBreak())

    # PAGE 4 - LINK GAP: ACADEMIC
    story.append(p("Link Gap — Academic .edu (16 prospects)", st['H1']))
    story.append(p("Outreach angle: \"Cite our statistics page, link clinical trials tracker\"", st['SM']))
    t = [[p('Domain', st['TH']), p('Rank', st['TH']), p('Links', st['TH']), p('Notes', st['TH'])],
         [p('collegesniche.com', st['TC']), p('158', st['TC']), p('42', st['TC']), p('College resource site', st['TC'])],
         [p('tvetcollegesportal.co.za', st['TC']), p('132', st['TC']), p('22', st['TC']), p('Technical colleges (South Africa)', st['TC'])],
         [p('ccacademy.edu', st['TC']), p('80', st['TC']), p('2', st['TC']), p('Academic institution', st['TC'])],
         [p('uab.edu', st['TC']), p('80', st['TC']), p('68', st['TC']), p('Univ of Alabama Birmingham — public health', st['TC'])],
         [p('umb.edu', st['TC']), p('72', st['TC']), p('4', st['TC']), p('UMass Boston — health resources', st['TC'])],
         [p('collegeboard.org', st['TC']), p('53', st['TC']), p('1', st['TC']), p('College Board', st['TC'])],
         [p('postgradoune.edu.pe', st['TC']), p('51', st['TC']), p('11', st['TC']), p('Graduate school (Peru)', st['TC'])],
         [p('uni.edu.pe', st['TC']), p('44', st['TC']), p('2', st['TC']), p('National university (Peru)', st['TC'])],
         [p('aulaperu.edu.pe', st['TC']), p('43', st['TC']), p('9', st['TC']), p('Education platform (Peru)', st['TC'])],
         [p('wisc.edu', st['TC']), p('33', st['TC']), p('6', st['TC']), p('Univ of Wisconsin — occupational health', st['TC'])],
         [p('nn.edu.pe', st['TC']), p('30', st['TC']), p('6', st['TC']), p('Education (Peru)', st['TC'])],
         [p('acu.edu', st['TC']), p('29', st['TC']), p('3', st['TC']), p('Abilene Christian University', st['TC'])],
         [p('ucmo.edu', st['TC']), p('27', st['TC']), p('25', st['TC']), p('Univ of Central Missouri', st['TC'])],
         [p('utexas.edu', st['TC']), p('25', st['TC']), p('9', st['TC']), p('UT Austin — environmental health', st['TC'])],
         [p('wustl.edu', st['TC']), p('23', st['TC']), p('1', st['TC']), p('Washington Univ St Louis', st['TC'])]]
    story.append(Table(t, colWidths=[2.0*inch, 0.5*inch, 0.5*inch, 2.3*inch]))
    story[-1].setStyle(ts())
    story.append(PageBreak())

    # PAGE 5 - RESOURCE PAGES
    story.append(p("Resource Page Opportunities (24 pages)", st['H1']))
    story.append(p("These pages ALREADY link to your competitors — request inclusion.", st['Q']))
    t = [[p('URL', st['TH']), p('Domain', st['TH']), p('Rank', st['TH'])],
         [p('windandwatercatholic.org/resources/', st['TC']), p('Catholic org', st['TC']), p('161', st['TC'])],
         [p('bustmold.com/resources/about-asbestos/', st['TC']), p('Asbestos info', st['TC']), p('139', st['TC'])],
         [p('supportforstepdads.com/blog/.../men-and-lung-cancer', st['TC']), p('Health blog', st['TC']), p('114', st['TC'])],
         [p('benchmarkrecycling.com/links.html', st['TC']), p('Industry links', st['TC']), p('113', st['TC'])],
         [p('larryinspects.com/home-inspection-resources/', st['TC']), p('Inspector resources', st['TC']), p('113', st['TC'])],
         [p('sumanasretreat.org/pAGES/resources.htm', st['TC']), p('Organization', st['TC']), p('113', st['TC'])],
         [p('gck.org/resources/', st['TC']), p('Organization', st['TC']), p('104', st['TC'])],
         [p('americanlegionpost189.org/post/links', st['TC']), p('Legion — veteran', st['TC']), p('89', st['TC'])],
         [p('marthahilliardrealestate.com/guide-to-asbestos', st['TC']), p('Real estate', st['TC']), p('78', st['TC'])],
         [p('avavets.com/.../militarys-use-of-asbestos/', st['TC']), p('Veteran info', st['TC']), p('78', st['TC'])],
         [p('thenamproject.com/links/', st['TC']), p('Organization', st['TC']), p('78', st['TC'])],
         [p('nfbkentuckytad.org/resources.html', st['TC']), p('Organization', st['TC']), p('78', st['TC'])],
         [p('moalpost21.org/resources.html', st['TC']), p('Legion post', st['TC']), p('78', st['TC'])],
         [p('vfwhobesound.org/informationforveterans', st['TC']), p('VFW Post', st['TC']), p('78', st['TC'])],
         [p('archi-qs.com.au/blog/what-is-asbestos/', st['TC']), p('Architecture', st['TC']), p('78', st['TC'])],
         [p('swiamhds.com/resources/mesotheliomacom', st['TC']), p('Health org', st['TC']), p('78', st['TC'])],
         [p('miloandmoxie.org/resources/', st['TC']), p('Patient resources', st['TC']), p('62', st['TC'])],
         [p('covidplan.info/resources/...', st['TC']), p('Health info', st['TC']), p('59', st['TC'])],
         [p('naleast.com/helpful-links/', st['TC']), p('Organization', st['TC']), p('58', st['TC'])],
         [p('asbestosremovalsmarlborough.co.nz/resources/', st['TC']), p('Asbestos removal', st['TC']), p('58', st['TC'])]]
    story.append(Table(t, colWidths=[3.0*inch, 1.3*inch, 0.5*inch]))
    story[-1].setStyle(ts())
    story.append(PageBreak())

    # PAGE 6 - PROFILE LINKS
    story.append(p("Profile Link Opportunities", st['H1']))
    story.append(p("Current: 4 existing, 23 missing. 70-90 total opportunities across all tiers.", st['B']))

    story.append(p("Existing Profiles ✓", st['H2']))
    t = [[p('Platform', st['TH']), p('DA', st['TH']), p('Status', st['TH'])],
         [p('YouTube', st['TC']), p('99', st['TC']), p('Active ✓', st['TC'])],
         [p('LinkedIn', st['TC']), p('98', st['TC']), p('Active ✓', st['TC'])],
         [p('Facebook', st['TC']), p('96', st['TC']), p('Active ✓', st['TC'])],
         [p('Pinterest', st['TC']), p('94', st['TC']), p('Active ✓', st['TC'])]]
    story.append(Table(t, colWidths=[1.5*inch, 0.5*inch, 1.0*inch]))
    story[-1].setStyle(ts())

    story.append(p("Tier 1: Create Immediately (DA 90+)", st['H2']))
    t = [[p('Platform', st['TH']), p('DA', st['TH']), p('Type', st['TH']), p('Action', st['TH'])],
         [p('Reddit', st['TC']), p('97', st['TC']), p('Community', st['TC']), p('Create profile, participate in r/cancer, r/asbestoshelp', st['TC'])],
         [p('Medium', st['TC']), p('96', st['TC']), p('Content', st['TC']), p('Create publication, republish articles', st['TC'])],
         [p('Twitter/X', st['TC']), p('94', st['TC']), p('Social', st['TC']), p('Create profile, bio link, share research', st['TC'])],
         [p('Quora', st['TC']), p('93', st['TC']), p('Q&A', st['TC']), p('Answer mesothelioma questions', st['TC'])],
         [p('USA.gov', st['TC']), p('92', st['TC']), p('Government', st['TC']), p('Submit as health resource', st['TC'])],
         [p('Healthline', st['TC']), p('92', st['TC']), p('Health', st['TC']), p('Partner directory listing', st['TC'])],
         [p('Crunchbase', st['TC']), p('91', st['TC']), p('Directory', st['TC']), p('Organization listing', st['TC'])],
         [p('BBB', st['TC']), p('90', st['TC']), p('Trust', st['TC']), p('Business registration', st['TC'])],
         [p('MedlinePlus', st['TC']), p('90', st['TC']), p('NIH', st['TC']), p('Submit to health topics', st['TC'])]]
    story.append(Table(t, colWidths=[1.0*inch, 0.4*inch, 0.7*inch, 3.0*inch]))
    story[-1].setStyle(ts())

    story.append(p("Tier 2: Medical, Veterans & Legal (DA 50-70)", st['H2']))
    t = [[p('Platform', st['TH']), p('DA', st['TH']), p('Type', st['TH']), p('Action', st['TH'])],
         [p('VA.gov', st['TC']), p('85', st['TC']), p('Government', st['TC']), p('Veteran resource submission', st['TC'])],
         [p('OSHA', st['TC']), p('82', st['TC']), p('Government', st['TC']), p('Outreach partner listing', st['TC'])],
         [p('NIOSH (CDC)', st['TC']), p('78', st['TC']), p('Government', st['TC']), p('Health resource submission', st['TC'])],
         [p('Military.com', st['TC']), p('74', st['TC']), p('Veterans', st['TC']), p('Partner/resource listing', st['TC'])],
         [p('Justia', st['TC']), p('73', st['TC']), p('Legal', st['TC']), p('Legal resource directory', st['TC'])],
         [p('Military OneSource', st['TC']), p('72', st['TC']), p('DoD', st['TC']), p('Health resource submission', st['TC'])],
         [p('FindLaw', st['TC']), p('71', st['TC']), p('Legal', st['TC']), p('Consumer resources section', st['TC'])],
         [p('Nolo', st['TC']), p('68', st['TC']), p('Legal', st['TC']), p('Resource/partner directory', st['TC'])],
         [p('American Legion', st['TC']), p('68', st['TC']), p('Veterans', st['TC']), p('Community resource listing', st['TC'])],
         [p('Cancer.net (ASCO)', st['TC']), p('67', st['TC']), p('Medical', st['TC']), p('Patient resource submission', st['TC'])],
         [p('Avvo', st['TC']), p('66', st['TC']), p('Legal Q&A', st['TC']), p('Answer questions, create profile', st['TC'])],
         [p('DAV', st['TC']), p('64', st['TC']), p('Veterans', st['TC']), p('Resource partner listing', st['TC'])],
         [p('VFW', st['TC']), p('62', st['TC']), p('Veterans', st['TC']), p('Resource directory listing', st['TC'])],
         [p('LUNGevity', st['TC']), p('55', st['TC']), p('Cancer org', st['TC']), p('Partner listing', st['TC'])],
         [p('GO2 Foundation', st['TC']), p('54', st['TC']), p('Lung cancer', st['TC']), p('Community partner', st['TC'])]]
    story.append(Table(t, colWidths=[1.1*inch, 0.4*inch, 0.7*inch, 2.8*inch]))
    story[-1].setStyle(ts())
    story.append(PageBreak())

    # PAGE 7 - PROFILE LINKS TIER 3
    story.append(p("Profile Links — Tier 3: Unions & Industry (DA 30-50)", st['H1']))
    story.append(p("Critical for your niche — workers in these trades have highest asbestos exposure.", st['Q']))
    t = [[p('Platform', st['TH']), p('DA', st['TH']), p('Type', st['TH']), p('Notes', st['TH'])],
         [p('AFL-CIO', st['TC']), p('62', st['TC']), p('Labor Federation', st['TC']), p('Worker safety resource', st['TC'])],
         [p('Maritime Administration', st['TC']), p('58', st['TC']), p('Government', st['TC']), p('Maritime health resources', st['TC'])],
         [p('AGC of America', st['TC']), p('58', st['TC']), p('Construction', st['TC']), p('Safety resource listing', st['TC'])],
         [p('United Steelworkers', st['TC']), p('55', st['TC']), p('Union', st['TC']), p('Health resource for members', st['TC'])],
         [p('Navy League', st['TC']), p('52', st['TC']), p('Naval org', st['TC']), p('Navy veteran focus — shipyard', st['TC'])],
         [p('IBEW (Electricians)', st['TC']), p('52', st['TC']), p('Union', st['TC']), p('Safety resource listing', st['TC'])],
         [p('Cure Meso (MARF)', st['TC']), p('48', st['TC']), p('Meso-specific', st['TC']), p('Research partner listing', st['TC'])],
         [p('LIUNA (Laborers)', st['TC']), p('48', st['TC']), p('Union', st['TC']), p('Member health resource', st['TC'])],
         [p('NRCA (Roofing)', st['TC']), p('48', st['TC']), p('Roofing', st['TC']), p('Asbestos safety resource', st['TC'])],
         [p('SMACNA (Sheet Metal)', st['TC']), p('45', st['TC']), p('HVAC', st['TC']), p('Occupational health', st['TC'])],
         [p('Sheet Metal Workers', st['TC']), p('45', st['TC']), p('Union', st['TC']), p('Occupational health resource', st['TC'])],
         [p('Shipbuilders Council', st['TC']), p('42', st['TC']), p('Industry', st['TC']), p('Worker health resource', st['TC'])],
         [p('Boilermakers', st['TC']), p('42', st['TC']), p('Union', st['TC']), p('HIGH exposure trade', st['TC'])],
         [p('Insulators Union', st['TC']), p('40', st['TC']), p('Union', st['TC']), p('HIGHEST asbestos exposure trade', st['TC'])]]
    story.append(Table(t, colWidths=[1.3*inch, 0.4*inch, 0.9*inch, 2.4*inch]))
    story[-1].setStyle(ts())

    story.append(p("Tier 4: Content Syndication (Ongoing)", st['H2']))
    t = [[p('Platform', st['TH']), p('DA', st['TH']), p('Requirement', st['TH']), p('Notes', st['TH'])],
         [p('Medium', st['TC']), p('96', st['TC']), p('Original articles', st['TC']), p('Republish blog posts with canonical', st['TC'])],
         [p('LinkedIn Articles', st['TC']), p('98', st['TC']), p('Professional content', st['TC']), p('Publish statistics, guides', st['TC'])],
         [p('Vocal.media', st['TC']), p('72', st['TC']), p('Stories', st['TC']), p('Health/awareness content', st['TC'])],
         [p('HubPages', st['TC']), p('68', st['TC']), p('In-depth articles', st['TC']), p('Medical explainers', st['TC'])],
         [p('PR Newswire', st['TC']), p('92', st['TC']), p('Paid PR', st['TC']), p('Major news announcements', st['TC'])],
         [p('PRWeb', st['TC']), p('73', st['TC']), p('Mid-tier PR', st['TC']), p('Content updates', st['TC'])]]
    story.append(Table(t, colWidths=[1.1*inch, 0.4*inch, 1.0*inch, 2.5*inch]))
    story[-1].setStyle(ts())
    story.append(PageBreak())

    # PAGE 8 - OUTREACH STRATEGY
    story.append(p("Outreach Strategy & Templates", st['H1']))

    story.append(p("Link Building Methods", st['H2']))
    story.append(p("• Resource Page Inclusion — Request addition to existing pages that link to competitors", st['BL']))
    story.append(p("• Link Insertion — Reach out to sites with relevant content, offer your page as resource", st['BL']))
    story.append(p("• Broken Link Replacement — Find broken competitor links, offer your content as replacement", st['BL']))
    story.append(p("• Profile Creation — Build presence on high-DA platforms with backlinks to site", st['BL']))
    story.append(p("• Guest Posting — Contribute expert content to medical/veteran/union publications", st['BL']))
    story.append(p("• Digital PR — Pitch newsworthy content (statistics, research) to health journalists", st['BL']))

    story.append(p("How We Work With Your Team", st['H2']))
    story.append(p("• Weekly outreach batches — 20-30 personalized emails per week", st['BL']))
    story.append(p("• Shared tracking spreadsheet — All prospects, status, follow-ups in Google Sheet", st['BL']))
    story.append(p("• Content requests — If we identify content gaps, we brief your team on what to create", st['BL']))
    story.append(p("• Monthly reporting — Links acquired, DA changes, next month priorities", st['BL']))
    story.append(p("• Quarterly audits — Full re-run of backlink audit, competitor analysis, strategy refresh", st['BL']))

    story.append(p("Outreach Email Templates (Full versions at mesowatch.org/data/)", st['H2']))

    story.append(p("Template 1: Resource Page Inclusion", st['B']))
    story.append(p("\"Hi [Name], I found your [resource page] while researching mesothelioma resources. Great collection! I noticed you link to [competitor] — we've created an independent alternative at MesoWatch.org that might complement your list. Unlike law firm sites, we're purely educational with a daily clinical trials tracker. Would you consider adding us?\"", st['SM']))
    story.append(Spacer(1, 0.05*inch))

    story.append(p("Template 2: Veteran Organization", st['B']))
    story.append(p("\"Hi [Name], 1 in 3 mesothelioma patients are veterans, and we've built a resource specifically for them at MesoWatch.org. Unlike most mesothelioma sites (which are law firm owned), we're independent and focused on VA benefits, shipyard exposure, and treatment resources. No sales pressure — just education. We'd be honored to be included in your member resources.\"", st['SM']))
    story.append(Spacer(1, 0.05*inch))

    story.append(p("Template 3: Union/Labor Organization", st['B']))
    story.append(p("\"Hi [Name], [Trade] workers have among the highest rates of asbestos exposure in America. We've built a free resource at MesoWatch.org specifically for workers and their families — independent, occupation-specific exposure info, no sales tactics. Would you consider sharing with your members? In solidarity, [Name]\"", st['SM']))
    story.append(Spacer(1, 0.05*inch))

    story.append(p("Template 4: Academic/Medical", st['B']))
    story.append(p("\"Hi [Name], I'm reaching out from MesoWatch, an independent mesothelioma patient education resource. We maintain a daily-updated clinical trials tracker and medically-reviewed treatment information. All content reviewed by oncologists, no law firm affiliation. Would you consider linking to our statistics page as a citation source?\"", st['SM']))
    story.append(PageBreak())

    # PAGE 9 - ACTION PLAN
    story.append(p("90-Day Action Plan", st['H1']))

    story.append(p("Week 1-2: Foundation", st['H2']))
    t = [[p('Task', st['TH']), p('Owner', st['TH']), p('Status', st['TH'])],
         [p('Deploy 45 Netlify redirects', st['TC']), p('Dev', st['TC']), p('Ready — file in /data/backlinks/', st['TC'])],
         [p('Create Reddit profile + participate', st['TC']), p('Marketing', st['TC']), p('Pending', st['TC'])],
         [p('Create Medium publication', st['TC']), p('Marketing', st['TC']), p('Pending', st['TC'])],
         [p('Create Twitter/X profile', st['TC']), p('Marketing', st['TC']), p('Pending', st['TC'])],
         [p('Create Quora profile + answer questions', st['TC']), p('Marketing', st['TC']), p('Pending', st['TC'])],
         [p('Create Crunchbase listing', st['TC']), p('Marketing', st['TC']), p('Pending', st['TC'])],
         [p('Register with BBB', st['TC']), p('Marketing', st['TC']), p('Pending', st['TC'])],
         [p('Submit to MedlinePlus', st['TC']), p('Marketing', st['TC']), p('Pending', st['TC'])]]
    story.append(Table(t, colWidths=[2.5*inch, 0.8*inch, 1.8*inch]))
    story[-1].setStyle(ts())

    story.append(p("Week 3-4: Outreach Launch", st['H2']))
    t = [[p('Task', st['TH']), p('Owner', st['TH']), p('Target', st['TH'])],
         [p('Veteran organization outreach', st['TC']), p('LEXGRO', st['TC']), p('4 sites (glenwoodlegion, etc.)', st['TC'])],
         [p('Labor union outreach', st['TC']), p('LEXGRO', st['TC']), p('4 sites (teamsters464, ibew, etc.)', st['TC'])],
         [p('Resource page requests', st['TC']), p('LEXGRO', st['TC']), p('10 pages from list', st['TC'])],
         [p('Submit to VA.gov', st['TC']), p('Marketing', st['TC']), p('Veteran resource listing', st['TC'])],
         [p('Submit to Military.com', st['TC']), p('Marketing', st['TC']), p('Partner listing', st['TC'])],
         [p('American Legion/VFW/DAV outreach', st['TC']), p('LEXGRO', st['TC']), p('3 organizations', st['TC'])]]
    story.append(Table(t, colWidths=[2.5*inch, 0.8*inch, 1.8*inch]))
    story[-1].setStyle(ts())

    story.append(p("Month 2: Scale Outreach", st['H2']))
    t = [[p('Task', st['TH']), p('Owner', st['TH']), p('Target', st['TH'])],
         [p('Academic (.edu) outreach', st['TC']), p('LEXGRO', st['TC']), p('16 sites from list', st['TC'])],
         [p('Medical organization outreach', st['TC']), p('LEXGRO', st['TC']), p('5 sites (iiar-anticancer, etc.)', st['TC'])],
         [p('Cancer org partnerships', st['TC']), p('LEXGRO', st['TC']), p('LUNGevity, GO2, Cancer.net', st['TC'])],
         [p('Legal directory submissions', st['TC']), p('Marketing', st['TC']), p('Justia, FindLaw, Nolo, Avvo', st['TC'])],
         [p('Create linkable exposure content', st['TC']), p('Content', st['TC']), p('1 pillar page (37K competitor links)', st['TC'])],
         [p('Create linkable veterans content', st['TC']), p('Content', st['TC']), p('1 pillar page (4K competitor links)', st['TC'])]]
    story.append(Table(t, colWidths=[2.5*inch, 0.8*inch, 1.8*inch]))
    story[-1].setStyle(ts())

    story.append(p("Month 3: Content + Ongoing", st['H2']))
    story.append(p("• Enhance statistics page for .edu citations (152 competitor links)", st['BL']))
    story.append(p("• Create symptoms content (1,898 competitor links)", st['BL']))
    story.append(p("• Create treatment content (5,660 competitor links)", st['BL']))
    story.append(p("• Union outreach: Insulators, Boilermakers, LIUNA, Sheet Metal", st['BL']))
    story.append(p("• State bar association submissions (all 50 states)", st['BL']))
    story.append(p("• Monthly backlink audit and competitor monitoring", st['BL']))
    story.append(p("• Continue outreach (20-30 emails/week)", st['BL']))
    story.append(PageBreak())

    # PAGE 10 - METRICS & FOOTER
    story.append(p("Success Metrics", st['H1']))
    t = [[p('Metric', st['TH']), p('Current', st['TH']), p('30-Day', st['TH']), p('60-Day', st['TH']), p('90-Day', st['TH'])],
         [p('Referring Domains', st['TC']), p('164', st['TC']), p('185', st['TC']), p('215', st['TC']), p('250+', st['TC'])],
         [p('Profile Links', st['TC']), p('4', st['TC']), p('10', st['TC']), p('15', st['TC']), p('20+', st['TC'])],
         [p('Link Gap Closed', st['TC']), p('0', st['TC']), p('15', st['TC']), p('35', st['TC']), p('50+', st['TC'])],
         [p('Broken Links Fixed', st['TC']), p('0', st['TC']), p('45', st['TC']), p('45', st['TC']), p('45', st['TC'])],
         [p('Resource Pages', st['TC']), p('0', st['TC']), p('5', st['TC']), p('12', st['TC']), p('20+', st['TC'])]]
    story.append(Table(t, colWidths=[1.3*inch, 0.8*inch, 0.8*inch, 0.8*inch, 0.8*inch]))
    story[-1].setStyle(ts())

    story.append(p("Estimated Impact by Tier", st['H2']))
    t = [[p('Tier', st['TH']), p('# Links', st['TH']), p('DA Range', st['TH']), p('Timeline', st['TH'])],
         [p('Tier 1 (Foundation)', st['TC']), p('15-20', st['TC']), p('DA 80-99', st['TC']), p('1-2 weeks', st['TC'])],
         [p('Tier 2 (Medical/Veterans/Legal)', st['TC']), p('25-30', st['TC']), p('DA 50-70', st['TC']), p('2-3 weeks', st['TC'])],
         [p('Tier 3 (Unions/Industry)', st['TC']), p('30-40', st['TC']), p('DA 30-50', st['TC']), p('3-4 weeks', st['TC'])],
         [p('Tier 4 (Content Syndication)', st['TC']), p('Ongoing', st['TC']), p('DA 50-95', st['TC']), p('Continuous', st['TC'])],
         [p('TOTAL', st['TC']), p('70-90+', st['TC']), p('Mixed', st['TC']), p('90 days', st['TC'])]]
    story.append(Table(t, colWidths=[1.8*inch, 0.8*inch, 0.8*inch, 1.0*inch]))
    story[-1].setStyle(ts())

    story.append(Spacer(1, 0.2*inch))
    story.append(p("—", st['B']))
    story.append(p("Prepared by: LEXGRO (LexxlyRank)", st['B']))
    story.append(p("Client: MesoWatch.org", st['B']))
    story.append(p("Report Date: January 29, 2026", st['B']))
    story.append(p("Data Location: mesowatch.org/data/", st['B']))
    story.append(p("Next audit scheduled: February 2026", st['SM']))

    doc.build(story)
    print(f"PDF: {out}")

if __name__ == "__main__":
    build()
