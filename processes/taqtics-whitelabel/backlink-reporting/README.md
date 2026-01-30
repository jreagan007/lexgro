# LEXGRO Backlink Reporting Process

White-label backlink analysis and link building reports for Taqtics clients.

## Process Overview

1. **Run Backlink Audit** (DataForSEO or Ahrefs)
   - Pull referring domains, broken links, competitor backlinks
   - Export to JSON/CSV

2. **Run Link Gap Analysis**
   - Compare client vs competitors
   - Identify sites linking to competitors but not client
   - Categorize by vertical (veterans, unions, academic, medical, etc.)

3. **Audit Profile Links**
   - Check existing social/directory profiles
   - Map missing opportunities by DA tier

4. **Generate Report**
   - Copy `backlink_report_template.py`
   - Update CLIENT_CONFIG and data sections
   - Run script to generate PDF

## File Structure

```
backlink-reporting/
├── README.md                    # This file
├── backlink_report_template.py  # Base template (copy for each client)
└── examples/
    └── mesowatch_report.py      # Working example (MesoWatch.org)
```

## Client Data Requirements

Before running report, gather:

- [ ] Referring domains count
- [ ] Competitor backlink data (5-6 competitors)
- [ ] Link gap domains (categorized by vertical)
- [ ] Resource page opportunities
- [ ] Profile link audit (existing + missing)
- [ ] Content gap analysis
- [ ] Brand positioning/differentiators

## Output

10-page PDF including:
1. Executive Summary
2. Competitive Landscape + Content Gap
3. Link Gap - Veterans, Labor, Medical
4. Link Gap - Academic
5. Resource Pages
6. Profile Links - Existing + Tier 1-2
7. Profile Links - Tier 3-4
8. Outreach Strategy + Templates
9. 90-Day Action Plan
10. Success Metrics

## Dependencies

```bash
pip install reportlab --break-system-packages
```

## Branding

Update `CLIENT_CONFIG['brand_color']` to match client's primary brand color.
Default LEXGRO green: `#298C42`

---
Part of LEXGRO/Taqtics white-label processes.
