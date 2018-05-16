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

    #print(BeautifulSoup(source, "lxml"))
    # <html><body><p>This is <b>invalid HTML</b></p></body></html>

    #print(BeautifulSoup(source, "xml"))
    # <?xml version="1.0" encoding="utf-8"?>
    # <html><p>This is <b>invalid HTML</b></p></html>

    #print(BeautifulSoup(source, "html5lib"))
    # <html><head></head><body><p>This is <b>invalid HTML</b></p></body></html>

demo_1()
