import { useState } from 'react'
import '../App.css'
import SEO from '../components/SEO'
import { getOrganizationStructuredData } from '../utils/structuredData'

// Constants for debouncing and rate limiting
const DEBOUNCE_DELAY = 30000 // 30 seconds between submissions
const STORAGE_KEY = 'contact_form_last_submit'
const MAX_LENGTHS = {
  name: 100,
  email: 255,
  phone: 20,
  businessName: 100,
  message: 2000,
}

function Contact() {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL
  
  const structuredData = getOrganizationStructuredData()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    // Enforce max length limits
    const maxLength = MAX_LENGTHS[name]
    const trimmedValue = maxLength ? value.slice(0, maxLength) : value
    
    setFormData((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'שדה חובה'
    } else if (formData.name.length > MAX_LENGTHS.name) {
      newErrors.name = `השם לא יכול להיות ארוך מ-${MAX_LENGTHS.name} תווים`
    }

    if (!formData.email.trim()) {
      newErrors.email = 'שדה חובה'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה'
    } else if (formData.email.length > MAX_LENGTHS.email) {
      newErrors.email = `כתובת האימייל לא יכולה להיות ארוכה מ-${MAX_LENGTHS.email} תווים`
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'שדה חובה'
    } else if (formData.phone.length > MAX_LENGTHS.phone) {
      newErrors.phone = `מספר הטלפון לא יכול להיות ארוך מ-${MAX_LENGTHS.phone} תווים`
    }

    if (formData.businessName.length > MAX_LENGTHS.businessName) {
      newErrors.businessName = `שם העסק לא יכול להיות ארוך מ-${MAX_LENGTHS.businessName} תווים`
    }

    if (formData.message.length > MAX_LENGTHS.message) {
      newErrors.message = `ההודעה לא יכולה להיות ארוכה מ-${MAX_LENGTHS.message} תווים`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Check if user can submit (debouncing with local storage)
  const canSubmit = () => {
    if (typeof window === 'undefined') return true
    
    const lastSubmit = localStorage.getItem(STORAGE_KEY)
    if (!lastSubmit) return true
    
    const lastSubmitTime = parseInt(lastSubmit, 10)
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime
    
    return timeSinceLastSubmit >= DEBOUNCE_DELAY
  }

  // Get remaining time until next submission is allowed
  const getRemainingTime = () => {
    if (typeof window === 'undefined') return 0
    
    const lastSubmit = localStorage.getItem(STORAGE_KEY)
    if (!lastSubmit) return 0
    
    const lastSubmitTime = parseInt(lastSubmit, 10)
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime
    const remaining = DEBOUNCE_DELAY - timeSinceLastSubmit
    
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0
  }

  const announceToScreenReader = (message) => {
    const liveRegion = document.getElementById('aria-live-region')
    if (liveRegion) {
      liveRegion.textContent = message
      setTimeout(() => {
        liveRegion.textContent = ''
      }, 1000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    
    // Check debouncing with local storage
    if (!canSubmit()) {
      const remainingSeconds = getRemainingTime()
      const errorMessage = `אנא המתן ${remainingSeconds} שניות לפני שליחה נוספת`
      setSubmitError(errorMessage)
      announceToScreenReader(errorMessage)
      return
    }
    
    if (!webhookUrl) {
      const errorMessage = 'שגיאת תצורה: כתובת ה-webhook לא הוגדרה'
      setSubmitError(errorMessage)
      console.error('VITE_WEBHOOK_URL is not defined')
      return
    }
    
    if (validateForm()) {
      setIsSubmitting(true)
      announceToScreenReader('שולח את הטופס...')
      
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Lead: formData.name.trim(),
            Status: 'New lead',
            Company: formData.businessName.trim() || '-',
            Email: formData.email.trim(),
            phone: formData.phone.trim(),
            'Last interaction': new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Jerusalem' }),
            'Deal Value': '-',
            Message: formData.message.trim(),
          }),
        })
        
        if (response.ok) {
          // Store submission time in local storage for debouncing
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, Date.now().toString())
          }
          setIsSubmitted(true)
          announceToScreenReader('הטופס נשלח בהצלחה!')
        } else {
          throw new Error('שגיאה בשליחת הטופס')
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        const errorMessage = 'אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.'
        setSubmitError(errorMessage)
        announceToScreenReader(errorMessage)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      announceToScreenReader('יש שגיאות בטופס. אנא תקן את השגיאות ונסה שוב.')
    }
  }

  if (isSubmitted) {
    return (
      <>
        <SEO
          title="תודה שיצרת קשר | אוטומציה ויצירת אתרים"
          description="תודה שיצרת קשר איתנו. נחזור אליך בהקדם האפשרי."
          canonical={`${siteUrl}/contact`}
        />
        <main id="main-content">
          <section className="section contact">
            <div className="contact-card success-message">
              <h2>תודה שיצרת קשר איתנו</h2>
              <p className="success-text">
                נחזור אליך בהקדם האפשרי
              </p>
            </div>
          </section>
        </main>
      </>
    )
  }

  return (
    <>
      <SEO
        title="צור קשר | אוטומציה ויצירת אתרים"
        description="צור קשר איתנו לקבלת הצעה מותאמת אישית. נשמח לעזור לך עם פיתוח אתרים, מערכות CRM ואוטומציה עסקית. מלא את הטופס ונחזור אליך בהקדם."
        keywords="צור קשר, יצירת קשר, פנייה, הצעת מחיר, ייעוץ, פיתוח אתרים, אוטומציה"
        canonical={`${siteUrl}/contact`}
        ogImage={`${siteUrl}/favicon.png`}
        structuredData={structuredData}
      />
      <main id="main-content">
      <section className="section contact" aria-labelledby="contact-title">
        <div className="contact-card">
          <h2 id="contact-title">צור קשר</h2>
          <p>
            מלא את הטופס ונחזור אליך בהקדם. נשמח לעזור לך עם כל שאלה 
            או פרויקט שאתה מעוניין בהם.
          </p>
          <form onSubmit={handleSubmit} className="contact-form" noValidate aria-label="טופס יצירת קשר">
            <div className="form-group">
              <label htmlFor="name">
                שם <span aria-label="שדה חובה">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="הזן את שמך"
                maxLength={MAX_LENGTHS.name}
                className={errors.name ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" className="error-message" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                אימייל <span aria-label="שדה חובה">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="הזן את כתובת האימייל שלך"
                maxLength={MAX_LENGTHS.email}
                className={errors.email ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && (
                <span id="email-error" className="error-message" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                טלפון <span aria-label="שדה חובה">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="הזן את מספר הטלפון שלך"
                maxLength={MAX_LENGTHS.phone}
                className={errors.phone ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                autoComplete="tel"
              />
              {errors.phone && (
                <span id="phone-error" className="error-message" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="businessName">שם עסק</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="הזן את שם העסק"
                maxLength={MAX_LENGTHS.businessName}
                autoComplete="organization"
                aria-invalid={errors.businessName ? 'true' : 'false'}
                aria-describedby={errors.businessName ? 'businessName-error' : undefined}
              />
              {errors.businessName && (
                <span id="businessName-error" className="error-message" role="alert">
                  {errors.businessName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">הודעה</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="כתוב את הודעתך כאן"
                rows="6"
                maxLength={MAX_LENGTHS.message}
                className={errors.message ? 'error' : ''}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <span id="message-error" className="error-message" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            {submitError && (
              <div 
                className="error-message" 
                style={{ marginBottom: '1rem', textAlign: 'center' }}
                role="alert"
                aria-live="assertive"
              >
                {submitError}
              </div>
            )}

            <button 
              type="submit" 
              className="button primary" 
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'שולח...' : 'שלח הודעה'}
            </button>
          </form>
        </div>
      </section>
    </main>
    </>
  )
}

export default Contact

