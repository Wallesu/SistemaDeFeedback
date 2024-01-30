export default [
    {
        path: '/home',
        view: 'Home',
        dir: 'views/',
        icon: 'fas fa-home',
        title: 'Início',
        menu: true,
        home: true,
        meta: {
            roles: ['Safe.BackOffice.User'],
            allRolesRequired: false
        }
    },
    {
        path: '/',
        view: 'Login',
        dir: 'views/',
        icon: 'fas fa-home',
        title: 'Login',
        menu: false,
        meta: {
            anonymousAuth: true,
            roles: ['Safe.BackOffice.User'],
            allRolesRequired: false
        }
    },
    {
        path: '/registrations',
        title: 'Cadastros',
        dir: 'views/Registrations/',
        icon: 'fas fa-users',
        menu: true,
        meta: {
            roles: ['Safe.BackOffice.User'],
            allRolesRequired: false
        },
        items: [
            {
                path: '/employee-registrations',
                title: 'Cadastros de Funcionários',
                icon: '',
                dir: '',
                view: 'EmployeeRegistrations',
                menu: true,
                meta: {
                    roles: ['Safe.BackOffice.User'],
                    allRolesRequired: false
                }
            }
        ]
    }
]