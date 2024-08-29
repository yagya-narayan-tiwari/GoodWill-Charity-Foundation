using GoodWillCharity_DotNet_API.Models;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;
using System.Net;
using System.Text.Json.Nodes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoodWillCharity_DotNet_API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        public string orderId;
        [HttpPost("{amount}")]
        //[Route("/order")]
        public IActionResult paymentOrder(int amount) {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            Dictionary<string, object> input = new Dictionary<string, object>();
            input.Add("amount", amount * 100); // this amount should be same as transaction amount
            input.Add("currency", "INR");
            input.Add("receipt", "12121");
            input.Add("payment_capture", 1);

            string key = "rzp_test_xWwx3TS7w31Mxm";
            string secret = "lF7zekidXvigD4KlRxfOE9Kv";

            RazorpayClient client = new RazorpayClient(key, secret);

            Razorpay.Api.Order order =  client.Order.Create(input);
                //client.Order.Create(input);
            orderId = order["id"].ToString();
            var response = new PaymentResponse
            {
                Amount = order["amount"],
                Id = order["id"],
                Currency = order["currency"]
            };
            Console.WriteLine(response.ToString());
            return Ok(response);
        }

        [HttpPost]
        [HttpPost]
        public IActionResult verifyPayment([FromBody] Dictionary<string, string> paymentData)
        {
            Console.WriteLine("verify root got hit");
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(paymentData));
            Console.WriteLine(paymentData["orderCreationId"],"new iddddd");
            string oid = paymentData["orderCreationId"].ToString();
            string rpid = paymentData["razorpayPaymentId"].ToString();
            string roid = paymentData["razorpayOrderId"].ToString();
            string rs = paymentData["razorpaySignature"].ToString();
            Console.WriteLine("new DAta");
            Console.WriteLine(new {oid,rpid,roid,rs});
            if (paymentData.ContainsKey("razorpayPaymentId") &&
                paymentData.ContainsKey("razorpayOrderId") &&
                paymentData.ContainsKey("razorpaySignature"))
            {
                try
                {
                    Dictionary<string, string> attributes = new Dictionary<string, string>
            {
                { "razorpay_payment_id", paymentData["razorpayPaymentId"] },
                { "razorpay_order_id", paymentData["razorpayOrderId"] },
                { "razorpay_signature", paymentData["razorpaySignature"] }
            };

                    Utils.verifyPaymentSignature(attributes);

                    // Optionally return a success message or additional data
                    return Ok();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest("Error in verify method");
                }
            }
            else
            {
                return BadRequest("Invalid payment data received.");
            }
        }

        //public IActionResult verifyPayment([FromBody] Dictionary<string, string> paymentData)
        //{
        //    //string paymentId = paymentData["razorpay_payment_id"];
        //    Console.WriteLine("verify root got hit");
        //    Console.WriteLine(paymentData);
        //    Dictionary<string, object> input = new Dictionary<string, object>();
        //    input.Add("amount", 100); // this amount should be the same as the transaction amount

        //    string key = "rzp_test_xWwx3TS7w31Mxm";
        //    string secret = "lF7zekidXvigD4KlRxfOE9Kv";

        //    RazorpayClient client = new RazorpayClient(key, secret);

        //    Dictionary<string, string> attributes = new Dictionary<string, string>();

        //    attributes.Add("razorpay_payment_id", paymentData["razorpay_payment_id"]);
        //    attributes.Add("razorpay_order_id", paymentData["razorpay_order_id"]);
        //    attributes.Add("razorpay_signature", paymentData["razorpay_signature"]);
        //    try
        //    {
        //        Utils.verifyPaymentSignature(attributes);
        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine(e);
        //        return BadRequest("Error in verify method");
        //    }


        //    // Optionally return a success message or additional data
        //    return Ok(new { msg = "Payment verified successfully" });
        //}

    }
}
