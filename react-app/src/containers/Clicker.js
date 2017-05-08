import React from 'react';
import { connect } from 'react-redux';
import { reAddCourse } from '../actions';
import RemoveBtn from '../components/RemoveBtn';

const mapStateToProps = (state, ownProps) => {
    // pass the essential props to removeBtn
    return {
        id: ownProps.id,
        hover: ownProps.hover,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onBtnClick: (id) => {
            dispatch(reAddCourse(id));
            // trigger the click prop of Clicker - hide the course snippet once clicked
            ownProps.click();
        }
    }
};

 const Clicker = connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoveBtn)

export default Clicker
