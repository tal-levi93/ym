import { useEffect } from 'react'

/**
 * SEO Component for managing page-specific meta tags and structured data
 * @param {Object} props - SEO configuration object
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords (comma-separated)
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type (website, article, etc.)
 * @param {string} props.twitterCard - Twitter card type
 * @param {Object} props.structuredData - JSON-LD structured data object
 */
function SEO({
  title = 'אוטומציה ויצירת אתרים | שירותים מקצועיים',
  description = 'פתרונות אוטומציה ויצירת אתרים מקצועיים. אנו מספקים שירותי פיתוח אתרים, אוטומציה עסקית ותכנון דיגיטלי מתקדם.',
  keywords = 'אוטומציה עסקית, פיתוח אתרים, יצירת אתרים, מערכות CRM, אוטומציה, פיתוח תוכנה, אתרים מותאמים אישית, פתרונות דיגיטליים',
  canonical = '',
  ogImage = '/favicon.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData = null,
}) {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const fullCanonical = canonical || (typeof window !== 'undefined' ? window.location.href : '')
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Update or create property tags (for Open Graph)
    const updatePropertyTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute('property', property)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', 'טל לוי - מהנדס תוכנה')
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('language', 'Hebrew')
    updateMetaTag('revisit-after', '7 days')

    // Open Graph tags
    updatePropertyTag('og:title', title)
    updatePropertyTag('og:description', description)
    updatePropertyTag('og:image', fullOgImage)
    updatePropertyTag('og:type', ogType)
    updatePropertyTag('og:url', fullCanonical)
    updatePropertyTag('og:locale', 'he_IL')
    updatePropertyTag('og:site_name', 'אוטומציה ויצירת אתרים')

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard, 'name')
    updateMetaTag('twitter:title', title, 'name')
    updateMetaTag('twitter:description', description, 'name')
    updateMetaTag('twitter:image', fullOgImage, 'name')

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', fullCanonical)

    // Structured Data (JSON-LD)
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach(script => script.remove())
    
    // Add new structured data (support both single object and array)
    if (structuredData) {
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData]
      dataArray.forEach((data, index) => {
        const script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        script.textContent = JSON.stringify(data)
        document.head.appendChild(script)
      })
    }
  }, [title, description, keywords, canonical, ogImage, ogType, twitterCard, structuredData, fullCanonical, fullOgImage, siteUrl])

  return null
}

export default SEO

