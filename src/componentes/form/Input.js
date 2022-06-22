import styles from './Input.module.css'

function Input({type, text, name, handleOnChange, value, placeholder}) {
    return ( 
    <div className={styles.formControler}>
        <label htmlFor={name}>{text}</label>
        <input 
            type={type} 
            name={name} 
            value={value} 
            placeholder={placeholder}
            id={name}
            onChange={handleOnChange}
        />
    </div> 
    );
}

export default Input;