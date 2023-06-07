import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface Props{
    openForm:()=>void
}

function Navbar({openForm}:Props) {
  return (
   <Menu inverted fixed="top">
    <Container>
        <Menu.Item header>
            Reactivities
        </Menu.Item>
        <Menu.Item>
            Activities
        </Menu.Item>
        <Menu.Item>
            <Button positive content="Create Activity" onClick={openForm}/>
        </Menu.Item>
    </Container>
   </Menu>
  )
}

export default Navbar