// FORMULÁRIO
const forumForm = document.querySelector("#forumForm");

// CAMPOS
const questionTitle = document.querySelector("#questionTitle");
const questionCategory = document.querySelector("#questionCategory");
const questionDescription = document.querySelector("#questionDescription");

const forumState = document.querySelector('#forumState');
const submitButton = forumForm?.querySelector('.submit-button');

forumForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  setUiState(forumState, 'loading');
  setSubmitting(submitButton, true, 'Enviando...');

  try {
    if (!questionTitle.value.trim() || !questionCategory.value || !questionDescription.value.trim()) {
      throw new Error('Preencha assunto, matéria e descrição.');
    }

    const discussionList = document.querySelector('.discussions');

    if (!discussionList) {
      throw new Error('A área de discussões não está disponível.');
    }

    forumForm.reset();
    setUiState(forumState, 'success', 'Pergunta enviada com sucesso.');
  } catch (error) {
    setUiState(forumState, 'error', error.message);
  } finally {
    setSubmitting(submitButton, false);
  }
});