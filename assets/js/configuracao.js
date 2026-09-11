const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", function (event) {

  event.preventDefault();

  alert("Alterações salvas com sucesso!");

});

/* =========================
   ELEMENTOS
========================= */

const btnExcluirConta = document.getElementById("btnExcluirConta");

const modalExcluir = document.getElementById("modalExcluir");

const btnCancelarModal = document.getElementById("btnCancelarModal");

const checkboxConfirmar = document.getElementById("checkboxConfirmar");

const btnConfirmarExclusao = document.getElementById("btnConfirmarExclusao");


/* =========================
   ABRIR MODAL
========================= */

btnExcluirConta.addEventListener("click", () => {

    modalExcluir.classList.add("active");

});


/* =========================
   FECHAR MODAL
========================= */

btnCancelarModal.addEventListener("click", () => {

    modalExcluir.classList.remove("active");

});


/* =========================
   HABILITAR BOTÃO
========================= */

checkboxConfirmar.addEventListener("change", () => {

    btnConfirmarExclusao.disabled = !checkboxConfirmar.checked;

});


/* =========================
   EXCLUIR CONTA
========================= */

btnConfirmarExclusao.addEventListener("click", () => {

    alert("Conta excluída com sucesso!");

    modalExcluir.classList.remove("active");

});