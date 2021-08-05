import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Formik } from "formik";
import {
  PrincipalDiv,
  CardColaboradorDiv,
  CardColaboradorDivInterna,
  HeaderDiv,
  TituloDiv,
  Texto,
  BotoesDiv,
  Button,
  CardDiv,
  Formulario,
  Select,
  InputDiv,
  Mensagem,
  Label,
} from "./styles";

const InserirTreinamentos = () => {
  const history = useHistory();
  const { colaborador } = React.useContext(AuthContext);
  const [treinamentos, setTreinamentos] = useState([]);

  useEffect(() => {
    api
      .get("/treinamentos")
      .then((response) => setTreinamentos(response.data))
      .catch((err) => {
        console.error("ops! ocorrei um erro" + err);
      });
  }, []);

  const treinamentosMap = treinamentos.map((p, i) => (
    <CardDiv key={i}>
      <CardColaboradorDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Nome: </b>
            {p.nome}
          </p>
          <p>
            <b>Instituição: </b>
            {p.instituicao}
          </p>
        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
          <p>
            <b>Carga horária: </b>
            {p.cargaHoraria}
          </p>
          <p>
            <b>Descrição: </b>
            {p.descricao}
          </p>
        </CardColaboradorDivInterna>
      </CardColaboradorDiv>
      <Formik
        initialValues={{
          status: "Em andamento",
        }}
        onSubmit={async (values) => {
            await api.put(`/colabsTrns/colaborador/${colaborador.idColaboradores}/treinamentoAInserir/${p.idTreinamentos}`,values);
            alert("Put realizado com sucesso!");
            history.push("/colaborador")
        }}
      >
        <Formulario>
          <Mensagem component="span" name="status" />
          <InputDiv>
            <Label for="status">Status</Label>
            <Select component="select" name="status">
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>     
            </Select>
          </InputDiv>
          <BotoesDiv>
          <Button type="submit">Inserir treinamento</Button>
        </BotoesDiv>
        </Formulario>   
      </Formik>
    </CardDiv>
  ));
  return (
    <PrincipalDiv>
      <HeaderDiv>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <TituloDiv>
          <Texto>Treinamentos</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <CardDiv>{treinamentosMap}</CardDiv>
    </PrincipalDiv>
  );
};

export default InserirTreinamentos;
