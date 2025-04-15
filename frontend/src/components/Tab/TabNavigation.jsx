import { useState } from 'react'
import styles from './TabNavigation.module.css'

function TabNavigation({ contents, tab }) {

  const [activeTab, setActiveTab] = useState(1)

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        {tab.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.active : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {contents[activeTab]}
      </div>
    </div>
  )
}

export default TabNavigation
