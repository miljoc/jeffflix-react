// @flow
import React from 'react';
import { connect } from 'react-redux';

import { faPencilAlt, faSync } from '@fortawesome/free-solid-svg-icons';
import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import { useMutation } from 'react-apollo';
import { useAlert } from 'react-alert';
import { RESCAN_LIBRARY } from 'Mutations/manageLibraries';
import { LIBRARY_STATE } from 'Queries/fetchLibraries';
import Importing from './ImportingData';
import * as S from './Styles';

type Link = {
    name: string,
    id: string,
    to: string,
};

type Props = {
    name: string,
    links: Array<Link>,
    libraries: Array,
    loadModal: Function,
};

const NavItem = ({ name, links, loadModal, libraries }: Props) => {
    const [rescanLibrary] = useMutation(RESCAN_LIBRARY, {
        refetchQueries: [
            { query: LIBRARY_STATE },
        ]
    });
    const alert = useAlert();

    const onClick = (e, type) => {
        const linkDisabled = e.target.nodeName === 'svg' || e.target.nodeName === 'path';

        if(linkDisabled){
            e.preventDefault();
            const { id, parentElement } = e.target;

            if( id.indexOf('refresh-') > -1 || parentElement.id.indexOf('refresh-') > -1 ){
                const kind = e.target.getAttribute('kind');
                const libIds = libraries.filter((l) => l.kind === parseInt(kind, 10)).map((l) => l.id);
                
                libIds.forEach(libId => {
                    rescanLibrary({ variables: { id: libId } });
                });
                alert.success(`Rescanning ${type}`);
            }
            
            if( id.indexOf('add-') > -1 || parentElement.id.indexOf('add-') > -1 ){        
                loadModal(LIBRARY_MODAL, {
                    title: `Edit ${type}`,
                    type,
                });
            }
        }
    };

    const LinkList = links.map((link) => {
        const types = ['movies', 'series'];

        if (types.indexOf(link.id) > -1) {
            const kind = link.name === 'Movies' ? 0 : 1;
            return (
                <S.NavItemLink onClick={(e) => onClick(e, link.id)} to={link.to} key={link.id}>
                    <Importing kind={kind} />
                    {link.name}
                    <S.RefreshLibrary
                        kind={kind}
                        id={`refresh-${link.id}`}
                        icon={faSync}
                    >
                    </S.RefreshLibrary>
                    <S.AddFolder id={`add-${link.id}`} icon={faPencilAlt} />
                </S.NavItemLink>
            );
        }

        return (
            <S.NavItemLink to={link.to} key={link.id}>
                {link.name}
            </S.NavItemLink>
        );
    });

    return (
        <S.NavItemWrap>
            <S.NavItemHeading>{name}</S.NavItemHeading>
            {LinkList}
        </S.NavItemWrap>
    );
};

const mapDispatchToProps = (dispatch) => ({
    loadModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(NavItem);
