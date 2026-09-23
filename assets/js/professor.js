const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach((button) => {

    button.addEventListener('click', () => {

        filterButtons.forEach((item) => {
            item.classList.remove('filter-button--active');
        });

        button.classList.add('filter-button--active');

    });

});

const replyButtons = document.querySelectorAll('.reply-button');
const professorState = document.getElementById('professorState');

replyButtons.forEach((button) => {

    button.addEventListener('click', () => {

        if (
            button.classList.contains('reply-button--disabled')
        ) {
            return;
        }

        const questionCard = button.closest('.question-card');

        const replyBox = questionCard.querySelector('.reply-box');

        replyBox.scrollIntoView({
            behavior: 'smooth'
        });

    });

});

document.querySelectorAll('.submit-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const questionCard = button.closest('.question-card');
    const textarea = questionCard?.querySelector('.reply-box__textarea');

    setSubmitting(button, true, 'Publicando...');
    setUiState(professorState, 'loading');

    try {
      if (!textarea?.value.trim()) {
        throw new Error('Digite uma resposta antes de publicar.');
      }

      if (!confirmAction('Publicar esta resposta no fórum?')) {
        setUiState(professorState, 'empty', 'Publicação cancelada.');
        return;
      }

      textarea.value = '';
      setUiState(professorState, 'success', 'Resposta publicada com sucesso.');
    } catch (error) {
      setUiState(professorState, 'error', error.message);
    } finally {
      setSubmitting(button, false);
    }
  });
});

/* 
   MODAL DE SAÍDA
 */

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