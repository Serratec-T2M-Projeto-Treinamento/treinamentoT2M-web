import Login from './pages/Login';
import { Container } from './pages/Login/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import PesquisaColaborador from './pages/PesquisaColaborador'
import CadastrarColaboradores from './pages/CadastrarColaboradores';
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
            <RoutesPrivate path="/cadastrarcolaboradores" exact component={CadastrarColaboradores} />
            <RoutesPrivate path="/colaborador" exact component={Colaborador} />
          </Container>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
