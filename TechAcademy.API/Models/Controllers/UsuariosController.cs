using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using TechAcademy.API.DTOs;
using TechAcademy.API.Models;
using System.Security.Claims;

namespace TechAcademy.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly TechAcademyContext _context;
        private readonly PasswordHasher<Usuario> _passwordHasher = new();

        public UsuariosController(TechAcademyContext context)
        {
            _context = context;
        }

        // LISTAR TODOS OS USUÁRIOS
        [Authorize(Roles = "Administrador")]
        [HttpGet]
        public async Task<IActionResult> GetUsuarios()
        {
            var usuarios = await _context.Usuarios
                .Select(u => new
                {
                    u.IdUsuario,
                    u.Nome,
                    u.Email,
                    u.Cpf,
                    u.TipoUsuario,
                    u.Ativo
                })
                .ToListAsync();

            return Ok(usuarios);
        }

        // CONSULTAR USUÁRIO POR ID
        [Authorize(Roles = "Administrador")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuarioPorId(int id)
        {
            var usuario = await _context.Usuarios
                .Where(u => u.IdUsuario == id)
                .Select(u => new
                {
                    u.IdUsuario,
                    u.Nome,
                    u.Email,
                    u.Cpf,
                    u.TipoUsuario,
                    u.Ativo
                })
                .FirstOrDefaultAsync();

            if (usuario == null)
            {
                return NotFound(new
                {
                    mensagem = "Usuário não encontrado."
                });
            }

            return Ok(usuario);
        }

        // CRIAR USUÁRIO
        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public async Task<IActionResult> CriarUsuario(
            [FromBody] CriarUsuarioDto dto)
        {
            // Normalizar os dados recebidos
            var nome = dto.Nome.Trim();
            var email = dto.Email.Trim();
            var cpf = new string(
                dto.Cpf.Where(char.IsDigit).ToArray()
            );
            var tipoUsuario = dto.TipoUsuario.Trim();

            // Validar perfil permitido
            if (tipoUsuario != "Professor" &&
                tipoUsuario != "Coordenador" &&
                tipoUsuario != "Administrador")
            {
                return BadRequest(new
                {
                    mensagem = "O tipo de usuário deve ser Professor, Coordenador ou Administrador."
                });
            }

            // Validar CPF
            if (cpf.Length != 11)
            {
                return BadRequest(new
                {
                    mensagem = "O CPF deve conter exatamente 11 dígitos."
                });
            }

            // Buscar dados existentes para comparar de forma normalizada
            var usuariosExistentes = await _context.Usuarios
                .Select(u => new
                {
                    u.Email,
                    u.Cpf
                })
                .ToListAsync();

            // Verificar e-mail duplicado, ignorando maiúsculas/minúsculas
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

            // Verificar CPF duplicado, ignorando pontuação e espaços
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

            // Criar usuário
            var usuario = new Usuario
            {
                Nome = nome,
                Email = email,
                Cpf = cpf,
                Senha = _passwordHasher.HashPassword(
                    null!,
                    dto.Senha
                ),
                TipoUsuario = tipoUsuario,
                Ativo = true
            };

            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetUsuarioPorId),
                new { id = usuario.IdUsuario },
                new
                {
                    usuario.IdUsuario,
                    usuario.Nome,
                    usuario.Email,
                    usuario.Cpf,
                    usuario.TipoUsuario,
                    usuario.Ativo
                }
            );
        }

        // INATIVAR USUÁRIO
        [Authorize(Roles = "Administrador")]
        [HttpPatch("{id}/inativar")]
        public async Task<IActionResult> InativarUsuario(int id)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.IdUsuario == id);

            if (usuario == null)
            {
                return NotFound(new
                {
                    mensagem = "Usuário não encontrado."
                });
            }

            var claimId = User.FindFirst(
                ClaimTypes.NameIdentifier
            )?.Value;

            if (!int.TryParse(claimId, out var idUsuarioLogado))
            {
                return Unauthorized(new
                {
                    mensagem = "Não foi possível identificar o usuário autenticado."
                });
            }

            if (usuario.IdUsuario == idUsuarioLogado)
            {
                return BadRequest(new
                {
                    mensagem = "Você não pode inativar a própria conta."
                });
            }

            if (!usuario.Ativo)
            {
                return BadRequest(new
                {
                    mensagem = "O usuário já está inativo."
                });
            }

            usuario.Ativo = false;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensagem = "Usuário inativado com sucesso.",
                usuario = new
                {
                    usuario.IdUsuario,
                    usuario.Nome,
                    usuario.Email,
                    usuario.TipoUsuario,
                    usuario.Ativo
                }
            });
        }

        // REATIVAR USUÁRIO
        [Authorize(Roles = "Administrador")]
        [HttpPatch("{id}/reativar")]
        public async Task<IActionResult> ReativarUsuario(int id)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.IdUsuario == id);

            if (usuario == null)
            {
                return NotFound(new
                {
                    mensagem = "Usuário não encontrado."
                });
            }

            if (usuario.Ativo)
            {
                return BadRequest(new
                {
                    mensagem = "O usuário já está ativo."
                });
            }

            usuario.Ativo = true;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensagem = "Usuário reativado com sucesso.",
                usuario = new
                {
                    usuario.IdUsuario,
                    usuario.Nome,
                    usuario.Email,
                    usuario.TipoUsuario,
                    usuario.Ativo
                }
            });
        }
    }
}