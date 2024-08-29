using GoodWillCharity_DotNet_API.Models;
using GoodWillCharity_DotNet_API.Services.Abstract;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace GoodWillCharity_DotNet_API.Services.Implmentation
{
    public class DonationService : IDonationService
    {
        private readonly IMongoCollection<Donation> _orderCollection;
        private readonly IOptions<DatabaseSettings> _dbSettings;
        

        public DonationService(IOptions<DatabaseSettings> dbSettings)
        {
            _dbSettings = dbSettings;
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DbName);
            _orderCollection = mongoDatabase.GetCollection<Donation>(dbSettings.Value.OrderCollection);
            
        }

        public async Task CreateAsync(Donation order) =>
           await _orderCollection.InsertOneAsync(order);

        public async Task<IEnumerable<Donation>> GetAllAsyc() =>
            await _orderCollection.Find(_ => true).ToListAsync();

        public async Task<Donation> GetById(string id) =>
            await _orderCollection.Find(a => a.Id == id).FirstOrDefaultAsync();

        public async Task<IEnumerable<Donation>> GetByNgoId(string id) =>
            await _orderCollection.Find(a=>a.NgoId == id).ToListAsync();

        public async Task<IEnumerable<Donation>> GetByDonorId(string id) =>
            await _orderCollection.Find(a => a.DonorId == id).ToListAsync();

    }
}
