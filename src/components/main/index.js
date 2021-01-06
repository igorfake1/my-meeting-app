import React, { useState, useEffect, } from 'react';
import { Button, Form, Container, Card, Alert } from 'react-bootstrap';
import NavbarComponent from '../navbar'
import api from '../../services/api.js';
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import pt_br from 'date-fns/locale/pt-BR';
registerLocale('pt_br', pt_br);

export default function Main() {
  const [startMeeting, setStartMeeting] = useState();
  const [endMeeting, setEndMeeting] = useState();
  const [rooms, setRooms] = useState([]);
  const [roomSelected, setRoomSelected] = useState();

  const [titleMeeting, setTitleMeeting] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function pullRooms() {
      await api.get('v1/rooms').then((response) => {
        setRooms(response.data);
      })
    }
    pullRooms();
  }, []);

  function closeAndRefresh() {
    setShow(!show)
    // window.location.reload()
  }
  async function handleSubmitMeeting(e) {
    e.preventDefault()
    const now = new Date();
    if (startMeeting >= endMeeting) {
      alert('O horário de início do seu agendamento deve ser maior que o de término!')
    }
    else if (startMeeting < now) {
      alert('Seu horário de inicio é inferior a hora ou dia atual!');
    } else {
      await api.post('v1/meeting', JSON.stringify({
        title: titleMeeting,
        start: startMeeting,
        end: endMeeting,
        roomId: parseInt(roomSelected)
      })).then(function (response) {
        setShow(true)
        console.log(response);
      }).catch(function (error) {
        alert("O horário escolhido já foi agendado para esta sala")
        console.log(error);
      });
    }
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
        <Card className="p-3 m-2 col-xs-12 col-12">
          <Form onSubmit={handleSubmitMeeting} className="col-md-12">
            <Form.Group>
              <Form.Label>Motivo da reunião</Form.Label>
              <Form.Control required type="text" onChange={e => setTitleMeeting(e.target.value)} />
              <Form.Label>Qual sala?</Form.Label>
              <Form.Control required as="select" name="roomSelected" onChange={e => setRoomSelected(e.target.value)} >
                <option>Escolha a sala</option>
                {rooms.map((room) => (
                  <option className="text-dark" key={room.id} value={room.id}>
                    {room.nameRoom}
                  </option>
                ))}
              </Form.Control>
              <Form.Label>Data inicio</Form.Label>
              <Form.Group>
                <DatePicker
                  selected={startMeeting}
                  onChange={(date) => setStartMeeting(date)}
                  locale="pt_br"
                  name="startMeetingDP"
                  autoComplete="off"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="time"
                  dateFormat="dd/MM/yyyy 'às' HH:mm"
                />
              </Form.Group>
              <Form.Label>Data término</Form.Label>
              <Form.Group>
                <DatePicker
                  selected={endMeeting}
                  onChange={(date) => setEndMeeting(date)}
                  locale="pt_br"
                  name="endMeetingDP"
                  autoComplete="off"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="time"
                  dateFormat="dd/MM/yyyy 'às' HH:mm"
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button type="submit" className="btn-success" disabled={show}>agendar</Button>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>
  )
}
