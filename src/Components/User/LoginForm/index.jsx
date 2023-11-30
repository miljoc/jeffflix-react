// @flow
import React from 'react';

import LogoIcon from 'Components/Logo/LogoIcon';
import Title from '../Components/Title';
import Input from '../Components/Input';
import Button from '../Components/Button';
import FormLink from '../Components/FormLink';

import * as S from '../Styles';

type Props = {
    error: boolean,
    username: string,
    password: string,
    onChange: Function,
    onSubmit: Function,
};

const LoginForm = ({ error, onChange, onSubmit, username, password }: Props) => (
    <S.FormWrap
        onSubmit={(e) => {
            e.preventDefault();
        }}
        error={error}
    >
        <LogoIcon alt="Jeffflix" height="75" />
        <Title heading="Welkom terug!" sub="Login om door te gaan" />

        <Input
            type="text"
            name="username"
            value={username}
            autocomplete="username"
            placeholder="Gebruikersnaam"
            handleChange={onChange}
            className="input-light"
        />

        <Input
            type="password"
            name="password"
            value={password}
            autocomplete="password"
            placeholder="Wachtwoord"
            handleChange={onChange}
            className="input-light"
        />

        <Button callback={onSubmit}>Login</Button>
        <FormLink to="/register" strapline="Nieuw hier?" value="Maak een account" setup={false} />
    </S.FormWrap>
);

export default LoginForm;
