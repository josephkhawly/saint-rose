import SlideAndFade from './SlideAndFade'
import styles from './introtext.module.scss'

export const IntroText = ({ title, introText }: { title: string; introText: string }) => {
  return (
    <SlideAndFade delay={1.25}>
      <div className={styles['page-title']}>{title}</div>
      <h3 className={styles['page-intro']}>{introText}</h3>
    </SlideAndFade>
  )
}
