import React from 'react';
import { Mensagem, InputDiv, Label, InputComum } from './styles';

const Input = (p) => {
    return (
        <>
            <Mensagem component="span" name={p.name} />
            <InputDiv>
                <Label for={p.name}>{p.label}</Label>
                <InputComum name={p.name} type={p.type} placeholder={p.placeholder} />
            </InputDiv>
        </>
    );
}

export default Input;
