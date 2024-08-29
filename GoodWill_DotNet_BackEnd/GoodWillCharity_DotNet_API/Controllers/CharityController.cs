using GoodWillCharity_DotNet_API.Models;
using GoodWillCharity_DotNet_API.Services.Abstract;
using GoodWillCharity_DotNet_API.Services.Implmentation;
using GoodWillCharity_DotNet_API.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoodWillCharity_DotNet_API.Controllers
{
    [Route("api/charity")]
    [ApiController]
    public class CharityController : ControllerBase
    {
        private readonly ICharityService _charityService;
        private readonly IFileService _fileService;

        public CharityController(ICharityService charity, IFileService fileService)
        {
            _charityService = charity;
            _fileService = fileService;
        }

        // GET: api/<CharityController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var charity = null as object;
            //var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            //var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;
            //if (userRole == "Charity")
            //{
                try
                {
                    charity = await _charityService.GetAllAsyc();
                    if (charity == null)
                    {
                        return NotFound(new { msg = "Data Not Found" });
                    }
                    return Ok(charity);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG});
                }
          //  }
           // return Unauthorized(new { msg = Constant.UNAUTHORIZED_MSG });
        }

        // GET api/<CharityController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var charity = null as object;
            try
            {    
                charity = await _charityService.GetById(id);
                    if (charity == null)
                    {
                        return NotFound(new { msg = "No Charity Found With id = " + id });
                    }
                    return Ok(charity);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
            }
            //return Unauthorized(new { msg = Constant.UNAUTHORIZED_MSG });
        }

        // POST api/<CharityController>
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Charity charity)
        {
            //var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;
            if (userRole=="Ngo")
            {
                if (charity.ImagesFile != null)
                {
                    var fileResult = _fileService.SaveImage(charity.ImagesFile);
                    if (fileResult.Item1 == 1)
                    {
                        charity.ProfilePicPath = fileResult.Item2;
                        Console.WriteLine(charity.ProfilePicPath);
                    }
                }

                try
                {
                    await _charityService.CreateAsync(charity);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });

                }
                return Ok(new { msg = "Charity Added Into DB" });
            }
            return Unauthorized(new {msg= Constant.UNAUTHORIZED_MSG});
        }


        // PUT api/<CharityController>/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromForm] Charity charity)
        {
            charity.Id = id;
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;

            var rs = _charityService.GetById(id);
            if (rs == null)
                return NotFound(new { msg = Constant.BAD_REQUEST_MSG });

            if (userId == rs.Result.NgoId && userRole == "Ngo" )
            {
               
                if (charity.ImagesFile != null)
                {
                    var fileResult = _fileService.SaveImage(charity.ImagesFile);
                    if (fileResult.Item1 == 1)
                    {
                        charity.ProfilePicPath = fileResult.Item2;
                    }
                    else
                    {
                        return BadRequest(fileResult.Item2);
                    }
                }
                try
                {
                    await _charityService.UpdateAsync(id, charity);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                }
                return Ok(new { msg = "Update success" });
            }
            return Unauthorized(new {msg = Constant.UNAUTHORIZED_MSG});
        }


        // DELETE api/<CharityController>/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var charity = await _charityService.GetById(id);
            if (charity == null)
                return NotFound("No Charity Found With id = " + id);
            string? imgStatus = null;
            string? msg = null;
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;
            if (userId == charity.NgoId && userRole == "Ngo" )
            {
                try
                {

                    await _charityService.DeleteAsync(id);
                    if (!string.IsNullOrEmpty(charity.ProfilePicPath))
                        imgStatus = _fileService.DeleteImage(charity.ProfilePicPath);
                    msg = "Delete success";
                    return Ok(new { msg, imgStatus });
                }
            
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                }
            }
            return Unauthorized(new { msg = Constant.UNAUTHORIZED_MSG });
        }

        //[Authorize]
        [HttpGet]
        [Route("charity_by_ngo/"+("{id}"))]
        public async Task<IActionResult> GetByNgoId(string id)
        {
            var charity = null as object;
            
                try
                {
                    charity = await _charityService.GetByNgoId(id);
                    return Ok(charity);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                }
            }
           

    }
}
