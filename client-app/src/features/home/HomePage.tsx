import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react'
import { UserContext } from '../../UserContext'
import ModalContainer from '../elements/ModalContainer'
import LoginForm from '../users/LoginForm'

const HomePage=()=>{
  const [open, setOpen] = React.useState(false)
  const  {token} = useContext(UserContext); 
  let isLoggedIn = !!token;

  return (
  <Segment inverted textAlign="center" vertical className="masthead">
<Container text>
    <Header as="h1" inverted>
      <Image size="massive" src="/images/logo.png" alt="logo" style={{marginBottom: 12}}/>
    </Header>
    {
      token ?     
      <>
      <Header as="h2" inverted content="Welcome to Reactivities"/> 
      <Button as={Link} to="/activities" size="huge" inverted content="Go to Activities"/>
      </>:
    //   <Button as={Link} to="/login" size="huge" inverted>
    //   Login
    // </Button>
      <ModalContainer title="Login to Reactivities" buttonTitle='Login'>
        <LoginForm/>
      </ModalContainer>

    }
</Container>
</Segment>
 
  )
}

export default HomePage