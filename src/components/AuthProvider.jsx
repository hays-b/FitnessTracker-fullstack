import AuthContext from "../AuthContext";
import { useState, useEffect } from "react";
import { getMe, getPublicRoutines, getAllActivities, getMyRoutines, getAllUsers } from "../api";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterRoutines, setFilterRoutines] = useState([]);
  const [filterActivities, setFilterActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // sets token
  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
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
      }
    };
    getMyUserFunction();
  }, [token]);

  // displays public Routines
  useEffect(() => {
    const displayRoutines = async () => {
      const data = await getPublicRoutines();
      setRoutines(data);
    };
    displayRoutines();
  }, []);

  //gets all users
  useEffect(() => {
    const displayUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    displayUsers();
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

  // search bar
  useEffect(() => {
    setFilterRoutines(routines);
    setFilterActivities(activities);

    // lowercase the query
    const search = searchQuery.toLowerCase();
    // lowercase function
    function tLC(objProp) {
      return objProp.toLowerCase();
    }

    if (routines.length) {
      const searchFilter = [];
      routines.forEach((routine) => {
        if (
          tLC(routine.name).includes(search) ||
            tLC(routine.goal).includes(search) ||
            tLC(routine.creatorName).includes(search)
        ) {
          searchFilter.push(routine);
        }
      });
      setFilterRoutines(searchFilter);
    }

    if (activities.length) {
      const searchFilter = [];
      activities.forEach((activity) => {
        if (
          tLC(activity.name).includes(search) ||
            tLC(activity.description).includes(search)
        ) {
          searchFilter.push(activity);
        }
      });
      setFilterActivities(searchFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routines, activities, searchQuery]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, routines, setRoutines, activities, setActivities, myRoutines, setMyRoutines, users, setUsers, filterRoutines, setFilterRoutines, filterActivities, setFilterActivities, searchQuery, setSearchQuery }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
