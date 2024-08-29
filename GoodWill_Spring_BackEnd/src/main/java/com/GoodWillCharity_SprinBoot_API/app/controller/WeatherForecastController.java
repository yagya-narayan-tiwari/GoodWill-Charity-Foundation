//package com.GoodWillCharity_SprinBoot_API.app.controller;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.time.LocalDate;
//import java.util.Arrays;
//import java.util.List;
//import java.util.Random;
//import java.util.stream.Collectors;
//import java.util.stream.IntStream;
//
//@RestController
//@RequestMapping("/weather-forecast")
//public class WeatherForecastController {
//
//    private static final List<String> SUMMARIES = Arrays.asList(
//        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
//    );
//
//    @GetMapping
//    public List<WeatherForecast> getWeatherForecast() {
//        return IntStream.range(1, 6)
//                .mapToObj(index -> new WeatherForecast(
//                        LocalDate.now().plusDays(index),
//                        new Random().nextInt(75) - 20, // Random temperature between -20 and 55
//                        SUMMARIES.get(new Random().nextInt(SUMMARIES.size()))
//                ))
//                .collect(Collectors.toList());
//    }
//}
