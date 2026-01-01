
import { role } from '../layout'
import AdminProfile from './component/AdminProfile'
import UserProfile from './component/UserProfile'

const ProfilePage = () => {
  return role === "user"? (<UserProfile/>) : (<AdminProfile/>)
}

export default ProfilePage