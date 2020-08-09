import React, {Component} from "react";
import {Button, Card, Popup, Container, Label} from "semantic-ui-react";
import JoinIndividual from "./ui_subcomponents/JoinIndividual";
import "./css/UserCard.css";

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }
    closeModal = () => {
        console.log("close individual");
        this.setState({showModal: false});
    };
    render() {
        let contact;
        let cur_contact = this.props.contact;
        if (this.props.contact === null) {
            contact = (<Popup trigger={<Button
                style = {{
                border: "3px solid #B36578",
                color: "#B36578",
                background: "#F3EEFA",
                fontFamily: "Lekton-Bold",
                fontSize: 13,
              }}
                content = "Reach Out"
                />} content="no contact available" on="click" hideOnScroll="hideOnScroll"/>);
        } else if (this.props.contact.includes("@")) {
            contact = (<Popup trigger={<Button
                style = {{
                border: "3px solid #B36578",
                color: "#B36578",
                background: "#F3EEFA",
                fontFamily: "Lekton-Bold",
                fontSize: 13,
              }}
                content = "Reach Out"
                />} content=<a href={`mailto:${this.props.contact}`} target="_blank">
                {this.props.contact}{" "}
            </a>
            on="click"
          hideOnScroll
        />);
        } else if (this.props.contact.includes(".")) {
            contact = (<Popup trigger={<Button
                style = {{
                border: "3px solid #B36578",
                color: "#B36578",
                background: "#F3EEFA",
                fontFamily: "Lekton-Bold",
                fontSize: 13,
              }}
                content = "Reach Out"
                />} content=<a href={this.props.contact} target="_blank">
                {this.props.contact}
            </a>
            on="click"
          hideOnScroll
        />);
        } else {
            contact = (<Popup trigger={<Button
                style = {{
                border: "3px solid #B36578",
                color: "#B36578",
                background: "#F3EEFA",
                fontFamily: "Lekton-Bold",
                fontSize: 13,
              }}
                content = "Reach Out"
                />} content={this.props.contact} on="click" hideOnScroll="hideOnScroll"/>);
        }
        var colors = ["#F1B5BC", "#B36578"];
        var count = 0;
        var viewskill = this.props.skills.map((skill) => (<Label size="mini" style={{
                color: "white",
                backgroundColor: colors[count++ % 2],
                fontFamily: "Lekton-Bold",
                boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px"
            }}>
            {skill}
        </Label>));
        return (<Card className="card1" style={{
                backgroundColor: "#F3EEFA",
                border: "2px solid #867a96",
                borderRadius: 0,
                boxShadow: "-20px 20px 0px -8px rgba(0, 0, 0, 0.20)"
            }}>
            <div className="rectangle1"/>
            <Card.Content className="content">
                <Card.Header style={{
                        fontFamily: "Lekton-Bold",
                        textAlign: "center",
                        paddingTop: 10
                    }}>
                    {this.props.name}
                </Card.Header>
                <Card.Meta style={{
                        fontFamily: "Lekton-Bold",
                        color: "#85808A",
                        paddingTop: 20,
                        paddingLeft: 15
                    }}>
                    {this.props.school}
                </Card.Meta>
                <Card.Meta style={{
                        fontFamily: "Lekton-Bold",
                        color: "#85808A",
                        paddingLeft: 15
                    }}>
                    Graduation Year: {this.props.grad_year}
                </Card.Meta>
                <div className="ui divider" style={{
                        border: "1px solid #BAAFC9",
                        marginTop: 5
                    }}/>
                <Card.Description className="card-description">
                    {viewskill}
                </Card.Description>
                <Card.Description className="card-description">
                    <Container style={{
                            overflow: "auto",
                            maxHeight: 100,
                            fontFamily: "Lekton-Bold",
                            color: "#85808A",
                            paddingLeft: 15,
                            paddingTop: 10,
                            paddingBottom: 5
                        }}>
                        About Them: {this.props.experience}
                    </Container>
                </Card.Description>
                <div className="ui divider" style={{
                        border: "1px solid #BAAFC9",
                        marginTop: 5
                    }}/>
                <Card.Description>
                    <div className="contact-button">
                        {contact}
                        <Button style={{
                                border: "3px solid #7C9D9B",
                                color: "#7C9D9B",
                                background: "#F3EEFA",
                                fontFamily: "Lekton-Bold",
                                fontSize: 13
                            }} content="Team Up" onClick={() => this.setState({showModal: true})}/>
                        <JoinIndividual {...this.props} showModal={this.state.showModal} closeModal={this.closeModal}/>
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>);
    }
}

export default UserCard;
