import styles from "./Input.module.css"

const Input = ({label , placeholder , type , id}) => {
    return(
        <>
        <label htmlFor={id}>
            <p>{label}</p>
            <input type={type} id={id} placeholder={placeholder}/>
        </label>
        </>
    )

}

export default Input