using GoodWill_DotNet_API.Services.Implmentation;
using GoodWillCharity_DotNet_API.Models;
using GoodWillCharity_DotNet_API.Services.Abstract;
using GoodWillCharity_DotNet_API.Services.Implmentation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowReactApp",
            build =>
            {
                build.WithOrigins("http://localhost:3000", "http://localhost:5173")
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
    });

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<DatabaseSettings>(
        builder.Configuration.GetSection("MyDb")
    );
builder.Services.AddTransient<IDonorService, DonorService>();
builder.Services.AddTransient<INgoService, NgoService>();
builder.Services.AddTransient<IFileService, FileService>();
builder.Services.AddTransient<IAdminService, AdminService>();
builder.Services.AddTransient<ICharityService, CharityService>();
builder.Services.AddTransient<IDonationService, DonationService>();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
{
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateLifetime = true,
    ValidateIssuerSigningKey = true,
    ValidIssuer = builder.Configuration["Jwt:Issuer"],
    ValidAudience = builder.Configuration["Jwt:Audience"],
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors("AllowReactApp");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "Uploads")),
           RequestPath = "/Resources"
});

app.MapControllers();

app.Run();
