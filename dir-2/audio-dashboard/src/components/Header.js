import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Heading() {
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary" style={{margin: "25px 50px 50px 50px",color: "LightGray"}}>
        <Container>
          <Navbar.Brand href="#"><b>Audio Dashboard</b></Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Heading;