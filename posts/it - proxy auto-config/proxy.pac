function FindProxyForURL(url, host) {
	
	if (dnsDomainIs(host,"sfive.vn")
			|| dnsDomainIs(host, "blog.figma.com")
			|| dnsDomainIs(host,"help.figma.com"))
		return "PROXY s5.cyberspace.vn:3128";

	if (shExpMatch(host, "*.vtcc.vn")
			|| dnsDomainIs(host,"vtcc.vn"))
			|| dnsDomainIs(host, "econtact.com.vn")
            || shExpMatch(host, "*.econtact.com.vn")
            || dnsDomainIs(host, "videoipcc4g.viettel.vn")
            || shExpMatch(host, "*.videoipcc4g.vn"))
        return "PROXY 10.240.152.56:3128";
	
	if (dnsDomainIs(host, "203.113.152.90")
			|| shExpMatch(host, "*.cyberspace.vn")
			|| shExpMatch(host, "*.nfw.vn")
			|| dnsDomainIs(host, "ereka.vn")
			|| shExpMatch(host, "*.ereka.vn")
			|| shExpMatch(host, "*viettelfamily.com")
			|| dnsDomainIs(host,"itrithuc.vn")
			|| shExpMatch(host, "*.itrithuc.vn")
			|| dnsDomainIs(host,"itrithucviet.vn")
			|| shExpMatch(host, "*.itrithucviet.vn")
			|| dnsDomainIs(host,"reputa.vn")
			|| shExpMatch(host,"*.reputa.vn")
			|| dnsDomainIs(host, "203.113.152.1")
			|| dnsDomainIs(host,"www.figma.com")
			|| shExpMatch(host, "*figma.com")
			|| dnsDomainIs(host, "zeplin.io")
			|| shExpMatch(host, "*.zeplin.io")
			|| dnsDomainIs(host, "botplatform.vn")
			|| shExpMatch(host, "*.botplatform.vn"))
        return "DIRECT";

	// If the requested website is hosted within the internal network, send direct.
    resolved_ip = dnsResolve(host);
	
    if (isInNet(resolved_ip, "10.0.0.0", "255.0.0.0")
			|| isInNet(resolved_ip, "172.16.0.0",  "255.240.0.0")
			|| isInNet(resolved_ip, "192.168.0.0",  "255.255.0.0")
			|| isInNet(resolved_ip, "127.0.0.0", "255.255.255.0"))
        return "DIRECT";

	// DEFAULT RULE: All other traffic, use below proxies, in fail-over order.
    return "PROXY s5.cyberspace.vn:3128";
}

