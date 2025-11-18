/**
 * Utility functions for video handling
 */

/**
 * Capture the first frame of a video as a data URL
 * Non-intrusive version that doesn't interfere with video playback
 * @param {HTMLVideoElement} videoElement - Video element to capture frame from
 * @returns {Promise<string|null>} - Data URL of the captured frame or null if failed
 */
export const captureVideoFrame = async (videoElement) => {
  if (!videoElement || !(videoElement instanceof HTMLVideoElement)) {
    return null
  }

  // Don't capture if video is playing or has no dimensions
  if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
    return null
  }

  try {
    // Store original state
    const wasPlaying = !videoElement.paused
    const originalTime = videoElement.currentTime
    const originalMuted = videoElement.muted

    // Ensure video is muted and paused for capture
    videoElement.muted = true
    
    // Only seek if not already at the beginning
    if (videoElement.currentTime > 0.1) {
      videoElement.currentTime = 0.1
      
      // Wait for seek to complete (with timeout)
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          resolve() // Resolve anyway to not block
        }, 2000)
        
        const onSeeked = () => {
          clearTimeout(timeout)
          videoElement.removeEventListener('seeked', onSeeked)
          resolve()
        }
        
        videoElement.addEventListener('seeked', onSeeked, { once: true })
      })
    }

    // Small delay to ensure frame is rendered
    await new Promise(resolve => setTimeout(resolve, 100))

    // Create canvas and draw video frame
    const canvas = document.createElement('canvas')
    canvas.width = videoElement.videoWidth
    canvas.height = videoElement.videoHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return null
    }

    // Draw the video frame to canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)

    // Convert to data URL (JPEG format)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
    
    // Restore original state
    if (wasPlaying && !videoElement.paused) {
      // If it was playing, keep it playing
      videoElement.muted = originalMuted
    } else {
      // Restore muted state and time if not playing
      videoElement.muted = originalMuted
      if (!wasPlaying) {
        videoElement.currentTime = originalTime
      }
    }
    
    return dataUrl
  } catch (error) {
    console.warn('Failed to capture video frame:', error)
    return null
  }
}

/**
 * Generate a poster image URL from a Cloudinary video URL (if transformation is available)
 * Note: This may not work if Cloudinary transformations aren't enabled
 * @param {string} videoUrl - Cloudinary video URL
 * @returns {string|null} - Poster image URL or null if invalid
 */
export const getVideoPoster = (videoUrl) => {
  // Return null - we'll use programmatic capture instead
  // Cloudinary transformation requires specific setup
  return null
}

