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
    setMyRoutines
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
    setMyRoutines
  };
};

export default useAuth;
