import React from "react";
import "../css/Headers.css";
import "../css/Modal.css";
import { Menu, Dropdown, Icon, Popup, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../Environment";
import { QueryRenderer } from "react-relay";
import NotificationGroup from "../NotificationGroup";
import { filterExtensionDefinitions } from "@graphql-tools/schema";
import truncateTeamName from "../../constants/functions";
import { Box, Text, Flex, useMediaQuery } from '@chakra-ui/react';

function Headers(props) {
  const mutation = graphql`
    mutation HeaderFeedMutation {
      toggle_visibility {
        name
      }
    }
  `;
  const getName = graphql`
    query HeaderFeedNameQuery {
      user_profile {
        name
        team {
          id
          name
        }
      }
    }
  `;

      let toggle_text;
      if (props.visible) {
        toggle_text = "Make Profile Public";
      } else {
        toggle_text = "Make Profile Private";
      }
      return (
        <QueryRenderer
          environment={environment}
          query={getName}
          variables={{
            uuid: props.user_id,
          }}
          render={({ error, props }) => {
            if (error) {
              return <div>{error.message}</div>;
            } else if (props) {
              var teamIcon;
              if (props.user_profile.team == null) {
                teamIcon =
                  <Popup
                    hoverable={false}
                    trigger={<Icon name='group' size='large' inverted link={true}/>}
                    content='You are not on a team'
                    position='bottom center'
                  />;
              } else {
                let link = "/team/" + props.user_profile.team.id;
                teamIcon =
                  <Popup
                    trigger={
                      <Link to={link}>
                        <Icon
                          name='group'
                          link={true}
                          size='large'
                          inverted
                        />
                      </Link>
                    }
                    content='Team Profile'
                    position='bottom center'
                  >
                  </Popup>
              }
              return (
                <Box>
                  <Menu secondary borderless="borderless" size={"massive"}>
                    <Menu.Menu position="right">
                      <Menu.Item>
                        <Flex className="header-name"
                          sx={{
                            fontFamily: "Quicksand-Bold",
                            fontSize: "20px",
                            color: "white",
                            pr: "10px",
                            justifyContent: "center",
                            alignContent: "center"
                          }}
                        >
                          {(props.user_profile.team) ? `${props.user_profile.name} (${truncateTeamName(props.user_profile.team.name)})` : props.user_profile.name}
                        </Flex>
                      </Menu.Item>
                      <Menu.Item
                        style={{
                          size: "large",
                          color: "white",
                        }}
                      >
                        <Popup
                          trigger={
                            <Dropdown
                              item="item"
                              icon='bell'
                              style={{
                                size: "large",
                                color: "white",
                                margin: 0,
                                padding: 0,
                                backgroundColor: "transparent",
                              }}
                              direction="left"
                              closeOnChange={false}
                            >
                              <Dropdown.Menu stackable className="notification-pane">
                                <NotificationGroup user={props.user_id} />
                              </Dropdown.Menu>
                            </Dropdown>}
                            content='Notifications'
                            position='bottom center'
                        />
                      </Menu.Item>
                      <Menu.Item
                        style={{
                          size: "large",
                          color: "white",
                          backgroundColor: "transparent",
                        }}
                        link={true}
                        href={"/edit-profile"}
                      >
                        <Popup
                          trigger={<Icon name='user' inverted link={true}/>}
                          content='User Profile'
                          position='bottom center'
                        />
                      </Menu.Item>
                      <Menu.Item
                        style={{
                          size: "large",
                          color: "white",
                        }}
                      >
                        {teamIcon}
                      </Menu.Item>
                      <Menu.Item
                        style={{
                          size: "large",
                          color: "white",
                          backgroundColor: "transparent",
                        }}
                        link={true}
                        href={"/api/user/logout"}
                      >
                        <Popup
                          trigger={<Icon name='sign out' inverted link={true}/>}
                          content='Sign Out'
                          position='bottom center'
                        />
                      </Menu.Item>
                    </Menu.Menu>
                  </Menu>
                  <Box className="desktopTitles">                  
                    <Link to="/feed">
                      <Text sx={{color: "#F9F0D7", fontFamily: "Service-Station", fontSize: "48px", ml: "35px", mb: "6px"}}>
                        HackGT8
                      </Text>
                      <Box sx={{display: "inline", fontFamily: "Futura, futura-pt, Trebuchet MS, sans-serif", fontSize: "32px", color: "white", ml: "35px"}}>
                        Team Formation
                      </Box>
                    </Link>
                  </Box>
                  <Box className="mobileTitles">
                    <Link to="/feed">
                      <Box className="innerMobileTitles" sx={{flexDirection: "column", textAlign: "center"}}>
                        <Text sx={{color: "#F9F0D7", fontFamily: "Service-Station", fontSize: "48px", ml: "35px", mb: "6px"}}>
                          HackGT8
                        </Text>
                        <Box sx={{display: "inline", fontFamily: "Futura, futura-pt, Trebuchet MS, sans-serif", fontSize: "32px", color: "white", ml: "35px"}}>
                          Team Formation
                        </Box>
                      </Box>
                    </Link>
                  </Box>
                </Box>
              );
            }
          }}
        />
      );
}
export default Headers;
