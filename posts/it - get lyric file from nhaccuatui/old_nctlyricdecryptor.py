import re
import httplib
import os
import sys

def rc4crypt(data, key):
    x = 0
    box = range(256)
    for i in range(256):
        x = (x + box[i] + ord(key[i % len(key)])) % 256
        box[i], box[x] = box[x], box[i]
    x = 0
    y = 0
    out = []
    for char in data:
        x = (x + 1) % 256
        y = (y + box[x]) % 256
        box[x], box[y] = box[y], box[x]
        out.append(chr(ord(char) ^ box[(box[x] + box[y]) % 256]))

    return ''.join(out)

if len(sys.argv) < 2:
    print 'usage: python nctlyricdecryptor.py /bai-hat/loi-to-tinh-ong-buom-vu-hung.d1rchpsGUBfW.html'
    exit()

conn = httplib.HTTPConnection('www.nhaccuatui.com')
conn.request('GET', sys.argv[1])
r1 = conn.getresponse()
data1 = r1.read()
songdescript = 'http://www.nhaccuatui.com/flash/xml?key1=' + re.search('([a-fA-Fd]{32})', data1).group(0)

conn.request('GET', songdescript)
r1 = conn.getresponse()
data1 = r1.read()
m = re.search('http://lrc.nct.nixcdn.com/(.*)]', data1).group(0)[:-2]
print m
os.system('wget ' + m + ' -O lyric')
lyricencrypted = open('lyric').readline()

lyricdecrypted = rc4crypt(lyricencrypted.decode('hex'), 'Lyr1cjust4nct')

f = open('lyric', 'wb')
f.write(lyricdecrypted)
f.close()

