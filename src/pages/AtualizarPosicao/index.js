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

const AtualizarPosicao = () => {
    const history = useHistory();
    const { posicao } = React.useContext(AuthContext);

    const validations = yup.object().shape({
        nome: yup.string().min(5, ({ min }) => `Mínimo de ${min} caracteres`).required("Nome é obrigatório"),
        descricao: yup.string().max(40, ({ max }) => `Maximo de ${max} caracteres`),
    });

    return (
        <PrincipalDiv>
            <HeaderDiv>
                <Link to="/home" style={{ width: "225px" }}>
                    <img src={Logo} alt="Logo" style={{ width: "100%" }} />
                </Link>
                <TituloDiv>
                    <Texto>Atualizar Posição</Texto>
                </TituloDiv>
                <div style={{ width: "225px", height: "10px" }}></div>
            </HeaderDiv>
            <Formik
                initialValues={{
                    nome: posicao.nome,
                    descricao: posicao.descricao,
                }}
                onSubmit={async (values) => {

                    await api.put(`/posicoes/${posicao.idPosicoes}`, values);
                    alert("Put colaborador realizado com sucesso!");
                    history.push("/pesquisatreinamento")
                }}
                validationSchema={validations}
            >
                <Formulario>
                    <Mensagem component="span" name="nome" />
                    <InputDiv>
                        <Label for="nome">Nome</Label>
                        <Input name="nome" type="text" placeholder="Nome"></Input>
                    </InputDiv>
                    <Mensagem component="span" name="descricao" />
                    <InputDiv>
                        <Label for="descricao">Descrição</Label>
                        <Input name="descricao" type="text" placeholder="descricao"></Input>
                    </InputDiv>
                    <ButtonDiv>
                        <Button type="submit">Atualizar</Button>
                    </ButtonDiv>
                </Formulario>
            </Formik>
        </PrincipalDiv>
    );
};

export default AtualizarPosicao;
