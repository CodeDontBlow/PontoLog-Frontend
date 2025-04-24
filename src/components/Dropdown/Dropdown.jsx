import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Input from "../Input/Input";
import styles from './Dropdown.module.css';

export const Dropdown = ({ label, options = [], classname, search = false, onSelect, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null); // 🔸 Passo 1

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(filter.toLowerCase())
    );

    const handleSelectOption = (option) => {
        setIsOpen(false);
        setSelectedOption(option);
        onSelect(option);
        setFilter(option);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`${styles.dropdown} ${classname}`} ref={dropdownRef}>
            {search ? (
                <div className={styles.searchContainer}>
                    <Input
                        type="text"
                        label={label}
                        placeholder={placeholder}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        showIcon={true}
                        icon={faMagnifyingGlass}
                        classname={styles.input}
                    />
                </div>
            ) : (
                <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption || 'Select an option'}
                    <FontAwesomeIcon icon={faChevronDown} className={`${styles.icon} ${isOpen ? styles.open : ''}`} />
                </button>
            )}

            {isOpen && (
                <ul className={`${styles.options} ${isOpen ? styles.open : ''}`}>
                    {(search ? filteredOptions : options).map((option, index) => (
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
    );
};
