import React from "react";
import {
  Route,
  BrowserRouter,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import AddReimbursementComponent from "./reimbursement/add-reimbursement.component";
import SupervisorApprovalComponent from "./reimbursement/supervisor-approval.component";
import HodApprovalComponent from "./reimbursement/hod-approval.component";
import BenCoApprovalComponent from "./reimbursement/benco-approval.component";
import BenCoFinalApprovalComponent from "./reimbursement/bencofinal-approval.component";
import LoginComponent from "./user/login.component";
import userService from "./user/user.service";
import ReimbursementComponent from "./reimbursement/reimbursement.component";
import ReimbursementsByNameComponent from "./reimbursement/reimbursementbyname.component";
import EmployeeProofComponent from "./reimbursement/employee-proof.component";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions";
import { ReimbursementState, UserState } from "./reducer";
import { User } from "./user/user";

export default function RouterComponent() {
  const reimbursementSelector = (state: ReimbursementState) =>
    state.reimbursement;
  const reimbursement = useSelector(reimbursementSelector);
  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedUser = user.name;
  function logout() {
    userService.logout().then(() => {
      dispatch(getUser(new User()));
    });
  }

  return (
    <BrowserRouter>
      <div>
        <header>
          <h1>WELCOME</h1>
          <p className="hero">TUITION REIMBURSEMENT MANAGEMENT SYSTEM</p>
          <nav id="nav">
            <ul>
              {user.role === "Employee" && (
                <li>
                  <Link to="/reimbursement">Apply here</Link>
                </li>
              )}

              {user.role === "Employee" && (
                <li>
                  <Link to={`/reimbursements/${loggedUser}`}>
                    My Reimbursements
                  </Link>
                </li>
              )}
              {user.role === "Employee" && (
                <li>
                  <Link to={`/reimbursements/emp/proof`}>
                    Submit Proof for final Approval
                  </Link>
                </li>
              )}
              {user.role === "Supervisor" && (
                <li>
                  <Link to="/reimbursements/sup/pending">
                    View Reimbursements For Approval
                  </Link>
                </li>
              )}

              {user.role === "HOD" && (
                <li>
                  <Link to="/reimbursements/hod/pending">
                    View Reimbursements For Approval
                  </Link>
                </li>
              )}

              {user.role === "BenCo" && (
                <li>
                  <Link to="/reimbursements/benco/pending">
                    View Reimbursements For Approval
                  </Link>
                </li>
              )}
              {user.role === "BenCo" && (
                <li>
                  <Link to="/reimbursements/bencofinal/pending">
                    View Reimbursements For Final Approval
                  </Link>
                </li>
              )}

              {user.name ? (
                <li>
                  <p className="name">Hello {loggedUser}</p>
                </li>
              ) : (
                <li>
                  <Redirect to="/"></Redirect>
                </li>
              )}

              {user.name ? (
                <li>
                  <p className="name">Designation: {user.role}</p>
                </li>
              ) : (
                <li>
                  <Redirect to="/"></Redirect>
                </li>
              )}
              <li>
                {user.name ? (
                  <button className="btn btn-secondary" onClick={logout}>
                    Logout
                  </button>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </nav>

          <div id="reimbForm"></div>
        </header>

        <Route
          path="/reimbursement"
          render={() =>
            user.role !== "Employee" ? (
              <Redirect to="/login" />
            ) : (
              <AddReimbursementComponent />
            )
          }
        />

        <Route
          exact
          path="/reimbursements/:id"
          component={ReimbursementsByNameComponent}
        />

        <Route
          exact
          path="/reimbursements"
          component={ReimbursementComponent}
        />
        <Route path="/login" component={LoginComponent} />

        <Route
          exact
          path="/reimbursements/sup/pending"
          render={() =>
            user.role !== "Supervisor" ? (
              <Redirect to="/" />
            ) : (
              <SupervisorApprovalComponent />
            )
          }
        />
        <Route
          exact
          path="/reimbursements/hod/pending"
          render={() =>
            user.role !== "HOD" ? <Redirect to="/" /> : <HodApprovalComponent />
          }
        />

        <Route
          exact
          path="/reimbursements/benco/pending"
          render={() =>
            user.role !== "BenCo" ? (
              <Redirect to="/" />
            ) : (
              <BenCoApprovalComponent />
            )
          }
        />

        <Route
          exact
          path="/reimbursements/bencofinal/pending"
          render={() =>
            user.role !== "BenCo" ? (
              <Redirect to="/" />
            ) : (
              <BenCoFinalApprovalComponent />
            )
          }
        />

        <Route
          exact
          path="/reimbursements/emp/proof"
          render={() =>
            user.role !== "Employee" ? (
              <Redirect to="/" />
            ) : (
              <EmployeeProofComponent />
            )
          }
        />
      </div>
    </BrowserRouter>
  );
}
