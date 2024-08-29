using GoodWillCharity_DotNet_API.Models;
using GoodWillCharity_DotNet_API.Services.Abstract;
using GoodWillCharity_DotNet_API.Services.Implmentation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using MongoDB.Driver;
using ZstdSharp.Unsafe;
using GoodWillCharity_DotNet_API.Util;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoodWillCharity_DotNet_API.Controllers
{
    [Route("api/donor")]
    [ApiController]
    public class DonorController : ControllerBase
    {
        private readonly IDonorService _donorService;
        private readonly IFileService _fileService;
        
        public DonorController(IDonorService donor, IFileService fileService)
        {
            _donorService = donor;
            _fileService = fileService;
        }
        // GET: api/DonorController
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var donor = null as object;
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;
            if (userRole == "Admin")
            {
                try
                {
                    donor = await _donorService.GetAllAsyc();
                    if (donor==null)
                    {
                        return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                    }
                    return Ok(donor);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            return Unauthorized(new {msg = Constant.UNAUTHORIZED_MSG});
        }

        // GET api/DonorController/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var donor = null as object;
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;

            Console.WriteLine("Token User Id is" + userId.ToString());
            Console.WriteLine("Token User Id is" + userRole.ToString());
            if (userId == id || userRole == "Admin")
            { 
                try
                {
                    donor = await _donorService.GetById(id);
                    if (donor == null)
                    {
                        return NotFound(new { msg = "No Donor Found With id = " + id });
                    }
                    return Ok(donor);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                } 
        }
            return Unauthorized(new {msg= Constant.UNAUTHORIZED_MSG});
        }


        // POST api/DonorController
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Donor donor)
        {
            if (donor.ImagesFile != null)
            {
                var fileResult = _fileService.SaveImage(donor.ImagesFile);
                if (fileResult.Item1 == 1)
                {
                    donor.ProfilePicPath = fileResult.Item2;
                    Console.WriteLine(donor.ProfilePicPath);
                }
            }
            donor.Role = "User";
            try
            {
                await _donorService.CreateAsync(donor);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(new {msg= Constant.BAD_REQUEST_MSG});

            }
            return Ok(new { msg = "Donor Added Into DB" });
        }

        // PUT api/DonorController/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromForm] Donor donor)
        {
            donor.Id = id;
            var rs = _donorService.GetById(id);
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;

            if (userId == id || userRole == "Admin")
            {
                if (rs == null)
                    return NotFound(new { msg = "Data Not Found" });
                if (donor.ImagesFile != null)
                {
                    var fileResult = _fileService.SaveImage(donor.ImagesFile);
                    if (fileResult.Item1 == 1)
                    {
                        donor.ProfilePicPath = fileResult.Item2;
                    }
                    else
                    {
                        return BadRequest(fileResult.Item2);
                    }
                }
                try
                {
                    await _donorService.UpdateAsync(id, donor);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = "Data is not Updated" });
                }
                return Ok(new { msg = "Update success" });
            }
            return Unauthorized(new { msg = Constant.UNAUTHORIZED_MSG });
        }
       
        // DELETE api/DonorController/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {

            var donor = await _donorService.GetById(id);
            if (donor == null)
                return NotFound("No Donor Found With id = " + id);
            string? imgStatus = null;
            string? msg = null;
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;
            if (userId == id || userRole == "Admin")
            {
                try
                {

                    await _donorService.DeleteAsync(id);
                    if (!string.IsNullOrEmpty(donor.ProfilePicPath))
                        imgStatus = _fileService.DeleteImage(donor.ProfilePicPath);
                    msg = "Delete success";
                    return Ok(new { msg, imgStatus });
                }

                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                }
            }
            return Unauthorized(new { msg = Constant.UNAUTHORIZED_MSG});
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginCredentials loginCredentials)
        {
            string? email = loginCredentials.Email;
            string? password = loginCredentials.Password;
            try
            {
                var donor = await _donorService.LoginDonor(email, password);
                if (donor != null)
                {
                    //TokenGenrator<Donor> tg = new TokenGenrator<>(IConfiguration cgf);
                    string tokenValue = _donorService.GenrateToken(donor);
                    string msg = "Login Success";
                    return Ok(new { id = donor.Id, userRole = donor.Role, msg=msg,token = tokenValue });
                }
                else
                {
                    return BadRequest(new {msg=Constant.INVALID_LOGIN_MSG});
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(new { msg= Constant.BAD_REQUEST_MSG});
            }

        }
    }
}
