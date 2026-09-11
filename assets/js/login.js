// Alternância entre Login e Cadastro
const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const buttonText = document.getElementById("button-text");
const authButton = document.getElementById("auth-button");

loginTab.addEventListener("click", () => {
    loginTab.classList.add("auth-tabs__button--active");
    signupTab.classList.remove("auth-tabs__button--active");

    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");

    buttonText.textContent = "Entrar";
});

signupTab.addEventListener("click", () => {
    signupTab.classList.add("auth-tabs__button--active");
    loginTab.classList.remove("auth-tabs__button--active");

    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    buttonText.textContent = "Criar Minha Conta";
});

// Função principal do botão
authButton.addEventListener("click", () => {

    // ======================
    // CADASTRO
    // ======================
    if (signupTab.classList.contains("auth-tabs__button--active")) {

        const email = document.getElementById("signup-email").value.trim();
        const cpf = document.getElementById("signup-cpf").value.trim();
        const senha = document.getElementById("signup-password").value;
        const confirmarSenha = document.getElementById("signup-confirm-password").value;

        if (!email || !cpf || !senha || !confirmarSenha) {
            alert("Preencha todos os campos.");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const cpfExistente = usuarios.find(
            usuario => usuario.cpf === cpf
        );

        if (cpfExistente) {
            alert("CPF já cadastrado.");
            return;
        }

        const novoUsuario = {
            id: Date.now(),
            email,
            cpf,
            senha,
            dataCadastro: new Date().toISOString()
        };

        usuarios.push(novoUsuario);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        alert("Conta criada com sucesso!");

        signupForm.reset();

        console.log(
            JSON.parse(localStorage.getItem("usuarios"))
        );
    }

    // ======================
    // LOGIN
    // ======================
    else {

        const cpf = document.getElementById("login-cpf").value.trim();
        const senha = document.getElementById("login-password").value;

        if (!cpf || !senha) {
            alert("Preencha CPF e senha.");
            return;
        }

        const usuarios = JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];

        const usuarioEncontrado = usuarios.find(
            usuario =>
                usuario.cpf === cpf &&
                usuario.senha === senha
        );

        if (!usuarioEncontrado) {
            alert("CPF ou senha inválidos.");
            return;
        }

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuarioEncontrado)
        );

        alert("Login realizado com sucesso!");

        console.log("Usuário logado:", usuarioEncontrado);

        // Redirecionar para dashboard
        // window.location.href = "dashboard.html";
    }
});