import styled from "styled-components";

export const PrincipalDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 90%;
  align-items: center;
`;
export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  min-height: fit-content;
  align-items: center;
  justify-content: center;
`;
export const TituloDiv = styled.div`
  width: 70%;
  min-width: 400px;
  min-height: fit-content;
  color: black;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Texto = styled.h1`
  color: black;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
`;
export const Formulario = styled.form`
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 90%;
  min-height: fit-content;
  min-width: 400px;
  background-color: black;
  border-radius: 15px;
  padding: 20px 0;
  margin-top: 30px;
`;
export const FormurarioDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  min-height: fit-content;
  min-width: 400px;
`;
export const Input = styled.input`
  color:grey;
  border: none;
  border-radius: 30px;
  width: 90%;
  margin: 10px;
  font-size: 20px;
  padding:15px;
  font-weight: 700;
  &:focus {
    outline:none;
  }
`;

export const Select = styled.select`
  color:grey;
  border: none;
  border-radius: 30px;
  width: 94%;
  margin: 10px;
  font-size: 20px;
  padding:15px;
  font-weight: 700;
  &:focus {
    outline:none;
  }
`;
export const ButtonDiv = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
export const Button = styled.button`
  border: none;
  border-radius: 30px;
  width: 100%;
  font-size: 20px;
  padding: 15px;
  font-weight: 600;
  background-color: #01a999;
  color: white;
`;
