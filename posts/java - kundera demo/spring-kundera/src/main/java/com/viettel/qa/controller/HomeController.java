/*
 * VIETTEL.
 */
package com.viettel.qa.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import lombok.extern.slf4j.Slf4j;

/**
 * Trang chủ.
 *
 * @author dungpd1
 */
@Controller
@Slf4j
public class HomeController {    

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String showHome(ModelMap model, HttpSession session, HttpServletRequest req) {
        session.setAttribute("contextPath", req.getContextPath());
        return "home";
    }    
}
