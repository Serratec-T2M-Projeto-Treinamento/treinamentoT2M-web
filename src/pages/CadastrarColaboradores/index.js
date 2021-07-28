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
  Select
} from "../CadastrarColaboradores/styles";
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from '../../services/api'

const CadastrarColaboradores = () => {
  const [idColaborador, setIdColaborador] = useState(0)
  const [idEndereco, setIdEndereco] = useState(0)
  const [posicoes, setPosicoes] = useState([]);

  useEffect(() => {
    api.get("/posicoes", {auth:{username:'t2m', password:'123456'}})
      .then((response) => setPosicoes(response.data))
      .catch((err) => {
        console.error("ops! ocorrei um erro" + err);
      });
  }, []);

  const posicoesSelect = posicoes.map((p, i) => (
    <option key={i} value={p.idPosicoes}>{p.nome}</option>
  ));

  const [colaborador, setColaborador] = useState({
    nome: '',
    cnh: '',
    rg: '',
    cpf: '',
    contaBancaria: 0,
    email: '',
    dataNascimento: '',
    pix: '',
    posicao: {
      idPosicoes: 1
    },
    permissao: 0,
    setColaboradoresEnderecos: [
      {
        idColaboradoresEnderecos: {
          idColaborador: idColaborador,
          idEndereco: idEndereco
        }
      }
    ],

  });
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    pais: ''

  });

  async function handleSubmit(event) {
    event.preventDefault();

    // await api.post('/enderecos', endereco)
    //   .then((response) => { setIdEndereco(response.data.id) })
    //   .catch((e) => { alert('Endereço inválido ' + e) })

    // await api.post('/colaboradores', colaborador)
    //   .then((response) => { setIdColaborador(response.data.id) })
    //   .catch((e) => { alert('Colaborador inválido ' + e) })

    // await api.put(`/colaboradores/${idColaborador}/endereco/${idEndereco}`, colaborador)
    //   .then(() => { alert('Cadastro ralizado com sucesso! ') })
    //   .catch((e) => { alert('Colaborador inválido ' + e) })
    console.log(colaborador)
    console.log(endereco)
  }

  const handleChange = (event) => {
    event.preventDefault();
    const novoColaborador = { ...colaborador }
    novoColaborador[event.target.id] = event.target.value
    setColaborador(novoColaborador)
  }

  const handleChangePermissao = (event) => {
    event.preventDefault();
    const novoColaborador = { ...colaborador }
    novoColaborador[event.target.id] = parseInt(event.target.value)
    setColaborador(novoColaborador)
  }

  const handleChangePosicao = (event) => {
    event.preventDefault();
    const novoColaborador = { ...colaborador }
    novoColaborador[event.target.id].idPosicoes = parseInt(event.target.value)
    setColaborador(novoColaborador)
  }

  const handleChangeEndereco = (event) => {
    event.preventDefault();
    const novoEndereco = { ...endereco }
    novoEndereco[event.target.id] = event.target.value
    setEndereco(novoEndereco)
  }

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
          <Input onChange={(event) => handleChange(event)} id='nome' value={colaborador.nome} type="text" placeholder="Nome"></Input>
          <Input onChange={(event) => handleChange(event)} id='cnh' value={colaborador.cnh} type="text" placeholder="CNH"></Input>
          <Input onChange={(event) => handleChange(event)} id='cpf' value={colaborador.cpf} type="text" placeholder="CPF"></Input>
          <Input onChange={(event) => handleChange(event)} id='rg' value={colaborador.rg} type="text" placeholder="RG"></Input>
          <Input onChange={(event) => handleChange(event)} id='email' value={colaborador.email} type="email" placeholder="Email"></Input>
          <Input onChange={(event) => handleChange(event)} id='dataNascimento' value={colaborador.dataNascimento} type="date" placeholder="Data de nascimento"></Input>
          <Select onChange={(event) => handleChangePermissao(event)} id='permissao'>
            <option value='0'>Colaborador</option>
            <option value='1'>Lider</option>
            <option value='2'>Administrador</option>
          </Select>
          <Select onChange={(event) => handleChangePosicao(event)} id='posicao'>
            {posicoesSelect}
          </Select>
          <Input onChange={(event) => handleChange(event)} id='contaBancaria' value={colaborador.contaBancaria} type="number" placeholder="Conta Bancaria"></Input>

        </FormurarioDiv>
        <FormurarioDiv>
          <Input onChange={(event) => handleChange(event)} id='pix' value={colaborador.pix} type="text" placeholder="PIX"></Input>
          <Input onChange={(event) => handleChangeEndereco(event)} id='rua' value={endereco.rua} type="text" placeholder="Rua"></Input>
          <Input onChange={(event) => handleChangeEndereco(event)} id='numero' value={endereco.numero} type="number" placeholder="Número"></Input>
          <Input onChange={(event) => handleChangeEndereco(event)} id='complemento' value={endereco.complemento} type="text" placeholder="Complemento"></Input>
          <Input onChange={(event) => handleChangeEndereco(event)} id='bairro' value={endereco.bairro} type="text" placeholder="Bairro"></Input>
          <Input onChange={(event) => handleChangeEndereco(event)} id='cidade' value={endereco.cidade} type="text" placeholder="Cidade"></Input>
          <Input onChange={(event) => handleChangeEndereco(event)} id='estado' value={endereco.estado} type="text" placeholder="Estado"></Input>
          <Input onChange={(event) => handleChangeEndereco(event)} id='pais' value={endereco.pais} type="text" placeholder="Pais"></Input>
          <Input onChange={(event) => handleChangeEndereco(event)} id='cep' value={endereco.cep} type="number" placeholder="CEP"></Input>
        </FormurarioDiv>
        <ButtonDiv>
          <Button type='submit'>Cadastrar</Button>
        </ButtonDiv>
      </Formulario>
    </PrincipalDiv>
  );
};

export default CadastrarColaboradores;
