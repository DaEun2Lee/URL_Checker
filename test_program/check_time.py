from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json

def extract_urls_from_json(json_file):
    urls = []
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        for item in data:
            if 'domain' in item:
                urls.append(item['domain'])
    return urls

# 테스트를 위해 함수 호출 예시
json_file_path = r'C:\Users\n2sl\Desktop\URL_Checker\blacklist\sampled_accessible_blacklist.json'
url_list = extract_urls_from_json(json_file_path)

# Geckodriver 실행 파일의 경로
geckodriver_path = r'C:\Users\n2sl\Downloads\geckodriver-v0.34.0-win-aarch64\geckodriver.exe'

# Firefox WebDriver 설정
service = FirefoxService(executable_path=geckodriver_path)
driver = webdriver.Firefox(service=service)

try:
    # 시작 시간 기록
    start_time = time.time()

    # 특정 URL로 접속
    url = "https://example.com"
    driver.get(url)

    # 팝업 창이 나타날 때까지 대기 (예: id가 'popup'인 요소가 나타날 때까지 기다림)
    WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.ID, 'popup')))

    # 끝 시간 기록
    end_time = time.time()

    # 시간 차이 계산
    elapsed_time = end_time - start_time
    print(f"팝업 창이 뜨는 데 걸린 시간: {elapsed_time}초")

finally:
    # 브라우저 닫기
    driver.quit()
