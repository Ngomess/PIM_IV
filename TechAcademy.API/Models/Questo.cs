using System;
using System.Collections.Generic;

namespace TechAcademy.API.Models;

public partial class Questo
{
    public int Id { get; set; }

    public int NumeroQuestao { get; set; }

    public string Enunciado { get; set; } = null!;

    public string? Materia { get; set; }

    public string AlternativaCerta { get; set; } = null!;
}
