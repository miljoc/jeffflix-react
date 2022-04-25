import React from 'react';
import { connect } from 'react-redux';
import { splitFilepath } from 'Helpers';
import PropTypes from 'prop-types';

import { hideModal } from 'Redux/Actions/modalActions';

import * as S from 'Components/Modal/Styles';
import MediaMatch from 'Components/MediaMatch';
import ModalClose from '../ModalClose';

const MatchModal = ({ uuid, name, file, type, hModal }) => {

    return (
        <S.Modal>
            <S.ModalWrap>
                <S.ModalHeader>
                    <S.ModalHeading>
                        Match {type}
                        <ModalClose onClick={() => hModal()} />
                    </S.ModalHeading>

                    {!Array.isArray(file)
                        ? (
                            <p>
                                <span>Location:</span> {splitFilepath(file)}
                            </p>
                        )
                        : ( 
                            <>
                                <p>Search for a series for the episodes, or enter a series TMDB id.</p>
                                <S.FileLocationList>
                                    {file.map(f => <p key={f.uuid}>{f.fileName}</p>)}
                                </S.FileLocationList>                         
                            </>
                        )
                    }
                </S.ModalHeader>
                <S.ModalBody>
                    <MediaMatch uuid={uuid} type={type.toLowerCase()} name={name} />
                </S.ModalBody>
            </S.ModalWrap>
        </S.Modal>
    );
};

MatchModal.propTypes = {
    hModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    uuid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    file: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ])
};

MatchModal.defaultProps = {
    file: null,
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect(
    null,
    mapDispatchToProps,
)(MatchModal);
