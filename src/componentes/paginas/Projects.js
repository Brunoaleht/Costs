import styles from './Projects.module.css'

import {useLocation} from 'react-router-dom'
import Message from "../Layout/Message";
import Conteiner from "../Layout/Conteiner"
import LinkButton from "../Layout/LinkButton"
import Loading from '../Layout/Loading';
import ProjectCard from '../project/ProjectCard';
import { useState, useEffect } from 'react';


function Projects() {
    const [projectMessage, setProjectMessage] = useState('')
    const [removeloading, setRemoveloading] = useState(false)
    const [projects, setProjects] = useState([])
    const location = useLocation()
    let message= ''
    if(location.state){
        message = location.state.message
    }
    useEffect(() => {
        fetch('http://localhost:5000/projects',{
            method: "GET",
            headers: {'Content-Type':'application/json'},
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(data)
            setRemoveloading(true)
        })
        .catch((err) => console.log(err))
    },[])
    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "DELETE",
            headers: {'Content-Type':'application/json'}
        })
        .then((resp) => resp.json())
        .then(()=>{
            setProjects(projects.filter((project) => project.id !== id))
            //msg de remoção
            setProjectMessage('Projeto Removido com sucesso')
        })
        .catch((err) => console.log(err))
        
    }
    return ( 
        <div className={styles.projectConteiner}>
            <div className={styles.titleConteiner}>
                <h1>Project</h1>
                <LinkButton to='/newproject' text="Criar Projeto"/>
            </div>
            {message && <Message type='sucess' msg={message}/>}
            {projectMessage && <Message type='sucess' msg={projectMessage}/>}
            <Conteiner customClass = "start">
                {projects.length > 0 && projects.map((project) => (<ProjectCard 
                id = {project.id}
                name = {project.name}
                budget = {project.budget}
                category = {project.category.name}
                key = {project.id}
                handleRemove = {removeProject} 
                />))}
                {!removeloading && <Loading />}
                {removeloading && projects.length === 0 && (<p>Não há projetos</p>) }
            </Conteiner>
        </div>
     );
}

export default Projects;