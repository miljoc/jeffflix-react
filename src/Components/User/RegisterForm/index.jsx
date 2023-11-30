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
    initialSetup: boolean,
    username: string,
    password: string,
    inviteCode: string,
    onChange: Function,
    onSubmit: Function,
};

const RegisterForm = ({ error, onChange, onSubmit, initialSetup, username, password, inviteCode = null }: Props) => {
    const heading = initialSetup ? 'Welcome To Olaris' : 'Jeffflix';
    const title = initialSetup ? 'Setup your admin account' : 'Maak Account';
    const warning = 'You are currently creating your admin account ensure you remember your details';

    return (
        <>
            {initialSetup && <S.Help>{warning}</S.Help>}
            <S.FormWrap
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                error={error}
            >
                <LogoIcon alt="Jeffflix" height="35" />
                <Title heading={heading} sub={title} />

                {!initialSetup && (
                    <Input
                        type="text"
                        value={inviteCode}
                        name="inviteCode"
                        autocomplete="inviteCode"
                        placeholder="Uitnodigingscode"
                        handleChange={onChange}
                        uniqueCode
                        className='input-light'
                    />
                )}
                <Input
                    type="text"
                    name="username"
                    value={username}
                    autocomplete="new-username"
                    placeholder="Gebruikersnaam"
                    required
                    handleChange={onChange}
                    className='input-light'
                />
                <Input
                    type="password"
                    name="password"
                    value={password}
                    autocomplete="new-password"
                    placeholder="Wachtwoord"
                    required
                    handleChange={onChange}
                    className='input-light'
                />
                <Button callback={onSubmit}>Maak Account</Button>

                {!initialSetup && 
                <FormLink to="/login" strapline="Heb je al een account?" value="Inloggen" setup={false} />}
            </S.FormWrap>
        </>
    );
};

export default RegisterForm;
