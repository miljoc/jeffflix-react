import React from 'react';
import { Auth } from 'Client/Auth';
import Loading from 'Components/Loading';

import navigationArr from 'Routes/Helper/navigationArr';
import FETCH_LIBRARIES from 'Queries/fetchLibraries';
import { useQuery } from '@apollo/client';
import NavItem from './NavItem';

const Navigation = () => {
    const { loading, error, data } = useQuery(FETCH_LIBRARIES);

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;
    
    const { libraries } = data;

    return (
        <>
            {navigationArr.map((item) => {
            
                if (item.admin && !Auth.isAdmin.admin) return false;

                if(item.id === "libraries"){
                    return <NavItem name={item.name} libraries={libraries} links={item.links} key={item.id} />;
                }

                return <NavItem name={item.name} links={item.links} key={item.id} />;
            })}
        </>
    )
};

export default Navigation;
