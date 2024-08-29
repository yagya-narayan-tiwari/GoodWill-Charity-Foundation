//package com.GoodWillCharity_SprinBoot_API.app.controller;
//
//import com.GoodWillCharity_SpringBoot_API.app.model.PaymentResponse;
//import com.razorpay.Order;
//import com.razorpay.RazorpayClient;
//import com.razorpay.Utils;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import javax.annotation.PostConstruct;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/payment")
//public class PaymentController {
//
//    private String orderId;
//    private RazorpayClient client;
//
//    @PostConstruct
//    public void init() throws Exception {
//        String key = System.getenv("RAZORPAY_KEY"); // Use environment variables for API keys
//        String secret = System.getenv("RAZORPAY_SECRET");
//        client = new RazorpayClient(key, secret);
//    }
//
//    @PostMapping("/{amount}")
//    public ResponseEntity<?> paymentOrder(@PathVariable int amount) {
//        try {
//            Map<String, Object> options = new HashMap<>();
//            options.put("amount", amount * 100); // amount in paise
//            options.put("currency", "INR");
//            options.put("receipt", "order_rcptid_11");
//            options.put("payment_capture", 1);
//
//            Order order = client.Orders.create(options);
//            orderId = order.get("id");
//
//            PaymentResponse response = new PaymentResponse(
//                order.get("amount").toString(),
//                order.get("id"),
//                order.get("currency")
//            );
//
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("Error creating payment order");
//        }
//    }
//
//    @PostMapping("/verify")
//    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> paymentData) {
//        if (paymentData.containsKey("razorpayPaymentId") &&
//            paymentData.containsKey("razorpayOrderId") &&
//            paymentData.containsKey("razorpaySignature")) {
//            try {
//                Map<String, String> attributes = new HashMap<>();
//                attributes.put("razorpay_payment_id", paymentData.get("razorpayPaymentId"));
//                attributes.put("razorpay_order_id", paymentData.get("razorpayOrderId"));
//                attributes.put("razorpay_signature", paymentData.get("razorpaySignature"));
//
//                Utils.verifyPaymentSignature(attributes);
//
//                return ResponseEntity.ok("Payment verified successfully");
//            } catch (Exception e) {
//                e.printStackTrace();
//                return ResponseEntity.status(400).body("Error in verify method");
//            }
//        } else {
//            return ResponseEntity.status(400).body("Invalid payment data received.");
//        }
//    }
//}
