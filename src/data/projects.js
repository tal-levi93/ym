// Shared projects data for use across components
// 
// For projects with videos, you can add a 'posterUrl' field with a Cloudinary image URL
// This will be used as the video thumbnail/poster image (better than programmatic capture)
// Example: posterUrl: 'https://res.cloudinary.com/dmmfnlasi/image/upload/v1234567890/poster-image.jpg'
//
export const projectsData = [
  {
    id: 1,
    title: 'אתר תדמית מספרה + חנות',
    description: 'אתר תדמית מקצועי למספרה עם חנות מקוונת למוצרי טיפוח ותספורות. כולל מערכת הזמנות, גלריית עבודות, וניהול מוצרים',
    category: 'אתרים',
    videoUrl: 'https://res.cloudinary.com/dmmfnlasi/video/upload/v1762186648/Screen_Recording_2025-11-03_181151_wp1ums.mp4',
    posterUrl: 'https://res.cloudinary.com/dmmfnlasi/image/upload/v1763466710/BarbiePoster_cqxxgs.png',
    technologies: ['React', 'Vite', 'E-commerce'],
    year: '2024',
    featured: true,
  },
  {
    id: 2,
    title: 'משחק למחקר מדעי',
    description: 'משחק למחקר מדעי באוניברסיטה העברית',
    category: 'אוטומציה',
    videoUrl: 'https://res.cloudinary.com/dmmfnlasi/video/upload/v1762187807/Screen_Recording_2025-11-03_183456_zp1wjz.mp4',
    posterUrl: 'https://res.cloudinary.com/dmmfnlasi/image/upload/v1763466709/CyberballPoster_cqlnph.png',
    technologies: ['JavaScript', 'Research Tools'],
    year: '2024',
    featured: true,
  },
  {
    id: 3,
    title: 'אתר תדמית',
    description: 'אתר תדמית קלאסטר מדעי',
    category: 'אתרים',
    videoUrl: 'https://res.cloudinary.com/dmmfnlasi/video/upload/v1762188879/Screen_Recording_2025-11-03_185338_pqcwy1.mp4',
    posterUrl: 'https://res.cloudinary.com/dmmfnlasi/image/upload/v1763466710/ClusterPoster_g9kvx1.png',
    technologies: ['React', 'Modern Design'],
    year: '2024',
    featured: true,
  },
  {
    id: 4,
    title: 'מערכת ניהול לקוחות (CRM)',
    description: 'מערכת CRM מותאמת אישית עם תהליכי עבודה אוטומטיים לניהול לקוחות ומעקב אחר עסקאות',
    category: 'אוטומציה',
    videoUrl: null,
    technologies: ['CRM', 'Automation', 'Database'],
    year: '2024',
    featured: false,
  },
  {
    id: 5,
    title: 'אתר תדמית לעסק קטן',
    description: 'אתר תדמית מקצועי עם עיצוב מודרני ונוח לנייד, מותאם לחיפוש בגוגל',
    category: 'אתרים',
    videoUrl: null,
    technologies: ['React', 'Responsive Design', 'SEO'],
    year: '2024',
    featured: false,
  },
  {
    id: 6,
    title: 'פלטפורמת מסחר אלקטרוני',
    description: 'מערכת מסחר מקוונת מתקדמת עם תשלומים מאובטחים, ניהול מלאי וניהול הזמנות',
    category: 'אתרים',
    videoUrl: null,
    technologies: ['E-commerce', 'Payment Integration', 'Inventory Management'],
    year: '2024',
    featured: false,
  },
  {
    id: 7,
    title: 'אוטומציה לניהול מלאי',
    description: 'פתרון מתקדם לניהול אוטומטי של מלאי, מעקב אחר מוצרים והתראות על מחסור',
    category: 'אוטומציה',
    videoUrl: null,
    technologies: ['Automation', 'Inventory Management', 'Alerts'],
    year: '2023',
    featured: false,
  },
  {
    id: 8,
    title: 'חיבור מערכות - CRM לאתר',
    description: 'חיבור בין מערכת ניהול לקוחות לאתר, סינכרון נתונים אוטומטי וניהול משותף',
    category: 'אוטומציה',
    videoUrl: null,
    technologies: ['API Integration', 'Data Sync', 'CRM'],
    year: '2024',
    featured: false,
  },
  {
    id: 9,
    title: 'אתר חברה גדולה',
    description: 'אתר תדמית מורכב עם מערכת ניהול תוכן, אזור לקוחות ומערכת הזמנות',
    category: 'אתרים',
    videoUrl: null,
    technologies: ['CMS', 'Enterprise', 'Multi-page'],
    year: '2023',
    featured: false,
  },
  {
    id: 10,
    title: 'אוטומציה לתהליכי ייצור',
    description: 'פתרון אוטומציה מותאם לתעשייה ספציפית עם מעקב אחר תהליכי ייצור ודוחות אוטומטיים',
    category: 'אוטומציה',
    videoUrl: null,
    technologies: ['Manufacturing', 'Process Automation', 'Reporting'],
    year: '2023',
    featured: false,
  },
  {
    id: 11,
    title: 'חיבור לחשבונאות',
    description: 'חיבור בין מערכת ניהול לקוחות לתוכנת חשבונאות, סינכרון אוטומטי של חשבוניות ותשלומים',
    category: 'אוטומציה',
    videoUrl: null,
    technologies: ['Accounting Integration', 'Invoice Sync', 'Financial'],
    year: '2024',
    featured: false,
  },
  {
    id: 12,
    title: 'אתר שירותים מקצועיים',
    description: 'אתר תדמית מקצועי עם מערכת הזמנות מקוונת, לוח זמנים וניהול לקוחות',
    category: 'אתרים',
    videoUrl: null,
    technologies: ['Booking System', 'Calendar Integration', 'Service Business'],
    year: '2024',
    featured: false,
  },
]

// Helper function to get featured projects (for Home page)
export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured)
}

// Helper function to get projects by category
export const getProjectsByCategory = (category) => {
  return projectsData.filter(project => project.category === category)
}

// Helper function to get all categories
export const getAllCategories = () => {
  return [...new Set(projectsData.map(project => project.category))]
}

