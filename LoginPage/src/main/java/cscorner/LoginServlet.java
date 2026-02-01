package cscorner;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class LoginServlet
 */
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    String n = request.getParameter("t1");
	    String pwd = request.getParameter("t2");
	    PrintWriter out = response.getWriter();
	    response.setContentType("text/html");
	    
	    HttpSession session = request.getSession();
	    session.setAttribute("uname", n); 
	    
	    if(pwd == null || pwd.length() < 8) {

	        String storedName = (String) session.getAttribute("uname");
	        out.println("<font color=red size=14 face=verdana>Hello " + storedName + ", your password is weak. Try a strong one.</font>");
	        RequestDispatcher rd = request.getRequestDispatcher("input.jsp");
	        rd.include(request, response);
	    } else {

	        response.sendRedirect("success.jsp");
	    }
	}

}
