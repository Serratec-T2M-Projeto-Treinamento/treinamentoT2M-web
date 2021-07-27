import React from "react";
import Logo from "../../components/img/logo.svg";
import { Link } from "react-router-dom";
import { Button, Principal, Imagem, Botoes } from "../Home/styles";

const Home = () => {
  return (
    <Principal>
      <div>
        <Imagem>
          <img src={Logo} alt="Logo" />
        </Imagem>
      </div>
      <Botoes>
        <Link to="/pesquisacolaborador" style={{ width: "100%" }}>
          <Button descricao="PesquisaColaborador">Colaboradores</Button>
        </Link>
        <Link to="/" style={{ width: "100%" }}>
          <Button descricao="Voltar a página de login/deslogar">Sair</Button>
        </Link>
        {/* <Link to="/home" style={{ width: "100%" }}>
          <Button descricao="Home">Treinamentos</Button>
        </Link> */}
      </Botoes>
    </Principal>
  );
};

export default Home;
