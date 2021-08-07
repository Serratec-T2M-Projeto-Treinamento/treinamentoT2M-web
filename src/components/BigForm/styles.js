import { Form } from "formik";
import styled from "styled-components";

export const BigForm = styled(Form)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 90%;
  min-height: fit-content;
  min-width: 400px;
  background-color: #000;
  border-radius: 15px;
  padding: 20px 0;
  margin-top: 40px;
`;
