import React, { Component } from 'react';
import Pdf from './pdf';
import PlannerElement from './PlannerElement';
var FA = require('react-fontawesome');

export default class Planner extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentPlanner: 0,
        }

        this.years = ["Freshman", "Sophomore", "Junior", "Senior"];
    }

    prev_year = () => {
        let id = this.state.currentPlanner;

        if (id <= 0) {
            return;
        }

        this.setState({
            currentPlanner: id - 1
        })
    }

    next_year = () => {

        let id = this.state.currentPlanner;

        if (id >= 3) {
            return;
        }

        this.setState({
            currentPlanner: id + 1
        })
    }

    render() {

        return (

            <div className="planner-area pure-u-3-5">

                  <div id="year-switch">
                    <button id="previous" type="button" onClick={this.prev_year}>
                        <FA name='arrow-left'/>
                    </button>
                      <span id="current-year">{this.years[this.state.currentPlanner]}</span>
                    <button id="next" type="button" onClick={this.next_year}>
                        <FA name='arrow-right'/>
                    </button>
                  </div>
                  <button type="button" id="savetoPDF" className="button-secondary pure-button" onClick={Pdf.savetoPDF}>Save to PDF</button>

                  <PlannerElement id="0" display={this.state.currentPlanner === 0? "":"disabled"} />
                  <PlannerElement id="1" display={this.state.currentPlanner === 1? "":"disabled"} />
                  <PlannerElement id="2" display={this.state.currentPlanner === 2? "":"disabled"} />
                  <PlannerElement id="3" display={this.state.currentPlanner === 3? "":"disabled"} />


            </div>

        );
    }
}
