/**
	 * Lấy giá trị của cookie
	 * @param req Đối tượng HttpServletRequest
	 * @param cookieName Tên cookie
	 * @return Giá trị của cookie
	 */
	public static String getCookie(HttpServletRequest req, String cookieName) {
		Cookie[] cookies = req.getCookies();
		for (Cookie c : cookies) {
			if (c.getName().equals(cookieName)) {
				return c.getValue();
			}
		}
		return null;
	}
	
	
	// Thiết lập cookie HTTP Only
		Cookie cookie = new Cookie("Authentication", sessionToken);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setHttpOnly(true);
        resp.addCookie(cookie);
