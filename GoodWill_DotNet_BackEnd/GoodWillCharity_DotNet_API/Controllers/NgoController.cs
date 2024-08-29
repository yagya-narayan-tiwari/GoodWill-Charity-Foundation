using GoodWillCharity_DotNet_API.Models;
using GoodWillCharity_DotNet_API.Services.Abstract;
using GoodWillCharity_DotNet_API.Services.Implmentation;
using GoodWillCharity_DotNet_API.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoodWillCharity_DotNet_API.Controllers
{
    [Route("api/ngo")]
    [ApiController]
    public class NgoController : ControllerBase
    {
        private readonly INgoService _ngoService;
        private readonly IFileService _fileService;

        public NgoController(INgoService ngo, IFileService fileService)
        {
            _ngoService = ngo;
            _fileService = fileService;
        }
        // GET: api/NgoController
        //[Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var ngo = null as object;
            //var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;
            //if (userRole == "Admin")
            //{
                try
                {
                    ngo = await _ngoService.GetAllAsyc();
                    if (ngo == null) 
                        return NotFound(new { msg = "Ngo List is Empty" });
                    return Ok(ngo);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new {msg=Constant.BAD_REQUEST_MSG});
                }
            //}
            //return Unauthorized(new { msg = Constant.UNAUTHORIZED_MSG });
        }

        // GET api/NgoController/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var ngo = null as object;
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;

            if (userId == id || userRole == "Admin")
            {
                try
                {

                    ngo = await _ngoService.GetById(id);
                    if (ngo == null)
                        return NotFound(new { msg = "No Ngo Found With id = " + id });
                    return Ok(ngo);
                }
            
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                }
            }
            return Unauthorized(new {msg=Constant.UNAUTHORIZED_MSG});
        }

        [HttpGet]
        [Route("ngopage/"+("{id}"))]
        public async Task<IActionResult> GetNgoDataForPage(string id)
        {
            var ngo = null as object;
          
                try
                {

                    ngo = await _ngoService.GetById(id);
                    if (ngo == null)
                        return NotFound(new { msg = "No Ngo Found With id = " + id });
                    return Ok(ngo);
                }

                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                }
            
        }

        // POST api/NgoController
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Ngo ngo)
        {
            if (ngo.ImagesFile != null)
            {
                var fileResult = _fileService.SaveImage(ngo.ImagesFile);
                if (fileResult.Item1 == 1)
                {
                    ngo.ProfilePicPath = fileResult.Item2;
                    Console.WriteLine(ngo.ProfilePicPath);
                }
            }
            ngo.Role = "Ngo";
            try
            {
                await _ngoService.CreateAsync(ngo);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(new { msg = Constant.BAD_REQUEST_MSG});

            }
            return Ok(new { msg = "Ngo Added Into DB" });
        }

        // PUT api/NgoController/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromForm] Ngo ngo)
        {
            ngo.Id = id;
            var rs = _ngoService.GetById(id);
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;
            if (userId == id || userRole == "Admin")
            {
                if (rs == null)
                    return NotFound(new { msg = "Data Not Found" });
            
                if (ngo.ImagesFile != null)
                {
                    var fileResult = _fileService.SaveImage(ngo.ImagesFile);
                    if (fileResult.Item1 == 1)
                    {
                        ngo.ProfilePicPath = fileResult.Item2;
                    }
                    else
                    {
                        return BadRequest(fileResult.Item2);
                    }
                }
                try
                {
                    await _ngoService.UpdateAsync(id, ngo);
                    return Ok(new { msg = "Update success" });
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new {msg=Constant.BAD_REQUEST_MSG});
                }
            }
           return Unauthorized(new {msg=Constant.UNAUTHORIZED_MSG});
        }


        // DELETE api/NgoController/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var ngo = await _ngoService.GetById(id);
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;
            string? imgStatus = null;
            if (userId == id || userRole == "Admin")
            {
                if (ngo == null)
                return NotFound(new { msg = "No Ngo Found With id = " + id });
           
                try
                {
                    await _ngoService.DeleteAsync(id);
                    if (!string.IsNullOrEmpty(ngo.ProfilePicPath))
                        imgStatus = _fileService.DeleteImage(ngo.ProfilePicPath);
                    
                    return Ok(new { msg= "Delete success", imgStatus });
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new {msg= Constant.BAD_REQUEST_MSG});
                }
            }
            return Unauthorized(new {msg= Constant.UNAUTHORIZED_MSG});
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginCredentials loginCredentials)
        {
            string? email = loginCredentials.Email;
            string? password = loginCredentials.Password;
            try
            {
                var ngo = await _ngoService.LoginNgo(email, password);
                if (ngo != null)
                {
                    string tokenValue = _ngoService.GenerateToken(ngo);
                    
                    return Ok(new { id = ngo.Id, userRole = ngo.Role, msg = "Login Success", token = tokenValue });
                }
                else
                {
                    return NotFound(new { msg = Constant.INVALID_LOGIN_MSG });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(new {msg=Constant.BAD_REQUEST_MSG});
            }
        }
    }
}
