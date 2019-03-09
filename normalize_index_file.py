# -*- coding: utf-8 -*-
'''
Yêu cầu đầu vào:
  - Phải có thẻ title
  - Tất cả nội dung, kể cả thẻ link, sytle, script phải ở trong body

Chuẩn hóa post:
  - Chuẩn hóa lại file index.html

Usage:
  $ normalize_index_file.py <folder> -d <description>
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
    # Lấy các tham số
    # Đường dẫn thư mục
    folder = argv[0]

    # Tham số miêu tả của bài viết
    description = ""

    # Lấy các tham số từ câu lệnh
    # Cần bỏ qua tham số folder
    opts, args = getopt.getopt(argv[1:], "d:")
    for opt, arg in opts:
        if opt == "-d":
            description = arg

    if not description:
        print("You must enter description")
        sys.exit(2)

    # Khởi tạo đối tượng BeautifulSoup, lấy ra body và title
    soup = BeautifulSoup(open(folder + "/index.html"), "html.parser")
    body = soup.find('body').decode_contents().encode('utf-8')
    #body = soup.body.prettify().encode('utf-8').replace(r'<body>', '').replace(r'</body>', '')
    title = soup.title.string.encode('utf-8')

    # Cập nhật lại file index.html
    with open(folder + '/index.html', 'w') as file:
        file.write(TEMPLATE % (description, title, title, body))


if __name__ == "__main__":
    # Bỏ qua phần tử đầu tiên là tên file Python script
    main(sys.argv[1:])

