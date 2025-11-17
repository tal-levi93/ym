import { useState, useRef } from 'react'
import '../App.css'
import { getFeaturedProjects } from '../data/projects'
import VideoModal from './VideoModal'

function ProjectGrid() {
  const [hoveredVideo, setHoveredVideo] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(null)
  const videoRefs = useRef({})

  // Get featured projects (those with videos or marked as featured)
  const projects = getFeaturedProjects()
  
  // Debug: Log projects to console
  if (typeof window !== 'undefined' && projects.length === 0) {
    console.warn('No featured projects found')
  }

  const handleMouseEnter = (id) => {
    setHoveredVideo(id)
    // Play video if it exists
    if (videoRefs.current[id]) {
      videoRefs.current[id].play()
    }
  }

  const handleMouseLeave = (id) => {
    setHoveredVideo(null)
    // Stop and reset video if it exists
    if (videoRefs.current[id]) {
      videoRefs.current[id].pause()
      videoRefs.current[id].currentTime = 0
    }
  }

  const handleVideoClick = (videoUrl, projectTitle) => {
    if (videoUrl) {
      setSelectedVideo(videoUrl)
      setSelectedProjectTitle(projectTitle)
    }
  }

  const handleVideoKeyDown = (e, videoUrl, projectTitle) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleVideoClick(videoUrl, projectTitle)
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
              className={`project-video-placeholder ${project.videoUrl ? 'has-video' : ''}`}
              onClick={() => handleVideoClick(project.videoUrl, project.title)}
              onKeyDown={(e) => handleVideoKeyDown(e, project.videoUrl, project.title)}
              style={{ cursor: project.videoUrl ? 'pointer' : 'default' }}
              role={project.videoUrl ? 'button' : undefined}
              tabIndex={project.videoUrl ? 0 : -1}
              aria-label={project.videoUrl ? `פתח וידאו של ${project.title}` : undefined}
              aria-describedby={`project-${project.id}-description`}
            >
              {project.videoUrl ? (
                <video
                  ref={(el) => (videoRefs.current[project.id] = el)}
                  src={project.videoUrl}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="project-video"
                  aria-hidden="true"
                />
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
      <VideoModal
        videoUrl={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={handleCloseModal}
        projectTitle={selectedProjectTitle}
      />
    </>
  )
}

export default ProjectGrid

