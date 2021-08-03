import React from "react";
import {
  PrincipalDiv,
  HeaderDiv,
  TituloDiv,
  Texto,
  Input,
  Formulario,
  ButtonDiv,
  Button,
  Mensagem,
  InputMask,
  Label,
  InputDiv,
  Select,
} from "./styles";
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Formik } from "formik";
import * as yup from "yup";


const CadastrarEnderecos = () => {
  const { colaborador } = React.useContext(AuthContext);

  const cepMask = [/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/]

  const validations = yup.object().shape({
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
          <Texto>Cadastro de endereços</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <Formik
        initialValues={{
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
          const responseEndereco = await api.post("/enderecos", endereco);
          const idEndereco = responseEndereco.data.idEnderecos;
          alert("Post endereco realizado com sucesso!");

          const response = await api.put(
            `/colabsEndrs/colaborador/${colaborador.idColaboradores}/enderecoAInserir/${idEndereco}`
          );
          console.log(response.data);
          alert("Put realizado com sucesso!");
        }}
        validationSchema={validations}
      >
        <Formulario>
          <Mensagem component="span" name="rua" />
            <InputDiv>
            <Label for="rua">Rua</Label>
            <Input
              name="rua"
              type="text"
              placeholder="Rua"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="numero" />
            <InputDiv>
            <Label for="numero">Número</Label>
            <Input
              name="numero"
              type="number"
              placeholder="Número"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="complemento"/>
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
            <Input
              name="bairro"
              type="text"
              placeholder="Bairro"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="cidade" />
            <InputDiv>
            <Label for="cidade">Cidade</Label>
            <Input
              name="cidade"
              type="text"
              placeholder="Cidade"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="estado" />
            <InputDiv>
            <Label for="estado">Estado</Label>
            <Select as="select" name="estado">
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
            <Input
              name="pais"
              type="text"
              placeholder="Pais"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="cep" />
            <InputDiv>
            <Label for="cep">CEP</Label>
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
            </InputDiv>
          <ButtonDiv>
            <Button type="submit">Cadastrar</Button>
          </ButtonDiv>
        </Formulario>
      </Formik>
    </PrincipalDiv>
  );
};

export default CadastrarEnderecos;
