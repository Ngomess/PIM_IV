using System;
using System.Collections.Generic;

namespace TechAcademy.API.Models;

public partial class Alternativa
{
    public int Id { get; set; }

    public int QuestaoId { get; set; }

    public string Letra { get; set; } = null!;

    public string Texto { get; set; } = null!;

    public bool? Correta { get; set; }

    public string? Justificativa { get; set; }

    public virtual Questo Questao { get; set; } = null!;
}
