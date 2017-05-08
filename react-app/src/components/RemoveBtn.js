import React from 'react';
var FA = require('react-fontawesome');

const RemoveBtn = ({id, hover, onBtnClick}) => {
    return (
        // on button click, call the onBtnClick prop of Clicker
        <button className="remove-course" onClick={() => {onBtnClick(id)}}>
            {hover? <FA name='close' size='4x'/> : null}
        </button>
    )
}

export default RemoveBtn
