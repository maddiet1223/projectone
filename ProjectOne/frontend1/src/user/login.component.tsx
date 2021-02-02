import { SyntheticEvent } from "react";
import userService from "./user.service";
import { useHistory } from "react-router-dom";
import { UserState } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loginAction } from "../actions";

// Function Component
function LoginComponent() {
  const userSelector = (state: UserState) => state.loginUser;
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleFormInput(e: SyntheticEvent) {
    let u: any = { ...user };
    if ((e.target as HTMLInputElement).name === "username") {
      u.name = (e.target as HTMLInputElement).value;
    } else {
      u.password = (e.target as HTMLInputElement).value;
    }
    dispatch(loginAction(u));
  }
  function submitForm() {
    userService.login(user).then((user) => {
      dispatch(getUser(user));
      history.push("/");
    });
  }

  return (
    <div className="form">
      Username{" "}
      <input
        type="text"
        className="formlogin"
        onChange={handleFormInput}
        name="username"
      />
      <br />
      Password{" "}
      <input
        type="password"
        className="formlogin"
        onChange={handleFormInput}
        name="password"
      />
      <br />
      <button className="btn btn-dark" onClick={submitForm}>
        Login
      </button>
    </div>
  );
}

export default LoginComponent;
