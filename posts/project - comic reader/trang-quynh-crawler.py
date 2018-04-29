# -*- coding: utf-8 -*-

'''
pip install --user beautifulsoup4
pip install --user html5lib
'''
from bs4 import BeautifulSoup
import requests
import json

def demo_1():
    source = "<html><p>This is <b>invalid HTML</p></html>"

    print(BeautifulSoup(source, "html.parser"))
    # <html><p>This is <b>invalid HTML</b></p></html>

    print(BeautifulSoup(source, "lxml"))
    # <html><body><p>This is <b>invalid HTML</b></p></body></html>

    print(BeautifulSoup(source, "xml"))
    # <?xml version="1.0" encoding="utf-8"?>
    # <html><p>This is <b>invalid HTML</b></p></html>

    print(BeautifulSoup(source, "html5lib"))
    # <html><head></head><body><p>This is <b>invalid HTML</b></p></body></html>


def get_chapters():
    url = 'http://truyendoc.info/920/trang-quynh'
    req = requests.get(url)
    soup = BeautifulSoup(req.text, 'lxml')

    '''
    print(soup.title)
    print(soup.title.name)
    print(soup.title.string)
    '''

    chapters = soup.find('ul', class_ = 'list_chapter').find_all('a')

    list = []
    for link in chapters:
        #print("Text: %s, href: %s" % (link.text, link.get('href')))
        list.append({
                "title": link.text,
                "href": link.get('href')
            })

    return list


def write_all_chapters_json_file(chapters):
    data = json.dumps(chapters, ensure_ascii = False, indent = 1).encode('utf8')
    with open('chapters.json', 'w') as file:
        file.write(data)

def write_single_chapter_json_file(idx, images):
    data = json.dumps(images, indent = 1)
    with open('chap-%d.json' % idx, 'w') as file:
        file.write(data)


def crawl_chapter(chapter):
    url = 'http://truyendoc.info' + chapter['href']
    req = requests.get(url)
    soup = BeautifulSoup(req.text, 'lxml')

    images = soup.find('div', id = 'ContentPlaceDetail_mDivMain').find_all('img')
    print(type(images))
    print(len(images))
    # images đang có dạng <class 'bs4.element.ResultSet'>
    # chuyển về list
    list = []
    for img in images:
        src = img.get('data-original')
        #print(src)
        list.append(src)
    return list


def main():
    chapters = get_chapters()
    chapters.reverse()
    for i, c in enumerate(chapters):
        #images = crawl_chapter(c)
        #write_single_chapter_json_file(i, images)
        # Xóa thuộc tính href
        c['jsonFile'] = 'chap-%d.json' % i
        del c['href']
        pass

    #images = crawl_chapter({ 'href': '/920/255476/trang-quynh--tap-275-thay-ran/' })
    #write_single_chapter_json_file(275, images)

    write_all_chapters_json_file(chapters)
    print('Finish')


main()
