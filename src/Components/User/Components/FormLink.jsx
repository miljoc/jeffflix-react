import React from 'react';
import { FormLinkPara, Links } from '../Styles';

type Props = {
    strapline: string,
    to: string,
    value: string,
};

const FormLink = ({ strapline, to, value }: Props) => (
    <FormLinkPara>
        {strapline}
        <Links to={to} title={value}>
            {value}
        </Links>
    </FormLinkPara>
);

export default FormLink;
