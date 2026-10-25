
using System;
using System.Drawing;
using System.Windows.Forms;

namespace TechAcademy.Desktop.Forms
{
    public class FrmPrincipal : Form
    {
        public FrmPrincipal(string nomeUsuario = "Administrador")
        {
            Text = "TechAcademy - Painel do Administrador";
            Size = new Size(600, 450);
            StartPosition = FormStartPosition.CenterScreen;
            BackColor = Color.White;

            var titulo = new Label
            {
                Text = "TechAcademy",
                Font = new Font("Segoe UI", 22, FontStyle.Bold),
                ForeColor = Color.FromArgb(36, 87, 167),
                AutoSize = true,
                Location = new Point(35, 25)
            };

            var boasVindas = new Label
            {
                Text = $"Bem-vindo, {nomeUsuario}!",
                Font = new Font("Segoe UI", 11),
                AutoSize = true,
                Location = new Point(38, 80)
            };

            var btnGerenciar = CriarBotao("Gerenciar Usuários", 135);
            var btnCadastrar = CriarBotao("Cadastrar Usuários", 210);
            var btnSair = CriarBotao("Sair", 285);

            btnGerenciar.Click += (s, e) =>
                MessageBox.Show("Gerenciamento de usuários será implementado.");

            btnCadastrar.Click += (s, e) =>
                MessageBox.Show("Cadastro de usuários será implementado.");

            btnSair.Click += (s, e) => Close();

            Controls.AddRange(new Control[]
            {
                titulo, boasVindas, btnGerenciar, btnCadastrar, btnSair
            });
        }

        private Button CriarBotao(string texto, int posicaoY)
        {
            return new Button
            {
                Text = texto,
                Size = new Size(300, 55),
                Location = new Point(140, posicaoY),
                BackColor = Color.FromArgb(36, 87, 167),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 11)
            };
        }
    }
}
