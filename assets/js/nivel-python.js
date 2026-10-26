const levelButtons = document.querySelectorAll('.level-card__button');
const levelState = document.getElementById('levelState');

levelButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    setSubmitting(button, true, 'Abrindo...');
    setUiState(levelState, 'loading');

    try {
      const link = button.closest('a');
      if (!link?.href) {
        throw new Error('Este nível não está disponível.');
      }

      setUiState(levelState, 'success', 'Nível selecionado com sucesso.');
      window.location.href = link.href;
    } catch (error) {
      setUiState(levelState, 'error', error.message);
    } finally {
      setSubmitting(button, false);
    }
  });
});

/* =========================
   MODAL DE SAÍDA
========================= */

document.addEventListener(
  'DOMContentLoaded',
  () => {

    /* ELEMENTOS */

    const exitButton =
      document.getElementById(
        'exit__button'
      );

    const footerLogout =
      document.getElementById(
        'footer__logout'
      );

    const logoutModal =
      document.getElementById(
        'logoutModal'
      );

    const closeLogoutModal =
      document.getElementById(
        'closeLogoutModal'
      );

    const confirmLogout =
      document.getElementById(
        'confirmLogout'
      );

    /* ABRIR MODAL */

    function openLogoutModal() {

      logoutModal.classList.add(
        'logout-modal--active'
      );

    }

    /* FECHAR MODAL */

    function closeModal() {

      logoutModal.classList.remove(
        'logout-modal--active'
      );

    }

    /* BOTÃO HEADER */

    if (exitButton) {

      exitButton.addEventListener(
        'click',
        (event) => {

          event.preventDefault();

          openLogoutModal();

        }
      );

    }

    /* BOTÃO FOOTER */

    if (footerLogout) {

      footerLogout.addEventListener(
        'click',
        (event) => {

          event.preventDefault();

          openLogoutModal();

        }
      );

    }

    /* BOTÃO CONTINUAR */

    if (closeLogoutModal) {

      closeLogoutModal.addEventListener(
        'click',
        closeModal
      );

    }

    /* FECHAR AO CLICAR FORA */

    if (logoutModal) {

      logoutModal.addEventListener(
        'click',
        (event) => {

          if (
            event.target === logoutModal
          ) {

            closeModal();

          }

        }
      );

    }

    /* CONFIRMAR SAÍDA */

    if (confirmLogout) {

      confirmLogout.addEventListener(
        'click',
        () => {

          window.location.href =
            'login.html';

        }
      );

    }

  }
);