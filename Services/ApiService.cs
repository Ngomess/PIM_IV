using System;
using System.Net.Http;

//criação e conexão api

namespace TechAcademy.Desktop.Services
{
    public static class ApiService
    {
        public static readonly HttpClient HttpClient = new HttpClient
        {
            BaseAddress = new Uri("http://localhost:5108/api")
        };
    }
}
