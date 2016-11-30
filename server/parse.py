from urllib import request

course_url = "http://services.nyuad.nyu.edu/academics/courses"
category_url = "http://services.nyuad.nyu.edu/academics/categories"

course_xml = request.urlopen(course_url).read()
category_xml = request.urlopen(category_url).read()

# print(category_xml)

def get_category_by_id():
  pass

def parse_course():
  pass


class Course:
  def __init__(self, ID, title, description, semester, prereq):
    self.ID = ID # the course ID
    self.title = title # the course title
    self.description = description # the course description
    self.semester = semester # an int -> 1 fall, 2 spring, 3 fall & spring
    self.prereq = prereq # a list of other courses


