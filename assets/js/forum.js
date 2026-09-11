// FORMULÁRIO
const forumForm = document.querySelector("#forumForm");

// CAMPOS
const questionTitle = document.querySelector("#questionTitle");
const questionCategory = document.querySelector("#questionCategory");
const questionDescription = document.querySelector("#questionDescription");

// EVENTO DE ENVIO
forumForm.addEventListener("submit", function(event){

  event.preventDefault();

  // VALIDAÇÃO
  if(
    questionTitle.value === "" ||
    questionCategory.value === "" ||
    questionDescription.value === ""
  ){

    alert("Preencha todos os campos.");

    return;
  }

  // SUCESSO
  alert("Pergunta enviada com sucesso!");

  // LIMPAR FORMULÁRIO
  forumForm.reset();

});