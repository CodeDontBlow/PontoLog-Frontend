import { useState } from 'react'
import styles from './TabNavigation.module.css'

const tabs = [
  { id: 1, label: 'Exportações' },
  { id: 2, label: 'Importações' },
]

function TabNavigation({ contents }) {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        {tabs.map((tab) => (
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
