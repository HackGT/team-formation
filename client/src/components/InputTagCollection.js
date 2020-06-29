import React from 'react';
import './css/InputTagCollection.css';
import {Label, Icon} from 'semantic-ui-react'


const InputTagCollection = props => {
    // const { skills, year } = props.tags;
    const skillsSelected = props.skills;
    const yearsSelected = props.years;
    const schoolsSelected = props.schools;

    let elements = []

    for (const skill of skillsSelected) {
        elements.push(
            <div
                className="collection"
                data-name={skill}
            >
                <Label data-name={skill} horizontal content={skill} removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "skills")} />
            </div>
        )
    }

    for (const year of yearsSelected) {
        elements.push(
            <div
                className="collection"
                data-name={year}
            >
                <Label data-name={year} horizontal content={`${year} Year`} removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "years")} />
            </div>
        )
    }

    for (const school of schoolsSelected) {
        elements.push(
            <div
                className="collection"
                data-name={school}
            >
                <Label data-name={school} horizontal content={school} removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "schools")} />
            </div>
        )
    }

    return (
        <div id="chosen-tags">
            {elements}
        </div>
    );
    //     <div id="chosen-tags">
    //     {/* ************** SKILLS ************** */}
    //     {skillsSelected.includes("react") ? (
    //         <div
    //             className="collection"
    //             data-name="react"
    //         >
    //             <Label data-name="react" horizontal content='React' removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "skills")} />
    //         </div>
    //     ) : null}
    //     {skillsSelected.includes("angular") ? (
    //         <div
    //             className="collection"
    //             data-name="angular"
    //         >
    //             <Label data-name="angular" horizontal content='Angular' removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "skills")}/>
    //         </div>
    //     ) : null}
    //     {skillsSelected.includes("graphql") ? (
    //         <div
    //             className="collection"
    //             data-name="graphql"
    //         >
    //             <Label data-name="graphql" horizontal content='GraphQL' removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "skills")}/>
    //         </div>
    //     ) : null}
    //     {skillsSelected.includes("nodejs") ? (
    //         <div
    //             className="collection"
    //             data-name="nodejs"
    //         >
    //             <Label data-name="nodejs" horizontal content='NodeJS' removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "skills")}/>
    //         </div>
    //     ) : null}
    //     {skillsSelected.includes("html") ? (
    //         <div
    //             className="collection"
    //             data-name="html"
    //         >
    //             <Label data-name="html" horizontal content='HTML' removeIcon='delete' onRemove={(e,data) => props.allFilterClickListener(data['data-name'], "skills")}/>
    //         </div>
    //     ) : null}
    //     {/* ************** YEAR ************** */}
    //     {/* {year.first ? (
    //         <div
    //             className="collection"
    //             data-name="first"
    //             onClick={e => props.allFilterClickListener(e, "year")}
    //         >
    //             <h6 data-name="first">First Year</h6>
    //         </div>
    //     ) : null}
    //     {year.second ? (
    //         <div
    //             className="collection"
    //             data-name="second"
    //             onClick={e => props.allFilterClickListener(e, "year")}
    //         >
    //             <h6 data-name="second">Second Year</h6>
    //         </div>
    //     ) : null}
    //     {year.third ? (
    //         <div
    //             className="collection"
    //             data-name="third"
    //             onClick={e => props.allFilterClickListener(e, "year")}
    //         >
    //             <h6 data-name="third">Third Year</h6>
    //         </div>
    //     ) : null}
    //     {year.fourth ? (
    //         <div
    //             className="collection"
    //             data-name="fourth"
    //             onClick={e => props.allFilterClickListener(e, "year")}
    //         >
    //             <h6 data-name="fourth">Fourth Year</h6>
    //         </div>
    //     ) : null}
    //     {year.fifth ? (
    //         <div
    //             className="collection"
    //             data-name="fifth"
    //             onClick={e => props.allFilterClickListener(e, "year")}
    //         >
    //             <h6 data-name="fifth">Fifth Year</h6>
    //         </div>
    //     ) : null} */}
    //     </div>
    // );
}
export default InputTagCollection;
