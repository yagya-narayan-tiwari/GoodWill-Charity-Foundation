using GoodWillCharity_DotNet_API.Models;

namespace GoodWillCharity_DotNet_API.Services.Abstract
{
    public interface IAdminService
    {
        Task CreateAsync(Admin admin);
        Task<Admin> LoginAdmin(string email, string password);
        string GenrateToken(Admin admin);

    }
}
