import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const navigate = useNavigate();
  const { searchTerm: searchTermURL } = useParams();
  const [searchTermFrom, setsearchTermForm] = useState(searchTermURL || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTermFrom.trim()) {
      navigate(`/search/${searchTermFrom}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Control
        type="text"
        name="query"
        onChange={(e) => setsearchTermForm(e.target.value)}
        value={searchTermFrom}
        placeholder="='Search..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2 mx-2"
      ></Button>
      Search{" "}
    </Form>
  );
};

export default Searchbar;
