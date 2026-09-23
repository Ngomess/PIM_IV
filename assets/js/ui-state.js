function setUiState(element, state, message = '') {
    if (!element) {
        return;
    }

    element.hidden = false;
    element.dataset.state = state;
    element.innerHTML = '';

    const content = document.createElement('div');
    content.className = `ui-state ui-state--${state}`;

    if (state === 'loading') {
        content.innerHTML = '<span class="ui-state__spinner" aria-hidden="true"></span><span>Carregando...</span>';
    } else if (state === 'empty') {
        content.innerHTML = `<strong>Nenhum item encontrado</strong><span>${message || 'Não há dados para exibir.'}</span>`;
    } else if (state === 'error') {
        content.innerHTML = `<strong>Não foi possível concluir a ação</strong><span>${message || 'Tente novamente.'}</span>`;
    } else if (state === 'success') {
        content.innerHTML = `<strong>${message || 'Ação concluída com sucesso.'}</strong>`;
    }

    element.appendChild(content);
}

function clearUiState(element) {
    if (!element) {
        return;
    }

    element.hidden = true;
    element.dataset.state = '';
    element.innerHTML = '';
}

function setSubmitting(button, isSubmitting, submittingText = 'Processando...') {
    if (!button) {
        return;
    }

    if (isSubmitting) {
        button.dataset.originalText = button.textContent.trim();
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
        button.textContent = submittingText;
        return;
    }

    button.disabled = false;
    button.removeAttribute('aria-busy');
    button.textContent = button.dataset.originalText || button.textContent;
}

function confirmAction(message) {
    return window.confirm(message);
}
