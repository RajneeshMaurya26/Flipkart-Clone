import {  Modal,Button } from 'react-bootstrap';
import React from 'react'

const NewModel = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{props.ModelTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     {props.children}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={props.handleSubmit}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default NewModel
