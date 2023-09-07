import { Navbar, Nav, Container } from "react-bootstrap";
import "./App.css";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Hello</h1>
        </Container>
        <Footer />
      </main>
    </>
  );
}

export default App;
