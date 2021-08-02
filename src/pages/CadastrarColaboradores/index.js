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
} from "../CadastrarColaboradores/styles";
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import * as yup from "yup";

const CadastrarColaboradores = () => {
  const [posicoes, setPosicoes] = useState([]);

  const { usuario } = React.useContext(AuthContext);

  useEffect(() => {
    api
      .get("/posicoes", { auth: { username: "t2m", password: "123456" } })
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

  const [colaborador, setColaborador] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
    pix: "",
    cpf: "",
    rg: "",
    cnh: "",
    permissao: 0,
    posicao: {
      idPosicoes: 1,
    },
  });
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    pais: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
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
  }

  const handleChange = (event) => {
    event.preventDefault();
    const novoColaborador = { ...colaborador };
    novoColaborador[event.target.id] = event.target.value;
    setColaborador(novoColaborador);
  };

  const handleChangeData = (event) => {
    event.preventDefault();
    const novoColaborador = { ...colaborador };
    novoColaborador[event.target.id] = event.target.value;
    setColaborador(novoColaborador);
  };

  const handleChangePermissao = (event) => {
    event.preventDefault();
    const novoColaborador = { ...colaborador };
    novoColaborador[event.target.id] = parseInt(event.target.value);
    setColaborador(novoColaborador);
  };
  function handlePermissao (p){
    
    if(p){
      return(
      <option value="2">Administrador</option>
      )}}
  ;
    

  const handleChangePosicao = (event) => {
    event.preventDefault();
    const novoColaborador = { ...colaborador };
    novoColaborador[event.target.id].idPosicoes = parseInt(event.target.value);
    setColaborador(novoColaborador);
  };

  const handleChangeEndereco = (event) => {
    event.preventDefault();
    const novoEndereco = { ...endereco };
    novoEndereco[event.target.id] = event.target.value;
    setEndereco(novoEndereco);
  };

  let colaboradorSchema = yup.object().shape({
    nome: yup.string().required(),
    dataNascimento: yup.date().required(),
    email: yup.string().email().required(),
    pix: yup.string().required(),
    cpf: yup.string().required(),
    rg: yup.string().required(),
    cnh: yup.string().required()
  })

  colaboradorSchema.isValid(colaborador).then(valid => {
    console.log(valid)
    })
    
  let enderecoSchema = yup.object().shape({
    rua: yup.string().required(),
    numero: yup.number().positive().integer().required(),
    complemento: yup.string(),
    bairro: yup.string().required(),
    cidade: yup.string().required(),
    estado: yup.string().required(),
    cep: yup.number().positive().integer().required(),
    pais: yup.string().required()
  })

  enderecoSchema.isValid(endereco).then(valid => {
    console.log(valid)
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
      <Formulario onSubmit={(event) => handleSubmit(event)}>
        <FormurarioDiv>
          <Input
            onChange={(event) => handleChange(event)}
            id="nome"
            value={colaborador.nome}
            type="text"
            placeholder="Nome"
          ></Input>
          <Input
            onChange={(event) => handleChange(event)}
            id="cnh"
            value={colaborador.cnh}
            type="text"
            placeholder="CNH"
          ></Input>
          <Input
            onChange={(event) => handleChange(event)}
            id="cpf"
            value={colaborador.cpf}
            type="text"
            placeholder="CPF"
          ></Input>
          <Input
            onChange={(event) => handleChange(event)}
            id="rg"
            value={colaborador.rg}
            type="text"
            placeholder="RG"
          ></Input>
          <Input
            onChange={(event) => handleChange(event)}
            id="email"
            value={colaborador.email}
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            onChange={(event) => handleChangeData(event)}
            id="dataNascimento"
            value={colaborador.dataNascimento}
            type="text"
            placeholder="Data de nascimento"
          ></Input>
          <Select
            onChange={(event) => handleChangePermissao(event)}
            id="permissao">
            <option value="0">Colaborador</option>
            <option value="1">Lider</option>
            {handlePermissao(usuario.isAdmin)}
          </Select>
          <Select onChange={(event) => handleChangePosicao(event)} id="posicao">
            {posicoesSelect}
          </Select>
          <Input
            onChange={(event) => handleChange(event)}
            id="pix"
            value={colaborador.pix}
            type="text"
            placeholder="PIX"
          ></Input>
        </FormurarioDiv>
        <FormurarioDiv>
          <TituloEndereco><p style={{margin:"0"}}>Endereço:</p></TituloEndereco>
          <Input
            onChange={(event) => handleChangeEndereco(event)}
            id="rua"
            value={endereco.rua}
            type="text"
            placeholder="Rua"
          ></Input>
          <Input
            onChange={(event) => handleChangeEndereco(event)}
            id="numero"
            value={endereco.numero}
            type="number"
            placeholder="Número"
          ></Input>
          <Input
            onChange={(event) => handleChangeEndereco(event)}
            id="complemento"
            value={endereco.complemento}
            type="text"
            placeholder="Complemento"
          ></Input>
          <Input
            onChange={(event) => handleChangeEndereco(event)}
            id="bairro"
            value={endereco.bairro}
            type="text"
            placeholder="Bairro"
          ></Input>
          <Input
            onChange={(event) => handleChangeEndereco(event)}
            id="cidade"
            value={endereco.cidade}
            type="text"
            placeholder="Cidade"
          ></Input>
          <Input
            onChange={(event) => handleChangeEndereco(event)}
            id="estado"
            value={endereco.estado}
            type="text"
            placeholder="Estado"
          ></Input>
          <Input
            onChange={(event) => handleChangeEndereco(event)}
            id="pais"
            value={endereco.pais}
            type="text"
            placeholder="Pais"
          ></Input>
          <Input
            onChange={(event) => handleChangeEndereco(event)}
            id="cep"
            value={endereco.cep}
            type="text"
            placeholder="CEP"
          ></Input>
        </FormurarioDiv>
        <ButtonDiv>
          <Button type="submit">Cadastrar</Button>
        </ButtonDiv>
      </Formulario>
    </PrincipalDiv>
  );
};

export default CadastrarColaboradores;
