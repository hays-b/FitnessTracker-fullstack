import { useContext } from "react";
import AuthContext from "../AuthContext";

const useAuth = () => {
  const {
    user,
    setUser,
    token,
    setToken,
    routines,
    setRoutines,
    activities,
    setActivities,
    myRoutines,
    setMyRoutines,
    users,
    setUsers,
    filterRoutines,
    setFilterRoutines,
    searchQuery,
    setSearchQuery,
  } = useContext(AuthContext);

  return {
    user,
    setUser,
    token,
    setToken,
    routines,
    setRoutines,
    activities,
    setActivities,
    myRoutines,
    setMyRoutines,
    users,
    setUsers,
    filterRoutines,
    setFilterRoutines,
    searchQuery,
    setSearchQuery,
  };
};

export default useAuth;
