import styled from "styled-components";
import { Form , Field , ErrorMessage} from 'formik'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 400px;
  align-items: center;
  margin: 0;
  height: max-content;
`;
export const Principal = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 150px;
`;
export const Formulario = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 93%;
  background-color: black;
  border-radius: 15px;
  padding: 20px;
  margin-top: 60px;

`;
export const Input = styled(Field)`
  border: none;
  border-radius: 30px;
  height: 30px;
  width: 90%;
  margin: 10px;
  font-size: 18px;
  padding: 5px 15px;
  font-weight: 700;
  &:focus {
    outline:none;
  }
`;
export const Button = styled.button`
  border: none;
  border-radius: 30px;
  height: 40px;
  width: 120%;
  margin: 10px;
  font-size: 18px;
  padding: 5px 15px;
  font-weight: 600;
  background-color: #01a999;
  color: white;
`;
export const Imagem = styled.div`
  width: auto;
  height: auto;
  padding-left: 80px;;
`;

export const Mensagem = styled(ErrorMessage)`
  color: red;
  text-align: center;
`;
