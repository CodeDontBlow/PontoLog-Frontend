import { faChartLine, faBalanceScale, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from '../Buttons/Button/Button'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  return (
    <div classname={styles.sidebar}>
      <div className={styles.logo}>
        <img src="" alt="logo" />
      </div>

      <div className={styles.mainButtons}>
        <Button variant={'Btn-icon'} icon={faChartLine} />
        <Button variant={'Btn-icon'} icon={faBalanceScale} />
      </div>

      <div className={styles.infoButton}>
        <FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} />
      </div>
    </div>
  )
}

export default Sidebar