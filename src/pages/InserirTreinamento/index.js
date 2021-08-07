import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Formik } from "formik";
import {
  CardColaboradorDiv,
  CardColaboradorDivInterna,
  BotoesDiv,
  Button,
  CardDiv,
  Select,
  InputDiv,
  Mensagem,
  Label,
} from "./styles";
import { DivPrincipal } from "../../components/DivPrincipal/styles";
import { DivHeader } from "../../components/DivHeader/styles"
import { DivTitulo } from "../../components/DivTitulo/styles";
import { Titulos } from "../../components/Titulos/styles";
import { BigForm } from "../../components/BigForm/styles";

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
        <BigForm>
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
        </BigForm>   
      </Formik>
    </CardDiv>
  ));
  return (
    <DivPrincipal>
      <DivHeader>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <DivTitulo>
          <Titulos>Treinamentos</Titulos>
        </DivTitulo>
        <div style={{ width: "225px", height: "10px" }}></div>
      </DivHeader>
      <CardDiv>{treinamentosMap}</CardDiv>
    </DivPrincipal>
  );
};

export default InserirTreinamentos;
