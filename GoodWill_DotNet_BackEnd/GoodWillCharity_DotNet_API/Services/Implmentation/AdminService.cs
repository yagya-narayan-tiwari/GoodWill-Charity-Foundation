using GoodWillCharity_DotNet_API.Models;
using GoodWillCharity_DotNet_API.Services.Abstract;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GoodWillCharity_DotNet_API.Services.Implmentation
{
    public class AdminService:IAdminService
    {
        private readonly IMongoCollection<Admin> _adminCollection;
        private readonly IOptions<DatabaseSettings> _dbSettings;
        private readonly IConfiguration configuration;

        public AdminService(IOptions<DatabaseSettings> dbSettings, IConfiguration configuration)
        {
            _dbSettings = dbSettings;
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DbName);
            _adminCollection = mongoDatabase.GetCollection<Admin>(dbSettings.Value.AdminCollection);
            this.configuration = configuration;
        }

        public async Task CreateAsync(Admin admin) =>
            await _adminCollection.InsertOneAsync(admin);
        public async Task<Admin> LoginAdmin(string email, string password) =>
            await _adminCollection.Find(a => a.Email == email && a.Password == password).FirstOrDefaultAsync();

        public string GenrateToken(Admin obj)
        {
            var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("UserId", obj.Id.ToString()),
                    new Claim("UserRole", obj.Role.ToString()),
                };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddDays(10),
                signingCredentials: singIn
                );
            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenValue;
        }
    }
}
