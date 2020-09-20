import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import {
    Button,
    Divider,
    Dropdown,
    TextArea,
    Message,
    Form
} from 'semantic-ui-react';
import {QueryRenderer} from 'react-relay';
import ContactDropdown from './ui_subcomponents/ContactDropdown';
import './css/EditProfile.css';
import {commitMutation} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from './Environment';
import skills from '../constants/skills';
import years from '../constants/years';
import Filter from 'bad-words'
const mutation = graphql `
mutation EditProfileMutation($name: String, $grad_year: String, $school: String, $skills: [String], $experience: String, $contact: String, $contact_method: String) {
  update_user(name: $name, grad_year: $grad_year, school: $school,  skills: $skills, experience: $experience, contact: $contact, contact_method: $contact_method) {
    name
    grad_year
    school
    skills
    experience
    contact
  }
}
`;

const getUsersProfile = graphql `
query EditProfileQuery {
    user_profile {
        name
        school
        grad_year
        contact
        skills
        experience
        contact_method
    }
}
`;

class EditProfile extends Component {

    constructor() {
        super();
        this.state = {
            first_name: "",
            last_name: "",
            year: "",
            name: "",
            school: "",
            grad_year: "",
            skills: [],
            experience: "",
            contact_method: "",
            contact: "",
            cur_error_message: "",
            "name_profane": false,
            "school_profane": false,
            "grad_year_profane": false,
            "experience_profane": false,
            "contact_profane": false
        };
        this.profanityFilter = new Filter();

    };

    render() {

        let contact_form;
        if (this.state.contact_method === 'phone number') {
            contact_form = <Form.Input label='Phone Number:' placeholder='(###) ###-####' defaultValue={this.state.contact} width={5} onChange={this.onContactChange} error={this.state["contact_profane"]} required="required"/>
        } else if (this.state.contact_method === 'email') {
            contact_form = <Form.Input label='Email:' placeholder='example@email.com' defaultValue={this.state.contact} width={5} onChange={this.onContactChange} error={this.state["contact_profane"]} required="required"/>
        } else if (this.state.contact_method === "social media") {
            contact_form = <Form.Input label='Social Media URL:' placeholder='Social Media URL' defaultValue={this.state.contact} width={5} onChange={this.onContactChange} error={this.state["contact_profane"]} required="required"/>
        } else {
            contact_form = ""
        }
        return (<QueryRenderer environment={environment} query={getUsersProfile} variables={{}} render={({error, props}) => {
                if (error) {
                    return <div>{error.message}</div>;
                } else if (props) {
                    props = props.user_profile;
                    if (!this.state.name && props.name) {
                        this.setState({
                            ...props
                        })
                    }
                    return (<div className="form-container">
                        <Form>
                            <Form.Group>
                                <Form.Input className="input-container" label='First Name' placeholder='First Name' defaultValue={props.name} onChange={this.onNameChange} error={this.state["name_profane"]} required="required"/>
                                <Form.Input className="input-container" label='Last Name' placeholder='Last Name' defaultValue={props.name} onChange={this.onNameChange} error={this.state["name_profane"]} required="required"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input className="input-container" label='School' placeholder='School' defaultValue={props.school} onChange={this.onSchoolChange} error={this.state["school_profane"]} required="required"/>
                                <Form.Select className="input-container" required="required" label='Year in School' onChange={this.onYearChange} options={years} placeholder='Year in School'/>
                            </Form.Group>
                            <Divider/>
                            <Form.Group>
                                <Form.Select className="input-container-large" label="Skills" placeholder='Skills' onChange={this.onSkillsChange} fluid="fluid" multiple="multiple" selection="selection" search="search" options={skills}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.TextArea className="input-container-large" label='Bio' placeholder='Introduce yourself!' defaultValue={props.experience} onChange={this.onExperienceChange} error={this.state["experience_profane"]}/>
                            </Form.Group>
                            <div className="button-container">
                                <Form.Group className="save-button-container">
                                    <Link to="/feed">
                                        <Button  className="save-button">
                                            cancel
                                        </Button>
                                    </Link>
                                </Form.Group>
                                <Form.Group>
                                    <Link to="/feed">
                                        <Button onClick={this.onNextClick} className="save-button">
                                            save
                                        </Button>
                                    </Link>
                                </Form.Group>
                                <Form.Group>
                                    {this.state.cur_error_message}
                                </Form.Group>
                            </div>
                        </Form>
                    </div>)
                }
            }}/>);
    };

    onFirstNameChange = (e) => {
        this.setState({first_name: e.target.value});
    }

    onLastNameChange = (e) => {
        this.setState({last_name: e.target.value});
    }

    onNameChange = (e) => {
        this.setState({name: e.target.value});
    };

    onSchoolChange = (e) => {
        this.setState({school: e.target.value});
    };

    onGradYearChange = (e) => {
        this.setState({grad_year: e.target.value});
    };

    onExperienceChange = (e) => {
        this.setState({experience: e.target.value});
    };

    onContactChange = (e) => {
        this.setState({contact: e.target.value});
    };

    onYearChange = (e, {value}) => {
        this.setState({year: value})
    }

    onSkillsChange = (e, {value}) => {
        this.setState({skills: value})
    }

    changeContactMethod = (new_contact) => {
        this.setState({contact_method: new_contact})
    };

    checkProfanity = () => {
        var profanityExists = false;
        const profanities = Object.keys(this.state).map((key) => {
            if (typeof(this.state[key]) === "string") {
                const k = `${key}_profane`
                const isProfane = this.profanityFilter.isProfane(this.state[key])
                this.setState({[k]: isProfane})
                profanityExists = profanityExists || isProfane
                return isProfane
            }
        })
        return profanityExists
    }

    onCancelClick = () => {
        this.props.onNextClick('feed', this.props.user_id);
    }

    onNextClick = () => {
        let cur_error;
        this.setState({name_profane: false, school_profane: false, grad_year_profane: false, experience_profane: false, contact_profane: false})
        if (this.state.name === "" || this.state.school === "" || this.state.grad_year === "" || this.state.contact_method === "") {
            cur_error = <Message error="error" header='Some required fields left empty' content='Make sure to fill in all starred fields'/>;
            this.setState({cur_error_message: cur_error});

        } else if (this.checkProfanity()) {
            cur_error = <Message>
                <Message.Header>Your profile contains profanity</Message.Header>
                <p>
                    Please review your profile for profane language and try again
                </p>
            </Message>
            this.setState({cur_error_message: cur_error});
        } else {
            commitMutation(environment, {
                mutation,
                variables: {
                    name: this.state.name,
                    grad_year: this.state.grad_year,
                    school: this.state.school,
                    contact: this.state.contact,
                    skills: this.state.skills,
                    experience: this.state.experience,
                    contact_method: this.state.contact_method
                }
            });
        }
    };
};

export default EditProfile;
