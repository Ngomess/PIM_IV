const userRole = document.getElementById('userRole');

const subjectField = document.getElementById('subjectField');

userRole.addEventListener('change', () => {

    if (userRole.value === 'tutor') {

        subjectField.style.display = 'flex';

    } else {

        subjectField.style.display = 'none';

    }

});

/* ESCONDE O CAMPO AO CARREGAR */

subjectField.style.display = 'none';

/* ===== FUNCIONALIDADE DE CADASTRO ===== */

const btnCadastrar = document.getElementById('btnCadastrar');

/* VALIDAÇÃO DE EMAIL */
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

/* VALIDAÇÃO DE CPF */
function validarCPF(cpf) {
    const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regexCPF.test(cpf);
}

/* VALIDAÇÃO DE SENHA */
function validarSenha(senha) {
    return senha.length >= 8;
}

/* FUNÇÃO PARA CAPTURAR E VALIDAR DADOS */
function capturaeDados() {

    const nome = document.getElementById('inputNome').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const cpf = document.getElementById('inputCPF').value.trim();
    const senha = document.getElementById('inputSenha').value;
    const confirmaSenha = document.getElementById('inputConfirmaSenha').value;

    /* VALIDAÇÕES */

    if (!nome) {
        alert('Por favor, preencha o campo Nome.');
        return null;
    }

    if (!email) {
        alert('Por favor, preencha o campo E-mail.');
        return null;
    }

    if (!validarEmail(email)) {
        alert('Por favor, insira um e-mail válido (ex: usuario@email.com).');
        return null;
    }

    if (!cpf) {
        alert('Por favor, preencha o campo CPF.');
        return null;
    }

    if (!validarCPF(cpf)) {
        alert('Por favor, insira um CPF válido (formato: 000.000.000-00).');
        return null;
    }

    if (!senha) {
        alert('Por favor, preencha o campo Senha.');
        return null;
    }

    if (!validarSenha(senha)) {
        alert('A senha deve conter no mínimo 8 caracteres.');
        return null;
    }

    if (!confirmaSenha) {
        alert('Por favor, confirme sua senha.');
        return null;
    }

    if (senha !== confirmaSenha) {
        alert('As senhas não conferem. Por favor, tente novamente.');
        return null;
    }

    /* RETORNA OS DADOS VALIDADOS */
    return {
        nome: nome,
        email: email,
        cpf: cpf,
        password: senha
    };

}

/* FUNÇÃO PARA LIMPAR FORMULÁRIO */
function limpaFormulario() {
    document.getElementById('inputNome').value = '';
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputCPF').value = '';
    document.getElementById('inputSenha').value = '';
    document.getElementById('inputConfirmaSenha').value = '';
    document.getElementById('userRole').value = '';
    subjectField.style.display = 'none';
}

/* FUNÇÃO PARA OBTER O PRÓXIMO ID */
function obterProximoId(usuarios) {
    if (usuarios.length === 0) {
        return 1;
    }
    return Math.max(...usuarios.map(u => u.id)) + 1;
}

/* EVENTO DO BOTÃO CADASTRAR */
btnCadastrar.addEventListener('click', async () => {

    /* CAPTURA E VALIDA DADOS */
    const dados = capturaeDados();

    if (!dados) {
        return;
    }

    try {
        /* LÊ O ARQUIVO JSON */
        const response = await fetch('./data/usuarios.json');

        if (!response.ok) {
            throw new Error('Erro ao buscar arquivo de usuários');
        }

        let usuarios = await response.json();

        /* VERIFICA SE JÁ EXISTE USUÁRIO COM MESMO CPF OU EMAIL */
        const usuarioExistente = usuarios.find(
            u => u.cpf === dados.cpf || (u.email && u.email === dados.email)
        );

        if (usuarioExistente) {
            alert('Já existe um usuário cadastrado com este CPF ou E-mail.');
            return;
        }

        /* CRIA NOVO USUÁRIO COM ID SEQUENCIAL */
        const novoUsuario = {
            id: obterProximoId(usuarios),
            name: dados.nome,
            email: dados.email,
            cpf: dados.cpf,
            password: dados.password
        };

        /* ADICIONA O NOVO USUÁRIO À LISTA */
        usuarios.push(novoUsuario);

        /* SALVA EM LOCALSTORAGE COMO BACKUP/PERSISTÊNCIA */
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        /* TENTA ENVIAR PARA O SERVIDOR (SE HOUVER BACKEND) */
        try {
            const responsePost = await fetch('./data/usuarios.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarios)
            });

            /* SE NÃO CONSEGUIR SALVAR NO ARQUIVO, CONTINUA ANYWAY */
            /* POIS JÁ SALVOU EM LOCALSTORAGE */
        } catch (e) {
            console.log('Nota: Não foi possível sincronizar com o servidor. Dados salvos localmente.');
        }

        /* EXIBE MENSAGEM DE SUCESSO */
        alert('Usuário cadastrado com sucesso!\n\nNome: ' + dados.nome + '\nE-mail: ' + dados.email + '\nCPF: ' + dados.cpf);

        /* LIMPA O FORMULÁRIO */
        limpaFormulario();

    } catch (error) {
        console.error('Erro durante o cadastro:', error);
        alert('Erro ao processar o cadastro. Por favor, tente novamente.');
    }

});