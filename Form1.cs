using System;
using System.Drawing;
using System.Windows.Forms;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using TechAcademy.Desktop.DTOs;
using TechAcademy.Desktop.Services;
using TechAcademy.Desktop.Forms;

namespace TechAcademy.Desktop
{
    public partial class Form1 : Form
    {
        private TextBox txtEmail;
        private TextBox txtSenha;
        private Button btnEntrar;

        public Form1()
        {
            InitializeComponent();

            Text = "TechAcademy - Login";
            StartPosition = FormStartPosition.CenterScreen;
            Size = new Size(500, 420);
            BackColor = Color.White;
            FormBorderStyle = FormBorderStyle.FixedSingle;
            MaximizeBox = false;

            CriarTelaLogin();
        }

        private void CriarTelaLogin()
        {
            Label lblTitulo = new Label();
            lblTitulo.Text = "TechAcademy";
            lblTitulo.Font = new Font("Arial", 22, FontStyle.Bold);
            lblTitulo.ForeColor = Color.FromArgb(25, 45, 75);
            lblTitulo.AutoSize = true;
            lblTitulo.Location = new Point(100, 35);
            Controls.Add(lblTitulo);

            Label lblSubtitulo = new Label();
            lblSubtitulo.Text = "Acesso do Administrador";
            lblSubtitulo.Font = new Font("Arial", 11);
            lblSubtitulo.AutoSize = true;
            lblSubtitulo.Location = new Point(100, 80);
            Controls.Add(lblSubtitulo);

            Label lblEmail = new Label();
            lblEmail.Text = "E-mail";
            lblEmail.AutoSize = true;
            lblEmail.Location = new Point(70, 130);
            Controls.Add(lblEmail);

            txtEmail = new TextBox();
            txtEmail.Location = new Point(70, 155);
            txtEmail.Size = new Size(340, 30);
            txtEmail.Font = new Font("Arial", 11);
            Controls.Add(txtEmail);

            Label lblSenha = new Label();
            lblSenha.Text = "Senha";
            lblSenha.AutoSize = true;
            lblSenha.Location = new Point(70, 200);
            Controls.Add(lblSenha);

            txtSenha = new TextBox();
            txtSenha.Location = new Point(70, 225);
            txtSenha.Size = new Size(340, 30);
            txtSenha.Font = new Font("Arial", 11);
            txtSenha.UseSystemPasswordChar = true;
            Controls.Add(txtSenha);

            btnEntrar = new Button();
            btnEntrar.Text = "Entrar";
            btnEntrar.Location = new Point(70, 285);
            btnEntrar.Size = new Size(340, 40);
            btnEntrar.BackColor = Color.FromArgb(35, 110, 85);
            btnEntrar.ForeColor = Color.White;
            btnEntrar.Font = new Font("Arial", 11, FontStyle.Bold);
            btnEntrar.FlatStyle = FlatStyle.Flat;
            btnEntrar.Cursor = Cursors.Hand;
            Controls.Add(btnEntrar);

            btnEntrar.Click += BtnEntrar_Click;
        }

        
        private async void BtnEntrar_Click(object sender, EventArgs e)
        {
            string email = txtEmail.Text.Trim();
            string senha = txtSenha.Text;

            if (string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(senha))
            {
                MessageBox.Show(
                    "Preencha o e-mail e a senha.",
                    "Campos obrigatórios",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Warning
                );
                return;
            }

            try
            {
                btnEntrar.Enabled = false;
                btnEntrar.Text = "Entrando...";

                var resposta = await ApiService.HttpClient.PostAsJsonAsync(
                    "api/Auth/login",
                    new
                    {
                        Email = email,
                        Senha = senha
                    }
                );

                if (!resposta.IsSuccessStatusCode)
                {
                     
                    string mensagem = "Não foi possível realizar o login.";
                    
                    try
                    {
                        var conteudo = await resposta.Content.ReadFromJsonAsync<JsonElement>();

                        if (conteudo.TryGetProperty("mensagem", out var campoMensagem))
                        {
                            mensagem = campoMensagem.GetString() ?? mensagem;
                        }
                    }
                    catch (JsonException)
                    {
                        // Mantém a mensagem padrão se a resposta não for JSON válido.
                    }

                    MessageBox.Show(
                        mensagem,
                        "Falha no login",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Warning
                    );

                    return;
                }

                var dados = await resposta.Content.ReadFromJsonAsync<LoginRespostaDto>();

                if (dados == null || string.IsNullOrWhiteSpace(dados.Token))
                {
                    MessageBox.Show("A API não retornou um token válido.");
                    return;
                }

                if (!string.Equals(
                    dados.Usuario?.TipoUsuario,
                    "Administrador",
                    StringComparison.OrdinalIgnoreCase))
                {
                    MessageBox.Show(
                        "Acesso permitido somente para administradores.",
                        "Acesso negado",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Warning
                    );

                    return;
                }

                ApiService.HttpClient.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue(
                        "Bearer",
                        dados.Token
                    );

                    this.Hide();

                    using (var telaPrincipal = new FrmPrincipal(dados.Usuario!.Nome))
                    {
                        telaPrincipal.ShowDialog();
                    }

                    this.Show();
            }
            catch (HttpRequestException)
            {
                MessageBox.Show(
                    "Não foi possível conectar à API. Verifique se ela está em execução.",
                    "Erro de conexão",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
            finally
            {
                btnEntrar.Enabled = true;
                btnEntrar.Text = "Entrar";
            }
        }

    }
}


