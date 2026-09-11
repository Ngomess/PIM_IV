/* GERENCIAR USUÁRIO */

const manageUsersCard =
  document.getElementById(
    'manageUsersCard'
  );

if (manageUsersCard) {

  manageUsersCard.addEventListener(
    'click',
    () => {

      window.location.href =
        'admin_gerenciar.html';

    }
  );

}

/* CADASTRAR USUÁRIO */

const registerUsersCard =
  document.getElementById(
    'registerUsersCard'
  );

if (registerUsersCard) {

  registerUsersCard.addEventListener(
    'click',
    () => {

      window.location.href =
        'admin_cadastrar.html';

    }
  );

}