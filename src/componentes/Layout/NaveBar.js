import Conteiner from "./Conteiner";
import logo from "../../img/costs_logo.png";
import styles from './NaveBar.module.css'
import {Link} from 'react-router-dom'

function NaveBar() {
    return ( 
        <nav className={styles.naveBar}>        
            <Conteiner>
                <Link to = '/'>
                    <img src={logo} alt="Cost" /> 
                </Link> 
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/empresa'>Empresa</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/projects'>Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/contatos'>Contatos</Link>
                    </li>

                </ul>
            </Conteiner>
        </nav>
     );
}

export default NaveBar
