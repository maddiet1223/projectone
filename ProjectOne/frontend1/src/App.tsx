import React, { useState, useEffect } from "react";
import "./App.css";
import RouterComponent from "../../frontend1/src/routing.component";
import userService from "../../frontend1/src/user/user.service";
import { useDispatch } from "react-redux";
import { getUser } from "../../frontend1/src/actions";

function App() {
  /* useState: A hook that can create a variable and a 
      setter to add to the state of the application and modify
      that state to trigger a render.*/
  const [cond, setCond] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    userService.getLogin().then((user) => {
      console.log(user);
      dispatch(getUser(user));
    });
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <RouterComponent></RouterComponent>
    </div>
  );
}

export default App;
