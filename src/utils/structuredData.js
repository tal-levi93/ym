/**
 * Structured Data (JSON-LD) helpers for SEO
 */

const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.ymtech.dev'

/**
 * Generate LocalBusiness structured data
 */
export const getLocalBusinessStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    name: 'אוטומציה ויצירת אתרים',
    description: 'פתרונות אוטומציה ויצירת אתרים מקצועיים. אנו מספקים שירותי פיתוח אתרים, אוטומציה עסקית ותכנון דיגיטלי מתקדם.',
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    image: `${siteUrl}/favicon.png`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IL',
      addressLocality: 'ישראל',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Hebrew'],
    },
    sameAs: [
      // Add your social media profiles here when available
      // 'https://www.facebook.com/yourpage',
      // 'https://www.linkedin.com/company/yourcompany',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Israel',
    },
    priceRange: '$$',
  }
}

/**
 * Generate Organization structured data
 */
export const getOrganizationStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'אוטומציה ויצירת אתרים',
    description: 'פתרונות אוטומציה ויצירת אתרים מקצועיים. אנו מספקים שירותי פיתוח אתרים, אוטומציה עסקית ותכנון דיגיטלי מתקדם.',
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    founder: {
      '@type': 'Person',
      name: 'טל לוי',
      jobTitle: 'מהנדס תוכנה',
      description: 'מהנדס תוכנה בן 32 עם 7 שנות ניסיון ומומחיות בתחום האפליקציות ווב.',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Hebrew'],
    },
    sameAs: [],
  }
}

/**
 * Generate WebSite structured data
 */
export const getWebSiteStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'אוטומציה ויצירת אתרים',
    description: 'פתרונות אוטומציה ויצירת אתרים מקצועיים',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'he-IL',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate Service structured data
 */
export const getServiceStructuredData = (serviceName, serviceDescription) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Israel',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${siteUrl}/contact`,
    },
  }
}

/**
 * Generate FAQPage structured data
 */
export const getFAQStructuredData = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate BreadcrumbList structured data
 */
export const getBreadcrumbStructuredData = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate Person structured data for Tal Levi
 */
export const getPersonStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'טל לוי',
    jobTitle: 'מהנדס תוכנה',
    description: 'מהנדס תוכנה בן 32 עם 7 שנות ניסיון ומומחיות בתחום האפליקציות ווב. מתמחה בפיתוח פתרונות דיגיטליים מתקדמים, יצירת אתרים מודרניים ומערכות אוטומציה חכמות.',
    knowsAbout: [
      'Web Development',
      'Business Automation',
      'CRM Systems',
      'Software Engineering',
      'Digital Solutions',
    ],
    url: siteUrl,
  }
}

