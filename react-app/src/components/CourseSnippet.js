import React, { Component } from 'react';
import Clicker from '../containers/Clicker';

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
                <Clicker hover={this.state.hover} id={this.props.id} click={() => this.setState({remove: true})}></Clicker>

                <span className="course-id">{this.props.id} </span>
                <p className="course-title">{this.props.title}</p>
                <p className="semester-offered"><i>{this.props.semesters}</i></p>
            </li>

        )
    }

}
