import AuthContext from "../AuthContext";
import { useState, useEffect } from "react";
import { getMe, getPublicRoutines, getAllActivities, getMyRoutines } from "../api";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);

  // sets token
  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
      // console.log("fetched token", localStorageToken)
    }
  }, [token]);

  // sets user
  useEffect(() => {
    const getMyUserFunction = async () => {
      if (token) {
        const result = await getMe(token);
        setUser({
          id: result.id,
          username: result.username,
        });
        // console.log("fetched user", result)
      }
    };
    getMyUserFunction();
  }, [token]);

  // displays public Routines
  useEffect(() => {
    const displayRoutines = async () => {
      const data = await getPublicRoutines();
      setRoutines(data);
      console.log("fetched routines", data)
    };
    displayRoutines();
  }, []);

  // displays all Activities
  useEffect(() => {
    const displayActivities = async () => {
      const data = await getAllActivities();
      setActivities(data);
    };
    displayActivities();
  }, []);

  // displays MyRoutines
  useEffect(() => {
    // check for a username before making an ajax call (avoids unnecessary call)
    if (user.username) {
      const displayMyRoutines = async () => {
        const data = await getMyRoutines(user.username, token);
        setMyRoutines(data);
      };
      displayMyRoutines();
    }
  }, [user, token]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, routines, setRoutines, activities, setActivities, myRoutines, setMyRoutines }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
