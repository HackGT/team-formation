import React from 'react';
import './css/InputTagCollection.css';
import {Label, Icon} from 'semantic-ui-react'

const InputTagCollection = props => {
    const { search, skills, year } = props.tags;
    return (
        <div id="chosen-tags">
        {search.inputTerm.length ? (
            <div className="collection" onClick={props.cancelSearchTag}>
            <h6 onClick={props.cancelSearchTag}>{search.inputTerm}</h6>
            </div>
        ) : null}
        {/* ************** SKILLS ************** */}
        {skills.react ? (
            <div
                className="collection"
                data-name="react"
                // onClick={e => props.allFilterClickListener(e.target.dataset.name, "skills")}
            >
                <Label data-name="react" horizontal content='React' removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "skills")} />
            </div>
        ) : null}
        {skills.angular ? (
            <div
                className="collection"
                data-name="angular"
            >
                <Label data-name="angular" horizontal content='Angular' removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "skills")}/>
            </div>
        ) : null}
        {skills.graphql ? (
            <div
                className="collection"
                data-name="graphql"
            >
                <Label data-name="graphql" horizontal content='GraphQL' removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "skills")}/>
            </div>
        ) : null}
        {skills.nodejs ? (
            <div
                className="collection"
                data-name="nodejs"
            >
                <Label data-name="nodejs" horizontal content='NodeJS' removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "skills")}/>
            </div>
        ) : null}
        {skills.html ? (
            <div
                className="collection"
                data-name="html"
            >
                <Label data-name="html" horizontal content='HTML' removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "skills")}/>
            </div>
        ) : null}
        {/* ************** YEAR ************** */}
        {year.first ? (
            <div
                className="collection"
                data-name="first"
                onClick={e => props.allFilterClickListener(e, "year")}
            >
                <h6 data-name="first">First Year</h6>
            </div>
        ) : null}
        {year.second ? (
            <div
                className="collection"
                data-name="second"
                onClick={e => props.allFilterClickListener(e, "year")}
            >
                <h6 data-name="second">Second Year</h6>
            </div>
        ) : null}
        {year.third ? (
            <div
                className="collection"
                data-name="third"
                onClick={e => props.allFilterClickListener(e, "year")}
            >
                <h6 data-name="third">Third Year</h6>
            </div>
        ) : null}
        {year.fourth ? (
            <div
                className="collection"
                data-name="fourth"
                onClick={e => props.allFilterClickListener(e, "year")}
            >
                <h6 data-name="fourth">Fourth Year</h6>
            </div>
        ) : null}
        {year.fifth ? (
            <div
                className="collection"
                data-name="fifth"
                onClick={e => props.allFilterClickListener(e, "year")}
            >
                <h6 data-name="fifth">Fifth Year</h6>
            </div>
        ) : null}
        </div>
    );
}
export default InputTagCollection;
