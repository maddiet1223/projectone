import React, { SyntheticEvent, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReimbursementState, UserState } from "../reducer";
import {
  changeReimbursement,
  getReimbersementsByProofSubmit,
} from "../actions";

import reimbursementService from "./reimbursement.service";
import { Reimbursement } from "./reimbursement";

interface ReimbursementProps {
  match: any;
}

function EmployeeProofComponent(props: ReimbursementProps) {
  const reimbursementSelector = (state: ReimbursementState) =>
    state.reimbursementbyproofsubmit;
  const reimbS = useSelector(reimbursementSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    console.log(props);
    console.log(props.match.params.id);
    reimbursementService.getReimbursementsByProofSubmit().then((reimbS) => {
      console.log(reimbS);
      dispatch(getReimbersementsByProofSubmit(reimbS));
    });
  }, [dispatch, props, props.match.params.id]);

  function proofForm(e: SyntheticEvent) {
    const rejselect = (e.target as HTMLInputElement).value;
    console.log("this is the one from rejection form" + rejselect);

    reimbursementService.updateProofSubmission(rejselect).then(() => {
      dispatch(changeReimbursement(new Reimbursement()));
      console.log("Updating supervisor rejection!");
      // call the callback function from the parent component so that it will re-render
      history.push("/sup/pending");
    });
  }

  if (reimbS.length > 0) {
    return (
      <div className="table-responsive-sm">
        <table className="table table-sm">
          <thead className="thead-dark">
          <tr>
            <th className="name">Name</th>
            <th className="courseName">CourseName</th>
            <th className="gradingformat">Grading Format</th>
            <th className="cost">Cost</th>
            <th className="reimburseamt">Reimbursement Amount</th>
            <th className="empstatus">Employee Status</th>
            <th className="bencostatus">BenCo Status</th>
            <th className="justification">Justification</th>
            <th className="resultafterevent">Result after event</th>
            <th className="decision">Decision</th>
          </tr>
          </thead>
          {reimbS.map((item) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.courseName}</td>
                <td>{item.gradingformat}</td>
                <td>{item.cost}</td>
                <td>{item.reimburseamt}</td>
                <td>{item.empstatus}</td>
                <td>{item.bencostatus}</td>
                <td>{item.justification}</td>
                <td>{item.resultafterevent}</td>
                <td>
                  <button
                    className="btn btn-success"
                    value={`${item.name},${item.courseName}`}
                    onClick={proofForm}
                  >
                    Submit Proof
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  } else {
    return (
      <p className="messagetoemp">
        {" "}
         NO REIMBURSEMENTS THAT NEED YOU TO SUBMIT ANY PROOF AT THIS MOMENT!
      </p>
    );
  }
}
export default withRouter(EmployeeProofComponent);
