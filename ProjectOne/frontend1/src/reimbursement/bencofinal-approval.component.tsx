import { SyntheticEvent, useEffect } from "react";
import reimbursementService from "./reimbursement.service";
import { withRouter, useHistory } from "react-router-dom";
import { ReimbursementState } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  changeReimbursement,
  getReimbersementsForBencoFinalApproval,
} from "../actions";
import { Reimbursement } from "./reimbursement";

interface ReimbursementProps {
  match: any;
}

// Function Component
function BenCoFinalApprovalComponent(props: ReimbursementProps) {
  const reimbursementSelector = (state: ReimbursementState) =>
    state.reimbursementbybencofinal;
  const reimbS = useSelector(reimbursementSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    console.log(props);
    console.log(props.match.params.id);
    reimbursementService
      .getReimbursementsForBencoFinalApproval()
      .then((reimbS) => {
        console.log(reimbS);
        dispatch(getReimbersementsForBencoFinalApproval(reimbS));
      });
  }, [dispatch, props, props.match.params.id]);

  function approvalForm(e: SyntheticEvent) {
    const rejselect = (e.target as HTMLInputElement).value;
    console.log("this is the one from rejection form" + rejselect);
    reimbursementService.updateBencoFinalApproval(rejselect).then(() => {
      dispatch(changeReimbursement(new Reimbursement()));
      console.log("Updating supervisor Approval!");
      // call the callback function from the parent component so that it will re-render
      history.push("/bencofinal/pending");
    });
  }

  function rejectionForm(e: SyntheticEvent) {
    const rejselect = (e.target as HTMLInputElement).value;
    console.log("this is the one from rejection form" + rejselect);

    reimbursementService.updateBencoFinalRejection(rejselect).then(() => {
      dispatch(changeReimbursement(new Reimbursement()));
      console.log("Updating supervisor rejection!");
      // call the callback function from the parent component so that it will re-render
      history.push("/bencofinal/pending");
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
              <th className="cost">Cost</th>
              <th className="subdate">Submitted Date</th>
              <th className="eventdate">Event Date</th>
              <th className="description">Description</th>
              <th className="gradingformat">Grading Format</th>
              <th className="reimburseamt">Reimbursement Amount</th>
              <th className="empstatus">Employee Status</th>
              <th className="bencostatus">BenCo Status</th>
              <th className="resultafterevent">Result after the Event</th>
              <th className="balancereimbamt">Balance Reibursement Amount</th>
              <th className="action"> Approve </th>
              <th className="action"> Reject </th>
            </tr>
          </thead>
          {reimbS.map((item) => {
            return (
              <tr>
                <td>{item.name} </td>
                <td>{item.courseName}</td>
                <td>{item.cost}</td>
                <td>{item.subdate}</td>
                <td>{item.eventdate}</td>
                <td>{item.description}</td>
                <td>{item.gradingformat}</td>
                <td>{item.reimburseamt}</td>
                <td>{item.empstatus}</td>
                <td>{item.bencostatus}</td>
                <td>{item.resultafterevent}</td>
                <td>{item.balancereimbamt}</td>
                <td>
                  <button
                    className="btn btn-success"
                    value={`${item.name},${item.courseName},${item.reimburseamt},Accept`}
                    onClick={approvalForm}
                  >
                    Accept
                  </button>
                </td>

                <>
                  <button
                    className="btn btn-danger"
                    value={`${item.name},${item.courseName},Reject`}
                    onClick={rejectionForm}
                  >
                    Reject
                  </button>
                </>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
  return (
    <p className="bencomessage">
      YOU HAVE NO REIMBURSEMENTS TO APPROVE OR REJECT
    </p>
  );
}

export default withRouter(BenCoFinalApprovalComponent);
