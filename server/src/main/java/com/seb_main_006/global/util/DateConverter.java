package com.seb_main_006.global.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateConverter {

    //스트링으로 들어온 날짜를 LocalDate로 변환("yyyyMMdd")
    public static LocalDate stringToDateConverter(String dateString){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate date = LocalDate.parse(dateString, formatter);

        return date;
    }

    public static String LocalDateToStringWithDay(LocalDate date) {

        DateTimeFormatter myFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd, E");
        String dateStringWithDay = date.format(myFormatter);

        return dateStringWithDay;
    }
}
