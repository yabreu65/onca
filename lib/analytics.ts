export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
  }
}

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_ID) {
    window.gtag('config', GA_ID, { page_path: url });
  }
};

export const event = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, { event_category: category, event_label: label, value });
  }
};

export const fbPageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

export const fbEvent = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

export const trackEvents = {
  ctaClick: (label: string) => { event('click', 'CTA', label); fbEvent('Lead', { content_name: label }); },
  whatsappClick: () => { event('click', 'Contact', 'WhatsApp'); fbEvent('Contact', { content_name: 'WhatsApp' }); },
  formSubmit: (formName: string) => { event('submit', 'Form', formName); fbEvent('Lead', { content_name: formName }); },
  serviceView: (serviceName: string) => { event('view', 'Service', serviceName); fbEvent('ViewContent', { content_name: serviceName }); },
  videoPlay: (videoName: string) => { event('play', 'Video', videoName); },
  languageChange: (locale: string) => { event('change', 'Language', locale); },
};
