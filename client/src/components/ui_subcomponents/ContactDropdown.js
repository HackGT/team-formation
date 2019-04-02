import React, { Component } from 'react';
import { Dropdown, Input } from 'semantic-ui-react'

const contactOptions = [
	{
		text: "phone number",
		value: "phone number"
	},
	{
		text: "email",
		value: "email"
	},
	{
		text: "social media",
		value: "social media"
	}
]
class YearDropdown extends Component {

	constructor() {
		super();
		this.state = {
			contact_method: ""
		}
	}

	render() {
		return(
			<div className="YearDropdown-container">
				<Dropdown
					placeholder="Method of contact"
					selection
					options={contactOptions}
					onChange={this.onHandleChange}
				/>
			</div>
		);
	}

	onHandleChange = (e, d) => {
		this.setState({
			contact_method: d.value
		})
		this.props.contact(d.value)
	}
}

export default YearDropdown
