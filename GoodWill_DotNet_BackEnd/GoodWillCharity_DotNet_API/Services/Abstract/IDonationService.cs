using GoodWillCharity_DotNet_API.Models;

namespace GoodWillCharity_DotNet_API.Services.Abstract
{
    public interface IDonationService
    {
        Task<IEnumerable<Donation>> GetAllAsyc();
        Task<Donation> GetById(string id);
        Task CreateAsync(Donation donation);
        Task<IEnumerable<Donation>> GetByNgoId(string id);
        Task<IEnumerable<Donation>> GetByDonorId(string id);
    }
}
