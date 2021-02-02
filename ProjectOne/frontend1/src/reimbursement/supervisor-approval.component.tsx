import { SyntheticEvent, useEffect } from "react";
import reimbursementService from "./reimbursement.service";
import { withRouter, useHistory } from "react-router-dom";
import { ReimbursementState } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import { changeReimbursement, getReimbersementsBySupervisor } from "../actions";
import { Reimbursement } from "./reimbursement";

interface ReimbursementProps {
  match: any;
}

// Function Component
function SupervisorApprovalComponent(props: ReimbursementProps) {
  const reimbursementSelector = (state: ReimbursementState) =>
    state.reimbursementbysupervisor;
  const reimbS = useSelector(reimbursementSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    console.log(props);
    console.log(props.match.params.id);
    reimbursementService.getReimbursementsBySupervisor().then((reimbS) => {
      console.log(reimbS);
      dispatch(getReimbersementsBySupervisor(reimbS));
    });
  }, [dispatch, props, props.match.params.id]);

  function approvalForm(e: SyntheticEvent) {
    const rejselect = (e.target as HTMLInputElement).value;
    console.log("this is the one from rejection form" + rejselect);
    reimbursementService.updateSupervisorApproval(rejselect).then(() => {
      dispatch(changeReimbursement(new Reimbursement()));
      console.log("Updating supervisor Approval!");
      // call the callback function from the parent component so that it will re-render
      history.push("/sup/pending");
    });
  }

  function rejectionForm(e: SyntheticEvent) {
    const rejselect = (e.target as HTMLInputElement).value;
    console.log("this is the one from rejection form" + rejselect);
      reimbursementService.updateSupervisorRejection(rejselect).then(() => {
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
            <th className="cost">Cost</th>
            <th className="subdate">Submitted Date</th>
            <th className="eventdate">Event Date</th>
            <th className="location">Location</th>
            <th className="description">Description</th>
            <th className="justification">Justification</th>
            <th className="reimburseamt">Reimbursement Amount</th>
            <th className="balancereimbamt">Balance Reibursement Amount</th>
            <th className="supstatus">Supervisor Status</th>
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
                <td>{item.location}</td>
                <td>{item.description}</td>
                <td>{item.justification}</td>
                <td>{item.reimburseamt}</td>
                <td>{item.balancereimbamt}</td>
                <td>{item.supstatus}</td>
                
                          <td>
                  <button
                    className="btn btn-success"
                    value={`${item.name},${item.courseName},Accept`}
                    onClick={approvalForm}
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button 
                    className="btn btn-danger"
                    value={`${item.name},${item.courseName},Reject`}
                    onClick={rejectionForm}
                  > Reject
                  </button>
                </td>
               
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
  return (
    <p className="supmessage">
      {" "}
      YOU HAVE NO REIMBURSEMENTS TO APPROVE OR REJECT
    </p>
  );
}

export default withRouter(SupervisorApprovalComponent);
