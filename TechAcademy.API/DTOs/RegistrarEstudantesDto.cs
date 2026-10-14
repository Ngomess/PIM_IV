using System.ComponentModel.DataAnnotations;

namespace TechAcademy.API.DTOs
{
    public class RegistrarEstudanteDto
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(150, ErrorMessage = "O nome deve ter no máximo 150 caracteres.")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "Informe um e-mail válido.")]
        [StringLength(254, ErrorMessage = "O e-mail deve ter no máximo 254 caracteres.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "O CPF é obrigatório.")]
        [RegularExpression(
            @"^[0-9.\-/ ]+$",
            ErrorMessage = "O CPF deve conter apenas números e caracteres de formatação."
        )]
        public string Cpf { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [StringLength(
            100,
            MinimumLength = 8,
            ErrorMessage = "A senha deve ter entre 8 e 100 caracteres."
        )]
        public string Senha { get; set; } = string.Empty;
    }
}