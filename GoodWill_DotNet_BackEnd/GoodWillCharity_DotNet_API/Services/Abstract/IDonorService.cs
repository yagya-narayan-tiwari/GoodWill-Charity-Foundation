using GoodWillCharity_DotNet_API.Models;

namespace GoodWillCharity_DotNet_API.Services.Abstract
{
    public interface IDonorService
    {
        Task<IEnumerable<Donor>> GetAllAsyc();
        Task<Donor> GetById(string id);
        Task CreateAsync(Donor donor);
        Task DeleteAsync(string id);
        Task UpdateAsync(string id, Donor donor);
        Task<Donor> LoginDonor(string email, string password);
        string GenrateToken(Donor obj);
    }
}