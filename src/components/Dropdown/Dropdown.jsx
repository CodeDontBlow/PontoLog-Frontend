import { useState } from "react"

import styles from './Dropdown.module.css'

export const Dropdown = ({options = [], search = false, onSelect}) => {

    const [isOpen, setIsOpen] = useState(true)
    const [filter, setFilter] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)
  
    const filteredOptions = options.filter(option => 
      option.toLowerCase().includes(filter.toLowerCase())
    )

    const handleSelectOption = (option) => {
        setIsOpen(false)
        setSelectedOption(option)
        onSelect(option)
        setFilter('')
    }


    return (
        <div className={styles.dropdown}>
            {search ? (
                <input 
                    type="text" 
                    className={styles.input} 
                    placeholder="Search..." 
                    value={selectedOption != null ? selectedOption : filter}
                    onChange={(e) => {setFilter(e.target.value)
                        setIsOpen(true)
                    }}
                />
            ) : (
                <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption || 'Select an option'}
                </button>
            )}

            {isOpen && (
                <ul className={styles.options}>
                    {filteredOptions.map((option, index) => (
                        <li 
                            key={index} 
                            className={styles.option} 
                            onClick={() => handleSelectOption(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
} 
