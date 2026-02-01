package com.redirect;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class MySearchServlet
 */

public class MySearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public void init() throws ServletException{
    	System.out.println("Init Method is called in "+this.getClass().getName());
    }
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    	throws ServletException, IOException{
    	String searchKey = request.getParameter("searchKey");
    	response.sendRedirect("https://www.google.com/search?q="+ searchKey);
    }
    
    public void destroy() {
    	System.out.println("destroy method is called in "+this.getClass().getName());
    }
}
