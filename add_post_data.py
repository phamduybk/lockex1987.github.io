# -*- coding: utf-8 -*-
'''
Yêu cầu đầu vào:
  - Phải có thẻ title
  - Tất cả nội dung, kể cả thẻ link, sytle, script phải ở trong body

Chuẩn hóa post:
  - Thêm dữ liệu vào file js/post-data.js luôn
  - Chuẩn hóa lại file index.html

Usage:
  $ postdata.py <folder> -c <category> -l <language> -k <keywords>
'''
import sys
import getopt
import re
import os
from bs4 import BeautifulSoup


TEMPLATE = '''<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content="%s"/>
    <meta name="keywords" content="%s"/>
    <meta name="author" content="lockex1987"/>
    
    <title>%s</title>

    <link rel="icon" href="../../images/favicon.png"/>
    <link rel="stylesheet" href="../../css/style.css"/>
</head>
<body>
    <article>
        <h2>%s</h2>
        %s
    </article>

    <script src="../../js/docs.js"></script>
</body>
</html>
'''


def main(argv):
    # Lấy các tham số mặc định
    folder = argv[0]
    category = re.compile("/|\\\\").split(folder)[1].split(" - ")[0]

    soup = BeautifulSoup(open(folder + "/index.html"), "html.parser")
    #body = soup.find('body').decode_contents().encode('utf-8')
    body = soup.body.prettify().encode('utf-8').replace(r'<body>', '').replace(r'</body>', '')
    title = soup.title.string.encode('utf-8')

    language = "vi"
    keywords = ""

    # Lấy các tham số từ câu lệnh
    # Cần bỏ qua tham số folder
    opts, args = getopt.getopt(argv[1:], "c:l:k:")
    for opt, arg in opts:
        if opt == "-c":
            category = arg
        elif opt == "-l":
            language = arg
        elif opt == "-k":
            keywords = arg

    if not keywords:
        print("You must enter keywords")
        sys.exit(2)

    #print(folder, category, language, title, keywords)

    # In ra dữ liệu để thêm vào file post-data.js
    with open("js/posts-data.js", "r+") as f:
        tags = [s.strip() for s in keywords.split(",")]
        startLine = "var allPosts = [\n"
        old = f.read()
        f.seek(0)
        f.write(startLine
                + ("{ lang: '%s', cat: '%s', link: '%s', title: '%s', tags: %s },\n" % (language, category, folder, title, tags))
                + old[len(startLine):])

    # Backup file index.html
    #os.rename(folder + '/index.html', folder + '/index.html.bak')

    # Cập nhật lại file index.html
    with open(folder + '/index.html', 'w') as file:
        file.write(TEMPLATE % (title, keywords, title, title, body))


if __name__ == "__main__":
    # Bỏ qua phần tử đầu tiên là tên file Python script
    main(sys.argv[1:])
