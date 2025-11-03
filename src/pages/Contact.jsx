import { useState } from 'react'
import '../App.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

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

    if (!formData.message.trim()) {
      newErrors.message = 'שדה חובה'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Here you would typically send the form data to a backend
      // For now, we'll just show the success message
      setIsSubmitted(true)
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
              <label htmlFor="message">הודעה *</label>
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

            <button type="submit" className="button primary">
              שלח הודעה
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Contact

