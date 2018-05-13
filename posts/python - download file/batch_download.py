import urllib

links = '''
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/rus
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/ksa
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/egy
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/uru
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/por
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/esp
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/mar
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/irn
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/fra
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/aus
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/per
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/den
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/arg
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/isl
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/cro
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/nga
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/bra
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/sui
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/crc
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/srb
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/ger
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/mex
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/swe
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/kor
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/bel
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/pan
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/tun
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/eng
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/pol
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/sen
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/col
https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/jpn
'''

a = links.split('\n')
for url in a:
    url = url.strip()
    if url:
        name = url[url.rindex('/') + 1:]
        path = '%s.png' % name
        print(path)
        urllib.urlretrieve(url, path)

