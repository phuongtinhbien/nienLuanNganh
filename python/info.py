import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import re
import ast
import pandas as pd
from urllib import request

url = "https://www.google.com.vn/search?sa=X&biw=1366&bih=638&q=B%C3%A1nh+m%C3%AC&stick=H4sIAAAAAAAAAONgFuLUz9U3SDMyLbdU4gAxLc2NLLQE_UpLijJLMvPzgjNTUssTK4sB_-bbdyoAAAA&npsic=-1280&ved=0ahUKEwja3uye4NLYAhUBuY8KHdKqBUEQ-BYITQ"
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) coc_coc_browser/68.4.126 Chrome/62.4.3202.126 Safari/537.36'}

req =request.Request(url, headers = headers)
resp =request.urlopen(req)
respData = resp.read()

soup = BeautifulSoup(respData,'lxml')
# import pandas as pd
# print(r.text)
key =soup.title.get_text().replace(" - Tìm với Google", '')
l =[]
mydivs = soup.find_all('div')
for div in mydivs:
    for span in div.find_all('span'):
        if key in span.get_text():
            l.append(span.get_text())

l= pd.unique(l).tolist()
print (l[len(l)-1])
respData

