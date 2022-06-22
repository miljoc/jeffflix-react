// @flow
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import ReactToolTip from 'react-tooltip';

import { faExclamation, faSpinner, faSync, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAlert } from 'react-alert';

import FETCH_LIBRARIES from 'Queries/fetchLibraries';
import { DELETE_LIBRARY , RESCAN_LIBRARY } from 'Mutations/manageLibraries';

import { AlertInline, AlertConfirm } from 'Components/Alerts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LibraryItemWrap, LibraryItemFilePath, LibraryItemDelete, LibraryUnhealthy, LibraryItemRescan } from './Styles';

type Props = {
    filePath: string,
    id: number,
    backend: number,
    healthy?: boolean,
};

const LibraryItem = ({ filePath, id, backend, healthy }: Props) => {
    const libraryType = backend === 0 ? 'Local' : 'Rclone';
    const [deleteLibrary, { loading, error }] = useMutation(DELETE_LIBRARY, {
        variables: { id },
        refetchQueries: [{ query: FETCH_LIBRARIES }],
    });
    const [rescanLibrary] = useMutation(RESCAN_LIBRARY);
    const [show, setShow] = useState(false);
    const alert = useAlert();

    return (
        <>
            {show && <AlertConfirm type="error" message="Are you sure?" confirm={() => deleteLibrary()} />}
            <LibraryItemWrap>
                <ReactToolTip effect="solid" delayShow={1000} place="left" className="tooltip" />

                {error && <AlertInline type="error">{error.message}</AlertInline>}
                <LibraryItemFilePath>
                    <span>
                        {!healthy && (
                            <LibraryUnhealthy
                                icon={faExclamation}
                                data-tip="This is an unhealthy library, playback may be broken."
                                data-place="bottom"
                            />
                        )}
                        {libraryType}
                    </span>

                    {filePath.length > 50 ? <p data-tip={filePath} data-place="bottom">{filePath}</p> : filePath}
                </LibraryItemFilePath>
                                
                <LibraryItemRescan
                    data-tip="Rescan Library"
                    onClick={() => {
                        rescanLibrary({ variables: { id } });
                        alert.success(`Rescanning path: '${filePath}'`);
                    }}
                >
                    <FontAwesomeIcon icon={faSync} />
                </LibraryItemRescan>

                {!loading && (
                    <LibraryItemDelete data-tip="Delete Library" onClick={() => setShow(true)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </LibraryItemDelete>
                )}
                {loading && <LibraryItemDelete icon={faSpinner} spin deleting={loading ? 1 : 0} />}
            </LibraryItemWrap>
        </>
    );
};

export default LibraryItem;

LibraryItem.defaultProps = {
    healthy: true,
};
