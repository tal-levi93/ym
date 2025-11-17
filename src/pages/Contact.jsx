import { useState } from 'react'
import '../App.css'
import SEO from '../components/SEO'
import { getOrganizationStructuredData } from '../utils/structuredData'

function Contact() {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    }

    if (!formData.email.trim()) {
      newErrors.email = 'שדה חובה'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'שדה חובה'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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
    
    if (validateForm()) {
      setIsSubmitting(true)
      announceToScreenReader('שולח את הטופס...')
      
      try {
        const response = await fetch('https://hook.eu1.make.com/js7mnmelija472itsjkyxor78ykxbubm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Lead: formData.name,
            Status: 'New lead',
            Company: formData.businessName || '-',
            Email: formData.email,
            phone: formData.phone,
            'Last interaction': new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Jerusalem' }),
            'Deal Value': '-',
            Message: formData.message,
          }),
        })
        
        if (response.ok) {
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
                autoComplete="organization"
              />
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

