import React, { Component } from 'react';
import CourseElement from './CourseElement';

export default class CourseSelect extends Component {

    constructor(props) {
        super(props)

        this.state = {
            int2semester: {
              0: 'Fall',
              1: 'J-term',
              2: 'Spring',
              3: 'Summer'
           },
            courseForm: {
                type: "",
                semester: "-1",
                title: ""
            },
            courses: [],
            categories: JSON.parse('{"Previous Core Curriculum":["42","43","44","45","46","47","48"],"Islamic Studies":["49"],"Language":["50","51","52","53","161"],"Art and Art History":["59","60","61","62","159","160"],"Arts and Humanities Colloquia":["63"],"Biology":["64","65","66","67"],"Chemistry":["68","69"],"Civil Engineering":["70","71"],"Computer Engineering":["72"],"Computer Science":["73","74"],"Economics":["75","76","77","78"],"Electrical Engineering":["79","80"],"Film and New Media":["81","82","83","84","85"],"Foundations of Science":["86"],"General Engineering":["87","88","89","90"],"History":["91","92","93","94","95","96","97","98","162"],"Literature and Creative Writing":["99","100","101","102","103","158"],"Mathematics":["104","105"],"Mechanical Engineering":["106","107"],"Music":["108","109","110","111","112","113","114","115","116","117"],"Philosophy":["118","119","120","121","122","123","124"],"Physics":["125"],"Political Science":["126","127","128","129","130","131","132"],"Psychology":["134","135","136","137"],"Social Research and Public Policy":["138","139","140"],"Theater":["141","142","143"],"Visual Arts":["144","145","146","147"],"Arab Crossroads":["55","56","57","58","157"],"Physical Education":["148"],"Pre-Professional Courses":["149","150","151","152","154","155","156"],"Core Curriculum":["163","164","165","166","167","168"]}')

        };

        this.filter_course_list = this.filter_course_list.bind(this);
    }

    componentDidMount() {
        fetch('/course-ad')
            .then(res => res.json())
            // cannot use setState directly in componentDidMount
            .then(data => this.populate_course_list(data));
    }

    populate_course_list = (data) => {
        this.setState({
            courses: data
        })
        // console.log(this.state.courses)
    }

    get_criteria  = () => {
      return {'title': this.state.courseForm.title,
              'semester': parseInt(this.state.courseForm.semester, 10),
              'type': this.state.categories[this.state.courseForm.type],
      }
    }

    filter_course_list = (e) => {

        let option = e.target.name;
        let selection = e.target.value;
        // shallow copy courseForm
        let tmpForm = Object.assign({}, this.state.courseForm);
        tmpForm[option] = selection;

        this.setState({
            courseForm: tmpForm
        });

        fetch('/course-ad')
            .then(res => res.json())
            // cannot use setState directly in componentDidMount
            .then(function(data) {
                const filtered_courses = [];
                const criteria = this.get_criteria();

                data.forEach(function(course) {
                    let validTitle = (course.title.toLowerCase().indexOf(criteria.title.toLowerCase()) !== -1);
                    let validSemester = criteria.semester === -1 || course.semester[criteria.semester] === 1;
                    let req = false;

                    if (criteria.type === undefined) {
                        req = true;
                    }
                    else {
                        course.requirements.forEach(function(r) {
                          if (criteria.type.includes(r)) {
                            req = true;
                          }
                        });
                    }

                    if (validTitle && validSemester && req) {
                        filtered_courses.push(course);
                    }
                });

                this.setState({
                    courses: filtered_courses
                })

            }.bind(this));
    }

    render() {

        return (

            <div className="course-list pure-u-2-5">

            <form className="pure-form" id='filter-form' onChange={this.filter_course_list} onSubmit={this.filter_course_list} >
                  <select name="type" id="course-type" defaultValue="">
                    <option value="">Categories</option>
                    {
                    Object.keys(this.state.categories).map(function(opt, i) {
                        return <option key={i}>{opt}</option>
                    })
                    }

                  </select>
                  <select name="semester" id="course-semester" defaultValue="-1">
                    <option value="-1">Semester</option>
                    <option value="0">Fall</option>
                    <option value="1">J-term</option>
                    <option value="2">Spring</option>
                    <option value="3">Summer</option>
                  </select>
                  <input name="title" type="text" id="course-name" placeholder="Course Name" />
            </form>

            <ul id="course-box" className="course-box">
                {
                    this.state.courses.map((element) => {
                        let semesters = [];
                        for (let i=0; i < 4; i++) {
                            if (element.semester[i] === 1)
                                semesters.push(this.state.int2semester[i]);
                        }

                        return <CourseElement className={`course${element.ID}`} id={element.ID}
                                course={element} semesters={semesters} dropped={false} key={element.ID} ref={element.ID}/>
                    })
                }
            </ul>

            </div>

        );
    }

}
