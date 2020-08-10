import React, {Component} from 'react';
import {Button, Card, Popup, Container, Label} from 'semantic-ui-react';
import JoinTeam from './ui_subcomponents/JoinTeam';
import './css/TeamCard.css';

class TeamCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
    }
    closeModal = () => {
        console.log("close individual")
        this.setState({showModal: false});
    };
    render() {
        // let contact;
        // contact = <Popup
        // trigger={<Button basic={true} color='blue' content='Join Team!' />}
        // content="Team has been joined!"
        // on='click'
        // hideOnScroll
        // />
        var colors = ['violet', 'yellow', 'orange']
        var count = 0;
        var skill;
        var viewskill;
        return (<Card className="card1" basic={false}
        style={{
          boxShadow: "-20px 20px 0px -8px rgba(0, 0, 0, 0.20)",
          borderRadius: 15,
          paddingBottom: 30,
        }}
        centered='true'>
            <Card.Content className="content">
                <Card.Header>
                    <Container style={{
                      color: "rgb(136, 149, 193)",
                      fontFamily: "Quicksand-Bold",
                      fontSize: 20,
                      textAlign: "center",
                      overflowY: "hidden",
                    }}>{this.props.name}</Container>
                </Card.Header>
                {/* <Card.Meta>ID: {this.props.id}</Card.Meta> */}
                <div className="ui divider"
                    style={{
                      border: "1px solid #C3BBCD",
                    }}
                    ></div>
                <Card.Description className="card-description">
                    <Container style={{
                      overflow: "auto",
                      maxHeight: 42,
                      color: "#867A96",
                      paddingLeft: 15,
                      fontFamily: "Quicksand-Bold",
                    }}>
                        <strong>Seeking:
                        </strong>{this.props.interests}</Container>
                </Card.Description>
                <Card.Description>
                    <Container style={{
                      overflow: "auto",
                      maxHeight: 42,
                      color: "#867A96",
                      paddingLeft: 15,
                      fontFamily: "Quicksand-Bold",
                    }}>
                        <strong>Bio:
                        </strong>{this.props.description}</Container>
                </Card.Description>
                <div
                  className="ui divider"
                  style={{
                    border: "1px solid #C3BBCD",
                  }}
                />
            </Card.Content>
            <Card.Content color='blue' extra="extra">
                <div className='contact-button'>
                    <Button
                        style={{
                          color: "white",
                          background: "#CCBEDF",
                          boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px",
                          marginLeft: 5,
                          fontFamily: "Quicksand-Bold",
                        }}
                         content='Join Team' onClick={() => this.setState({showModal: true})}/>
                    <JoinTeam {...this.props} showModal={this.state.showModal} closeModal={this.closeModal}/>
                </div>
            </Card.Content>
        </Card>);
    };
};

export default TeamCard;
