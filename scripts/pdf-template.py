#!/usr/bin/env python3
"""
LEXGRO PDF Template
Clean, branded PDF generation with proper safe areas and spacing.
Use this as the base for all branded PDFs.
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, Image, KeepTogether, ListFlowable, ListItem
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.platypus.frames import Frame
from reportlab.platypus.doctemplate import PageTemplate, BaseDocTemplate
from reportlab.pdfgen import canvas
import os

# =============================================================================
# BRAND CONSTANTS
# =============================================================================
BRAND = {
    'green': HexColor('#298C42'),
    'green_dark': HexColor('#1a5c2e'),
    'charcoal': HexColor('#1a1a1a'),
    'text': HexColor('#333333'),
    'muted': HexColor('#666666'),
    'light': HexColor('#f8f9fa'),
    'mint': HexColor('#e8f5eb'),
    'white': HexColor('#FFFFFF'),
}

# Page dimensions (letter = 8.5" x 11")
PAGE_WIDTH = 8.5 * inch
PAGE_HEIGHT = 11 * inch

# Safe margins (0.75" on all sides for print safety)
MARGIN_LEFT = 0.75 * inch
MARGIN_RIGHT = 0.75 * inch
MARGIN_TOP = 0.75 * inch
MARGIN_BOTTOM = 0.6 * inch

# Content width
CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT  # 7 inches

# Logo path
LOGO_PATH = "/sessions/cool-nifty-noether/mnt/Projects/lexgro/src/assets/images/logos/lexgro-wordmark.png"


# =============================================================================
# STYLES
# =============================================================================
def get_styles():
    """Return all paragraph styles for the document."""
    styles = getSampleStyleSheet()

    # Cover page styles
    styles.add(ParagraphStyle(
        name='CoverTitle',
        fontSize=26,
        textColor=BRAND['charcoal'],
        alignment=TA_CENTER,
        fontName='Helvetica-Bold',
        leading=32,
        spaceAfter=12
    ))

    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        fontSize=12,
        textColor=BRAND['muted'],
        alignment=TA_CENTER,
        leading=16,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='CoverTagline',
        fontSize=13,
        textColor=BRAND['green'],
        alignment=TA_CENTER,
        fontName='Helvetica-Bold',
        spaceBefore=20,
        spaceAfter=6
    ))

    # Section headers
    styles.add(ParagraphStyle(
        name='SectionTitle',
        fontSize=16,
        textColor=BRAND['charcoal'],
        fontName='Helvetica-Bold',
        spaceBefore=0,
        spaceAfter=12,
        leading=20
    ))

    styles.add(ParagraphStyle(
        name='H1',
        fontSize=12,
        textColor=BRAND['charcoal'],
        fontName='Helvetica-Bold',
        spaceBefore=16,
        spaceAfter=8,
        leading=15
    ))

    styles.add(ParagraphStyle(
        name='H2',
        fontSize=10,
        textColor=BRAND['green'],
        fontName='Helvetica-Bold',
        spaceBefore=12,
        spaceAfter=6,
        leading=13
    ))

    # Body text
    styles.add(ParagraphStyle(
        name='Body',
        fontSize=9,
        textColor=BRAND['text'],
        leading=14,
        spaceAfter=8
    ))

    styles.add(ParagraphStyle(
        name='BodySmall',
        fontSize=8,
        textColor=BRAND['text'],
        leading=12,
        spaceAfter=6
    ))

    # List items (no bullet, indented)
    styles.add(ParagraphStyle(
        name='ListItem',
        fontSize=9,
        textColor=BRAND['text'],
        leftIndent=16,
        spaceAfter=4,
        leading=13
    ))

    # Callout box text
    styles.add(ParagraphStyle(
        name='Callout',
        fontSize=9,
        textColor=BRAND['charcoal'],
        fontName='Helvetica-Oblique',
        leftIndent=10,
        rightIndent=10,
        spaceBefore=10,
        spaceAfter=10,
        leading=13
    ))

    # Key point (green bold)
    styles.add(ParagraphStyle(
        name='KeyPoint',
        fontSize=9,
        textColor=BRAND['green'],
        fontName='Helvetica-Bold',
        spaceBefore=8,
        spaceAfter=8,
        leading=13
    ))

    # Table header
    styles.add(ParagraphStyle(
        name='TableHeader',
        fontSize=8,
        textColor=BRAND['white'],
        fontName='Helvetica-Bold',
        leading=11
    ))

    # Table cell
    styles.add(ParagraphStyle(
        name='TableCell',
        fontSize=8,
        textColor=BRAND['text'],
        leading=11
    ))

    # Footer
    styles.add(ParagraphStyle(
        name='Footer',
        fontSize=7,
        textColor=BRAND['muted'],
        alignment=TA_CENTER,
        leading=10
    ))

    # Page number
    styles.add(ParagraphStyle(
        name='PageNum',
        fontSize=8,
        textColor=BRAND['muted'],
        alignment=TA_RIGHT
    ))

    return styles


# =============================================================================
# TABLE STYLE
# =============================================================================
def get_table_style():
    """Return standard table style."""
    return TableStyle([
        # Header row
        ('BACKGROUND', (0, 0), (-1, 0), BRAND['green']),
        ('TEXTCOLOR', (0, 0), (-1, 0), BRAND['white']),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8),

        # All cells
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('FONTSIZE', (0, 1), (-1, -1), 8),

        # Padding
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),

        # Grid
        ('GRID', (0, 0), (-1, -1), 0.5, BRAND['green']),

        # Alternating row colors
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [BRAND['white'], BRAND['light']]),
    ])


# =============================================================================
# HEADER/FOOTER
# =============================================================================
class LexgroDocTemplate(BaseDocTemplate):
    """Custom doc template with header and footer."""

    def __init__(self, filename, **kwargs):
        BaseDocTemplate.__init__(self, filename, **kwargs)

        # Define frame for content (inside margins)
        frame = Frame(
            MARGIN_LEFT,
            MARGIN_BOTTOM + 0.3*inch,  # Extra space for footer
            CONTENT_WIDTH,
            PAGE_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM - 0.3*inch,
            id='normal'
        )

        # Add page template
        template = PageTemplate(id='main', frames=frame, onPage=self._add_page_elements)
        self.addPageTemplates([template])

    def _add_page_elements(self, canvas, doc):
        """Add header line and page number to each page."""
        canvas.saveState()

        # Skip header/footer on page 1 (cover)
        if doc.page > 1:
            # Green line at top
            canvas.setStrokeColor(BRAND['green'])
            canvas.setLineWidth(2)
            canvas.line(MARGIN_LEFT, PAGE_HEIGHT - 0.5*inch, PAGE_WIDTH - MARGIN_RIGHT, PAGE_HEIGHT - 0.5*inch)

            # Page number at bottom right
            canvas.setFont('Helvetica', 8)
            canvas.setFillColor(BRAND['muted'])
            canvas.drawRightString(PAGE_WIDTH - MARGIN_RIGHT, 0.4*inch, f"{doc.page}")

        canvas.restoreState()


# =============================================================================
# HELPER FUNCTIONS
# =============================================================================
def create_logo(width=2.5*inch):
    """Return logo image properly sized."""
    if os.path.exists(LOGO_PATH):
        # Logo aspect ratio is roughly 5:1
        height = width / 5
        img = Image(LOGO_PATH, width=width, height=height)
        img.hAlign = 'CENTER'
        return img
    return None

def create_table(data, col_widths, styles):
    """Create a properly formatted table."""
    # Convert data to paragraphs
    table_data = []
    for i, row in enumerate(data):
        table_row = []
        for cell in row:
            if i == 0:
                table_row.append(Paragraph(str(cell), styles['TableHeader']))
            else:
                table_row.append(Paragraph(str(cell), styles['TableCell']))
        table_data.append(table_row)

    # Create table with explicit widths
    table = Table(table_data, colWidths=col_widths)
    table.setStyle(get_table_style())
    return table

def create_callout_box(text, styles):
    """Create a mint-background callout box."""
    data = [[Paragraph(text, styles['Callout'])]]
    table = Table(data, colWidths=[CONTENT_WIDTH - 0.2*inch])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BRAND['mint']),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    return table

def sp(height=0.15):
    """Return a spacer of given height in inches."""
    return Spacer(1, height * inch)


# =============================================================================
# EXAMPLE USAGE
# =============================================================================
def build_example_pdf():
    """Build an example PDF to test the template."""
    output = "/sessions/cool-nifty-noether/mnt/Projects/lexgro/docs/PDF-Template-Test.pdf"

    doc = LexgroDocTemplate(
        output,
        pagesize=letter,
        rightMargin=MARGIN_RIGHT,
        leftMargin=MARGIN_LEFT,
        topMargin=MARGIN_TOP,
        bottomMargin=MARGIN_BOTTOM
    )

    styles = get_styles()
    story = []

    # -------------------------------------------------------------------------
    # COVER PAGE
    # -------------------------------------------------------------------------
    story.append(sp(1.5))

    logo = create_logo(2.5*inch)
    if logo:
        story.append(logo)

    story.append(sp(0.5))
    story.append(Paragraph("Document Title Here", styles['CoverTitle']))
    story.append(Paragraph("Subtitle or description goes here", styles['CoverSubtitle']))
    story.append(Paragraph("Stop Guessing. Start Leading.", styles['CoverTagline']))

    story.append(sp(2.5))
    story.append(Paragraph("Technology by Taqtics", styles['Footer']))
    story.append(Paragraph("February 2026  •  Internal Use Only", styles['Footer']))
    story.append(PageBreak())

    # -------------------------------------------------------------------------
    # CONTENT PAGE
    # -------------------------------------------------------------------------
    story.append(Paragraph("Section Title", styles['SectionTitle']))
    story.append(Paragraph(
        "This is body text. It should be readable and well-spaced. "
        "The template uses 0.75 inch margins on all sides to ensure "
        "content stays within safe printing areas.",
        styles['Body']
    ))

    story.append(Paragraph("Subsection Heading", styles['H1']))
    story.append(Paragraph(
        "More body text here. Tables should have consistent styling "
        "with green headers and alternating row colors.",
        styles['Body']
    ))

    # Example table
    table_data = [
        ["Column A", "Column B", "Column C"],
        ["Row 1 data", "More data", "Even more data"],
        ["Row 2 data", "Additional info", "Details here"],
        ["Row 3 data", "Something else", "Final column"],
    ]
    table = create_table(table_data, [1.5*inch, 2.5*inch, 2.5*inch], styles)
    story.append(table)

    story.append(sp(0.2))
    story.append(Paragraph("Key Takeaway", styles['H2']))
    story.append(Paragraph(
        "This is a key point that should stand out from regular body text.",
        styles['KeyPoint']
    ))

    # Callout box
    story.append(sp(0.1))
    story.append(create_callout_box(
        "This is a callout box with a mint background. Use it for important "
        "quotes, warnings, or highlighted information.",
        styles
    ))

    story.append(sp(0.2))
    story.append(Paragraph("List Items", styles['H2']))
    story.append(Paragraph("• First list item with some explanation text", styles['ListItem']))
    story.append(Paragraph("• Second list item goes here", styles['ListItem']))
    story.append(Paragraph("• Third list item with more detail", styles['ListItem']))

    # -------------------------------------------------------------------------
    # BUILD
    # -------------------------------------------------------------------------
    doc.build(story)
    print(f"PDF created: {output}")


if __name__ == "__main__":
    build_example_pdf()
