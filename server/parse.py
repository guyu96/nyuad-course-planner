from urllib import request
import xml.etree.ElementTree as ET



def parse_course(course):
	ID = course.get("peoplesoftID")
	title = course.find("title").text
	description = course.find("description").text
	requirements = []
	sem_offered = [0, 0, 0, 0]
	prereq = []

	semester = ["Fall", "January", "Spring", "Summer"]
	sections = course.findall("section")
	for sec in sections:
		term = sec.get("term").split(" ")
		if int(term[1]) in range(2015, 2018):
			if term[0] in semester:
				sem_offered[semester.index(term[0])] = 1

	for req in course.iterfind("appears"):
		requirements.append(req.get("categoryID"))

	for pre in course.iterfind("prerequisite"):
		for t in pre.iterfind("title"):
			prereq.append(t.text)

	return ID, title, description, sem_offered, requirements, prereq

def get_courses():
	course_url = "http://services.nyuad.nyu.edu/academics/courses"

	# course_xml = request.urlopen(course_url).read()
	# category_xml = request.urlopen(category_url).read()

	tree = ET.parse('course.xml')
	root = tree.getroot()

	course_list = []
	for child in root:
		ID, title, description, semester, requirements, prereq = parse_course(child)
		tmp = {}
		tmp["ID"] = ID
		tmp["title"] = title
		tmp["description"] = description
		tmp["semester"] = semester
		tmp["requirements"] = requirements
		tmp["prereq"] = prereq
		course_list.append(tmp)

	return course_list
