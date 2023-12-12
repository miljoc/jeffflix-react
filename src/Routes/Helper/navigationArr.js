const navigationArr = [
    {
        name: 'Bibliotheek',
        id: 'libraries',
        admin: false,
        links: [
            {
                name: 'Home',
                to: '/dashboard',
                id: 'dashboard',
            },
            {
                name: 'Films',
                to: '/movies',
                id: 'movies',
            },
            {
                name: 'Series',
                to: '/series',
                id: 'series',
            },
        ],
    },
    {
        name: 'Instellingen',
        id: 'settings',
        admin: true,
        links: [
            {
                name: 'Gebruikers',
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
                name: 'Match Films',
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
