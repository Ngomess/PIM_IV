const subjectSelect = document.querySelector('.filter-box__select');

subjectSelect.addEventListener('change', () => {

    console.log(
        `Matéria selecionada: ${subjectSelect.value}`
    );

});

const studentInput = document.querySelector('.filter-box__input');

studentInput.addEventListener('input', () => {

    console.log(
        `Buscando estudante: ${studentInput.value}`
    );

});

/* GRÁFICO - MATÉRIAS MAIS ACESSADAS */

const accessChart =
document.getElementById(
    'accessChart'
);

new Chart(accessChart, {

    type: 'pie',

    data: {

        labels: [
            'Engenharia de Software',
            'Análise de Dados com Python',
            'Orientação a Objeto com C#',
            'Banco de Dados',
            'UX/UI'
        ],

        datasets: [{

            data: [35, 25, 20, 12, 8],

            backgroundColor: [
                '#2AC388',
                '#1A73E9',
                '#0E1B2B',
                '#63C9B1',
                '#8EC9FF'
            ],

            borderWidth: 0

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: 'bottom'

            }

        }

    }

});

/* GRÁFICO - DESEMPENHO */

const performanceChart =
document.getElementById(
    'performanceChart'
);

new Chart(performanceChart, {

    type: 'pie',

    data: {

        labels: [
            'Engenharia de Software',
            'Análise de Dados com Python',
            'Orientação a Objeto com C#',
            'Banco de Dados',
            'UX/UI'
        ],

        datasets: [{

            data: [92, 84, 76, 69, 81],

            backgroundColor: [
                '#22c55e',
                '#06b6d4',
                '#f59e0b',
                '#ef4444',
                '#3b82f6'
            ],

            borderWidth: 0

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: 'bottom'

            }

        }

    }

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