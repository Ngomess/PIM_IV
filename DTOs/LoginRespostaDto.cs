
using System.Text.Json.Serialization;

//Reposta da API depois de logar com usuario

namespace TechAcademy.Desktop.DTOs
{
    public class LoginRespostaDto
    {
        [JsonPropertyName("mensagem")]
        public string Mensagem { get; set; } = "";

        [JsonPropertyName("token")]
        public string Token { get; set; } = "";

        [JsonPropertyName("usuario")]
        public UsuarioLoginDto? Usuario { get; set; }
    }

    public class UsuarioLoginDto
    {
        [JsonPropertyName("idUsuario")]
        public int IdUsuario { get; set; }

        [JsonPropertyName("nome")]
        public string Nome { get; set; } = "";

        [JsonPropertyName("email")]
        public string Email { get; set; } = "";

        [JsonPropertyName("tipoUsuario")]
        public string TipoUsuario { get; set; } = "";
    }
}
