import React from "react";
import Logo from "../../components/img/logo.svg";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Principal, Button, Imagem, Input, Formulario, Mensagem } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";

const Login = () => {
  const history = useHistory();
  const { setUsuario } = React.useContext(AuthContext);

  const validations = yup.object().shape({
    usuario: yup.string().required('Insira um usuário valido'),
    senha: yup.string().required('Insira uma senha valida')
  })

  return (
    <Principal>
      <Imagem>
        <img src={Logo} alt="Logo" />
      </Imagem>
      <Formik initialValues={{ usuario: "", senha: "" }} onSubmit={async (values) => {
        const login = { usuario: values.usuario, senha: values.senha }
        try {
          const response = await api.post("/usuarios/login", login);
          const token = response.data.isAtivo
          setUsuario(response.data)
          if (token) {
            return (
              history.push('/home')
            )
          }
        } catch (error) {
          alert('Usuário ou senha incorretos!')
        }
      }} validationSchema={validations}>
            <Formulario>
              <Input
                type="text"
                placeholder="Usuário"
                name='usuario'
              ></Input>
              <Mensagem className="Form-Error" component="span" name="usuario" />
              <Input
                type="password"
                placeholder="Senha"
                name='senha'
              ></Input>
              <Mensagem className="Form-Error" component="span" name="senha" />
              <Button type="submit" descricao="Home" style={{ width: "95%" }}>
                Confirmar
              </Button>
            </Formulario>
      </Formik>
    </Principal>
  );
};

export default Login;
