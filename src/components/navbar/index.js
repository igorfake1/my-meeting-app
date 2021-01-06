import React from 'react';
import { Navbar, Form, Button, Nav } from 'react-bootstrap';

export default function NavbarComponent() {
  return (
    <>
      <Navbar className="bg-success mb-4" expand="lg">
        <Navbar.Brand href="/">MyMeeting</Navbar.Brand>
        <Nav className="mr-auto inline ">
          <Nav.Link className="nav-link-text" href="/">Agendar</Nav.Link>
          <Nav.Link className="nav-link-text" href="/cadastrar">Salas</Nav.Link>
          <Nav.Link className="nav-link-text" href="/agenda">Agenda</Nav.Link>
        </Nav>

      </Navbar>
    </>
  )
}
