import React, { useEffect, useState } from "react";
import Logo from "../../components/img/logo.svg";
import { Link } from "react-router-dom";
import {
  Button,
  Principal,
  Imagem,
  Botoes,
  Input,
  Card,
  Cards,
} from "../PesquisaColaborador/styles";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";

const PesquisaColaborador = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const { colaborador, setColaborador } = React.useContext(AuthContext);
  console.log(colaborador)

  useEffect(() => {
    api.get("/colaboradores", {auth:{username:'t2m', password:'123456'}})
      .then((response) => setColaboradores(response.data))
      .catch((err) => {
        console.error("ops! ocorrei um erro" + err);
      });
  }, []);


  const colab = colaboradores.map((p, i) => (
    <Link
      key={i}
      to="/colaborador"
      onClick={() => setColaborador(p)}
      style={{ width: "45%", height: "50px", margin: "8px 30px", textDecoration: "none" }}>
      <Card>
        <p>{p.nome}</p>
      </Card>
    </Link>
  ));

  return (
    <Principal>
      <Imagem>
        <Link to="/home" style={{ width: "20%" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <Input
          type="text"
          placeholder="Pesquisar Colaborador"
        ></Input>
        <Botoes>
          <Link to="/cadastrarcolaboradores" style={{ width: "100%", marginBottom: "18%" }}>
            <Button descricao="CadastrarColaboradores">
              Adicionar Colaboradores
            </Button>
          </Link>
        </Botoes>
      </Imagem>
      <Cards>
        {colab}
      </Cards>
    </Principal>
  );
};

export default PesquisaColaborador;
