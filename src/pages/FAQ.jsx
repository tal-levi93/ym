import { NavLink } from 'react-router-dom'
import '../App.css'
import SEO from '../components/SEO'
import { getFAQStructuredData, getOrganizationStructuredData } from '../utils/structuredData'

function FAQ() {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  
  const faqCategories = [
    {
      category: 'שירותים כלליים',
      questions: [
        {
          question: 'מה ההבדל בין אתר מותאם אישית לתבנית?',
          answer: 'אתר מותאם אישית נבנה במיוחד עבור העסק שלך, עם עיצוב ייחודי ותכונות מותאמות לצרכים שלך. תבניות הן פתרונות כללים שדורשים התאמה מוגבלת. אנחנו בונים רק אתרים מותאמים אישית שמביאים תוצאות טובות יותר ומתאימים בדיוק לעסק שלך.',
        },
        {
          question: 'כמה זמן לוקח לבנות אתר?',
          answer: 'זמן הפיתוח תלוי במורכבות הפרויקט. אתר תדמית פשוט יכול להיות מוכן תוך 2-4 שבועות, בעוד שאתר מסחר אלקטרוני או מערכת מורכבת יכולה לקחת 6-12 שבועות. נספק לך לוח זמנים מדויק לאחר פגישת הייעוץ הראשונית.',
        },
        {
          question: 'מה כולל השירות שלכם?',
          answer: 'השירות שלנו כולל: ייעוץ ותכנון, פיתוח מלא, עיצוב מקצועי, בדיקות מקיפות, הדרכה לצוות, תיעוד מלא ותמיכה ראשונית של 30 יום. כל פרויקט מותאם אישית לצרכים שלך.',
        },
        {
          question: 'האם אתם מספקים תמיכה לאחר ההשקה?',
          answer: 'כן! כל פרויקט כולל תמיכה ראשונית של 30 יום. לאחר מכן, אנו מציעים חבילות תמיכה שוטפת הכוללות עדכונים, תיקון בעיות, ניטור ביצועים ותמיכה טכנית מתמשכת.',
        },
      ],
    },
    {
      category: 'אוטומציה ומערכות',
      questions: [
        {
          question: 'מה זה אוטומציה עסקית?',
          answer: 'אוטומציה עסקית היא שימוש בטכנולוגיה לביצוע אוטומטי של תהליכים חוזרים. זה יכול לכלול שליחת אימיילים אוטומטיים, עדכון נתונים, יצירת דוחות, ניהול מלאי ועוד. המטרה היא לחסוך זמן, להפחית שגיאות ולשפר את היעילות העסקית.',
        },
        {
          question: 'אילו מערכות אפשר לחבר יחד?',
          answer: 'אפשר לחבר כמעט כל מערכת: מערכת ניהול לקוחות (CRM), אתר, תוכנות חשבונאות, כלי תשלום, מערכות דואר אלקטרוני, מערכות ניהול מלאי ועוד. נבנה חיבורים מותאמים אישית שיוצרים זרימת עבודה חלקה בין כל המערכות שלך.',
        },
        {
          question: 'כמה זמן לוקח להגדיר מערכת CRM?',
          answer: 'הגדרת מערכת CRM מותאמת אישית יכולה לקחת בין 3-8 שבועות, תלוי במורכבות התהליכים והדרישות. זה כולל הגדרת תהליכי עבודה, ייבוא נתונים, הגדרת הרשאות והדרכה לצוות.',
        },
        {
          question: 'האם אפשר לייבא נתונים ממערכת קיימת?',
          answer: 'כן, בהחלט! אנו יכולים לייבא נתונים ממערכות קיימות כמו Excel, Google Sheets, מערכות CRM אחרות, תוכנות חשבונאות ועוד. נבצע את הייבוא בצורה מסודרת ומדויקת כדי להבטיח שהכל עובד כמו שצריך.',
        },
      ],
    },
    {
      category: 'טכני',
      questions: [
        {
          question: 'האם האתרים שלכם עובדים על נייד?',
          answer: 'כן! כל האתרים שאנו בונים הם רספונסיביים ועובדים מצוין על כל המכשירים - טלפונים ניידים, טאבלטים ומחשבים. זה חלק בסיסי בכל פרויקט שלנו.',
        },
        {
          question: 'האם האתרים מותאמים למנועי חיפוש (SEO)?',
          answer: 'כן! אנו בונים אתרים עם מיטוב למנועי חיפוש מובנה. זה כולל מבנה HTML נכון, מטא-תגים, מהירות טעינה מעולה, ותמיכה בעברית. זה עוזר לגוגל למצוא ולהציג את האתר שלך.',
        },
        {
          question: 'איפה האתרים מתארחים?',
          answer: 'אנו יכולים לעזור לך לבחור שירות אירוח מתאים. אנו עובדים עם ספקי אירוח ישראליים ובינלאומיים אמינים. נוכל גם לעזור בהגדרת האירוח והחיבור לדומיין.',
        },
        {
          question: 'האם אני אוכל לעדכן את התוכן בעצמי?',
          answer: 'כן! אנו בונים מערכות ניהול תוכן נוחות שמאפשרות לך לעדכן טקסטים, תמונות ותוכן בעצמך. נדריך אותך איך להשתמש במערכת ונספק תיעוד מפורט.',
        },
      ],
    },
  ]

  // Flatten all FAQs for structured data
  const allFAQs = faqCategories.flatMap(category => category.questions)
  const structuredData = [
    getOrganizationStructuredData(),
    getFAQStructuredData(allFAQs),
  ]

  return (
    <>
      <SEO
        title="שאלות נפוצות | אוטומציה ויצירת אתרים"
        description="תשובות לשאלות הנפוצות על שירותי פיתוח אתרים, מערכות CRM ואוטומציה עסקית. כל מה שאתה צריך לדעת על השירותים שלנו."
        keywords="שאלות נפוצות, FAQ, תשובות, פיתוח אתרים, CRM, אוטומציה, שאלות ותשובות"
        canonical={`${siteUrl}/faq`}
        ogImage={`${siteUrl}/favicon.png`}
        structuredData={structuredData}
      />
      <main id="main-content">
      <section className="section faq-page" aria-labelledby="faq-page-title">
        <div className="section-header">
          <h1 id="faq-page-title">שאלות נפוצות</h1>
          <p>
            כאן תמצא תשובות לשאלות הנפוצות ביותר על השירותים שלנו.
            אם יש לך שאלה נוספת, נשמח לעזור - צור קשר איתנו!
          </p>
        </div>

        <div className="faq-container">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h2 className="faq-category-title">{category.category}</h2>
              <div className="faq-list" role="list">
                {category.questions.map((item, index) => (
                  <details key={index} className="faq-item" role="listitem">
                    <summary className="faq-question" aria-expanded="false">
                      <span>{item.question}</span>
                      <span className="faq-icon" aria-hidden="true">+</span>
                    </summary>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <p>לא מצאת את התשובה שחיפשת?</p>
          <NavLink to="/contact" className="button primary">
            צור קשר
          </NavLink>
        </div>
      </section>
    </main>
    </>
  )
}

export default FAQ

