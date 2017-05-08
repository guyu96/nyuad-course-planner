import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Types } from './Constants';
import { DropTarget } from 'react-dnd';
import CourseSnippet from './CourseSnippet';

function matchingSemester(planner_semester, course_semesters, selectedCourses) {
    // limit the number of courses to be added to each semester
    if (planner_semester === "Spring" || planner_semester === "Fall") {
        if (selectedCourses.length >= 6) {
            return false;
        }
    }
    else {
        if (selectedCourses.length >= 1) {
            return false;
        }
    }
    // if PE, can add only in Spring / Fall
    if (course_semesters.length === 0) {
        if (planner_semester === "Spring" || planner_semester === "Fall") {
            return true;
        }
        return false;
    }
    // console.log(course_semesters);

    // check if semesters match
    return course_semesters.indexOf(planner_semester) !== -1;
}

const plannerTarget = {
  // props refer to SemesterPlanner class's props
  canDrop(props, monitor) {
      // access props from the drag event
    //   let courseObj = monitor.getItem();
      let sems = monitor.getItem().semesters;
      // check if add course is allowed
      return matchingSemester(props.semester, sems, props.selectedCourses);
  },

  drop(props, monitor){
      let draggedItem = monitor.getItem();
      // set SemesterPlanner's state
      props.selectedCourses.push(draggedItem);
      return draggedItem;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class SemesterPlanner extends Component {

    // add diffrent bg color for different drop situations:
    // yellow - can drop, red - hover & cannot drop, green - hover & can drop
    renderOverlay(isOver, canDrop) {
        let color;
        if (isOver && !canDrop) {
            //red
            color = 'rgba(255, 0, 0, 0.6)';
        }
        else if (!isOver && canDrop) {
            //yellow
            color = 'rgba(255, 255, 0, 0.6)';
        }
        else if (isOver && canDrop) {
            //green
            color = 'rgba(0, 179, 0, 0.6)';
        }

        return (
            {
                backgroundColor: color,
            }
        );
  }

    render() {
        const { connectDropTarget, isOver, canDrop } = this.props;

        return connectDropTarget(
            <div className={`${this.props.semester}-Planner semester-planner`}
                style={this.renderOverlay(isOver, canDrop)}>
              <h3>{this.props.semester}</h3>
              <ul>
              {
                  this.props.selectedCourses.map((course, index) => {
                      return <CourseSnippet id={course.id} title={course.title}
                                semesters={course.semesters.join(", ")} key={index} />
                  })
              }
              </ul>
            </div>
        )
    }
}

SemesterPlanner.propTypes = {
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};


export default DropTarget(Types.COURSE, plannerTarget, collect)(SemesterPlanner);
