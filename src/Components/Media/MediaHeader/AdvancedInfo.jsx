// @flow
import React from 'react';
import { useDispatch } from 'react-redux';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { showModal, ADVANCED_INFO_MODAL } from 'Redux/Actions/modalActions';
import { HeaderIconWrap, HeaderIcon } from './Styles';

type Props = {
    name: string,
    files: Array<Object>,
    type: string,
};

const AdvancedInfo = ({ files, name, type }: Props) => {
    const dispatch = useDispatch();

    const infoModal = () => {
        dispatch(showModal(ADVANCED_INFO_MODAL, {
            title: 'Media Info',
            files,
            type,
            name,
        }));
    };

    return (
        <HeaderIconWrap onClick={() => infoModal()} data-tip="Show Advanced Info">
            <HeaderIcon icon={faInfoCircle} />
        </HeaderIconWrap>
    );
};

export default AdvancedInfo;
