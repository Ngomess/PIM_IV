const profileForm = document.getElementById("profileForm");
const settingsState = document.getElementById("settingsState");
const saveButton = profileForm?.querySelector('button[type="submit"]');

profileForm?.addEventListener("submit", async function (event) {

  event.preventDefault();

   setSubmitting(saveButton, true, "Salvando...");
   setUiState(settingsState, "loading");

   try {
      if (!profileForm.checkValidity()) {
         throw new Error("Revise os dados do perfil antes de salvar.");
      }

      setUiState(settingsState, "success", "Alterações salvas com sucesso.");
   } catch (error) {
      setUiState(settingsState, "error", error.message);
   } finally {
      setSubmitting(saveButton, false);
   }

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

   if (!confirmAction("Excluir sua conta definitivamente? Essa ação não pode ser desfeita.")) {
      return;
   }

   setSubmitting(btnConfirmarExclusao, true, "Excluindo...");
   setUiState(settingsState, "loading");

   try {
      modalExcluir.classList.remove("active");
      setUiState(settingsState, "success", "Conta excluída com sucesso.");
   } catch (error) {
      setUiState(settingsState, "error", error.message);
   } finally {
      setSubmitting(btnConfirmarExclusao, false);
   }

});