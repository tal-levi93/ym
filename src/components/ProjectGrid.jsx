import { useState, useRef } from 'react'
import '../App.css'
import { getFeaturedProjects } from '../data/projects'
import VideoModal from './VideoModal'
import { captureVideoFrame } from '../utils/videoUtils'

function ProjectGrid() {
  const [hoveredVideo, setHoveredVideo] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(null)
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const videoRefs = useRef({})
  const posterDataUrls = useRef({})

  // Get featured projects (those with videos or marked as featured)
  const projects = getFeaturedProjects()
  
  // Debug: Log projects to console
  if (typeof window !== 'undefined' && projects.length === 0) {
    console.warn('No featured projects found')
  }

  // Check if device is mobile/responsive
  const isMobile = () => {
    return typeof window !== 'undefined' && window.innerWidth <= 900
  }

  const handleMouseEnter = async (id) => {
    // Only auto-play on hover for desktop (non-mobile)
    if (!isMobile()) {
      setHoveredVideo(id)
      // Play video if it exists
      const video = videoRefs.current[id]
      if (video) {
        // Ensure video is muted for autoplay policy compliance
        video.muted = true
        // Ensure video has enough data loaded
        if (video.readyState < 2) {
          video.load()
        }
        // Attempt to play and handle promise rejection
        try {
          await video.play()
        } catch (error) {
          // Autoplay was prevented, but video should still be visible
          console.debug('Video autoplay prevented:', error)
        }
      }
    }
  }

  const handleMouseLeave = (id) => {
    // Only auto-pause on hover for desktop (non-mobile)
    if (!isMobile()) {
      setHoveredVideo(null)
      // Stop and reset video if it exists
      if (videoRefs.current[id] && playingVideoId !== id) {
        videoRefs.current[id].pause()
        videoRefs.current[id].currentTime = 0
      }
    }
  }

  const handleVideoClick = (videoUrl, projectTitle, projectId) => {
    if (videoUrl) {
      // On mobile, play inline instead of opening modal
      if (isMobile()) {
        const videoElement = videoRefs.current[projectId]
        if (videoElement) {
          // If video is paused (showing poster), play it immediately
          if (videoElement.paused) {
            // Pause any currently playing video
            if (playingVideoId && videoRefs.current[playingVideoId]) {
              videoRefs.current[playingVideoId].pause()
              setPlayingVideoId(null)
            }
            // Play the clicked video
            videoElement.muted = false // Unmute for user-initiated playback
            videoElement.play().then(() => {
              setPlayingVideoId(projectId)
            }).catch(() => {
              // If play fails, still show controls
              setPlayingVideoId(projectId)
            })
          }
          // If video is already playing and has controls, let overlay handle it
        }
      } else {
        // On desktop, open modal
        setSelectedVideo(videoUrl)
        setSelectedProjectTitle(projectTitle)
      }
    }
  }

  const handleVideoKeyDown = (e, videoUrl, projectTitle, projectId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleVideoClick(videoUrl, projectTitle, projectId)
    }
  }

  const handleCloseModal = () => {
    setSelectedVideo(null)
    setSelectedProjectTitle(null)
  }

  return (
    <>
      <div className="project-grid" role="list" aria-label="רשימת פרויקטים נבחרים">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`project-card ${hoveredVideo === project.id ? 'hovered' : ''}`}
            onMouseEnter={() => handleMouseEnter(project.id)}
            onMouseLeave={() => handleMouseLeave(project.id)}
            role="listitem"
          >
            <div 
              className={`project-video-placeholder ${project.videoUrl ? 'has-video' : ''} ${playingVideoId === project.id ? 'playing' : ''}`}
              onClick={() => {
                if (project.videoUrl) {
                  if (isMobile()) {
                    // On mobile, always handle click to play video
                    handleVideoClick(project.videoUrl, project.title, project.id)
                  } else {
                    // On desktop, open modal
                    handleVideoClick(project.videoUrl, project.title, project.id)
                  }
                }
              }}
              onKeyDown={(e) => handleVideoKeyDown(e, project.videoUrl, project.title, project.id)}
              style={{ cursor: project.videoUrl ? 'pointer' : 'default' }}
              role={project.videoUrl ? 'button' : undefined}
              tabIndex={project.videoUrl ? 0 : -1}
              aria-label={project.videoUrl ? (isMobile() ? `נגן וידאו של ${project.title}` : `פתח וידאו של ${project.title}`) : undefined}
              aria-describedby={`project-${project.id}-description`}
            >
              {project.videoUrl ? (
                <>
                  <video
                    ref={(el) => {
                      videoRefs.current[project.id] = el
                      // Ensure video is ready when mounted
                      if (el && !isMobile()) {
                        el.muted = true
                        // Preload video data for smoother playback
                        if (el.readyState === 0) {
                          el.load()
                        }
                      }
                      // Set cached poster if available
                      if (el && posterDataUrls.current[project.id]) {
                        el.poster = posterDataUrls.current[project.id]
                      }
                    }}
                    src={project.videoUrl}
                    poster={project.posterUrl || posterDataUrls.current[project.id] || undefined}
                    muted={!isMobile() || playingVideoId !== project.id}
                    loop={!isMobile() || playingVideoId !== project.id}
                    playsInline
                    preload="auto"
                    controls={isMobile() && playingVideoId === project.id}
                    className="project-video"
                    aria-hidden={!isMobile() || playingVideoId !== project.id}
                    aria-label={isMobile() && playingVideoId === project.id ? `וידאו של ${project.title}` : undefined}
                    onLoadedData={async (e) => {
                      const video = e.target
                      
                      // Only capture programmatically if no manual poster is provided
                      if (!project.posterUrl) {
                        // Capture first frame if not already captured and video is paused
                        if (video && video.paused && video.videoWidth > 0 && video.videoHeight > 0 && !posterDataUrls.current[project.id]) {
                          // Use setTimeout to avoid blocking video loading
                          setTimeout(async () => {
                            try {
                              const dataUrl = await captureVideoFrame(video)
                              if (dataUrl && video.paused) {
                                posterDataUrls.current[project.id] = dataUrl
                                video.poster = dataUrl
                              }
                            } catch (error) {
                              console.warn('Failed to capture poster:', error)
                            }
                          }, 500)
                        }
                      }
                      
                      // Ensure video is ready to play (for desktop hover)
                      if (!isMobile() && hoveredVideo === project.id && video.paused) {
                        video.play().catch(() => {
                          // Silently handle autoplay prevention
                        })
                      }
                    }}
                    onEnded={() => {
                      if (isMobile() && playingVideoId === project.id) {
                        const video = videoRefs.current[project.id]
                        if (video) {
                          // Restore poster when video ends
                          video.poster = project.posterUrl || posterDataUrls.current[project.id] || ''
                        }
                        setPlayingVideoId(null)
                      }
                    }}
                    onPause={() => {
                      // Restore poster when video is paused (for better UX)
                      const video = videoRefs.current[project.id]
                      if (video && isMobile() && playingVideoId !== project.id) {
                        video.poster = project.posterUrl || posterDataUrls.current[project.id] || ''
                      }
                    }}
                    onClick={(e) => {
                      // On mobile, if video is paused (showing poster), play it
                      if (isMobile()) {
                        const video = e.target
                        if (video.paused) {
                          e.stopPropagation()
                          handleVideoClick(project.videoUrl, project.title, project.id)
                        } else {
                          // If playing, prevent default to let overlay handle it
                          e.preventDefault()
                          e.stopPropagation()
                        }
                      }
                    }}
                    onPlay={() => {
                      // Hide poster when video starts playing
                      const video = videoRefs.current[project.id]
                      if (video && isMobile()) {
                        video.poster = '' // Remove poster when playing
                      }
                    }}
                    onWaiting={() => {
                      // Show poster again if video is buffering (optional - for better UX)
                      const video = videoRefs.current[project.id]
                      if (video && isMobile() && video.paused) {
                        video.poster = project.posterUrl || posterDataUrls.current[project.id] || ''
                      }
                    }}
                  />
                  {/* Overlay to capture clicks on video area (top 80%) - toggle play/pause */}
                  {isMobile() && playingVideoId === project.id && (
                    <div
                      className="video-click-overlay"
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        const videoElement = videoRefs.current[project.id]
                        if (videoElement) {
                          if (videoElement.paused) {
                            // If paused, play it
                            videoElement.play()
                          } else {
                            // If playing, pause it (keep controls visible)
                            videoElement.pause()
                          }
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: '20%', // Leave bottom 20% for controls
                        zIndex: 1,
                        cursor: 'pointer',
                        pointerEvents: 'auto'
                      }}
                      aria-label={videoRefs.current[project.id]?.paused ? "נגן וידאו" : "השהה וידאו"}
                    />
                  )}
                </>
              ) : (
                <div className="video-placeholder-content">
                  <div className="video-placeholder-icon" aria-hidden="true">▶</div>
                  <p>וידאו פרויקט</p>
                </div>
              )}
            </div>
            <div className="project-info" id={`project-${project.id}-description`}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
      {/* Only show modal on desktop (non-mobile) */}
      {!isMobile() && (
        <VideoModal
          videoUrl={selectedVideo}
          isOpen={!!selectedVideo}
          onClose={handleCloseModal}
          projectTitle={selectedProjectTitle}
        />
      )}
    </>
  )
}

export default ProjectGrid

