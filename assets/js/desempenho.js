const menuButton =
  document.getElementById(
    'menuButton'
  );

const sidebar =
  document.querySelector(
    '.sidebar'
  );

/* MENU MOBILE */

if (menuButton) {

  menuButton.addEventListener(
    'click',
    () => {

      sidebar.classList.toggle(
        'sidebar--open'
      );

    }
  );

}

/* CAPTURA DADOS DO SIMULADO */

const savedGrade =
  localStorage.getItem(
    "studentGrade"
  );

const savedHits =
  localStorage.getItem(
    "studentHits"
  );

const savedPercentage =
  localStorage.getItem(
    "studentPercentage"
  );

/* ELEMENTOS */

const averageGrade =
  document.getElementById(
    "averageGrade"
  );

const csharpGrade =
  document.getElementById(
    "csharpGrade"
  );

/* ATUALIZA NOTAS */

if (savedGrade) {

  averageGrade.textContent =
    savedGrade;

  csharpGrade.textContent =
    savedGrade;

}