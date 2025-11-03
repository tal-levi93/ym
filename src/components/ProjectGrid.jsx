import { useState, useRef } from 'react'
import '../App.css'

function ProjectGrid() {
  const [hoveredVideo, setHoveredVideo] = useState(null)
  const videoRefs = useRef({})

  // Placeholder videos - these can be replaced with actual video URLs later
  const projects = [
    {
      id: 1,
      title: 'פרויקט אוטומציה',
      description: 'מערכת אוטומציה מתקדמת לניהול תהליכים עסקיים',
      videoUrl: 'https://res.cloudinary.com/dmmfnlasi/video/upload/v1762186648/Screen_Recording_2025-11-03_181151_wp1ums.mp4',
    },
    {
      id: 2,
      title: 'אתר תדמית',
      description: 'אתר תדמית מקצועי עם עיצוב מודרני',
      videoUrl: 'https://res.cloudinary.com/dmmfnlasi/video/upload/v1762187807/Screen_Recording_2025-11-03_183456_zp1wjz.mp4',
    },
    {
      id: 3,
      title: 'פלטפורמת מסחר',
      description: 'פלטפורמת מסחר אלקטרוני מתקדמת',
      videoUrl: 'https://res.cloudinary.com/dmmfnlasi/video/upload/v1762188879/Screen_Recording_2025-11-03_185338_pqcwy1.mp4',
    },
  ]

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

