import React,{useState} from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import LoginForm from '../users/LoginForm';


interface Props{
    title:string,
    buttonTitle:string,
    children: React.ReactNode;

}

function ModalContainer({title,buttonTitle, children}:Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>{buttonTitle}</Button>}
    >
      <Modal.Header>
      <Header as='h2' textAlign='center'>
      {title}
    </Header></Modal.Header>
      <Modal.Content image>
        {/* <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description> */}
        {children}
      </Modal.Content>
      <Modal.Actions>
        {/* <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button> */}
        <Button
          content="Login"
          labelPosition='right'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ModalContainer;