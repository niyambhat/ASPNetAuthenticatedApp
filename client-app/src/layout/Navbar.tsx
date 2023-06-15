import React, { useContext } from 'react'
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../UserContext'
interface Props{
    openForm:()=>void
}

function Navbar() {
const {token, user, logout } = useContext(UserContext);
if(user){
    console.log(user);
}
console.log(user);
  return (
   <Menu inverted fixed="top">
    <Container>
        <Menu.Item header>
            <NavLink to="/home">Reactivities</NavLink>
        </Menu.Item>
        <Menu.Item>
        <NavLink to="/activities">Activities</NavLink>
        </Menu.Item>
        <Menu.Item>
            <Button positive content="Create Activity" as={NavLink} to="/createActivity"/>
        </Menu.Item>
        <Menu.Item position='right'>
            <Image src={user?.image || '/images/user.png'} avatar spaced="right"/>
            <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
               <Dropdown.Item as={Link} to={`/profile`} text="My Profile" icon="user"/> 
                <Dropdown.Item onClick={()=>logout()} text="Logout" icon="user"/> 
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    </Container>
   </Menu>
  )
}

export default Navbar