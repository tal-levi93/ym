import { useState, useRef } from 'react'
import '../App.css'
import { getFeaturedProjects } from '../data/projects'

function ProjectGrid() {
  const [hoveredVideo, setHoveredVideo] = useState(null)
  const videoRefs = useRef({})

  // Get featured projects (those with videos or marked as featured)
  const projects = getFeaturedProjects()

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

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`project-card ${hoveredVideo === project.id ? 'hovered' : ''}`}
          onMouseEnter={() => handleMouseEnter(project.id)}
          onMouseLeave={() => handleMouseLeave(project.id)}
        >
          <div className="project-video-placeholder">
            {project.videoUrl ? (
              <video
                ref={(el) => (videoRefs.current[project.id] = el)}
                src={project.videoUrl}
                muted
                loop
                playsInline
                className="project-video"
              />
            ) : (
              <div className="video-placeholder-content">
                <div className="video-placeholder-icon">▶</div>
                <p>וידאו פרויקט</p>
              </div>
            )}
          </div>
          <div className="project-info">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectGrid

