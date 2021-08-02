import React, { useState } from "react";
import Logo from "../../components/img/logo.svg";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Principal, Formulario, Input, Button, Imagem } from "./styles";

const Login = () => {
  const history = useHistory();
  const { setUsuario } = React.useContext(AuthContext);
  const [login, setLogin] = useState({
    usuario: "",
    senha: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/usuarios/login", login);
      const token = response.data.isAtivo
      setUsuario(response.data)
      console.log(response);
      if (token) {
        return (
          history.push('/home')
        )
      }
      
    } catch (error) {
      setLogin({
        usuario: "",
        senha: ""
      })
      console.error(error);
      alert("Usuário ou senha incorreto(s)");
    }
    
    
  }
  const handleChange = (event) => {
    event.preventDefault();
    const novoLogin = { ...login };
    novoLogin[event.target.id] = event.target.value;
    setLogin(novoLogin);
  };

  return (
    <Principal>
      <Imagem>
        <img src={Logo} alt="Logo" />
      </Imagem>
      <Formulario onSubmit={(event) => handleSubmit(event)}>
        <Input
          onChange={(event) => handleChange(event)}
          type="text"
          placeholder="Usuário"
          id='usuario'
          value={login.usuario}
        ></Input>
        <Input
          onChange={(event) => handleChange(event)}
          type="password"
          placeholder="Senha"
          id='senha'
          value={login.senha}
        ></Input>
        <Button type="submit" descricao="Home" style={{ width: "95%" }}>
          Confirmar
        </Button>
      </Formulario>
    </Principal>
  );
};

export default Login;
