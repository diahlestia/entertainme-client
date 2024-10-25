

import React, { useState, useEffect } from 'react';
import { Button, Form, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'


function NavbarComponent() {

    

  return (
    <>
        <Navbar bg="dark" variant="dark" >
            <Container>
            <Navbar.Brand></Navbar.Brand>
            <Nav className="d-flex flex-row-reverse m-2 col-md-3">
            <Link to="/" className="px-2"
              style={{ color: "white", cursor: "pointer"}}>Home</Link>
            <Link to="/add" className="px-2"
            style={{ color: "white", cursor: "pointer"}}>Create Movie</Link>
            <Link to="/favorites" className="px-2"
            style={{ color: "white", cursor: "pointer"}}>Favorite Movies</Link>
            </Nav>
            </Container>
        </Navbar>
    </>
  );
}


export default NavbarComponent;