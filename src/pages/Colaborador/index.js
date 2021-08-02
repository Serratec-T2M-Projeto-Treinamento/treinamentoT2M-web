import React, { useEffect, useState } from "react";
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
  ColaboradorTituloDiv,
} from "./styles";
import api from "../../services/api";

const Colaborador = () => {
  const { colaborador } = React.useContext(AuthContext);

  const handleDate = (props) => {
    const data = new Date(props)
    const dia = (data.getDate() + 1).toString().padStart(2, '0')
    const mes = (data.getMonth() + 1).toString().padStart(2, '0')
    const ano = data.getFullYear()
    const dataFormatada = `${dia}/${mes}/${ano}`
    return (
      dataFormatada
    )
  }

  const handlePermissao = (props) => {
    if (props === 2) {
      return (
        <p>
          <b>Permissão: </b>
          Administrador
        </p>
      )
    } else if (props === 1) {
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

  const enderecos = colaborador.setColabsEndrs.map((p,i)=>(
    <CardColaboradorDivInterna key={i}>
          <p>
            <b>Rua: </b>
            {p.endereco.rua}
          </p>
          <p>
            <b>Número: </b>
            {p.endereco.numero}
          </p>
          <p>
            <b>Complemento: </b>
            {p.endereco.complemento}
          </p>
          <p>
            <b>Bairro: </b>
            {p.endereco.bairro}
          </p>
          <p>
            <b>Cidade: </b>
            {p.endereco.cidade}
          </p>
          <p>
            <b>Estado: </b>
            {p.endereco.estado}
          </p>
          <p>
            <b>País: </b>
            {p.endereco.pais}
          </p>
          <p>
            <b>CEP: </b>
            {p.endereco.cep}
          </p>
        </CardColaboradorDivInterna>
  ))

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
        <ColaboradorTituloDiv>
          <h2> Dados Cadastrais </h2>
        </ColaboradorTituloDiv>
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
            <b>PIX: </b>
            {colaborador.pix}
          </p>
          <p>
            <b>Email: </b>
            {colaborador.email}
          </p>
          <p>
            <b>Data de nascimento: </b>
            {handleDate(colaborador.dataNascimento)}
          </p>
          {handlePermissao(colaborador.permissao)}
          <p>
            <b>Posição: </b>
            {colaborador.posicao.nome}
          </p>
        </CardColaboradorDivInterna>
        {enderecos}
      </CardColaboradorDiv>
      {/* <CardColaboradorDiv>
        <ColaboradorTituloDiv>
          <h2> Projetos </h2>
        </ColaboradorTituloDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Nome: </b>
            {projeto.nome}
          </p>
          <p>
            <b>Descrição: </b>
            {projeto.descricao}
          </p>
          <p>
            <b>Gerenciamento: </b>
            {projeto.appGerenciamento}
          </p>
          <p>
            <b>Segmento: </b>
            {projeto.segmento}
          </p>
          <p>
            <b>Data de entrega esperada: </b>
            {handleDate(projeto.dataEntregaEsperada)}
          </p>

        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
          <p>
            <b>Data de entrega: </b>
            {handleDate(projeto.dataEntrega)}
          </p>
          <p>
            <b>Equipe: </b>
            {projeto.equipe}
          </p>
          <p>
            <b>Função: </b>
            {colaborador.setColaboradoresProjetos[0].funcao}
          </p>
          <p>
            <b>Data início: </b>
            {handleDate(colaborador.setColaboradoresProjetos[0].dataInicio)}
          </p>
          <p>
            <b>Data saída: </b>
            {handleDate(colaborador.setColaboradoresProjetos[0].dataSaida)}
          </p>
        </CardColaboradorDivInterna>
      </CardColaboradorDiv> */}
      {/* <CardColaboradorDiv>
        <ColaboradorTituloDiv>
          <h2> Formações </h2>
        </ColaboradorTituloDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Nome: </b>
            {formacoes.nome}
          </p>
          <p>
            <b>Nível: </b>
            {formacoes.nivel}
          </p>
          <p>
            <b>Instituição: </b>
            {formacoes.instituicao}
          </p>
        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
          <p>
            <b>Data entrada: </b>
            {handleDate(colaborador.setColaboradoresFormacoes[0].dataEntrada)}
          </p>
          <p>
            <b>Data conclusão: </b>
            {handleDate(colaborador.setColaboradoresFormacoes[0].dataConclusao)}
          </p>
        </CardColaboradorDivInterna>
      </CardColaboradorDiv> */}
      {/* <CardColaboradorDiv>
        <ColaboradorTituloDiv>
          <h2> Treinamentos </h2>
        </ColaboradorTituloDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Nome: </b>
            {treinamentos.nome}
          </p>
          <p>
            <b>Instituição: </b>
            {treinamentos.instituicao}
          </p>
        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
          <p>
            <b>Carga horária: </b>
            {treinamentos.cargaHoraria} hora(s)
          </p>
          <p>
            <b>Descrição: </b>
            {treinamentos.descricao}
          </p>
        </CardColaboradorDivInterna>
      </CardColaboradorDiv> */}
    </PrincipalDiv>
  );
};

export default Colaborador;
