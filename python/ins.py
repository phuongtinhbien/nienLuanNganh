import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import re
import ast
import pandas as pd
from urllib import request
# import pandas as pd
r = requests.get('https://www.google.com.vn/search?q=c%C3%A0+t%C3%ADm&oq=c%C3%A0+t%C3%ADm&aqs=chrome..69i57j69i61j0l6.1318j0j9&sourceid=chrome&ie=UTF-8')

uri = "mongodb://phuongtinhbien:phuongEa5AnbNL@cluster0-shard-00-00-ifmcb.mongodb.net:27017,cluster0-shard-00-01-ifmcb.mongodb.net:27017,cluster0-shard-00-02-ifmcb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
client = MongoClient(uri)
db = client.TrophicDB
col = db.thucPham

def check(st):
    if st == 'Giá trị dinh dưỡng':
        return True
    if st == 'Calo (kcal)':
        return True
    if st == 'Lipid':
        return True
    if st == 'Cholesterol':
        return True
    if st == 'Natri':
        return True
    if st == 'Kali':
        return True
    if st == 'Cacbohydrat':
        return True
    if st == 'Chất xơ':
        return True
    if st == 'Đường':
        return True
    if st == 'Protein':
        return True
    if st == 'Vitamin A':
        return True
    if st == 'Vitamin C':
        return True
    if st == 'Vitamin D':
        return True
    if st == 'Vitamin B12':
        return True
    if st == 'Vitamin B6':
        return True
    if st == 'Canxi':
        return True
    if st == 'Sắt':
        return True
    if st == 'Magie':
        return True
    if st == 'Chất béo chuyển hóa':
        return True
    return False
def is_number(s):
    try:
        complex(s) # for int, long, float and complex
    except ValueError:
        return False

    return True

url = "https://www.google.com.vn/search?q=c%C3%A0+t%C3%ADm&oq=c%C3%A0+t%C3%ADm&aqs=chrome..69i57j69i61j0l6.1318j0j9&sourceid=chrome&ie=UTF-8"
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) coc_coc_browser/68.4.126 Chrome/62.4.3202.126 Safari/537.36'}

def getData (url):
    req =request.Request(url, headers = headers)
    resp =request.urlopen(req)
    respData = resp.read()
    soup = BeautifulSoup(respData, 'lxml')
    print (soup.title)
    data = {"name": 'NULL','info':'NULL','Giá trị dinh dưỡng':100,'Calo (kcal)':0, 'Lipid':0,'Cholesterol':0,'Natri':0,'Kali':0,'Cacbohydrat':0, 'Chất xơ':0,'Đường':0,'Protein':0,'Vitamin A':0, 'Vitamin C':0,'Vitamin D':0,'Vitamin B12':0,'Vitamin B6':0,'Canxi':0,'Sắt':0,'Magie':0,'Chất béo chuyển hóa':0}
    data['name'] = soup.title.get_text().replace(" - Tìm với Google", '')

    for div in soup.find_all('div'):
        for table in div.find_all('table'): # Grab the first table
            for tr in table.find_all('tr'):
                key = ''
                value = ''
                for td in tr.find_all('td'):
                    if check(td.get_text().strip(' ')):
                        key = td.get_text().strip(' ')
                        for span in td.find_all('span'):
                            value = td.get_text().strip(' ')
                        value = re.findall(r'[\d,\d]+', value)
                        value = ''.join(value).replace(',', '.')
                        # print (value)
                        if is_number(value):
                            data[key] = float(value)
                    else:
                        for span in td.find_all('span'):
                            if check(span.get_text().strip(' ')):
                                key = span.get_text().strip(' ')
                                break
                        value = td.get_text().strip(' ')
                        value = re.findall(r'[\d,\d]+', value)
                        value = ''.join(value).replace(',', '.')
                        # print (value)
                        if is_number(value) and key != '':
                            data[key] = float(value)

    l =[]
    key =soup.title.get_text().replace(" - Tìm với Google", '')
    mydivs = soup.find_all('div')
    for div in mydivs:
        for span in div.find_all('span'):
            if key in span.get_text():
                l.append(span.get_text())

    l= pd.unique(l).tolist()
    data['info'] = l[len(l)-1]

    print (data)
    col.insert_one(data).inserted_id

getData(url)