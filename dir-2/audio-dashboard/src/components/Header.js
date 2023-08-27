import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

// Component rendering the heading
function Heading() {
  return (
    <Container>
      {/* Top navigation bar */}
      <Navbar expand="lg" className="bg-body-tertiary" style={{margin: "25px 50px 50px 50px",color: "LightGray"}}>
        <Container>
          {/* Heading within the navigation bar */}
          <Navbar.Brand href="#"><b>Audio Dashboard</b></Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Heading;