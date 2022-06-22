import styles from './Project.module.css'

import {parse, v4 as uuidv4} from 'uuid'

import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Loading from '../Layout/Loading'
import Conteiner from '../Layout/Conteiner'
import Message from '../Layout/Message'

import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {
    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message,setMessage] = useState()
    const [type , setType] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers: {'Content-Type':'application/json'},
        })
        .then((resp) => resp.json())
        .then((data)=>{
            setProject(data)
            setServices(data.services)
        })
        .catch((err) => console.log(err))
    
    },[id])

    function editPost(project) {
        setMessage('')
        
        if(project.budget < project.cost){
            setMessage('O orçamento total não pode ser menor q o custo!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            //messagem
            setMessage('Projeto Ataulizado')
            setType('sucess')
        })
        .catch((err) => console.log(err))
    }

    function createService(project) {
        setMessage('')
        //Ultimo serviço
        const lastService = project.services[project.services.length-1]

        lastService.id= uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // validação do valor máximo

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        // add service cost ao total cost
        project.cost = newCost

        //Update Project
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data)=>{
            setShowServiceForm(false)
        })
        .catch((err) => console.log(err))


    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter((service) => service.id !== id)

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method: 'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço Removido!')
        } )
        .catch((err) => console.log(err))


    }
    
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return ( 
        <>
            {project.name ? 
            (<div className={styles.projectDetails}>
                <Conteiner customClass="column">
                    {message && <Message type = {type} msg = {message} />}
                    <div className={styles.conteiner}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto':'Fechar'}
                        </button>
                        {!showProjectForm ?
                        (
                            <div className={styles.projectInfo}>
                                <p>
                                    <span>categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span>R$ {project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span>R$ {project.cost}
                                </p>
                            </div>
                        ):(
                            <div className={styles.projectInfo}>
                                <ProjectForm
                                handleSubmit={editPost}
                                btnText='Concluir Edição'
                                projectData={project}/>
                            </div>
                        )}
                    </div>
                    <div className={styles.serviceFormConteiner}>
                        <h2>Adicione um Serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar Serviço':'Fechar'}
                        </button>
                        <div className={styles.projectInfo}>
                            {showServiceForm && <ServiceForm 
                            handleSubmit={createService}
                            btnText='Adicionar Serviço'
                            projectData={project}/>}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Conteiner customClass="start">
                        {services.length > 0 && services.map((service) => 
                        (<ServiceCard
                            id={service.id}
                            name={service.name}
                            cost={service.cost}
                            description={service.description}
                            key={service.id}
                            handleRemove={removeService}
                        /> 
                        ))
                        }
                        {services.length === 0 && <p>Não há serviços </p>}
                    </Conteiner>

                </Conteiner>
            </div>)
            : (<Loading/>)}    
            
        </> 
    );
}

export default Project;