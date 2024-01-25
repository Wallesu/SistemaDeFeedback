export default [{

    path: '/',
    title: 'CadastroDeFuncionarios',
    dir: 'views/',
    view: 'CadastroDeFuncionarios.vue',
    icon: 'fa-solid fa-folder',
    menu: true,
    home: true,
    meta: {
        roles: ['Safe.BackOffice.User'],
        allRolesRequired: false
    }
}]