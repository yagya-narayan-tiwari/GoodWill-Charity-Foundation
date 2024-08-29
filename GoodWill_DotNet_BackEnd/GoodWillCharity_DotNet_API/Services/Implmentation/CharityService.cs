using GoodWillCharity_DotNet_API.Models;
using GoodWillCharity_DotNet_API.Services.Abstract;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace GoodWillCharity_DotNet_API.Services.Implmentation
{
    public class CharityService : ICharityService
    {
        private readonly IMongoCollection<Charity> _charityCollection;
        private readonly IOptions<DatabaseSettings> _dbSettings;
        private readonly IConfiguration configuration;

        public CharityService(IOptions<DatabaseSettings> dbSettings, IConfiguration configuration)
        {
            _dbSettings = dbSettings;
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DbName);
            _charityCollection = mongoDatabase.GetCollection<Charity>(dbSettings.Value.CharityCollection);
            this.configuration = configuration;
        }
        public async Task CreateAsync(Charity charity) =>
            await _charityCollection.InsertOneAsync(charity);

        public async Task DeleteAsync(string id) =>
            await _charityCollection.DeleteOneAsync(a => a.Id == id);

        public async Task<IEnumerable<Charity>> GetAllAsyc() =>
            await _charityCollection.Find(_ => true).ToListAsync();

        public async Task<Charity> GetById(string id) =>
            await _charityCollection.Find(a => a.Id == id).FirstOrDefaultAsync();

        public async Task UpdateAsync(string id, Charity charity) =>
            await _charityCollection.ReplaceOneAsync(a => a.Id == id, charity);
        public async Task<IEnumerable<Charity>> GetByNgoId(string id) =>
            await _charityCollection.Find(a => a.NgoId == id).ToListAsync();

    }
}
