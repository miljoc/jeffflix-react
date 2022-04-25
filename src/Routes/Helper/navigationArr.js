const navigationArr = [
    {
        name: 'Libraries',
        id: 'libraries',
        admin: false,
        links: [
            {
                name: 'Dashboard',
                to: '/dashboard',
                id: 'dashboard',
            },
            {
                name: 'Movies',
                to: '/movies',
                id: 'movies',
            },
            {
                name: 'TV Shows',
                to: '/series',
                id: 'series',
            },
        ],
    },
    {
        name: 'Settings',
        id: 'settings',
        admin: true,
        links: [
            {
                name: 'Users',
                to: '/users',
                id: 'users',
            },
        ],
    },
    {
        name: 'Tools',
        id: 'tools',
        admin: true,
        links: [
            {
                name: 'Match Movies',
                to: '/match-movies',
                id: 'match-movies'
            },
            {
                name: 'Match Series',
                to: '/match-series',
                id: 'match-series'
            }
        ]
    }
];

export default navigationArr;
