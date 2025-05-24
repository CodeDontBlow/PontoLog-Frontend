import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Input from "../Input/Input";
import styles from './Dropdown.module.css';

const Dropdown = ({ label, options = [], value, classname = '', search = false, onSelect, placeholder, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [focused, setFocused] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelectOption = (option) => {
        setIsOpen(false);
        setSelectedOption(option);
        onSelect && onSelect(option);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setFocused(false);
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
                        value={value}
                        onChange={onChange}
                        onFocus={() => { setIsOpen(true); setFocused(true); }}
                        focused={focused}
                        showIcon={true}
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
                <ul className={`${styles.options} ${search ? styles.optionsSearch : ''} ${isOpen ? styles.open : ''}`}>
                    {options.map((option, index) => (
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

export default Dropdown;
