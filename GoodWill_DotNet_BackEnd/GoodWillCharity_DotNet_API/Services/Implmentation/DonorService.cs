using GoodWillCharity_DotNet_API.Models;
using GoodWillCharity_DotNet_API.Services.Abstract;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Drawing;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace GoodWillCharity_DotNet_API.Services.Implmentation
{
    public class DonorService : IDonorService
    {
        private readonly IMongoCollection<Donor> _donorCollection;
        private readonly IOptions<DatabaseSettings> _dbSettings;
        private readonly IConfiguration configuration;

        public DonorService(IOptions<DatabaseSettings> dbSettings, IConfiguration configuration)
        {
            _dbSettings = dbSettings;
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DbName);
            _donorCollection = mongoDatabase.GetCollection<Donor>(dbSettings.Value.DonorCollection);
            this.configuration = configuration;
        }
        public async Task CreateAsync(Donor donor) =>
            await _donorCollection.InsertOneAsync(donor);

        public async Task DeleteAsync(string id) =>
            await _donorCollection.DeleteOneAsync(a => a.Id == id);

        public async Task<IEnumerable<Donor>> GetAllAsyc() =>
            await _donorCollection.Find(_ => true).ToListAsync();

        public async Task<Donor> GetById(string id) =>
            await _donorCollection.Find(a => a.Id == id).FirstOrDefaultAsync();

        //public async Task UpdateAsync(string id, Donor donor) =>
        //    await _donorCollection.ReplaceOneAsync(a => a.Id == id, donor);
        public async Task<Donor> LoginDonor(string email, string password) =>
            await _donorCollection.Find(a => a.Email == email && a.Password == password).FirstOrDefaultAsync();
        public async Task UpdateAsync(string id, Donor donor)
        {
            var existingDonor = await _donorCollection.Find(a => a.Id == id).FirstOrDefaultAsync();
            if (existingDonor != null)
            {
                // Update only non-null properties
                existingDonor.Name = donor.Name ?? existingDonor.Name;
                existingDonor.Email = donor.Email ?? existingDonor.Email;
                existingDonor.Phone = donor.Phone ?? existingDonor.Phone;
                existingDonor.ProfilePicPath = donor.ProfilePicPath ?? existingDonor.ProfilePicPath;
                existingDonor.Role=donor.Role ?? existingDonor.Role;
                existingDonor.Password = donor.Password ?? existingDonor.Password;
                await _donorCollection.ReplaceOneAsync(a => a.Id == id, existingDonor);
            }
        }
        public string GenrateToken(Donor obj) 
        {
            string uRole = obj.Role.ToString();
            Console.WriteLine(uRole);
            var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("UserId", obj.Id.ToString()),
                    new Claim("UserRole", uRole)
                };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: singIn
                );
            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenValue;
        }

    }
}
