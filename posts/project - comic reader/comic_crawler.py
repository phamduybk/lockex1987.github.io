# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import requests
import json

# Lay danh sach chapter
# var links = document.querySelectorAll("a[data-chapter-id]")
# for (var i = links.length - 1; i >= 0; i--) { var a = links[i]; console.log(JSON.stringify({"title": a.textContent, "href": a.href}) + ","); }

# One Piece dai qua, chia thanh cac arcs
# https://mangadex.org/manga/10004/one-piece-digital-colored-comics
# http://onepiece.wikia.com/wiki/Story_Arcs
#

def write_all_chapters_json_file(chapters):
    data = json.dumps(chapters, ensure_ascii = False, indent = 1).encode('utf8')
    with open('chapters.json', 'w') as file:
        file.write(data)


def write_single_chapter_json_file(idx, images):
    data = json.dumps(images, indent = 1)
    with open('chap-%d.json' % idx, 'w') as file:
        file.write(data)


def mangadex_get_chapters(json_file_path):
    with open(json_file_path, 'r') as f:
        content = f.read()
        chapters = json.loads(content)
        return chapters


def mangadex_get_images(url):
    # Lay ma HTML cua trang
    source = requests.get(url).text
    lines = source.split("\n")

    # Doc ma HTML, lay ra cac thong tin dataurl, page_array, server
    idx = 0
    while not lines[idx].startswith('var dataurl = '):
        idx += 1
    temp = lines[idx]
    dataurl = temp[temp.index('=') + 3:-3]

    while not lines[idx].startswith('var page_array = '):
        idx += 1
    temp = lines[idx + 1]
    temp = '[' + temp[:-4].replace("'", '"') + ']'
    page_array = json.loads(temp)

    while not lines[idx].startswith('var server = '):
        idx += 1
    temp = lines[idx]
    server = temp[temp.index('=') + 3:-3]

    # Tra ve danh sach anh
    images = []
    for img in page_array:
        images.append(server + dataurl + "/" + img)
    return images


def mangadex_crawl():
    json_file_path = 'tantei-gakuen-q-input-chapters.json'
    chapters = mangadex_get_chapters(json_file_path)
    for i, c in enumerate(chapters):
        print(json.dumps(c))
        images = mangadex_get_images(c['href'])
        write_single_chapter_json_file(i + 1, images)
        c['jsonFile'] = 'chap-%d.json' % (i + 1)
        del c['href']
    write_all_chapters_json_file(chapters)


def truyendoc_get_chapters():
    url = 'http://truyendoc.info/920/trang-quynh'
    req = requests.get(url)
    soup = BeautifulSoup(req.text, 'html.parser')
    a = soup.select('ul.list_chapter a')
    chapters = []
    for link in a:
        chapters.append({ "title": link.text, "href": link.get('href') })
    return chapters


def truyendoc_get_images(chapter):
    url = 'http://truyendoc.info' + chapter['href']
    req = requests.get(url)
    soup = BeautifulSoup(req.text, 'html.parser')
    a = soup.select('div#ContentPlaceDetail_mDivMain img')
    images = []
    for img in a:
        images.append(img.get('data-original'))
    return images


def truyendoc_crawl():
    chapters = truyendoc_get_chapters()
    chapters.reverse()
    for i, c in enumerate(chapters):
        images = truyendoc_get_images(c)
        write_single_chapter_json_file((i + 1), images)
        c['jsonFile'] = 'chap-%d.json' % (i + 1)
        del c['href']
    write_all_chapters_json_file(chapters)


def main():
    mangadex_crawl()
    #truyendoc_crawl()


main()
