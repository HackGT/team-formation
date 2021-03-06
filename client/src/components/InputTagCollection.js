import React from 'react';
import './css/InputTagCollection.css';
import {Label} from 'semantic-ui-react'

const InputTagCollection = props => {
    const skillsSelected = props.skills;
    const yearsSelected = props.years;
    const schoolsSelected = props.schools;

    let elements = []

    for (const skill of skillsSelected) {
        elements.push(<div className="collection" data-name={skill}>
            <Label data-name={skill} horizontal="horizontal" content={skill} removeIcon='delete' onRemove={(e, data) => props.allFilterClickListener(data['data-name'], "skills")}/>
        </div>)
    }

    for (const year of yearsSelected) {
        elements.push(<div className="collection" data-name={year}>
            <Label data-name={year} horizontal="horizontal" content={`${year} Year`} removeIcon='delete' onRemove={(e, data) => props.allFilterClickListener(data['data-name'], "years")}/>
        </div>)
    }

    for (const school of schoolsSelected) {
        elements.push(<div className="collection" data-name={school}>
            <Label data-name={school} horizontal="horizontal" content={school} removeIcon='delete' onRemove={(e, data) => props.allFilterClickListener(data['data-name'], "schools")}/>
        </div>)
    }

    for (const track of props.tracks) {
        elements.push(
            <div>
                <Label data-name={track} horizontal content={track} removeIcon='delete' onRemove={(e, data) => props.allFilterClickListener(data['data-name'], "tracks")}/>
            </div>
        )
    }

    return (<div id="chosen-tags">
        {elements}
    </div>);
}
export default InputTagCollection;
