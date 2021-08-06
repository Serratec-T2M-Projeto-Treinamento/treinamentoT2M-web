import React from "react";
import {
  PrincipalDiv,
  HeaderDiv,
  TituloDiv,
  Texto,
  Formulario,
} from "./styles";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../components/Input";
import { Button } from "../../components/Button/styles";


const CadastrarPosicoes = () => {
  const history = useHistory();

  const validations = yup.object().shape({
    nome: yup.string().max(100,({max})=>`Maximo de ${max} caracteres`).required('Nome é obrigatório'),
    descricao: yup.string().max(200,({max})=>`Maximo de ${max} caracteres`).required('Descrição é obrigatório'),
  })

  return (
    <PrincipalDiv>
      <HeaderDiv>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <TituloDiv>
          <Texto>Casdastrar conhecimento</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <Formik
        initialValues={{
          nome: "",
          descricao: "",
        }}
        onSubmit={async (values) => {
            await api.post("/conhecimentos", values);
            alert("Cadastro realizado com sucesso!")
            history.push('/conhecimentos')
        }}
        validationSchema={validations}
      >
        <Formulario>
            <Input name='nome' type='text' label='Nome' placeholder='nome' />
            <Input name='descricao' type='text' label='Descrição' placeholder='descrição' />
            <Button type="submit">Cadastrar conhecimento</Button>
        </Formulario>
      </Formik>
    </PrincipalDiv>
  );
};

export default CadastrarPosicoes;
