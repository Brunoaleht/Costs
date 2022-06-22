import styles from './Select.module.css'

function Select({options, text, name, handleOnChange, value}) {
    return ( 
    <div className={styles.formControler}>
        <label htmlFor={name}>{text}</label>
        <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
            <option>Selecione uma Categoria</option>
            {options.map((option) => (<option value={option.id} key={option.id}>{option.name}</option>))}
        </select> 
    </div> 
    );
}

export default Select;