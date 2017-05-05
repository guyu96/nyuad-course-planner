import React, { Component } from 'react';
import SemesterPlanner from './SemesterPlanner';

let semesters = ["Fall", "J-term", "Spring", "Summer"];


export default class PlannerElement extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedCourses: {
                "Fall": [],
                "J-term": [],
                "Spring": [],
                "Summer": [],
            }
        }
    }

    render() {
        return (
            <div className={`planner ${this.props.display}`} id={this.props.id}>
            {
                semesters.map((sem) => {
                    return <SemesterPlanner semester={sem} key={sem}
                            selectedCourses={this.state.selectedCourses[sem]} />
                })
            }
            </div>
        )
    }
}
