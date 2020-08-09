import React from "react";
import './css/Filter.css';

const Filter = props => {
    return (<div id="filter">
        <div>
            {/* SKILLS */}
            <div id="filter-skills">
                <label className="filter-title">SKILLS</label>
                <div id="skills-filter-container">
                    <div className="filter skills" data-name="react" onClick={e => props.allFilterClickListener(e, "skills")}>
                        <h6 data-name="react">React</h6>
                    </div>
                    <div className="filter skills" data-name="angular" onClick={e => props.allFilterClickListener(e, "skills")}>
                        <h6 data-name="angular">Angular</h6>
                    </div>
                    <div className="filter skills" data-name="graphql" onClick={e => props.allFilterClickListener(e, "skills")}>
                        <h6 data-name="graphql">GraphQL</h6>
                    </div>
                    <div className="filter skills" data-name="nodejs" onClick={e => props.allFilterClickListener(e, "skills")}>
                        <h6 data-name="nodejs">NodeJS</h6>
                    </div>
                    <div className="filter skills" data-name="html" onClick={e => props.allFilterClickListener(e, "skills")}>
                        <h6 data-name="html">HTML</h6>
                    </div>
                </div>
            </div>
            {/* YEAR */}
            <div id="filter year">
                <label className="filter-title">YEAR</label>
                <div id="year-filter-container">
                    <div className="filter year" data-name="first" onClick={e => props.allFilterClickListener(e, "year")}>
                        <h6 data-name="first">First</h6>
                    </div>
                    <div className="filter year" data-name="second" onClick={e => props.allFilterClickListener(e, "year")}>
                        <h6 data-name="second">Second</h6>
                    </div>
                    <div className="filter year" data-name="third" onClick={e => props.allFilterClickListener(e, "year")}>
                        <h6 data-name="third">Third</h6>
                    </div>
                    <div className="filter year" data-name="fourth" onClick={e => props.allFilterClickListener(e, "year")}>
                        <h6 data-name="fourth">Fourth</h6>
                    </div>
                    <div className="filter year" data-name="fifth" onClick={e => props.allFilterClickListener(e, "year")}>
                        <h6 data-name="fifth">Fifth</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default Filter;
