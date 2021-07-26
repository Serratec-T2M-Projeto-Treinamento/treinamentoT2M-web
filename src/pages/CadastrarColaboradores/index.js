import React, {useState} from "react";
import {
  PrincipalDiv,
  HeaderDiv,
  TituloDiv,
  Texto,
  Input,
  Formulario,
  FormurarioDiv,
  Select,
  ButtonDiv,
  Button,
} from "../CadastrarColaboradores/styles";
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from '../../services/api'

const CadastrarColaboradores = () => {

  const [colaborador, setColaborador] = useState({
    nome:'',
    usuario:'',
    cpf:'',
    email:'',
    dataNascimento:'',
    endereco:{
      rua:'',
      numero:'',
      complemento:'',
      bairro:'',
      cidade:'',
      estado:'',
      cep:''
    }

  });

  async function handleSubmit(event) {
    event.preventDefault();
    await api.post('/cliente',colaborador)
    .then(()=>{alert('Colaborador cadastrado com sucesso')})
    .catch((e)=>{alert('Erro de requisição '+ e)})
  }

  const handleChange = (event) =>{
    event.preventDefault();
    const novoColaborador = {...colaborador}
    novoColaborador[event.target.id] = event.target.value
    setColaborador(novoColaborador)
  }

  const handleChangeEndereco = (event) => {
    event.preventDefault();
    const novoColaborador = {...colaborador}
    novoColaborador.endereco[event.target.id] = event.target.value
    setColaborador(novoColaborador)
  }

  console.log(colaborador);

  return (
    <PrincipalDiv>
      <HeaderDiv>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <TituloDiv>
          <Texto>Cadastro de Colaboladores</Texto>
        </TituloDiv>
        <div style={{width:"225px",height:"10px"}}></div>
      </HeaderDiv>
      <Formulario onSubmit={(event)=>handleSubmit(event)}>
        <FormurarioDiv>
          {/* <Select name="estados-brasil">
            <option value="">Cargo</option>
            <option value="LID">Líder</option>
            <option value="ADM">Administrador</option>
            <option value="COL">Colaborador</option>
          </Select> */}
          <Input onChange={(event)=> handleChange(event)} id='nome' value={colaborador.nome} type="text" placeholder="Nome"></Input>
          <Input onChange={(event)=> handleChange(event)} id='usuario' value={colaborador.usuario} type="text" placeholder="Usuario"></Input>
          <Input onChange={(event)=> handleChange(event)} id='cpf' value={colaborador.cpf} type="text" placeholder="CPF"></Input>
          <Input onChange={(event)=> handleChange(event)} id='email' value={colaborador.email} type="email" placeholder="Email"></Input>
          <Input onChange={(event)=> handleChange(event)} id='dataNascimento' value={colaborador.dataNascimento} type="text" placeholder="Data de nascimento"></Input>
          {/* <Input type="text" placeholder="RG"></Input> */}
          <Input onChange={(event)=> handleChangeEndereco(event)} id='rua' value={colaborador.endereco.rua} type="text" placeholder="Rua"></Input>
        </FormurarioDiv>
        <FormurarioDiv>
          <Input onChange={(event)=> handleChangeEndereco(event)} id='numero' value={colaborador.endereco.numero} type="number" placeholder="Número"></Input>
          <Input onChange={(event)=> handleChangeEndereco(event)} id='complemento' value={colaborador.endereco.complemento} type="text" placeholder="Complemento"></Input>
          <Input onChange={(event)=> handleChangeEndereco(event)} id='bairro' value={colaborador.endereco.bairro} type="text" placeholder="Bairro"></Input>
          <Input onChange={(event)=> handleChangeEndereco(event)} id='cidade' value={colaborador.endereco.cidade} type="text" placeholder="Cidade"></Input>
          {/* <Select name="estados-brasil">
            <option value="">Estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </Select> */}
          <Input onChange={(event)=> handleChangeEndereco(event)} id='estado' value={colaborador.endereco.estado} type="text" placeholder="Estado"></Input>
          <Input onChange={(event)=> handleChangeEndereco(event)} id='cep' value={colaborador.endereco.cep} type="number" placeholder="CEP"></Input>
          {/* <Input type="number" placeholder="Telefone"></Input>
          <Input type="text" placeholder="Conta bancária"></Input>
          <Input type="text" placeholder="PIX"></Input> */}
        </FormurarioDiv>
        <ButtonDiv>
          <Button type='submit'>Cadastrar</Button>
        </ButtonDiv>
      </Formulario>
    </PrincipalDiv>
  );
};

export default CadastrarColaboradores;
