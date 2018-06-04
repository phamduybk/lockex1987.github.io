// Tất cả dữ liệu
var allPosts = [

        <li>
					<img src='images/english.png'/>
					<a href='../2016 summary/'>2016 Summary</a>
					<p>2016 summary</p>
				</li>
				<li>
					<img src='images/vietnamese.png'/>
					<a href='../ideas/'>My Ideas</a>
					<p>Some ideas</p>
				</li>
				<li>
					<img src='images/english.png'/>
					<a href='../personal information/'>Personal Information</a>
					<p>Personal information</p>
				</li>

        <li>
					<img src='../../images/vietnamese.png'/>
					<a href='../chu cho con/'>Chú chó con</a>
					<p>A story about a dog</p>
				</li>
				<li>
					<img src='../../images/english.png'/>
					<a href='../first time in my life/'>First time in my life</a>
					<p>The first time</p>
				</li>
				<li>
					<img src='../../images/english.png'/>
					<a href='../the story of life/'>The Story of Life</a>
					<p>A very good article</p>
				</li>


    //{ lang: 'vi', cat: '', link: 'posts//', title: '', tags: [''] },
    { lang: 'vi', cat: 'javascript', link: 'posts/javascript - infinite scroll/', title: 'Infinite scroll', tags: ['javascript', 'scroll', 'infinite scroll'] },
    { lang: 'vi', cat: 'css', link: 'posts/css - position sticky/', title: 'Position sticky', tags: ['css', 'sticky'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - logging/', title: 'Xử lý log trong Python', tags: ['python', 'logging'] },
	{ lang: 'vi', cat: 'web', link: 'posts/pwa - get started/', title: 'Bắt đầu với PWA', tags: ['pwa', 'progressive web app', 'lunar calendar', 'offline', 'service worker'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - download file/', title: 'Download file trong Python', tags: ['python', 'download', 'ipv6'] },
    { lang: 'vi', cat: 'web', link: 'posts/web - off-canvas menu/', title: 'Off-Canvas Menu', tags: ['javascript', 'css', 'animation', 'click outside div'] },
    { lang: 'en', cat: 'web', link: 'posts/project - world cup 2018/', title: 'World Cup 2018', tags: ['web', 'world cup', 'football'] },
    { lang: 'en', cat: 'web', link: 'posts/project - my family/', title: 'My Family', tags: ['web', 'family', 'genealogy', 'tree'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - setup proxy for pip/', title: 'Cấu hình proxy cho pip', tags: ['python', 'pip', 'proxy'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - access mysql/', title: 'Truy cập MySQL với Python', tags: ['python', 'mysql', 'database'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - read excel file/', title: 'Đọc file Excel bằng Python', tags: ['python', 'excel'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - base64/', title: 'Xử lý base64 với Python', tags: ['python', 'base64'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - package/', title: 'Package trong Python', tags: ['python', 'package'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - module/', title: 'Module trong Python', tags: ['python', 'module'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - class/', title: 'Class Python', tags: ['python', 'class'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - exception/', title: 'Exception trong Python', tags: ['python', 'exception'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - file operations/', title: 'Thao tác với file trong Python', tags: ['python', 'file'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - json processing/', title: 'Xử lý JSON với Python', tags: ['python', 'json'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - if expression/', title: 'Mệnh đề if trong Python', tags: ['python', 'if'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - access command line arguments/', title: 'Lấy tham số từ dòng lệnh trong Python', tags: ['python', 'command line', 'argument'] },
    { lang: 'vi', cat: 'python', link: 'posts/python - main function/', title: "Ý nghĩa của if __name__ == '__main__': trong Python", tags: ['python', 'main'] },
    { lang: 'en', cat: 'web', link: 'posts/project - comic reader/', title: 'My comic reader', tags: ['web', 'comic', 'crawl', 'python'] },
    { lang: 'vi', cat: 'javascript', link: 'posts/ui - random girl image/', title: 'Hiển thị ngẫu nhiên ảnh girl xinh', tags: ['javascript', 'css'] },
    { lang: 'vi', cat: 'javascript', link: 'posts/javascript - get parameter/', title: 'Lấy giá trị tham số từ URL bằng JavaScript', tags: ['javascript'] },
    { lang: 'vi', cat: 'css', link: 'posts/css - real layout examples with flexbox/', title: 'Xây dựng layout thực tế với flexbox', tags: ['css', 'flexbox', 'til'] },
    { lang: 'vi', cat: 'css', link: 'posts/css - flexbox introduction/', title: 'Giới thiệu Flexbox', tags: ['css', 'flexbox', 'layout'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - slide show/', title: 'Slide show animation', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - zoom/', title: 'Zoom animation', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - wedding photos/', title: 'Wedding photos of Huyên and Dương', tags: ['web'] },
    { lang: 'en', cat: 'nodejs', link: 'https://huyen-duong.herokuapp.com/', title: 'A web-based chat application run with NodeJS', tags: ['nodejs', 'chat'], newTab: true },
    { lang: 'en', cat: 'web', link: 'posts/project - map/', title: 'Share your location with Google Map', tags: ['map'], newTab: true },
    { lang: 'en', cat: 'web', link: 'https://addons.mozilla.org/en-US/firefox/addon/youtube-subtitle-downloader/', title: 'Firefox add-on to download subtitles from Youtube', tags: ['web'], newTab: true },
    { lang: 'vi', cat: 'javascript', link: 'posts/lib - noti/', title: 'Noti - Một thư viện thông báo', tags: ['web'] },
    { lang: 'vi', cat: 'javascript', link: 'posts/lib - pagi/', title: 'Pagi - Một thư viện phân trang', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - homepage/', title: 'Customized home page (websites, calendar,..)', tags: ['web', 'home', 'homepage', 'calendar'] },
    { lang: 'en', cat: 'css', link: 'posts/ui - 3d css book covers/', title: '3D CSS book covers', tags: ['web', 'css', '3d'] },
    { lang: 'en', cat: 'css', link: 'posts/ui - anagram animation/', title: 'Anagram animation', tags: ['web', 'css'] },
    { lang: 'en', cat: 'css', link: 'posts/ui - blend video background/', title: 'Blend video background', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/ui - gallery/', title: 'A simple gallery', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - highlight syntax/', title: 'Highlight syntax of source code', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - markdown preview/', title: 'Markdown preview', tags: ['web'] },
    { lang: 'en', cat: 'javascript', link: 'posts/javascript - password generator/', title: 'Password Generator', tags: ['javascript'] },
    { lang: 'en', cat: 'web', link: 'posts/project - puzzle/', title: 'A puzzle game', tags: ['web'] },
    { lang: 'en', cat: 'web', link: 'posts/project - short/', title: 'Short funny stories', tags: ['web'] },
    { lang: 'en', cat: 'git', link: 'posts/git - save git password/', title: 'Save git password', tags: ['git'] },
    { lang: 'vi', cat: 'other', link: 'posts/buy pc/', title: 'Mua một máy tính mới', tags: ['other'] },
    { lang: 'en', cat: 'linux', link: 'posts/linux - install oracle jdk/', title: 'Replace OpenJDK with OracleJDK on Linux', tags: ['linux', 'java'] },
    { lang: 'vi', cat: 'web', link: 'posts/web - social share/', title: 'Thêm link chia sẻ qua mạng xã hội, email', tags: ['web'] },
    { lang: 'en', cat: 'javascript', link: 'posts/web - string format function/', title: 'String format - utility function', tags: ['javascript'] },
    { lang: 'en', cat: 'javascript', link: 'posts/web - add css dynamically/', title: 'Add CSS dynamically by JavaScript', tags: ['javascript', 'css'] },
    { lang: 'en', cat: 'web', link: 'posts/web - mathml/', title: 'Display math equations on web with MathML', tags: ['web'] },
    { lang: 'en', cat: 'css', link: 'posts/bootstrap - media/', title: 'Bootstrap Media tutorial', tags: ['css', 'bootstrap'] },
    { lang: 'vi', cat: 'css', link: 'posts/bootstrap - form/', title: 'Hướng dẫn thiết kế form với Bootstrap', tags: ['css', 'bootstrap'] },
    { lang: 'en', cat: 'web', link: 'posts/web - popular cdn/', title: 'Some popular CDN links', tags: ['web'] },
    { lang: 'vi', cat: 'javascript', link: 'posts/web - jquery-comments/', title: 'jquery-comments - một thư viện về comment rất hay', tags: ['web'] },
    { lang: 'vi', cat: 'java', link: 'posts/tomcat - serving static content from outside tomcat/', title: 'Cung cấp nội dung static từ bên ngoài webapps sử dụng Tomcat', tags: ['java'] },
    { lang: 'vi', cat: 'java', link: 'posts/java - fix smtps error when sending mail/', title: 'Sửa lỗi gửi mail khi kết nối đến server HTTPS', tags: ['java'] },
    { lang: 'vi', cat: 'eclipse', link: 'posts/eclipse - disable join comment lines/', title: 'Cấu hình Eclipse không nối các dòng comment khi format code', tags: ['eclipse'] },
    { lang: 'vi', cat: 'eclipse', link: 'posts/eclipse - shortcuts/', title: 'Những phím tắt của Eclipse', tags: ['eclipse'] },
    { lang: 'en', cat: 'maven', link: 'posts/maven - latest maven repositories/', title: 'Latest Maven repositories', tags: ['maven'] },
    { lang: 'en', cat: 'less', link: 'posts/web - less/', title: 'LESS - a CSS pre-processor', tags: ['less'] },
    { lang: 'en', cat: 'javascript', link: 'posts/web - get computed css/', title: 'Get Computed CSS', tags: ['javascript'] },
    { lang: 'en', cat: 'web', link: 'posts/web - highlightjs/', title: 'Highlight source code syntax with highlight.js', tags: ['web'] },
    { lang: 'en', cat: 'other', link: 'posts/knowledge - bake a potato in the microwave/', title: 'How to Bake a Potato in the Microwave', tags: ['other'] },
    { lang: 'en', cat: 'other', link: 'posts/web - personal website/', title: 'Create your own personal website', tags: ['other'] },
    { lang: 'vi', cat: 'web', link: 'posts/web - simple template/', title: 'A template engine without server script (AJAX only)', tags: ['web'] },
    { lang: 'vi', cat: 'linux', link: 'posts/linux - resize, convert and modify images/', title: 'Resize, Convert and Modify Images', tags: ['linux'] }
];

