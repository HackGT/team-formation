import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';
import { Box } from '@chakra-ui/react';

const contactOptions = [
    {
        text: "phone number",
        value: "phone number"
    }, {
        text: "email",
        value: "email"
    }, {
        text: "social media",
        value: "social media"
    }
];
// Dropdown containing method of contacting the user
/*
Note: This component is not in use. If there is no planned use
of this component, consider deletion.
*/
class YearDropdown extends Component {

    constructor() {
        super();
        this.state = {
            contact_method: ""
        };
    };

    render() {
        return (
            <Box>
                <Dropdown placeholder="Method of contact" selection="selection" options={contactOptions} onChange={this.onHandleChange} defaultValue={this.props.contact_method}/>
            </Box>
        );
    };

    onHandleChange = (e, d) => {
        this.setState({contact_method: d.value});
        this.props.contact(d.value);
    };
};

export default YearDropdown;
