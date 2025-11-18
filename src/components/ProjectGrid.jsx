import { useState, useRef } from 'react'
import '../App.css'
import { getFeaturedProjects } from '../data/projects'
import VideoModal from './VideoModal'

function ProjectGrid() {
  const [hoveredVideo, setHoveredVideo] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(null)
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const videoRefs = useRef({})

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
        // If video already has controls, let the overlay handle clicks
        if (playingVideoId === projectId) {
          return
        }
        const videoElement = videoRefs.current[projectId]
        if (videoElement) {
          // Pause any currently playing video
          if (playingVideoId && videoRefs.current[playingVideoId]) {
            videoRefs.current[playingVideoId].pause()
            setPlayingVideoId(null)
          }
          // Play the clicked video
          videoElement.muted = false // Unmute for user-initiated playback
          videoElement.play()
          setPlayingVideoId(projectId)
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
                // Only handle click if video is not playing (to start playback)
                if (!isMobile() || playingVideoId !== project.id) {
                  handleVideoClick(project.videoUrl, project.title, project.id)
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
                    }}
                    src={project.videoUrl}
                    muted={!isMobile() || playingVideoId !== project.id}
                    loop={!isMobile() || playingVideoId !== project.id}
                    playsInline
                    preload="auto"
                    controls={isMobile() && playingVideoId === project.id}
                    className="project-video"
                    aria-hidden={!isMobile() || playingVideoId !== project.id}
                    aria-label={isMobile() && playingVideoId === project.id ? `וידאו של ${project.title}` : undefined}
                    onLoadedData={(e) => {
                      // Ensure video is ready to play
                      const video = e.target
                      if (!isMobile() && hoveredVideo === project.id && video.paused) {
                        video.play().catch(() => {
                          // Silently handle autoplay prevention
                        })
                      }
                    }}
                    onEnded={() => {
                      if (isMobile() && playingVideoId === project.id) {
                        setPlayingVideoId(null)
                      }
                    }}
                    onClick={(e) => {
                      // Prevent default video click behavior when controls are shown
                      if (isMobile() && playingVideoId === project.id) {
                        e.preventDefault()
                        e.stopPropagation()
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

