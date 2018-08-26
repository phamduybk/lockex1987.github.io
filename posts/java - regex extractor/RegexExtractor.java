package com.viettel.safenet.processlog.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexExtractor {

    public static void main(String[] args) {
        Pattern p = Pattern.compile("Censor .+: client \\((\\w+) - (\\d+)\\) IP \\[(.+)\\] access to IP \\[.+\\]");
        String[] a = {
            "Censor SN.KV3.10_73_223_78: client (t008_gftth_hienltt24 - 7195) IP [171.232.234.33] access to IP [172.217.161.142]",
            "Censor SN.KV3.10_73_223_78: client (t008_gftth_tuttm9 - 4997) IP [171.249.102.87] access to IP [203.113.131.3]",
            "Censor SN.KV3.10_73_223_78: client (v064_gftth_donglx2 - 7217) IP [115.74.12.49] access to IP [120.138.69.135]",
            "Censor SN.KV3.10_73_223_78: client (t008_gftth_suongvv4 - 8743) IP [27.64.78.34] access to IP [122.201.12.12]",
            "Censor SN.KV3.10_73_223_78: client (t008_gftth_anhptk77 - 29313) IP [171.249.102.48] access to IP [125.234.52.144]",
            "Censor SN.KV3.10_73_223_78: client (t066_gftth_hainv19 - 7631) IP [171.226.255.3] access to IP [49.213.109.56]",
            "Censor SN.KV3.10_73_223_78: client (v064_gftth_doivbrvtcntdvt2 - 7253) IP [115.74.12.71] access to IP [23.23.139.54]",
            "Censor SN.KV1.192_168_222_6: client (t036_gftth_tuandq14 - 5357) IP [117.1.54.86] access to IP [52.230.83.250]",
            "Censor SN.KV3.10_73_223_78: client (t008_gftth_hanhnt573 - 40543) IP [171.249.102.1] access to IP [203.113.188.1]",
            "Censor SN.KV3.10_73_223_78: client (t008_ftth_anttt20 - 37885) IP [171.235.47.25] access to IP [31.13.78.8]"
        };
        for (String oneline : a) {
            Matcher m = p.matcher(oneline);
            System.out.println(oneline);
            if (m.matches()) {
                System.out.println("    Internet account: " + m.group(1));
                System.out.println("    ID: " + m.group(2));
                System.out.println("    IP: " + m.group(3));
            }
        }
    }
}
