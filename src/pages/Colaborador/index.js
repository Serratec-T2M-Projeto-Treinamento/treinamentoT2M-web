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
  const [ endereco, setEndereco ] = useState({});
  const [projeto, setProjeto] = useState({});
  const [formacoes, setFormacoes] = useState({});
  const [treinamentos, setTreinamentos] = useState({});
  // const [certificacoes, setCertificacoes] = useState({});

  useEffect(() => {
    api.get(`/enderecos/${colaborador.setColaboradoresEnderecos[0].idColaboradoresEnderecos.idEndereco}`)
      .then((response) => setEndereco(response.data))
      .catch((err) => {
        console.error("ops! ocorrei um erro" + err);
      });
    api.get(`/projetos/${colaborador.setColaboradoresProjetos[0].idColaboradoresProjetos.idProjeto}`)
      .then((response) => setProjeto(response.data))
      .catch((err) => {
        console.error("ops! ocorrei um erro" + err);
      });
      api.get(`/formacoes/${colaborador.setColaboradoresFormacoes[0].idColaboradoresFormacoes.idFormacao}`)
      .then((response) => setFormacoes(response.data))
      .catch((err) => {
        console.error("ops! ocorrei um erro" + err);
      });
      api.get(`/treinamentos/${colaborador.setColaboradoresTreinamentos[0].idColaboradoresTreinamentos.idTreinamento}`)
      .then((response) => setTreinamentos(response.data))
      .catch((err) => {
        console.error("ops! ocorrei um erro" + err);
      });
      // api.get(`/certificacoes/${colaborador.setColaboradoresCertificacoes[0].idColaboradoresCertificacoes.idCertificacao}`)
      // .then((response) => setCertificacoes(response.data))
      // .catch((err) => {
      //   console.error("ops! ocorrei um erro" + err);
      // });
  }, []);

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
      <CardColaboradorDiv>
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
      </CardColaboradorDiv>
      <CardColaboradorDiv>
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
      </CardColaboradorDiv>
      <CardColaboradorDiv>
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
      </CardColaboradorDiv>
      {/* <CardColaboradorDiv>
      <ColaboradorTituloDiv>
        <h2> Certificações </h2>
        </ColaboradorTituloDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Data de obtenção: </b>
             {handleDate(certificacoes.setColaboradoresCertificacoes[0].dataObtencao)}
          </p>
        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
        </CardColaboradorDivInterna>
      </CardColaboradorDiv> */}
    </PrincipalDiv>
  );
};

export default Colaborador;
