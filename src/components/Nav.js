import React, { useState } from 'react';
import { Menu, Button, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUserRequest } from '../actions/authUser';

const Nav = ({ authUserRequest, authUser, getUsers }) => {
    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const handleLogout = e => {
        e.preventDefault();
        authUserRequest(null);
    };

    return (
        <div className='nav'>
            <Menu pointing secondary>
                <Menu.Item
                    name='home'
                    exact
                    as={NavLink} to="/"
                    active={activeItem === 'home'}
                    onClick={handleItemClick} />
                <Menu.Item
                    name='new poll'
                    as={NavLink} 
                    to="/add"
                    active={activeItem === 'new_poll'}
                    onClick={handleItemClick} />
                <Menu.Item
                    name='leader board' 
                    as={NavLink} 
                    to="/leaderboard"
                    active={activeItem === 'leader_board'}
                    onClick={handleItemClick} />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Image
                            className='avatar-img'
                            src={getUsers[authUser].avatarURL}
                            avatar />
                        <span>{getUsers[authUser].name}</span>
                    </Menu.Item>
                    <Menu.Item>
                        <Button
                            content="Logout"
                            basic
                            compact
                            icon="log out"
                            size="mini"
                            onClick={handleLogout}
                        />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    );
};

function mapStateToProps({ getUsers, authUser }) {
    return {
        authUser,
        getUsers
    };
}

export default connect(mapStateToProps, { authUserRequest })(Nav);