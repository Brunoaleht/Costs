import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

import styles from './Footer.module.css'
function Footer() {
    return ( 
        <div>
            <footer className={styles.footer}>
                <ul className={styles.socialLista}>
                    <li><FaFacebook /></li>
                    <li><FaInstagram /></li>
                    <li><FaLinkedin /></li>
                </ul>
            <p className={styles.copy}><span>Cost</span> &copy; 2022</p>
            </footer>
        </div> 
    );
}

export default Footer;