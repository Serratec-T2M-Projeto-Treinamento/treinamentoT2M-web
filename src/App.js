import Login from './pages/Login';
import { Container } from './pages/Login/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import PesquisaColaborador from './pages/PesquisaColaborador'
import CadastrarColaboradores from './pages/CadastrarColaboradores';
import AtualizarColaborador from './pages/AtualizarColaborador'
import CadastrarCertificacoes from './pages/CadastrarCertificacoes'
import InserirCertificacao from './pages/InserirCertificacao'
import CadastrarEnderecos from './pages/CadastrarEnderecos'
import AtualizarEndereco from './pages/AtualizarEndereco'
import CadastrarFormacoes from './pages/CadastrarFormacoes'
import InserirFormacao from './pages/InserirFormacao'
import AtualizarFormacao from './pages/AtualizarFormacao'
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
            <RoutesPrivate path="/atualizarcolaborador" exact component={AtualizarColaborador} />
            <RoutesPrivate path="/cadastrarcertificacoes" exact component={CadastrarCertificacoes} />
            <RoutesPrivate path="/inserircertificacao" exact component={InserirCertificacao} />
            <RoutesPrivate path="/cadastrarenderecos" exact component={CadastrarEnderecos} />
            <RoutesPrivate path="/atualizarendereco" exact component={AtualizarEndereco} />
            <RoutesPrivate path="/atualizarformacao" exact component={AtualizarFormacao} />
            <RoutesPrivate path="/cadastrarformacoes" exact component={CadastrarFormacoes} />
            <RoutesPrivate path="/inserirformacao" exact component={InserirFormacao} />
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
