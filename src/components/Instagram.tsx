import Iframe from "react-iframe";
import styles from './instagram.module.scss'

export default function Instagram() {
  return (
    <div className={styles['outer-container']}>
      <div className={styles['instagram-reviews']}>
        <Iframe
          url='https://cdn.lightwidget.com/widgets/d9467bad991b50808baea81bd806ab73.html'
          width='100%'
          height='auto'
          scrolling='no'
          display='initial'
          position='relative'
          // allowtransparency='true'
          // style='width:100%;border:0;overflow:hidden;'
        />
      </div>
    </div>
  )
}