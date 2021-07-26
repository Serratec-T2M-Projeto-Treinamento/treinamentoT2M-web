import React from "react";
import Logo from "../../components/img/logo.svg";
import { Link } from 'react-router-dom';
import { Principal, Formulario, Input, Button, Imagem } from "./styles";

const Login = () => {
  return (
    <Principal>
      <Imagem>
        <img src={Logo} alt="Logo"/>
      </Imagem>
      <Formulario>
        <Input type="text" placeholder="Login"></Input>
        <Input type="password" placeholder="Senha"></Input>
        <Link to="/home"><Button descricao="Home" style={{width:"94%"}}>Confirmar</Button></Link>
      </Formulario>
    </Principal>
  );
};

export default Login;
