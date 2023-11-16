import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import logo from "../assets/images/logo/logo.png";

import { useUser } from "../userHooks/useUser";

import Searchbar from "./Searchbar";

import { logout } from "../slices/authSlice";

import { useSelector, useDispatch } from "react-redux";
import { useLogout } from "../userHooks/useLogout";

function Header() {
  // get the cart items from the cart

  const { products: productsInBasket } = useSelector((state) => state.basket);

  // const { userInfo } = useSelector((state) => state.auth);

  const { user, isAdmin } = useUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [logoutApiCall] = useLogoutMutation();
  const { logout: logoutUser, isLoading } = useLogout();

  const logoutHandler = () => {
    logoutUser();
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                style={{ width: "60px", height: "auto" }}
                src={logo}
                alt="Art Shop"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Searchbar />
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
                  Basket
                  {productsInBasket.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {productsInBasket.reduce(
                        (acc, product) => acc + product.quantity,
                        0
                      )}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    {" "}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser />
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {user && isAdmin && (
                <NavDropdown title="admin" id="adminMenu">
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Product</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
