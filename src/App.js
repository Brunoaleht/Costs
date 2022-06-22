import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './componentes/paginas/Home';
import Empresa from './componentes/paginas/Empresa';
import Contatos from './componentes/paginas/Contatos';
import NewProject from './componentes/paginas/NewProject';
import Projects from './componentes/paginas/Projects';
import Project from './componentes/paginas/Project';

import Conteiner from './componentes/Layout/Conteiner';

import NaveBar from './componentes/Layout/NaveBar';
import Footer from './componentes/Layout/Footer';


function App() {
  return (
    <Router>
      <NaveBar />
        <Conteiner customClass='minHeight'>
          <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route path='/empresa' element={<Empresa/>}/>
              <Route path='/projects' element={<Projects/>}/>
              <Route path='/contatos' element={<Contatos/>}/>
              <Route path='/newproject' element={<NewProject />}/>  
              <Route path='/project/:id' element={<Project />}/>
          </Routes>
        </Conteiner>
      <Footer />        
    </Router>
  );
}

export default App;
