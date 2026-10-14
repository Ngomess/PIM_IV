using TechAcademy.API.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TechAcademy.API.Models;

namespace TechAcademy.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TechAcademyContext _context;
        private readonly PasswordHasher<Usuario> _passwordHasher = new();
        private readonly IConfiguration _configuration;

        public AuthController(
            TechAcademyContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var email = dto.Email.Trim();

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email);

            if (usuario == null)
            {
                return Unauthorized(new
                {
                    mensagem = "E-mail ou senha inválidos."
                });
            }

            if (!usuario.Ativo)
            {
                return Unauthorized(new
                {
                    mensagem = "Usuário inativo."
                });
            }

            var resultado = _passwordHasher.VerifyHashedPassword(
                usuario,
                usuario.Senha,
                dto.Senha
            );

            if (resultado == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new
                {
                    mensagem = "E-mail ou senha inválidos."
                });
            }

            var token = GerarToken(usuario);

            return Ok(new
            {
                mensagem = "Login realizado com sucesso.",
                token = token,
                usuario = new
                {
                    usuario.IdUsuario,
                    usuario.Nome,
                    usuario.Email,
                    usuario.TipoUsuario
                }
            });
        }

        // GERAR TOKEN JWT
        private string GerarToken(Usuario usuario)
        {
            var claims = new[]
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    usuario.IdUsuario.ToString()
                ),

                new Claim(
                    ClaimTypes.Name,
                    usuario.Nome
                ),

                new Claim(
                    ClaimTypes.Email,
                    usuario.Email
                ),

                new Claim(
                    ClaimTypes.Role,
                    usuario.TipoUsuario
                )
            };

            var chave = _configuration["Jwt:Key"];

            if (string.IsNullOrWhiteSpace(chave))
            {
                throw new InvalidOperationException(
                    "A chave JWT não está configurada."
                );
            }

            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(chave)
            );

            var credentials = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // CADASTRO DE ESTUDANTE
        [HttpPost("register")]
        public async Task<IActionResult> RegistrarEstudante(
            [FromBody] RegistrarEstudanteDto dto)
        {
            // Normalizar os dados recebidos
            var nome = dto.Nome.Trim();
            var email = dto.Email.Trim();
            var cpf = new string(
                dto.Cpf.Where(char.IsDigit).ToArray()
            );

            // Validar o CPF normalizado
            if (cpf.Length != 11)
            {
                return BadRequest(new
                {
                    mensagem = "O CPF deve conter exatamente 11 dígitos."
                });
            }

            // Buscar os e-mails e CPFs existentes
            var usuariosExistentes = await _context.Usuarios
                .Select(u => new
                {
                    u.Email,
                    u.Cpf
                })
                .ToListAsync();

            // Verificar e-mail duplicado, ignorando espaços
            // externos e diferenças entre maiúsculas e minúsculas
            var emailExiste = usuariosExistentes.Any(u =>
                string.Equals(
                    (u.Email ?? string.Empty).Trim(),
                    email,
                    StringComparison.OrdinalIgnoreCase
                )
            );

            if (emailExiste)
            {
                return Conflict(new
                {
                    mensagem = "Este e-mail já está cadastrado."
                });
            }

            // Verificar CPF duplicado, ignorando pontuação
            var cpfExiste = usuariosExistentes.Any(u =>
                new string(
                    (u.Cpf ?? string.Empty)
                        .Where(char.IsDigit)
                        .ToArray()
                ) == cpf
            );

            if (cpfExiste)
            {
                return Conflict(new
                {
                    mensagem = "Este CPF já está cadastrado."
                });
            }

            // Criar estudante
            var usuario = new Usuario
            {
                Nome = nome,
                Email = email,
                Cpf = cpf,
                Senha = _passwordHasher.HashPassword(
                    null!,
                    dto.Senha
                ),
                TipoUsuario = "Estudante",
                Ativo = true
            };

            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            return Created("", new
            {
                usuario.IdUsuario,
                usuario.Nome,
                usuario.Email,
                usuario.Cpf,
                usuario.TipoUsuario,
                usuario.Ativo
            });
        }
    }
}