const filterButtons = document.querySelectorAll('.filter__button');
const courseGrid = document.querySelector('.course-grid');
const coursesState = document.getElementById('coursesState');

async function applyCourseFilter(filter) {
  setUiState(coursesState, 'loading');

  try {
    if (!courseGrid) {
      throw new Error('A lista de cursos não foi encontrada.');
    }

    const cards = [...courseGrid.querySelectorAll('.course-card')];

    cards.forEach((card) => {
      const status = card.querySelector('.course-card__status')?.textContent
        .trim()
        .toLowerCase();

      const shouldShow = filter === 'Todos'
        || (filter === 'Iniciados' && status === 'iniciado')
        || (filter === 'Terminados' && status === 'concluído');

      card.hidden = !shouldShow;
    });

    const visibleCards = cards.filter((card) => !card.hidden);

    if (!visibleCards.length) {
      setUiState(coursesState, 'empty', 'Nenhum curso corresponde a este filtro.');
      return;
    }

    setUiState(coursesState, 'success', `Filtro "${filter}" aplicado.`);
    window.setTimeout(() => clearUiState(coursesState), 1200);
  } catch (error) {
    setUiState(coursesState, 'error', error.message);
  } finally {
    filterButtons.forEach((item) => {
      item.disabled = false;
    });
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    filterButtons.forEach((item) => {
      item.classList.remove('filter__button--active');
      item.disabled = true;
    });

    button.classList.add('filter__button--active');
    await applyCourseFilter(button.textContent.trim());
  });
});

document.querySelectorAll('.course-card__button').forEach((button) => {
  button.addEventListener('click', () => {
    try {
      const link = button.closest('a');

      if (!link?.href) {
        throw new Error('O destino deste curso não está disponível.');
      }

      setSubmitting(button, true, 'Abrindo...');
    } catch (error) {
      setUiState(coursesState, 'error', error.message);
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