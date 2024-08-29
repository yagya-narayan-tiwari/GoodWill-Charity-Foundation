using GoodWillCharity_DotNet_API.Models;
using GoodWillCharity_DotNet_API.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoodWillCharity_DotNet_API.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IFileService _fileService;

        public AdminController(IAdminService admin, IFileService fileService)
        {
            _adminService = admin;
            _fileService = fileService;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Admin admin)
        {
            if (admin.ImagesFile != null)
            {
                var fileResult = _fileService.SaveImage(admin.ImagesFile);
                if (fileResult.Item1 == 1)
                {
                    admin.ProfilePicPath = fileResult.Item2;
                    Console.WriteLine(admin.ProfilePicPath);
                }
            }
            admin.Role = "Admin";
            try
            {
                await _adminService.CreateAsync(admin);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound("Error While Adding Data");

            }
            return Ok("Admin Added Into DB");
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            try
            {
                var admin = await _adminService.LoginAdmin(email, password);
                if (admin != null)
                {
                    //TokenGenrator<Admin> tg = new TokenGenrator<>(IConfiguration cgf);
                    string tokenValue = _adminService.GenrateToken(admin);
                    string msgout = "Login Success";
                    return Ok(new { id = admin.Id, userRole = admin.Role, msg = msgout, token = tokenValue });
                }
                else
                {
                    return BadRequest("Please Enter Valid Email or Password");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("Error");
            }

        }
    }
}
