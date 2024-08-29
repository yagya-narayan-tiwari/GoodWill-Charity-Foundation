using GoodWillCharity_DotNet_API.Models;
using GoodWillCharity_DotNet_API.Services.Abstract;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GoodWill_DotNet_API.Services.Implmentation
{
    public class NgoService : INgoService
    {
        private readonly IMongoCollection<Ngo> _ngoCollection;
        private readonly IOptions<DatabaseSettings> _dbSettings;
        private readonly IConfiguration configuration;

        public NgoService(IOptions<DatabaseSettings> dbSettings,IConfiguration cfg)
        {
            _dbSettings = dbSettings;
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DbName);
            _ngoCollection = mongoDatabase.GetCollection<Ngo>(dbSettings.Value.NgoCollection);
            configuration = cfg;
        }
        public async Task CreateAsync(Ngo ngo) =>
            await _ngoCollection.InsertOneAsync(ngo);

        public async Task DeleteAsync(string id) =>
            await _ngoCollection.DeleteOneAsync(a => a.Id == id);

        public async Task<IEnumerable<Ngo>> GetAllAsyc() =>
            await _ngoCollection.Find(_ => true).ToListAsync();

        public async Task<Ngo> GetById(string id) =>
            await _ngoCollection.Find(a => a.Id == id).FirstOrDefaultAsync();

        //public async Task UpdateAsync(string id, Ngo ngo) =>
        //    await _ngoCollection.ReplaceOneAsync(a => a.Id == id, ngo);
        public async Task UpdateAsync(string id, Ngo ngo)
        {
            var existingNgo = await _ngoCollection.Find(a => a.Id == id).FirstOrDefaultAsync();
            if (existingNgo != null)
            {
                // Update only non-null properties
                existingNgo.Name = ngo.Name ?? existingNgo.Name;
                existingNgo.Email = ngo.Email ?? existingNgo.Email;
                existingNgo.Phone = ngo.Phone ?? existingNgo.Phone;
                existingNgo.ProfilePicPath = ngo.ProfilePicPath ?? existingNgo.ProfilePicPath;
                existingNgo.Role = ngo.Role ?? existingNgo.Role;
                existingNgo.Password = ngo.Password ?? existingNgo.Password;
                existingNgo.Address = ngo.Address ?? existingNgo.Address;
                await _ngoCollection.ReplaceOneAsync(a => a.Id == id, existingNgo);
            }
        }

        public async Task<Ngo> LoginNgo(string email, string password) =>
            await _ngoCollection.Find(a => a.Email == email && a.Password == password).FirstOrDefaultAsync();

        //public string GenerateToken(Ngo ngo)
        //{
        //    string? uRole = ngo.Role.ToString();
        //    Console.WriteLine("Ngo Role Is "+uRole);
        //    var claims = new[]
        //        {
        //            new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
        //            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        //            new Claim("UserId", ngo.Id.ToString()),
        //            //new Claim("UserRole", uRole),
        //        };
        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
        //    var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        //    var token = new JwtSecurityToken(
        //        configuration["Jwt:Issuer"],
        //        configuration["Jwt:Audience"],
        //        claims,
        //        expires: DateTime.UtcNow.AddDays(1),
        //        signingCredentials: singIn
        //        );
        //    string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
        //    return tokenValue;
        //}
        public string GenerateToken(Ngo ngo)
        {
            if (ngo == null)
            {
                Console.WriteLine("The ngo object cannot be null.");
                throw new ArgumentNullException(nameof(ngo), "The ngo object cannot be null.");
            }

            if (configuration == null)
            {
                Console.WriteLine("Configuration is not initialized.");
                throw new InvalidOperationException("Configuration is not initialized.");
            }

            var subject = configuration["Jwt:Subject"];
            Console.WriteLine("sub== "+subject );
            var keyString = configuration["Jwt:Key"];
            Console.WriteLine("key " +keyString);
            var issuer = configuration["Jwt:Issuer"];
            Console.WriteLine("issuer " + issuer);
            var audience = configuration["Jwt:Audience"];
            Console.WriteLine("audi " + audience);

            if (string.IsNullOrEmpty(subject) || string.IsNullOrEmpty(keyString) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
            {
                Console.WriteLine("JWT configuration values are missing.");
                throw new InvalidOperationException("JWT configuration values are missing.");
            }

            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, subject),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim("UserId", ngo.Id.ToString()),
        new Claim("UserRole", ngo.Role.ToString())
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer,
                audience,
                claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: signIn
            );

            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenValue;
        }

    }
}
