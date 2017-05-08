import React, { Component } from 'react';
import '../css/App.css';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import CourseSelect from './CourseSelect';
import Planner from './Planner';

class App extends Component {

    render() {
        return (
            <div>
                <CourseSelect />
                <Planner />
            </div>
        )
    }
}

//ES6
export default DragDropContext(HTML5Backend)(App);
