import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Types} from './Constants';
import { DragSource } from 'react-dnd';

const courseSource = {
    beginDrag(props) {
        // the props to pass forward to the drop target
        return {
            id: props.id,
            title: props.course.title,
            semesters: props.semesters
        };
    },

    endDrag(props, monitor, component) {
        // whether the element has been dropped
        let dropped = (monitor.getDropResult() !== (undefined || null));
        component.state.remove = dropped;
    }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class CourseElement extends Component {

    constructor(props) {
        super(props)

        this.state = {
            remove: false,
            showDescription: false
        }
    }

    render() {
        const { connectDragSource, isDragging } = this.props;
        // if is not dragging and hover over, show course description
        let descriptionClass = !isDragging && this.state.showDescription? "" : "disabled";
        let showCourse = this.state.remove && !this.props.readded;

        // if display and element is not removed from planner, show the course element, else return null
        return (showCourse)?
            null:
            connectDragSource(
                <li key={this.key} className="course" id={`course${this.props.id}`}
                onMouseOver={() => this.setState({showDescription: true})}
                onMouseLeave={() => this.setState({showDescription: false})}
                style={{
                  opacity: isDragging ? 0.8 : 1,
                  cursor: 'grab'
                }}>
                    <span className="course-id">{this.props.id} </span>
                    <span className="course-title">{this.props.course.title}</span>
                    <p className="semester-offered"><i>{this.props.semesters.join(", ")}</i></p>
                    <div className={descriptionClass} id={`description${this.props.id}`}
                        dangerouslySetInnerHTML={{__html: this.props.course.description}}></div>
               </li>,
               // add the + sign to the cursor when can drop
               { dropEffect: 'copy' }
           );
    }
}

CourseElement.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(Types.COURSE, courseSource, collect)(CourseElement);
