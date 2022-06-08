import React, {Component} from 'react';
import '../css/Headers.css';
import {Menu} from 'semantic-ui-react';
import { Box, Heading, Button } from '@chakra-ui/react'
class Headers extends Component {
    render() {
        return (
            <Box>
                <Box>
                    <Menu>
                    <Menu.Item>
                        <Button href={'/api/user/logout'}>
                            Logout
                        </Button>
                    </Menu.Item>
                </Menu>
                </Box>
                <Box pt="5%">
                    <Heading size="4xl">HackGT</Heading>
                    <Heading size="3xl">Team Formation</Heading>
                </Box>
            </Box>
        );
    };
};

export default Headers;
