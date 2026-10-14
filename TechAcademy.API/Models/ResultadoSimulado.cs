using System;
using System.Collections.Generic;

namespace TechAcademy.API.Models;

public partial class ResultadoSimulado
{
    public int IdResultado { get; set; }

    public decimal Nota { get; set; }

    public int PercentualAcerto { get; set; }

    public int IdUsuario { get; set; }

    public int IdSimulado { get; set; }

    public virtual Simulado IdSimuladoNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
