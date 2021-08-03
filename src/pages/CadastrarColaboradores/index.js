import React, { useState, useEffect } from "react";
import {
  PrincipalDiv,
  HeaderDiv,
  TituloDiv,
  Texto,
  Input,
  Formulario,
  FormurarioDiv,
  ButtonDiv,
  Button,
  Select,
  TituloEndereco,
  Mensagem,
  InputMask
} from "../CadastrarColaboradores/styles";
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Formik } from "formik";
import * as yup from "yup";

const CadastrarColaboradores = () => {
  const [posicoes, setPosicoes] = useState([]);
  const { usuario } = React.useContext(AuthContext);

  useEffect(() => {
    api
      .get("/posicoes")
      .then((response) => setPosicoes(response.data))
      .catch((err) => {
        console.error("ops! ocorrei um erro" + err);
      });
  }, []);

  const posicoesSelect = posicoes.map((p, i) => (
    <option key={i} value={p.idPosicoes}>
      {p.nome}
    </option>
  ));

  function handlePermissao(p) {
    if (p) {
      return (
        <option value={2}>Administrador</option>
      )
    }
  }
  ;
  const cpfMask = [/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,/\d/]
  const rgMask = [/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/]
  const cepMask = [/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/]

  const validations = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    dataNascimento: yup.date('Inserir uma data valida').required('Data de nascimento é obrigatória'),
    email: yup.string().email('Inserir um email valido').max(30,({max})=>`Maximo de ${max} caracteres`).required('Email é obrigatório'),
    pix: yup.string().max(40,({max})=>`Maximo de ${max} caracteres`),
    cpf: yup.string().required('CPF é obrigatório'),
    rg: yup.string().required('RG é obrigatório'),
    cnh: yup.string().max(1,({max})=>`Maximo de ${max} caracteres`).required('Categoria CHN é obrigatória'),
    rua: yup.string().max(100,({max})=>`Maximo de ${max} caracteres`).required('Rua é obrigatório'),
    numero: yup.string().max(10,({max})=>`Maximo de ${max} caracteres`).required('Numero é obrigatório'),
    complemento: yup.string().max(15,({max})=>`Maximo de ${max} caracteres`),
    bairro: yup.string().max(50,({max})=>`Maximo de ${max} caracteres`).required('Bairro é obrigatório'),
    cidade: yup.string().max(50,({max})=>`Maximo de ${max} caracteres`).required('Cidade é obrigatório'),
    estado: yup.string().max(2,({max})=>`Maximo de ${max} caracteres`).required('Estado é obrigatório'),
    cep: yup.string().required('CEP é obrigatório'),
    pais: yup.string().max(15,({max})=>`Maximo de ${max} caracteres`).required('Pais é obrigatório')
  })

  return (
    <PrincipalDiv>
      <HeaderDiv>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <TituloDiv>
          <Texto>Cadastro de Colaboladores</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <Formik
        initialValues={{
          nome: "",
          dataNascimento: "",
          email: "",
          pix: "",
          cpf: "",
          rg: "",
          cnh: "",
          permissao: 0,
          idPosicoes: 1,
          rua: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: "",
          cep: "",
          pais: ""
        }}
        onSubmit={async (values) => {
          const colaborador = {
            nome: values.nome,
            dataNascimento: values.dataNascimento,
            email: values.email,
            pix: values.pix,
            cpf: values.cpf,
            rg: values.rg,
            cnh: values.cnh,
            permissao: values.permissao,
            posicao: {
              idPosicoes: values.idPosicoes,
            }
          }
          const endereco = {
            rua: values.rua,
            numero: values.numero,
            complemento: values.complemento,
            bairro: values.bairro,
            cidade: values.cidade,
            estado: values.estado,
            cep: values.cep,
            pais: values.pais
          }
          const responseColaborador = await api.post("/colaboradores", colaborador);
          const idColaborador = responseColaborador.data.idColaboradores;
          alert("Post colaborador realizado com sucesso!");

          const responseEndereco = await api.post("/enderecos", endereco);
          const idEndereco = responseEndereco.data.idEnderecos;
          alert("Post endereco realizado com sucesso!");

          const response = await api.put(
            `/colabsEndrs/colaborador/${idColaborador}/enderecoAInserir/${idEndereco}`
          );
          console.log(response.data);
          alert("Put realizado com sucesso!");
        }}
        validationSchema={validations}
      >
        <Formulario>
          <FormurarioDiv>
            <Input
              name="nome"
              type="text"
              placeholder="Nome"
            ></Input>
            <Mensagem component="span" name="nome" />
            <Input
              name="cnh"
              type="text"
              placeholder="Categoria CNH"
            ></Input>
            <Mensagem component="span" name="cnh" />
            <Input
              name="cpf"
              render={({field})=>(
                <InputMask
                {...field}
                type="text"
                placeholder="CPF"
                mask={cpfMask}
                />
              )}
              
            ></Input>
            <Mensagem component="span" name="cpf" />
            <Input
              name="rg"
              render={({field})=>(
                <InputMask
                {...field}
                type="text"
                placeholder="RG"
                mask={rgMask}
                />
              )}
            ></Input>
            <Mensagem component="span" name="rg" />
            <Input
              name="email"
              type="email"
              placeholder="Email"
            ></Input>
            <Mensagem component="span" name="email" />
            <Input
              name="dataNascimento"
              type="date"
              placeholder="Data de nascimento"
            ></Input>
            <Mensagem component="span" name="dataNascimento" />
            <Select
              as="select"
              name="permissao">
              <option value={0}>Colaborador</option>
              <option value={1}>Lider</option>
              {handlePermissao(usuario.isAdmin)}
            </Select>
            <Select
              as="select"
              name="idPosicoes">
              {posicoesSelect}
            </Select>
            <Input
              name="pix"
              type="text"
              placeholder="PIX"
            ></Input>
            <Mensagem component="span" name="pix" />
          </FormurarioDiv>
          <FormurarioDiv>
            <TituloEndereco><p style={{ margin: "0" }}>Endereço:</p></TituloEndereco>
            <Input
              name="rua"
              type="text"
              placeholder="Rua"
            ></Input>
            <Mensagem component="span" name="rua" />
            <Input
              name="numero"
              type="number"
              placeholder="Número"
            ></Input>
            <Mensagem component="span" name="numero" />
            <Input
              name="complemento"
              type="text"
              placeholder="Complemento"
            ></Input>
            <Input
              name="bairro"
              type="text"
              placeholder="Bairro"
            ></Input>
            <Mensagem component="span" name="bairro" />
            <Input
              name="cidade"
              type="text"
              placeholder="Cidade"
            ></Input>
            <Mensagem component="span" name="cidade" />
            <Input
              name="estado"
              type="text"
              placeholder="Estado"
            ></Input>
            <Mensagem component="span" name="estado" />
            <Input
              name="pais"
              type="text"
              placeholder="Pais"
            ></Input>
            <Mensagem component="span" name="pais" />
            <Input
              name="cep"
              render={({field})=>(
                <InputMask
                {...field}
                type="text"
                placeholder="CEP"
                mask={cepMask}
                />
              )}
            ></Input>
            <Mensagem component="span" name="cep" />
          </FormurarioDiv>
          <ButtonDiv>
            <Button type="submit">Cadastrar</Button>
          </ButtonDiv>
        </Formulario>
      </Formik>
    </PrincipalDiv>
  );
};

export default CadastrarColaboradores;
