import React, { Component } from 'react';
var FA = require('react-fontawesome');

export default class CourseSnippet extends Component{
    constructor(props) {
        super(props)

        this.state = {
            hover: false,
            background: 'white',
            remove: false
        }
    }

    render() {

        return (
            this.state.remove?
            null:
            <li className="small-course"
                style={{background: this.state.background}}
                onMouseOver={() => this.setState({hover: true, background: 'rgb(191, 191, 191)'})}
                onMouseLeave={() => this.setState({hover: false, background: 'white'})}>
                    <button className="remove-course"
                        onClick={() => {
                            // course snippet is removed from planner
                            this.setState({remove: true});
                            // let id = this.props.id;
                            // let courseElement = CourseSelect.refs[id];
                            // console.log(courseElement);
                            //
                            // courseElement.setState({
                            //     remove: false
                            // });
                        }
                    }>
                        {this.state.hover? <FA name='close' size='4x'/> : null}
                    </button>
                    <span className="course-id">{this.props.id} </span>
                    <p className="course-title">{this.props.title}</p>
                    <p className="semester-offered"><i>{this.props.semesters}</i></p>
            </li>

        )
    }

}
