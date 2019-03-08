import cv2
import numpy as np
from matplotlib import pyplot as plt

filename = 'images/comic.jpg'

def demo1():
    orig = cv2.imread(filename)
    img = cv2.imread(filename)
    result = cv2.imread(filename)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    ret, thresh = cv2.threshold(img, 80, 255, cv2.THRESH_BINARY_INV)
    contours, h = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    for cnt in contours:
        hull = cv2.convexHull(cnt)
        cv2.drawContours(result, [cnt], -1, 255, -1)
        cv2.drawContours(result, [hull], -1, 255, -1)

    plt.subplot(121), plt.imshow(orig)
    plt.subplot(122), plt.imshow(result)
    plt.show()

def demo2():
    im = cv2.imread(filename)
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    contours, hierarchy = cv2.findContours(gray, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    idx = 0
    for cnt in contours:
        idx += 1
        x,y,w,h = cv2.boundingRect(cnt)
        roi = im[y:y+h, x:x+w]
        cv2.imwrite(str(idx) + '.jpg', roi)
        #cv2.rectangle(im,(x,y),(x+w,y+h),(200,0,0),2)
    cv2.imshow('img', im)
    cv2.waitKey(0)

def demo3():
    # read and scale down image
    img = cv2.pyrDown(cv2.imread('images/hammer.png', cv2.IMREAD_UNCHANGED))

    # threshold image
    ret, threshed_img = cv2.threshold(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), 127, 255, cv2.THRESH_BINARY)

    # find contours and get the external one
    image, contours, hier = cv2.findContours(threshed_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(img, contours, -1, (255, 255, 0), 1)
    cv2.imshow("contours", img)
    ESC = 27
    while True:
        keycode = cv2.waitKey()
        if keycode != -1:
            keycode &= 0xFF
            if keycode == ESC:
                break
    cv2.destroyAllWindows()

demo1()
#demo2()
#demo3()
