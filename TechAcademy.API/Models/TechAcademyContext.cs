using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TechAcademy.API.Models;

public partial class TechAcademyContext : DbContext
{
    public TechAcademyContext()
    {
    }

    public TechAcademyContext(DbContextOptions<TechAcademyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Alternativa> Alternativas { get; set; }

    public virtual DbSet<Questo> Questoes { get; set; }

    public virtual DbSet<ResultadoSimulado> ResultadoSimulados { get; set; }

    public virtual DbSet<Simulado> Simulados { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Alternativa>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("alternativas");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Letra)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.QuestaoId).HasColumnName("Questao_ID");

            entity.HasOne(d => d.Questao).WithMany()
                .HasForeignKey(d => d.QuestaoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Questao");
        });

        modelBuilder.Entity<Questo>(entity =>
        {
            entity.ToTable("questoes");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.AlternativaCerta)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Alternativa_certa");
            entity.Property(e => e.Materia).HasMaxLength(100);
            entity.Property(e => e.NumeroQuestao).HasColumnName("Numero_questao");
        });

        modelBuilder.Entity<ResultadoSimulado>(entity =>
        {
            entity.HasKey(e => e.IdResultado).HasName("PK__Resultad__33A42B30E4289DBD");

            entity.ToTable("Resultado_Simulado");

            entity.Property(e => e.IdResultado).HasColumnName("id_resultado");
            entity.Property(e => e.IdSimulado).HasColumnName("id_simulado");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Nota)
                .HasColumnType("decimal(4, 2)")
                .HasColumnName("nota");
            entity.Property(e => e.PercentualAcerto).HasColumnName("percentual_acerto");

            entity.HasOne(d => d.IdSimuladoNavigation).WithMany(p => p.ResultadoSimulados)
                .HasForeignKey(d => d.IdSimulado)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Resultado__id_si__59FA5E80");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.ResultadoSimulados)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Resultado__id_us__59063A47");
        });

        modelBuilder.Entity<Simulado>(entity =>
        {
            entity.HasKey(e => e.IdSimulado).HasName("PK__Simulado__F8CC2EA86DFB06B3");

            entity.ToTable("Simulado");

            entity.Property(e => e.IdSimulado).HasColumnName("id_simulado");
            entity.Property(e => e.Materia)
                .HasMaxLength(30)
                .HasColumnName("materia");
            entity.Property(e => e.Nivel).HasColumnName("nivel");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__4E3E04AD43604F18");

            entity.ToTable("Usuario");

            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Ativo).HasDefaultValue(true);
            entity.Property(e => e.Cpf)
                .HasMaxLength(11)
                .HasColumnName("cpf");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .HasColumnName("nome");
            entity.Property(e => e.Senha)
                .HasMaxLength(255)
                .HasColumnName("senha");
            entity.Property(e => e.TipoUsuario)
                .HasMaxLength(15)
                .HasColumnName("tipo_usuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
