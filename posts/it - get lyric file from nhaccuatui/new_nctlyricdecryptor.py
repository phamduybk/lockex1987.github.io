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

p = sys.argv[1]
encryptedLyric = open(p).readline()
decryptedLyric = rc4crypt(encryptedLyric.decode('hex'), 'Lyr1cjust4nct')

f = open(p, 'wb')
f.write(decryptedLyric)
f.close()
