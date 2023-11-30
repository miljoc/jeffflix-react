import React from 'react';

import BreadcrumbList from './BreadcrumbList';

const Breadcrumbs = ({ type, season, name, series }) => {
    switch (type) {
        case 'Episode': {
            const items = [
                { name: 'Series', url: '/series' },
                {
                    name: season.series.name,
                    url: `/series/${season.series.uuid}`,
                },
                { name: season.name, url: `/season/${season.uuid}` },
                { name },
            ];

            return <BreadcrumbList items={items} />;
        }
        case 'Season': {
            const items = [
                { name: 'Series', url: '/series' },
                { name: series.name, url: `/series/${series.uuid}` },
                { name },
            ];

            return <BreadcrumbList items={items} />;
        }
        case 'Series': {
            const items = [{ name: 'Series', url: '/series' }, { name }];

            return <BreadcrumbList items={items} />;
        }
        case 'Movie': {
            const items = [{ name: 'Films', url: '/movies' }, { name }];

            return <BreadcrumbList items={items} />;
        }
        default:
            return false;
    }
};

export default Breadcrumbs;
