import React, { useEffect } from "react";
import { AuthContext } from "../../providers/auth";
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import {
  PrincipalDiv,
  CardColaboradorDiv,
  CardColaboradorDivInterna,
  HeaderDiv,
  TituloDiv,
  Texto,
} from "./styles";
import api from "../../services/api";

const Colaborador = () => {
  const { colaborador, endereco, setEndereco } = React.useContext(AuthContext);

  useEffect(() => {
    api
      .get(
        `/enderecos/${colaborador.setColaboradoresEnderecos[0].idColaboradoresEnderecos.idEndereco}`,
        { auth: { username: "t2m", password: "123456" } }
      )
      .then((response) => setEndereco(response.data))
      .catch((err) => {
        console.error("ops! ocorrei um erro" + err);
      });
  }, []);

  const handleDate = () => {
    const data = new Date(colaborador.dataNascimento)
    const dia = (data.getDate() + 1).toString().padStart(2, '0')
    const mes = (data.getMonth() + 1).toString().padStart(2, '0')
    const ano = data.getFullYear()
    const dataFormatada = `${dia}/${mes}/${ano}`
    return (
      <p>
        <b>Data de nascimento: </b>
        {dataFormatada}
      </p>
    )
  }

  const handlePermissao = () => {
    if (colaborador.permissao === 2) {
      return (
        <p>
          <b>Permissão: </b>
          Administrador
        </p>
      )
    } else if (colaborador.permissao === 1) {
      return (
        <p>
          <b>Permissão: </b>
          Líder
        </p>
      )
    } else {
      return (
        <p>
          <b>Permissão: </b>
          Colaborador
        </p>
      )
    }
  };

  return (
    <PrincipalDiv>
      <HeaderDiv>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <TituloDiv>
          <Texto>Informações do Colaborador(a)</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <CardColaboradorDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Nome: </b>
            {colaborador.nome}
          </p>
          <p>
            <b>CPF: </b>
            {colaborador.cpf}
          </p>
          <p>
            <b>CNH: </b>
            {colaborador.cnh}
          </p>
          <p>
            <b>RG: </b>
            {colaborador.rg}
          </p>
          <p>
            <b>Conta bancária: </b>
            {colaborador.contaBancaria}
          </p>
          <p>
            <b>PIX: </b>
            {colaborador.pix}
          </p>
          <p>
            <b>Email: </b>
            {colaborador.email}
          </p>
          {handleDate()}
          {handlePermissao()}
          <p>
            <b>Posição: </b>
            {colaborador.posicao.nome}
          </p>
        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
          <p>
            <b>Rua: </b>
            {endereco.rua}
          </p>
          <p>
            <b>Número: </b>
            {endereco.numero}
          </p>
          <p>
            <b>Complemento: </b>
            {endereco.complemento}
          </p>
          <p>
            <b>Bairro: </b>
            {endereco.bairro}
          </p>
          <p>
            <b>Cidade: </b>
            {endereco.cidade}
          </p>
          <p>
            <b>Estado: </b>
            {endereco.estado}
          </p>
          <p>
            <b>País: </b>
            {endereco.pais}
          </p>
          <p>
            <b>CEP: </b>
            {endereco.cep}
          </p>
        </CardColaboradorDivInterna>

      </CardColaboradorDiv>
    </PrincipalDiv>
  );
};

export default Colaborador;
