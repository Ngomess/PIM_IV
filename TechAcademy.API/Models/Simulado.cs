using System;
using System.Collections.Generic;

namespace TechAcademy.API.Models;

public partial class Simulado
{
    public int IdSimulado { get; set; }

    public string Materia { get; set; } = null!;

    public int Nivel { get; set; }

    public virtual ICollection<ResultadoSimulado> ResultadoSimulados { get; set; } = new List<ResultadoSimulado>();
}
