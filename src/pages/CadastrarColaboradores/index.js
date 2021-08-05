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
  InputMask,
  Label,
  InputDiv,
} from "../CadastrarColaboradores/styles";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Formik } from "formik";
import * as yup from "yup";

const CadastrarColaboradores = () => {
  const history = useHistory();
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
      return <option value={2}>Administrador</option>;
    }
  }
  const cpfMask = [/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,/\d/,];
  const rgMask = [/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,];
  const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

  const validations = yup.object().shape({
    nome: yup.string().min(5, ({min}) => `Mínimo de ${min} caracteres`).required("Nome é obrigatório"),
    dataNascimento: yup
      .date("Inserir uma data valida")
      .required("Data de nascimento é obrigatória"),
    email: yup
      .string()
      .email("Inserir um email valido")
      .max(30, ({ max }) => `Maximo de ${max} caracteres`)
      .required("Email é obrigatório"),
    pix: yup.string().max(40, ({ max }) => `Maximo de ${max} caracteres`),
    cpf: yup.string().required("CPF é obrigatório"),
    rg: yup.string().required("RG é obrigatório"),
    rua: yup
      .string()
      .max(100, ({ max }) => `Maximo de ${max} caracteres`)
      .required("Rua é obrigatório"),
    numero: yup
      .string()
      .max(10, ({ max }) => `Maximo de ${max} caracteres`)
      .required("Numero é obrigatório"),
    complemento: yup
      .string()
      .max(15, ({ max }) => `Maximo de ${max} caracteres`),
    bairro: yup
      .string()
      .max(50, ({ max }) => `Maximo de ${max} caracteres`)
      .required("Bairro é obrigatório"),
    cidade: yup
      .string()
      .max(50, ({ max }) => `Maximo de ${max} caracteres`)
      .required("Cidade é obrigatório"),
    estado: yup.string().required("Estado é obrigatório"),
    cep: yup.string().required("CEP é obrigatório"),
    pais: yup
      .string()
      .max(15, ({ max }) => `Maximo de ${max} caracteres`)
      .required("Pais é obrigatório"),
  });

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
          pais: "",
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
            },
          };
          const endereco = {
            rua: values.rua,
            numero: values.numero,
            complemento: values.complemento,
            bairro: values.bairro,
            cidade: values.cidade,
            estado: values.estado,
            cep: values.cep,
            pais: values.pais,
          };
          console.log(colaborador);
          console.log(endereco);
          const responseColaborador = await api.post(
            "/colaboradores",
            colaborador
          );
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
          history.push("/pesquisacolaborador")
        }}
        validationSchema={validations}
      >
        <Formulario>
          <FormurarioDiv>
            <Mensagem component="span" name="nome" />
            <InputDiv>
              <Label for="nome">Nome</Label>
              <Input name="nome" type="text" placeholder="Nome"></Input>
            </InputDiv>
            <Mensagem component="span" name="cnh" />
            <InputDiv>
              <Label for="cnh">CNH</Label>
              <Select component="select" name="cnh">
                <option value="">Sem CNH</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="AB">AB</option>
              </Select>
            </InputDiv>
            <Mensagem component="span" name="cpf" />
            <InputDiv>
              <Label for="cpf">CPF</Label>
              <Input
                name="cpf"
                render={({ field }) => (
                  <InputMask
                    {...field}
                    type="text"
                    placeholder="CPF"
                    mask={cpfMask}
                  />
                )}
              ></Input>
            </InputDiv>
            <Mensagem component="span" name="rg" />
            <InputDiv>
              <Label for="rg">RG</Label>
              <Input
                name="rg"
                render={({ field }) => (
                  <InputMask
                    {...field}
                    type="text"
                    placeholder="RG"
                    mask={rgMask}
                  />
                )}
              ></Input>
            </InputDiv>
            <Mensagem component="span" name="email" />
            <InputDiv>
              <Label for="email">Email</Label>
              <Input name="email" type="email" placeholder="Email"></Input>
            </InputDiv>
            <Mensagem component="span" name="dataNascimento" />
            <InputDiv>
              <Label for="dataNascimento">Data de nascimento</Label>
              <Input
                name="dataNascimento"
                type="date"
                placeholder="Data de nascimento"
              ></Input>
            </InputDiv>
            <InputDiv>
              <Label for="permissao">Permissão</Label>
              <Select component="select" name="permissao">
                <option value={0}>Colaborador</option>
                <option value={1}>Lider</option>
                {handlePermissao(usuario.isAdmin)}
              </Select>
            </InputDiv>
            <InputDiv>
              <Label for="posicoes">Posições</Label>
              <Select component="select" name="idPosicoes">
                {posicoesSelect}
              </Select>
            </InputDiv>
            <Mensagem component="span" name="pix" />
            <InputDiv>
              <Label for="nome">PIX</Label>
              <Input name="pix" type="text" placeholder="PIX"></Input>
            </InputDiv>
          </FormurarioDiv>
          <FormurarioDiv>
            <TituloEndereco>
              <p style={{ margin: "0" }}>Endereço:</p>
            </TituloEndereco>
            <Mensagem component="span" name="rua" />
            <InputDiv>
              <Label for="rua">Rua</Label>
              <Input name="rua" type="text" placeholder="Rua"></Input>
            </InputDiv>
            <Mensagem component="span" name="numero" />
            <InputDiv>
              <Label for="numero">Número</Label>
              <Input name="numero" type="number" placeholder="Número"></Input>
            </InputDiv>
            <Mensagem component="span" name="complemento" />
            <InputDiv>
              <Label for="complemento">Complemento</Label>
              <Input
                name="complemento"
                type="text"
                placeholder="Complemento"
              ></Input>
            </InputDiv>
            <Mensagem component="span" name="bairro" />
            <InputDiv>
              <Label for="bairro">Bairro</Label>
              <Input name="bairro" type="text" placeholder="Bairro"></Input>
            </InputDiv>
            <Mensagem component="span" name="cidade" />
            <InputDiv>
              <Label for="cidade">Cidade</Label>
              <Input name="cidade" type="text" placeholder="Cidade"></Input>
            </InputDiv>
            <Mensagem component="span" name="estado" />
            <InputDiv>
              <Label for="estado">Estado</Label>
              <Select component="select" name="estado">
                <option value="">Selecione um estado</option>
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
              </Select>
            </InputDiv>
            <Mensagem component="span" name="pais" />
            <InputDiv>
              <Label for="pais">País</Label>
              <Input name="pais" type="text" placeholder="Pais"></Input>
            </InputDiv>
            <Mensagem component="span" name="cep" />
            <InputDiv>
              <Label for="cep">CEP</Label>
              <Input
                name="cep"
                render={({ field }) => (
                  <InputMask
                    {...field}
                    type="text"
                    placeholder="CEP"
                    mask={cepMask}
                  />
                )}
              ></Input>
            </InputDiv>
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
