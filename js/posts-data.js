var allPosts = [
{ lang: 'vi', cat: 'it', link: 'posts/it - line stickers (brown & cony\'s secret date!)/', title: 'Line Stickers', tags: ['cursor', 'kawai'] },
{ lang: 'vi', cat: 'project', link: 'posts/project - doc truyen/', title: 'Đọc truyện đêm khuya', tags: ['audio player', 'doc truyen'] },
{ lang: 'vi', cat: 'project', link: 'posts/project - media player/', title: 'HTML5 Media Player', tags: ['audio', 'video', 'player'] },
{ lang: 'vi', cat: 'ui', link: 'posts/ui - range slider/', title: 'HTML Range Slider', tags: ['range', 'slider'] },
{ lang: 'vi', cat: 'css', link: 'posts/css - style input type range/', title: 'Style input type range', tags: ['range', 'slider'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/javascript - event delegation/', title: 'Event Delegation', tags: ['event', 'delegation'] },
{ lang: 'vi', cat: 'it', link: 'posts/it - video streaming/', title: 'Video Streaming', tags: ['video', 'ts'] },
{ lang: 'vi', cat: 'php', link: 'posts/php - execute from cli/', title: 'PHP CLI', tags: ['php', 'cli'] },
{ lang: 'vi', cat: 'knowledge', link: 'posts/knowledge - 4.0 revolution/index.html', title: 'Ảo ảnh “bốn chấm không”', tags: ['4.0'] },
{ lang: 'vi', cat: 'project', link: 'posts/project - task manager/', title: 'Task Manager', tags: ['task', 'jquery ui', 'drag and drop'] },
{ lang: 'vi', cat: 'web', link: 'posts/web - icon on title/', title: ' 🐻 🎃 👻 🎭 ', tags: ['icon', 'title'] },
{ lang: 'vi', cat: 'gulp', link: 'posts/it - my cv/dist/index.html', title: 'My CV', tags: ['gulp', 'cv', 'nunjucks'] },
{ lang: 'vi', cat: 'other', link: 'posts/it - full-stack web developer/', title: 'Full-stack web developer', tags: ['full-stack'] },
{ lang: 'vi', cat: 'laravel', link: 'posts/laravel - sharing data between views', title: 'Sharing data between views', tags: ['laravel', 'share', 'views'] },
{ lang: 'vi', cat: 'highcharts', link: 'posts/highcharts - legend', title: 'Highcharts Legend', tags: ['highcharts', 'legend'] },
{ lang: 'vi', cat: 'laravel', link: 'posts/voyager - get started/', title: 'Laravel Voyager', tags: ['laravel', 'admin', 'voyager'] },
{ lang: 'vi', cat: 'highcharts', link: 'posts/highcharts - get started/', title: 'Highcharts - Get started', tags: ['highcharts'] },
{ lang: 'vi', cat: 'css', link: 'posts/ui - one piece chapters/', title: 'One Piece chapters', tags: ['one piece'] },
{ lang: 'vi', cat: 'css', link: 'posts/ui - masonry/', title: 'Masonry', tags: ['column', 'masonry'] },
{ lang: 'vi', cat: 'linux', link: 'posts/linux - permission/', title: 'Linux Permission', tags: ['linux', 'permission'] },
{ lang: 'vi', cat: 'linux', link: 'posts/linux - user and group/', title: 'User và group trong Linux', tags: ['linux', 'user', 'group'] },
{ lang: 'vi', cat: 'git', link: 'posts/git - use ssh key/', title: 'Use SSH key with git', tags: ['ssh key'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/javascript - speech recognition/', title: 'Speech Recognition', tags: ['speech recognition', 'voice input'] },
{ lang: 'vi', cat: 'java', link: 'posts/java - file filter/', title: 'File filter', tags: ['file filter', 'git', 'upcode'] },
{ lang: 'vi', cat: 'project', link: 'posts/project - download github folder/', title: 'DownGit', tags: ['download', 'github', 'folder'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/lib - common validation/', title: 'Common validation', tags: ['javascript', 'real-time', 'validation'] },
//{ lang: 'vi', cat: 'web', link: 'posts/web - epub viewer (bibi)/', title: 'EPUB Reader', tags: ['epub', 'reader'] },
{ lang: 'vi', cat: 'web', link: 'posts/web - intro.js/index.html', title: 'Intro.js', tags: ['introduction', 'step by step'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/javascript - requestanimationframe/', title: 'requestAnimationFrame', tags: ['requestAnimationFrame'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/ui - shuffle animation/', title: 'Shuffle Animation', tags: ['shuffle', 'animation'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/javascript - key sequence detection/', title: 'Key Sequence Detection', tags: ['javascript', 'key'] },
{ lang: 'vi', cat: 'css', link: 'posts/css - filters/', title: 'CSS Filters', tags: ['css', 'filter'] },
{ lang: 'vi', cat: 'css', link: 'posts/ui - generate icon/', title: 'Generate Icon', tags: ['icon'] },
{ lang: 'vi', cat: 'other', link: 'posts/knowledge - common learning mistakes/', title: 'Common Learning Mistakes That Developers Make', tags: ['mistake', 'learning'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/javascript - dom to canvas animation/', title: 'HTML to Canvas animation', tags: ['dom to canvas', 'animation'] },
{ lang: 'vi', cat: 'project', link: 'posts/project - format css/', title: 'Format CSS', tags: ['format css'] },
{ lang: 'vi', cat: 'laravel', link: 'posts/laravel - khoa pham course/', title: 'Laravel Khoa Pham Videos', tags: ['laravel', 'khoa pham'] },
{ lang: 'vi', cat: 'web', link: 'posts/ui - justice league action/', title: 'Justice League Action', tags: ['ffmpeg', 'python subprocess', 'thumbnail'] },
{ lang: 'vi', cat: 'web', link: 'posts/ui - half page/', title: 'Half page', tags: ['comic reader'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/javascript - async await/', title: 'Hàm async và await', tags: ['javascript', 'async', 'await', 'promise', 'callback'] },
{ lang: 'vi', cat: 'story', link: 'posts/story - all kills of dragon ball characters/', title: 'Các nhân vật trong truyện Dragon Ball đã giết bao nhiêu người', tags: ['dragon ball'] },
{ lang: 'vi', cat: 'web', link: 'posts/ui - tabs with sliding underliine/', title: 'Tạo tab với sliding phía dưới', tags: ['css', 'tab', 'animation', 'sliding underline'] },
{ lang: 'vi', cat: 'mysql', link: 'posts/mysql - install mysql on linux mint/', title: 'Install MySQL 5.7 on Linux Mint 17.2', tags: ['mysql', 'install', 'linux mint'] },
{ lang: 'vi', cat: 'mysql', link: 'posts/mysql - import and export/', title: 'Import and export MySQL database', tags: ['mysql', 'import', 'export'] },
{ lang: 'en', cat: 'mysql', link: 'posts/mysql - create a new user and grant permissions/', title: 'Create a new user and grant permissions in MySQL', tags: ['mysql', 'user', 'permissions'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/javascript - keyboard input/', title: 'Keyboard input handler', tags: ['keyboard'] },
{ lang: 'vi', cat: 'css', link: 'posts/css - arrows/', title: 'CSS Arrows', tags: ['css', 'arrows'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/javascript - wow.js/index.html', title: 'Wow.js', tags: ['javascript', 'wow.js', 'animation'] },
{ lang: 'vi', cat: 'css', link: 'posts/css - slide in/', title: 'Slide in animation', tags: ['css', 'slide in', 'animation'] },
{ lang: 'vi', cat: 'css', link: 'posts/css - animate.css/index.html', title: 'Animate.css', tags: ['animate.css', 'css', 'animation'] },
{ lang: 'vi', cat: 'web', link: 'posts/web - tts/', title: 'Text to Speech', tags: ['web', 'tts', 'text to speech'] },
{ lang: 'en', cat: 'css', link: 'posts/css - object-fit/', title: 'CSS The object-fit Property', tags: ['css', 'object-fit'] },
{ lang: 'vi', cat: 'web', link: 'posts/web - image loader/', title: 'Image Loader', tags: ['css', 'javascript', 'image loader', 'fit screen'] },
{ lang: 'en', cat: 'css', link: 'posts/css - grid/', title: 'CSS Grid', tags: ['css', 'grid', 'ratio', 'gallery'] },
{ lang: 'en', cat: 'css', link: 'posts/css - aspect ratio/', title: 'Maintain Aspect Ratio', tags: ['css', 'ratio', 'aspect ratio'] },
{ lang: 'vi', cat: 'linux', link: 'posts/linux - disable ipv6/', title: 'Disable IPv6', tags: ['linux', 'ipv6'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/javascript - history api/', title: 'History API', tags: ['javascript', 'history'] },
//{ lang: 'vi', cat: 'story', link: 'posts/story - 2016 summary/', title: '2016 Summary', tags: ['story', 'summary'] },
//{ lang: 'vi', cat: 'other', link: 'posts/ideas/', title: 'My Ideas', tags: ['other', 'idea', 'innovation'] },
{ lang: 'vi', cat: 'story', link: 'posts/story - chu cho con/', title: 'Chú chó con', tags: ['story'] },
{ lang: 'en', cat: 'story', link: 'posts/story - first time in my life/', title: 'First time in my life', tags: ['story'] },
{ lang: 'en', cat: 'story', link: 'posts/story - the story of life/', title: 'The Story of Life', tags: ['story'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/javascript - infinite scroll/', title: 'Infinite scroll', tags: ['javascript', 'scroll', 'infinite scroll'] },
{ lang: 'vi', cat: 'css', link: 'posts/css - position sticky/', title: 'Position sticky', tags: ['css', 'sticky'] },
{ lang: 'vi', cat: 'python', link: 'posts/python - logging/', title: 'Xử lý log trong Python', tags: ['python', 'logging'] },
{ lang: 'vi', cat: 'pwa', link: 'posts/pwa - get started/', title: 'Bắt đầu với PWA', tags: ['pwa', 'progressive web app', 'lunar calendar', 'offline', 'service worker'] },
{ lang: 'vi', cat: 'python', link: 'posts/python - download file/', title: 'Download file trong Python', tags: ['python', 'download', 'ipv6'] },
{ lang: 'vi', cat: 'web', link: 'posts/web - off-canvas menu/', title: 'Off-Canvas Menu', tags: ['javascript', 'css', 'animation', 'click outside div'] },
{ lang: 'en', cat: 'project', link: 'posts/project - world cup 2018/', title: 'World Cup 2018', tags: ['web', 'world cup', 'football'] },
{ lang: 'en', cat: 'project', link: 'posts/project - my family/', title: 'My Family', tags: ['web', 'family', 'genealogy', 'tree'] },
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
{ lang: 'en', cat: 'project', link: 'posts/project - comic reader/', title: 'My comic reader', tags: ['web', 'comic', 'crawl', 'python'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/ui - random girl image/', title: 'Hiển thị ngẫu nhiên ảnh girl xinh', tags: ['javascript', 'css'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/javascript - get parameter/', title: 'Lấy giá trị tham số từ URL bằng JavaScript', tags: ['javascript'] },
{ lang: 'vi', cat: 'css', link: 'posts/css - real layout examples with flexbox/', title: 'Xây dựng layout thực tế với flexbox', tags: ['css', 'flexbox', 'til'] },
{ lang: 'vi', cat: 'css', link: 'posts/css - flexbox introduction/', title: 'Giới thiệu Flexbox', tags: ['css', 'flexbox', 'layout'] },
{ lang: 'en', cat: 'web', link: 'posts/ui - slide show/', title: 'Slide show animation', tags: ['web'] },
{ lang: 'en', cat: 'web', link: 'posts/ui - zoom/', title: 'Zoom animation', tags: ['web'] },
{ lang: 'en', cat: 'web', link: 'posts/ui - wedding photos/', title: 'Wedding photos of Huyên and Dương', tags: ['web'] },
{ lang: 'en', cat: 'nodejs', link: 'https://huyen-duong.herokuapp.com/', title: 'A web-based chat application run with NodeJS', tags: ['nodejs', 'chat'], newTab: true },
{ lang: 'en', cat: 'project', link: 'posts/project - map/', title: 'Share your location with Google Map', tags: ['map'], newTab: true },
{ lang: 'en', cat: 'web', link: 'https://addons.mozilla.org/en-US/firefox/addon/youtube-subtitle-downloader/', title: 'Firefox add-on to download subtitles from Youtube', tags: ['web'], newTab: true },
{ lang: 'vi', cat: 'javascript', link: 'posts/lib - noti/', title: 'Noti - Một thư viện thông báo', tags: ['web'] },
{ lang: 'vi', cat: 'javascript', link: 'posts/lib - pagi/', title: 'Pagi - Một thư viện phân trang', tags: ['web'] },
{ lang: 'en', cat: 'project', link: 'posts/project - homepage/', title: 'Customized home page (websites, calendar,..)', tags: ['web', 'home', 'homepage', 'calendar'] },
{ lang: 'en', cat: 'css', link: 'posts/ui - 3d css book covers/', title: '3D CSS book covers', tags: ['web', 'css', '3d'] },
{ lang: 'en', cat: 'css', link: 'posts/ui - anagram animation/', title: 'Anagram animation', tags: ['web', 'css'] },
{ lang: 'en', cat: 'css', link: 'posts/ui - blend video background/', title: 'Blend video background', tags: ['web'] },
{ lang: 'en', cat: 'web', link: 'posts/ui - gallery/', title: 'A simple gallery', tags: ['web'] },
{ lang: 'en', cat: 'project', link: 'posts/project - highlight syntax/', title: 'Highlight syntax of source code', tags: ['web'] },
{ lang: 'en', cat: 'project', link: 'posts/project - markdown preview/', title: 'Markdown preview', tags: ['web'] },
{ lang: 'en', cat: 'javascript', link: 'posts/javascript - password generator/', title: 'Password Generator', tags: ['javascript'] },
{ lang: 'en', cat: 'project', link: 'posts/project - puzzle/', title: 'A puzzle game', tags: ['web'] },
{ lang: 'en', cat: 'project', link: 'posts/project - short/', title: 'Short funny stories', tags: ['web'] },
{ lang: 'en', cat: 'git', link: 'posts/git - save git password/', title: 'Save git password', tags: ['git'] },
{ lang: 'vi', cat: 'other', link: 'posts/it - buy pc/', title: 'Mua một máy tính mới', tags: ['other'] },
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

