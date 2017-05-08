import { connect } from 'react-redux';
import CourseElement from '../components/CourseElement';

// check if the course has been readded to course selection list
const checkReAdd = (readds, id) => {

    let courses = readds.filter(function( obj ) {
                    return obj.id === id;
                 });

    return courses.length > 0;
};


const mapStateToProps = (state, ownProps) => {
    return {
        readded: checkReAdd(state.readds, ownProps.id)
    }
};

export default connect(
  mapStateToProps
)(CourseElement)
