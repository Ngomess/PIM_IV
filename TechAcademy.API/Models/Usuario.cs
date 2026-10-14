using System;
using System.Collections.Generic;

namespace TechAcademy.API.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Cpf { get; set; } = null!;

    public string Senha { get; set; } = null!;

    public string TipoUsuario { get; set; } = null!;

    public bool Ativo { get; set; }

    public virtual ICollection<ResultadoSimulado> ResultadoSimulados { get; set; } = new List<ResultadoSimulado>();
}
