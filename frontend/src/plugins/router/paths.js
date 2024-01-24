export default [
  {
    path: '/cadastro-funcionario',
    view: 'CadastroFuncionario',
    dir: 'views/',
    icon: 'fas fa-home',
    title: 'Cadastro',
    menu: true,
    meta: {
      roles: ['Safe.BackOffice.User'],
      allRolesRequired: true
    }
  },
  {
    path: '/',
    view: 'Login',
    dir: 'views/',
    title: 'Login',
    menu: false,
    meta: {
      anonymousAuth: true,
      roles: ['Safe.BackOffice.User'],
      allRolesRequired: true
    }
  },
];
