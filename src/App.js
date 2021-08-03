import Login from './pages/Login';
import { Container } from './pages/Login/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import PesquisaColaborador from './pages/PesquisaColaborador'
import CadastrarColaboradores from './pages/CadastrarColaboradores';
import CadastrarCertificacoes from './pages/CadastrarCertificacoes'
import CadastrarEnderecos from './pages/CadastrarEnderecos'
import CadastrarFormacoes from './pages/CadastrarFormacoes'
import CadastrarProjetos from './pages/CadastrarProjetos'
import InserirProjetos from './pages/InserirProjetos'
import CadastrarTreinamentos from './pages/CadastrarTreinamentos'
import Colaborador from './pages/Colaborador';
import { AuthProvider } from './providers/auth';
import RoutesPrivate from './components/Routes/Private';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Container>
            <Route path="/" exact component={Login} />
            <RoutesPrivate path="/home" exact component={Home} />
            <RoutesPrivate path="/pesquisacolaborador" exact component={PesquisaColaborador} />           
            <RoutesPrivate path="/colaborador" exact component={Colaborador} />
            <RoutesPrivate path="/cadastrarcolaboradores" exact component={CadastrarColaboradores} />
            <RoutesPrivate path="/cadastrarcertificacoes" exact component={CadastrarCertificacoes} />
            <RoutesPrivate path="/cadastrarenderecos" exact component={CadastrarEnderecos} />
            <RoutesPrivate path="/cadastrarformacoes" exact component={CadastrarFormacoes} />
            <RoutesPrivate path="/cadastrarprojetos" exact component={CadastrarProjetos} />
            <RoutesPrivate path="/inserirprojetos" exact component={InserirProjetos} />
            <RoutesPrivate path="/cadastrartreinamentos" exact component={CadastrarTreinamentos} />
          </Container>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
