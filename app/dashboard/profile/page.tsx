"use client";

import { useSelector } from 'react-redux';
import AdminProfile from './component/AdminProfile';
import UserProfile from './component/UserProfile';
import { RootState } from '@/redux/store';

/**
 * Valid user roles for the dashboard profile page
 * Using uppercase "ADMIN" | "USER" to match backend response
 */
type UserRole = "ADMIN" | "USER";

const ProfilePage: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    // Conditional rendering based on the uppercase role from backend
    return user?.role === "ADMIN" ? <AdminProfile /> : <UserProfile />;
};

export default ProfilePage;