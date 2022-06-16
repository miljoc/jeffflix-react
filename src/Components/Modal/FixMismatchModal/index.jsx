import React, { createRef, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { splitFilepath } from 'Helpers';
import PropTypes from 'prop-types';

import { hideModal } from 'Redux/Actions/modalActions';

import FixMismatch from 'Components/FixMismatch';

import * as S from 'Components/Modal/Styles';
import CheckboxList from 'Components/CheckboxList';
import { UncheckButton, CheckAllButton } from 'Containers/Admin/Tools/Styles';
import { ButtonWrap } from 'Styles/Button';
import { ErrorWrap } from 'Components/Error/Styles';
import ModalClose from '../ModalClose';

const FixMismatchModal = ({ uuid, name, file, type, hModal }) => {
    const [episodesChecked, setEpisodesChecked] = useState([]);
    const previousChecked = useRef();

    const refsById = useMemo(() => {
        const refs = [];
        if(Array.isArray(file)){
            file.forEach((episode, index) => {
                refs[index] = { uuid: episode.uuid, index, ref: createRef(null) }
            });
        }
        return refs;
    }, [file]);

    const uncheckAll = () => {
        episodesChecked.forEach(e => {
            refsById[e.index].ref.current.checked = false;
        });

        setEpisodesChecked(() => []);
        previousChecked.current = null;
    }

    const checkAll = () => {
        file.forEach((f, i) => {
            refsById[i].ref.current.checked = true;
        });

        setEpisodesChecked(oldEpisodes => {
            let newArray = [];

            file.forEach((f, i) => {
                const fileObj = {
                    filePath: f.filePath,
                    fileName: f.fileName,
                    uuid: f.uuid,
                    index: i.toString(),
                    checked: true
                };

                newArray = [ ...newArray, fileObj ];
            });

            const finalArray = [ ...newArray, ...oldEpisodes ];

            // make sure episodes are always unique
            return finalArray.filter((e, i) => finalArray.findIndex(a => a.uuid === e.uuid) === i);
        });

        previousChecked.current = null;
    }

    return (
        <S.Modal>
            <S.ModalWrap wide>
                <S.ModalHeader>
                    <S.ModalHeading>
                        Fix Mismatch: {name}
                    </S.ModalHeading>
                    <ModalClose onClick={() => hModal()} />


                    {!Array.isArray(file)
                        ? (
                            <p>
                                <span>Location:</span> {splitFilepath(file)}
                            </p>
                        )
                        : ( 
                            <>
                                <p>Search for a series for the episodes, or enter a series TMDB id.</p>
                                <S.FileLocationList tall>
                                    <CheckboxList
                                        refsById={refsById}
                                        files={file}
                                        episodesChecked={episodesChecked}
                                        setEpisodesChecked={setEpisodesChecked}
                                    />                                    
                                </S.FileLocationList>
                                <ButtonWrap>
                                    <ErrorWrap>
                                        {episodesChecked.length === 0 && 'Select at least 1 episode'}
                                    </ErrorWrap>
                                    <div>
                                        <CheckAllButton
                                            onClick={checkAll}
                                        >Check All
                                        </CheckAllButton>
                                        <UncheckButton
                                            style={{
                                                marginRight: '0',
                                                marginLeft: '1rem'
                                            }}
                                            onClick={uncheckAll}
                                            disabled={episodesChecked.length === 0}
                                        >Uncheck All
                                        </UncheckButton>
                                    </div>
                                </ButtonWrap>
                            </>
                        )
                    }

                </S.ModalHeader>
                <S.ModalBody>
                    <FixMismatch
                        uuid={type === 'Movie' ? uuid : episodesChecked.map(e => e.uuid)}
                        type={type.toLowerCase()}
                        name={name}
                    />
                </S.ModalBody>
            </S.ModalWrap>
        </S.Modal>
    );
};

FixMismatchModal.propTypes = {
    hModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    file: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
};

FixMismatchModal.defaultProps = {
    file: null,
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect(
    null,
    mapDispatchToProps,
)(FixMismatchModal);
