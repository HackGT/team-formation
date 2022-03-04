import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import {
    Button,
    Message,
    Form,
    Checkbox
} from 'semantic-ui-react';
import {QueryRenderer} from 'react-relay';
import './css/EditProfile.css';
import {commitMutation} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from './Environment';
import skills from '../constants/skills';
import years from '../constants/years';
import schools from '../constants/schools';
import Filter from 'bad-words'

const mutation = graphql `
mutation EditProfileMutation($name: String, $grad_year: String, $school: String, $skills: [String], $experience: String, $contact: String, $contact_method: String, $visible: Int) {
  update_user(name: $name, grad_year: $grad_year, school: $school,  skills: $skills, experience: $experience, contact: $contact, contact_method: $contact_method, visible: $visible) {
    name
    grad_year
    school
    track
    skills
    experience
    contact
    visible
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
        track
        location
        experience
        contact_method
        slackid
        visible
    }
}
`;

class EditProfile extends Component {

    constructor() {
        super();
        this.state = {
            year: "",
            name: "",
            school: "",
            grad_year: "",
            skills: [],
            experience: "",
            public: true,
            contact_method: "",
            contact: "",
            cur_error_message: "",
            slackid: "",
            visible: 0,
            confirm_slack: false,
            "name_profane": false,
            "school_profane": false,
            "grad_year_profane": false,
            "experience_profane": false,
            "contact_profane": false,
            next: false
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
        if(this.state.next) {
            console.log("nexting")
            return <Redirect to="/feed" />
        }
        return (
            <QueryRenderer environment={environment} query={getUsersProfile} variables={{}} render={({error, props}) => {
                if (error) {
                    return <div>{error.message}</div>;
                } else if (props) {
                    props = props.user_profile;
                    if (!this.state.name && props.name) {
                        this.setState({
                            ...props
                        })
                    }
                    console.log(this.state.visible, this.state.visible == 1)
                    return (<div>
                        <Form className="form-container">
                            <Form.Group>
                                <Form.Input className="input-container-large" label='Full Name' placeholder='Full Name' defaultValue={props.name} onChange={this.onNameChange} error={this.state["name_profane"]} required="required"/>
                            </Form.Group>
                            <Form.Group className="school-and-year">
                                <Form.Select className="input-container-small" label='School' placeholder='School' defaultValue={props.school} onChange={this.onSchoolChange} error={this.state["school_profane"]}
                                options={schools}
                                required="required"/>
                                <Form.Select className="input-container-small" required="required" label='Year in School' defaultValue={props.grad_year} onChange={this.onYearChange} options={years} placeholder='Year in School'/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input className="input-container-large" label='Track' defaultValue={props.track} onChange={this.onTrackChange}>
                                    <input defaultValue={props.track} disabled/>
                                </Form.Input>
                                
                            </Form.Group>
                            <Form.Group>
                                <Form.Input className="input-container-large" label='Location' defaultValue={props.track} onChange={this.onTrackChange}>
                                    <input defaultValue={props.location} disabled/>
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Select className="input-container-large" label="Skills" placeholder='Skills' defaultValue={props.skills} onChange={this.onSkillsChange} fluid="fluid" multiple="multiple" selection="selection" search="search" options={skills}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.TextArea className="input-container-large" label='Bio' placeholder='Introduce yourself!' defaultValue={props.experience} onChange={this.onExperienceChange} error={this.state["experience_profane"]}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input className="input-container-large" label='Discord Username' placeholder='<username>#<4-digit number>'
                                defaultValue={props.contact}
                                onChange={this.onContactChange} error={this.state["contact_profane"]} required="required"/>
                            </Form.Group>
                            <Form.Group>
                                <div className="editCheckbox">
                                    <Checkbox label='Make my profile public' onChange={this.onPrivacyChange} checked={(this.state.visible === 1)}/>
                                </div>
                            </Form.Group>
                            <div className="button-container">
                                <Form.Group>
                                    <Link to="/feed">
                                        <Button className="save-button">
                                            Cancel
                                        </Button>
                                    </Link>
                                </Form.Group>
                                <Form.Group>
                                        <Button onClick={this.onNextClick} className="save-button">
                                           Save
                                       </Button>
                                </Form.Group>
                            </div>
                            <Form.Group>
                                {this.state.cur_error_message}
                            </Form.Group>
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
        this.setState({grad_year: value})
    };

    // Generic state handler, as long as values are reachable at top level
    onChange = (state) => (e, {value}) => {
        this.setState({[state]: value});
    };

    onSchoolChange = (e, { value }) => {
        this.setState({school: value});
    };

    onSkillsChange = (e, {value}) => {
        this.setState({skills: value})
    }

    onPrivacyChange = () => {
        this.setState((prevState) => ({visible: 1-prevState.visible}))
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
                    // track: this.state.track,
                    experience: this.state.experience,
                    contact_method: this.state.contact_method,
                    visible: this.state.visible
                }
            });
            this.setState({"next": true})
        }
    }
};


export default EditProfile;
