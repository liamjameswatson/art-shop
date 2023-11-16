import ProfileForm from "../ui/ProfileForm";
import { Button } from "react-bootstrap";
import { useDeleteCurrentUser } from "../userHooks/useDeleteCurrentUser";
import { useLogout } from "../userHooks/useLogout";
import OrderTable from "../ui/OrderTable";

function ProfilePage() {
  const { deleteCurrentUser, isDeleting } = useDeleteCurrentUser();
  const { logout, isLoading } = useLogout();

  const handleDelete = () => {
    deleteCurrentUser();
    setTimeout(() => logout(), 3000);
  };
  return (
    <>
      <ProfileForm />
      <Button onClick={handleDelete}>Delete Account</Button>
      <OrderTable></OrderTable>
    </>
  );
}

export default ProfilePage;
