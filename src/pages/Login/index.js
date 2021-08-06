import React,{useState} from "react";
import Logo from "../../components/img/logo.svg";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Formik } from "formik";
import * as yup from "yup";
import { DivPrincipal } from "../../components/DivPrincipal/styles";
import { BigLogo } from "../../components/BigLogo/styles";
import { Formulario } from "../../components/Formulario/styles";
import Input from "../../components/Input";
import { Button } from "../../components/Button/styles";
import Alerta from "../../components/Alerta";



const Login = () => {
  const history = useHistory();
  const { setUsuario } = React.useContext(AuthContext);
  const [senhaErrada, setSenhaErrada] = useState(false);

  const validations = yup.object().shape({
    usuario: yup.string().required('Insira um usuário valido'),
    senha: yup.string().required('Insira uma senha valida')
  })

  return (
    <DivPrincipal>
      <Alerta isOpen={senhaErrada} func={setSenhaErrada} />
        <BigLogo src={Logo} alt="Logo" />
      <Formik initialValues={{ usuario: "", senha: "" }} onSubmit={async (values) => {
        try {
          const response = await api.post("/usuarios/login", values);
          const token = response.data.isAtivo
          setUsuario(response.data)
          if (token) {
            return (
              history.push('/home')
            )
          }
        } catch {
          setSenhaErrada(true);
        }
      }} validationSchema={validations}>
            <Formulario>
              <Input name='usuario' type='text' label='Usuário' placeholder='usuário' />
              <Input name='senha' type='password' label='Senha' placeholder='senha' />
              <Button type="submit"> Confirmar </Button>
            </Formulario>
      </Formik>
    </DivPrincipal>
  );
};

export default Login;
