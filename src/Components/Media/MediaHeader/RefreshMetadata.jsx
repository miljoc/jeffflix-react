import React, { useState } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { useAlert } from 'react-alert';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import REFRESH_METADATA from 'Mutations/refreshMetadata';

import { HeaderIconWrap, HeaderIcon } from './Styles';

type Props = {
    uuid: string,
    mutate: Function,
};

const RefreshMetadata = ({ uuid, mutate }: Props) => {
    const [disabled, setDisabled] = useState(false);
    const alert = useAlert();

    const refreshMetadata = () =>
        mutate({
            variables: { uuid },
        }).then(() => {
            setDisabled(true);

            alert.success('Refreshing Metadata, dit kan even duren');
        });

    return (
        <HeaderIconWrap
            disabled={disabled}
            onClick={() => refreshMetadata()}
            data-delay-show='1000'
            data-tip="Refresh Meta Data"
            right
        >
            <HeaderIcon icon={faSync} />
        </HeaderIconWrap>
    );
};

export default graphql(REFRESH_METADATA)(RefreshMetadata);
