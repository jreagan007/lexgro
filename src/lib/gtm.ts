/**
 * Google Tag Manager Utilities
 *
 * GTM Container: GTM-WK56H7KT
 * GA4 Measurement ID: G-2Z5L72S3NL
 * Account ID: 349880028
 *
 * Usage:
 *   import { trackEvent, trackFormSubmit, trackCTAClick } from '@/lib/gtm';
 *   trackEvent('button_click', { button_name: 'Get Started' });
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Push event to dataLayer
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, unknown> = {}
): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
}

/**
 * Track form submissions
 */
export function trackFormSubmit(
  formName: string,
  formData: Record<string, unknown> = {}
): void {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData,
  });
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(
  ctaName: string,
  ctaLocation: string,
  destination?: string
): void {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    cta_destination: destination,
  });
}

/**
 * Track phone number clicks
 */
export function trackPhoneClick(phoneNumber: string, location: string): void {
  trackEvent('phone_click', {
    phone_number: phoneNumber,
    click_location: location,
  });
}

/**
 * Track email clicks
 */
export function trackEmailClick(email: string, location: string): void {
  trackEvent('email_click', {
    email_address: email,
    click_location: location,
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number, pagePath: string): void {
  trackEvent('scroll_depth', {
    scroll_percentage: percentage,
    page_path: pagePath,
  });
}

/**
 * Track video engagement
 */
export function trackVideoEvent(
  action: 'play' | 'pause' | 'complete' | 'progress',
  videoTitle: string,
  videoPercent?: number
): void {
  trackEvent('video_engagement', {
    video_action: action,
    video_title: videoTitle,
    video_percent: videoPercent,
  });
}

/**
 * Track file downloads
 */
export function trackDownload(fileName: string, fileType: string): void {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
}

/**
 * Track outbound link clicks
 */
export function trackOutboundLink(url: string, linkText: string): void {
  trackEvent('outbound_link', {
    link_url: url,
    link_text: linkText,
  });
}

/**
 * Track navigation clicks
 */
export function trackNavClick(navItem: string, navSection: string): void {
  trackEvent('navigation_click', {
    nav_item: navItem,
    nav_section: navSection,
  });
}

/**
 * Track page-specific events
 */
export function trackPageEvent(pageName: string, pageCategory: string): void {
  trackEvent('page_view_custom', {
    page_name: pageName,
    page_category: pageCategory,
  });
}

/**
 * Track calculator usage
 */
export function trackCalculatorEvent(
  action: 'start' | 'complete' | 'input_change',
  calculatorName: string,
  inputValues?: Record<string, unknown>
): void {
  trackEvent('calculator_engagement', {
    calculator_action: action,
    calculator_name: calculatorName,
    calculator_inputs: inputValues,
  });
}

/**
 * Track FAQ interactions
 */
export function trackFAQClick(question: string, expanded: boolean): void {
  trackEvent('faq_interaction', {
    faq_question: question,
    faq_expanded: expanded,
  });
}

/**
 * Track search usage
 */
export function trackSearch(searchTerm: string, resultsCount: number): void {
  trackEvent('site_search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

/**
 * Initialize dataLayer with page data
 */
export function initDataLayer(pageData: {
  pageType?: string;
  pageTitle?: string;
  pagePath?: string;
  pageCategory?: string;
}): void {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_data',
      ...pageData,
    });
  }
}
