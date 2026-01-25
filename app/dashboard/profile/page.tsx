
import AdminProfile from './component/AdminProfile';
import UserProfile from './component/UserProfile';
type UserRole = "user" | "admin";

const role: UserRole = "admin"; // or "user" depending on the user's role

const ProfilePage = () => {
  return role === "admin" ? <AdminProfile /> : <UserProfile />;
};

export default ProfilePage;