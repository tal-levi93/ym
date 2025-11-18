import { useEffect, useRef } from 'react'
import '../App.css'

function VideoModal({ videoUrl, isOpen, onClose, projectTitle }) {
  const videoRef = useRef(null)
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  const announceToScreenReader = (message) => {
    const liveRegion = document.getElementById('aria-live-region')
    if (liveRegion) {
      liveRegion.textContent = message
      setTimeout(() => {
        liveRegion.textContent = ''
      }, 1000)
    }
  }

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play()
    } else if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement
      
      // Focus the close button when modal opens
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus()
        }
      }, 100)

      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      
      // Trap focus within modal
      const handleTabKey = (e) => {
        if (e.key !== 'Tab') return

        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'
        )
        const firstElement = focusableElements?.[0]
        const lastElement = focusableElements?.[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }

      document.addEventListener('keydown', handleTabKey)

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.removeEventListener('keydown', handleTabKey)
        document.body.style.overflow = 'unset'
        
        // Restore focus to previously focused element
        if (previousFocusRef.current) {
          previousFocusRef.current.focus()
        }
      }
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="video-modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={projectTitle ? "video-modal-title" : undefined}
      aria-describedby="video-modal-description"
    >
      <div className="video-modal-content">
        <button
          ref={closeButtonRef}
          className="video-modal-close"
          onClick={onClose}
          aria-label="סגור מודל וידאו"
          type="button"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">סגור</span>
        </button>
        {projectTitle && (
          <h2 id="video-modal-title" className="video-modal-title">
            {projectTitle}
          </h2>
        )}
        <div id="video-modal-description" className="sr-only">
          נגן וידאו של הפרויקט. השתמש בכפתורי הנגינה כדי לשלוט בוידאו.
        </div>
        <div className="video-modal-video-container">
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            autoPlay
            preload="metadata"
            playsInline
            className="video-modal-video"
            aria-label={`וידאו של הפרויקט: ${projectTitle || 'פרויקט'}`}
            onError={(e) => {
              console.error('Video loading error:', e)
              const errorMessage = 'שגיאה בטעינת הוידאו. אנא נסה לרענן את הדף.'
              announceToScreenReader(errorMessage)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default VideoModal

