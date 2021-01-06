import React, { useEffect, useState } from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css"
import api from '../../services/api.js';
import NavbarComponent from '../navbar'
import { Container } from 'react-bootstrap';

export default function SchedulersList() {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function getRooms() {
      await api.get('v1/rooms').then((response) => {
        setRooms(response.data);
        console.log(response.data)
      })
    }
    getRooms();
  }, [])

  return (
    <>
      <NavbarComponent />
      <Container>
        {
          rooms.map((rooms, idx) => (
            <div className="text-dark" key={idx}>
              <h4>{rooms.nameRoom}</h4>
              <ul>
                {rooms.meetings.map((sub, subindex) =>
                  <li key={subindex}>
                    <p className="font-weight-bold">{sub.title}</p>
                    <p>`{new Date(sub.start).toString()}</p>
                    <p>{new Date(sub.end).toString()}</p>
                  </li>)}
              </ul>
            </div>
          ))
        }
      </Container>
    </>
  )
}
