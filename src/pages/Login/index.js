import React from "react";
import Logo from "../../components/img/logo.svg";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Principal, Button, Imagem, Input, Formulario } from "./styles";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";

const Login = () => {
  const history = useHistory();
  const { setUsuario } = React.useContext(AuthContext);

   const validations = yup.object().shape({
    usuario: yup.string().required(),
    senha: yup.string().min(4).required()
   })

  return (
    <Principal>
      <Imagem>
        <img src={Logo} alt="Logo" />
      </Imagem>
      <Formik initialValues={{usuario:"",senha:""}} onSubmit={async(values)=>{
        const login = {usuario:values.usuario,senha:values.senha}
        try {
          const response = await api.post("/usuarios/login", login);
          const token = response.data.isAtivo
          setUsuario(response.data)
          console.log(response);
          if (token) {
            return (
              history.push('/home')
            )
          }
          
        } catch (error) {
          console.error(error);
          alert("Usuário ou senha incorreto(s)");
        }
      }} validationSchema={validations}>
        {
          ({handleBlur, handleChange, handleSubmit, values}) => (
            <Formulario onSubmit={handleSubmit}>
        <Input 
          onBlur={handleBlur}  
          onChange={handleChange}
          value={values.usuario}
          type="text"
          placeholder="Usuário"
          name='usuario'
        ></Input>
        <ErrorMessage className="Form-Error" component="span" name="usuario"/>
        <Input
          onBlur={handleBlur}  
          onChange={handleChange}
          value={values.senha}
          type="password"
          placeholder="Senha"
          name='senha'
        ></Input>
        <ErrorMessage className="Form-Error" component="span" name="senha"/>
        <Button type="submit" descricao="Home" style={{ width: "95%" }}>
          Confirmar
        </Button>
        </Formulario>
          )}  
      </Formik>
    </Principal>
  );
};

export default Login;
