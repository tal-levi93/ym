import { useState, useRef } from 'react'
import '../App.css'
import SEO from '../components/SEO'
import { getOrganizationStructuredData } from '../utils/structuredData'
import { projectsData } from '../data/projects'
import VideoModal from '../components/VideoModal'
import { captureVideoFrame } from '../utils/videoUtils'

function Projects() {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const structuredData = getOrganizationStructuredData()
  
  const allProjects = projectsData
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(null)
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const videoRefs = useRef({})
  const posterDataUrls = useRef({})

  // Check if device is mobile/responsive
  const isMobile = () => {
    return typeof window !== 'undefined' && window.innerWidth <= 900
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

  const handleCloseModal = () => {
    setSelectedVideo(null)
    setSelectedProjectTitle(null)
  }

  return (
    <>
      <SEO
        title="כל הפרויקטים שלנו | אוטומציה ויצירת אתרים"
        description="אוסף הפרויקטים שלנו בתחומי האוטומציה ופיתוח אתרים. אתרים מותאמים אישית, מערכות CRM, אוטומציה עסקית ופתרונות דיגיטליים מתקדמים."
        keywords="פרויקטים, תיק עבודות, דוגמאות פרויקטים, אתרים, CRM, אוטומציה, פיתוח תוכנה, תיק פרויקטים"
        canonical={`${siteUrl}/projects`}
        ogImage={`${siteUrl}/favicon.png`}
        structuredData={structuredData}
      />
      <main id="main-content">
      <section className="section projects-page" aria-labelledby="projects-page-title">
        <div className="section-header">
          <h1 id="projects-page-title">כל הפרויקטים שלנו</h1>
          <p>
            הנה אוסף הפרויקטים שלנו בתחומי האוטומציה ופיתוח אתרים. 
            כל פרויקט מותאם במיוחד לצרכי הלקוח.
          </p>
        </div>
        <div className="projects-grid" role="list" aria-label="רשימת כל הפרויקטים">
          {allProjects.map((project) => (
            <article key={project.id} className="project-card-full" role="listitem">
              <div 
                className={`project-image-placeholder ${project.videoUrl ? 'has-video' : ''} ${playingVideoId === project.id ? 'playing' : ''}`}
                onClick={() => {
                  // Only handle click if video is not playing (to start playback)
                  if (!isMobile() || playingVideoId !== project.id) {
                    handleVideoClick(project.videoUrl, project.title, project.id)
                  }
                }}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && project.videoUrl) {
                    e.preventDefault()
                    handleVideoClick(project.videoUrl, project.title, project.id)
                  }
                }}
                style={{ cursor: project.videoUrl ? 'pointer' : 'default' }}
                role={project.videoUrl ? 'button' : undefined}
                tabIndex={project.videoUrl ? 0 : -1}
                aria-label={project.videoUrl ? (isMobile() ? `נגן וידאו של ${project.title}` : `פתח וידאו של ${project.title}`) : undefined}
              >
                {project.videoUrl ? (
                  <>
                    <video
                      ref={(el) => {
                        videoRefs.current[project.id] = el
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
                      preload="metadata"
                      controls={isMobile() && playingVideoId === project.id}
                      className="project-video-thumbnail"
                      aria-hidden={!isMobile() || playingVideoId !== project.id}
                      aria-label={isMobile() && playingVideoId === project.id ? `וידאו של ${project.title}` : undefined}
                      onLoadedData={async (e) => {
                        // Only capture programmatically if no manual poster is provided
                        if (!project.posterUrl) {
                          // Capture first frame if not already captured and video is paused
                          const video = e.target
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
                ) : project.image ? (
                  <img src={project.image} alt={`תמונת פרויקט: ${project.title}`} />
                ) : (
                  <div className="project-placeholder-content">
                    <span className="project-category">{project.category}</span>
                  </div>
                )}
              </div>
              <div className="project-card-content">
                <span className="project-category-badge" aria-label={`קטגוריה: ${project.category}`}>
                  {project.category}
                </span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-technologies" role="list" aria-label="טכנולוגיות">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag" role="listitem">{tech}</span>
                    ))}
                  </div>
                )}
                {project.year && (
                  <span className="project-year" aria-label={`שנת פרויקט: ${project.year}`}>
                    {project.year}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* Only show modal on desktop (non-mobile) */}
      {!isMobile() && (
        <VideoModal
          videoUrl={selectedVideo}
          isOpen={!!selectedVideo}
          onClose={handleCloseModal}
          projectTitle={selectedProjectTitle}
        />
      )}
    </main>
    </>
  )
}

export default Projects

