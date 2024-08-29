using GoodWillCharity_DotNet_API.Models;
using GoodWillCharity_DotNet_API.Services.Abstract;
using GoodWillCharity_DotNet_API.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoodWillCharity_DotNet_API.Controllers
{
    [Route("api/donation")]
    [ApiController]
    public class DonationController : ControllerBase
    {
        private readonly IDonationService _donationService;
        

        public DonationController(IDonationService donation)
        {
            _donationService = donation;
            
        }

        // GET: api/<OrderController>
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var donation = null as object;
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;
            if ( userRole == "Admin")
            {
                try
                {
                    donation = await _donationService.GetAllAsyc();
                    if (donation == null)
                    {
                        return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                    }
                    return Ok(donation);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            return Unauthorized(new { msg = Constant.UNAUTHORIZED_MSG });
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var donation = null as object;
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;

            if (userId == id || userRole == "Admin")
            {
                try
                {
                    donation = await _donationService.GetById(id);
                    if (donation == null)
                    {
                        return NotFound(new { msg = "No Order Found With id = " + id });
                    }
                    return Ok(donation);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                }
            }
            return Unauthorized(new { msg = Constant.UNAUTHORIZED_MSG });
        }

        // POST api/<OrderController>
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Donation donation)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;
            Console.WriteLine(userId);

            if (userId!=null)
            {
                try
                {
                    await _donationService.CreateAsync(donation);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });

                }
                return Ok(new { msg = "Order Added Into DB" });
            }
            return Unauthorized(new { msg = Constant.UNAUTHORIZED_MSG });
        }

        [Authorize]
        [HttpGet]
        [Route("donation_list/"+("{id}"))]
        public async Task<IActionResult> GetByNgoId(string id)
        {
            var donation = null as object;
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;

            if (userId == id && userRole == "Ngo" || userRole == "Admin")
            {
                try
                {
                    donation = await _donationService.GetByNgoId(id);
                    return Ok(donation);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                }
            }
            return Unauthorized(new {msg = Constant.UNAUTHORIZED_MSG});
        }

        [Authorize]
        [HttpGet]
        [Route("donation_history/"+("{id}"))]
        public async Task<IActionResult> GetByDonorId(string id)
        {
            var donation = null as object;
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;

            if (userId == id && userRole == "User" || userRole == "Admin")
            {
                try
                {
                    donation = await _donationService.GetByDonorId(id);
                    return Ok(donation);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { msg = Constant.BAD_REQUEST_MSG });
                }
            }
            return Unauthorized(new { msg = Constant.UNAUTHORIZED_MSG });
        }
    }
}
