// @flow
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';

import Loading from 'Components/Loading';

import { LIBRARY_STATE } from 'Queries/fetchLibraries';
import * as S from './Styles';

type Props = {
    kind: number,
};

const Importing = ({ kind }: Props) => {
    const [importing, setImporting] = useState(false);
    const { loading, error, data, stopPolling } = useQuery(LIBRARY_STATE, { pollInterval: 5000 });

    useEffect(() => {
        if(data.libraries.filter(l => l.kind === kind && l.isRefreshing).length > 0) setImporting(true);
    }, [data]);

    if (error) return `Error! ${error}`;
    if (loading) return null;

    if (!importing) {
        stopPolling();

        return null;
    }

    return (
        <S.LoadingWrap>
            <Loading relative fsize="1rem" />
        </S.LoadingWrap>
    );
};

export default Importing;
