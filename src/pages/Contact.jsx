import { useState } from 'react'
import '../App.css'

function Contact() {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    
    if (validateForm()) {
      setIsSubmitting(true)
      
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
        } else {
          throw new Error('שגיאה בשליחת הטופס')
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        setSubmitError('אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (isSubmitted) {
    return (
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
    )
  }

  return (
    <main id="main-content">
      <section className="section contact" aria-labelledby="contact-title">
        <div className="contact-card">
          <h2 id="contact-title">צור קשר</h2>
          <p>
            מלא את הטופס ונחזור אליך בהקדם. נשמח לעזור לך עם כל שאלה 
            או פרויקט שאתה מעוניין בהם.
          </p>
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="form-group">
              <label htmlFor="name">שם *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="הזן את שמך"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">אימייל *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="הזן את כתובת האימייל שלך"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">טלפון *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="הזן את מספר הטלפון שלך"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
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
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            {submitError && (
              <div className="error-message" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                {submitError}
              </div>
            )}

            <button type="submit" className="button primary" disabled={isSubmitting}>
              {isSubmitting ? 'שולח...' : 'שלח הודעה'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Contact

