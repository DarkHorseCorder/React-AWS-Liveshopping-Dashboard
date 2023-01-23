import React from 'react'
export const MENUITEMS = [
    {
        title: 'Accueil', icon: <i className="pe-7s-home pe-lg"></i>, path: '/dashboard/accueil', type: 'sub',active: true,bookmark: true, children: [
                {title: 'Dashboard', type: 'sub'},
                { title: 'Default', type: 'link', path:  '/dashboard/accueil'}
        ]
    },
    {
        title: 'Live', icon: <i className="pe-7s-edit"></i>,  path:  '/dashboard/live', type: 'sub',active: false, children: [
                {title: 'Sample Page', type: 'sub'},
                { title: 'Sample Page', type: 'link', path:  '/dashboard/live'},
        ]
    },
    {
        title: 'Support', icon: <i className="pe-7s-note2"></i>,  path: '/dashboard/support', type: 'sub',active: false, children: [
                {title: 'Ticket', type: 'sub'},
                { title: 'Raise Ticket', type: 'exteral_link', path: '/dashboard/support' },
        ]
        
    },
    {
        title: 'Parametre', icon: <i className="pe-7s-news-paper"></i>,  path: '/dashboard/parametre', type: 'sub',active: false, children: [
                {title: 'Ticket', type: 'sub'},
                { title: 'Raise Ticket', type: 'exteral_link', path: '/dashboard/parametre' },
        ]
        
    },
    // {
    //     title: 'LiveShow', icon: <i className="pe-7s-news-paper"></i>,  path: '/dashboard/liveshow', type: 'sub',active: false, children: [
    //             {title: 'Ticket', type: 'sub'},
    //             { title: 'Raise Ticket', type: 'exteral_link', path: '/dashboard/liveshow' },
    //     ]
        
    // },
]