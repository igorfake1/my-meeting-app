import React, { useState } from 'react';
import api from '../../services/api.js';
import NavbarComponent from '../navbar';
import { useHistory } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

export default function RegistrationRooms() {
  const [titleRoom, setTitleRoom] = useState()
  const [show, setShow] = useState(false);
  const history = useHistory();

  function closeAndRefresh() {
    setShow(!show)
    window.location.reload()
  }

  async function handleSubmitMeeting(e) {
    e.preventDefault()
    await api.post('v1/rooms', JSON.stringify({
      nameRoom: titleRoom,
    })).then(setShow(true));
  }

  return (
    <>
      <NavbarComponent />
      <Container className="row container-fluid justify-content-center m-auto">
        <Alert show={show} variant="success" className="col-xs-12 col-md-12">
          <Alert.Heading>Agendamento concluído com sucesso</Alert.Heading>
          <div className="d-flex justify-content-end">
            <Button className="btn-success" onClick={closeAndRefresh}>Fechar</Button>
          </div>
        </Alert>
        <h2>Cadastro de salas</h2>
        <Card className="col-md-12 col-xs-12 p-3">
          <Form onSubmit={handleSubmitMeeting}>
            <Form.Group>
              <Form.Label>Nome da sala</Form.Label>
              <Form.Control required type="text" onChange={e => setTitleRoom(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button type="submit" className="btn-success" disabled={show}>cadastrar</Button>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>
  )
}
