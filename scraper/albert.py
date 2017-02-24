from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import json

DELAY = 10
HEADLESS = False
URL = {
  'login': 'https://admin.portal.nyu.edu/psp/paprod/EMPLOYEE/EMPL/?cmd=login',
  'class-search': 'https://admin.portal.nyu.edu/psp/paprod/EMPLOYEE/CSSS/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?FolderPath=PORTAL_ROOT_OBJECT.NYU_STUDENT_CTR&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder'
}

XPATH = {
  'login': "//input[@class='psloginbutton']",
  'student-center': "//img[@alt='Student Center']",
  'search-frame': "//frame[@name='TargetContent']"
}

ID = {
  'search': 'DERIVED_SSS_SCR_SSS_LINK_ANCHOR2'
}

def wait_for_element(driver, by, identifier, delay):
  try:
    WebDriverWait(driver, delay).until(EC.presence_of_element_located((by, identifier)))
  except TimeoutException:
    print('Took too long to load')

with open('config.json') as config:
  cfg = json.load(config)

# initiate driver
if HEADLESS:
  driver = webdriver.PhantomJS()
else:
  driver = webdriver.Chrome()

# log into albert
driver.get(URL['login'])
netid = driver.find_element_by_id('userid')
netid.clear()
netid.send_keys(cfg['netid'])
password = driver.find_element_by_id('pwd')
password.clear()
password.send_keys(cfg['password'])
submit = driver.find_element_by_xpath(XPATH['login'])
submit.click()

# navigate to class search page
wait_for_element(driver, By.XPATH, XPATH['student-center'], DELAY)
driver.find_element_by_xpath(XPATH['student-center']).click()
wait_for_element(driver, By.XPATH, XPATH['search-frame'], DELAY)
driver.switch_to.frame(driver.find_element_by_xpath(XPATH['search-frame']))
driver.find_element_by_id(ID['search']).click()
driver.switch_to.default_content()


print(driver.current_url)
