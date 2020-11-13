import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavBar = () => {
    return ( <Menu>
        <Link to = '/'>Home</Link>
        <Link to = '/StudentsArea'>Students</Link>
        <Link to = '/Classes'>Classes</Link>
        <Link to = '/Checkin'>Check In</Link>
        <Link to = '/About'>About / Contact</Link>
    </Menu> );
}
 
export default NavBar;

export const Menu = styled.ul`
    display: flex;
    justify-content: space-around;
    width: 100%;
    list-style: none;
    border-bottom: 2px crimson solid;
`