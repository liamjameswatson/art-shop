import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../ui/Message";
import Spinner from "../../ui/Spinner";
import { toast } from "react-toastify";
import { useAllUsers } from "../../userHooks/useAllUsers";
import { useDeleteUser } from "../../userHooks/useDeleteUser";

// import {
//   useGetUsersQuery,
//   useDeleteUserMutation,
// } from "../../slices/usersApiSlice";

const UserListPage = () => {
  // const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  // console.log("users", users.data.users);

  const { isDeleting, deleteUser } = useDeleteUser();

  // const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const { data: users, isLoading, error } = useAllUsers();
  console.log("users ======= ", users);

  const handleDelete = async (id) => {
    console.log("idtodelete ===== ", id);
    if (window.confirm("Are you sure you want to delete?")) {
      deleteUser(id);
    }
  };
  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.data.users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>

                <td>
                  {user.role === "admin" ? (
                    <FaCheck color="green" />
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="primary" className="='btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="='btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListPage;
