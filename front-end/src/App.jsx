import { Navbar, Nav, Container } from "react-bootstrap";
import "./App.css";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomePage />
        </Container>
        <Footer />
      </main>
    </>
  );
}

export default App;
