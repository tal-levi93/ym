import { useState } from 'react'
import '../App.css'

function ProjectGrid() {
  const [hoveredVideo, setHoveredVideo] = useState(null)

  // Placeholder videos - these can be replaced with actual video URLs later
  const projects = [
    {
      id: 1,
      title: 'פרויקט אוטומציה',
      description: 'מערכת אוטומציה מתקדמת לניהול תהליכים עסקיים',
      videoUrl: '', // Placeholder - will be replaced with actual video
    },
    {
      id: 2,
      title: 'אתר תדמית',
      description: 'אתר תדמית מקצועי עם עיצוב מודרני',
      videoUrl: '', // Placeholder - will be replaced with actual video
    },
    {
      id: 3,
      title: 'פלטפורמת מסחר',
      description: 'פלטפורמת מסחר אלקטרוני מתקדמת',
      videoUrl: '', // Placeholder - will be replaced with actual video
    },
  ]

  const handleMouseEnter = (id) => {
    setHoveredVideo(id)
    // If there's a video URL, play it
    // For now, just highlight the card
  }

  const handleMouseLeave = () => {
    setHoveredVideo(null)
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-card"
          onMouseEnter={() => handleMouseEnter(project.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="project-video-placeholder">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                muted
                loop
                playsInline
                autoPlay={hoveredVideo === project.id}
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

