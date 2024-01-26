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
        path: '/cadastros',
        title: 'Cadastros',
        dir: 'views/Cadastros/',
        icon: 'fa-solid fa-folder',
        menu: true,
        meta: {
            roles: ['Safe.BackOffice.User'],
            allRolesRequired: false
        },
        items: [
            {
                path: '/cadastros-de-funcionarios',
                title: 'Cadastros de Funcionários',
                icon: '',
                dir: '',
                view: 'CadastrosDeFuncionarios',
                menu: true,
                meta: {
                    roles: ['Safe.BackOffice.User'],
                    allRolesRequired: false
                }
            }
        ]
    }
]