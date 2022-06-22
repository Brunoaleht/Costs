import styles from './Home.module.css'
import saving from '../../img/savings.svg'
import LinkButton from '../Layout/LinkButton';

function Home() {
    return ( 
        <section className={styles.homeContainer}>
            <h1>Bem-Vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/newproject' text='Criar Projeto'/>
            <img src={saving} alt="Costs" />
        </section>
     );
}

export default Home;
