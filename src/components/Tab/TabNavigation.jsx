import { useState } from 'react'
import styles from './TabNavigation.module.css'

function TabNavigation({ tab, onTabClick }) {

  const [activeTab, setActiveTab] = useState(1)

  return (
    <div className={styles.tabHeader}>
      {tab.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id) 
            onTabClick(tab.tradeType)
          }
        }
        className={`${styles.tabButton} ${
          activeTab === tab.id ? styles.active : ''
          }`}
          >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default TabNavigation
