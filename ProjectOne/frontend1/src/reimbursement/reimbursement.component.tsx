import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Reimbursement } from "./reimbursement";
import { ReimbursementState } from "../reducer";
import { thunkGetReimbursements } from "../thunks";

interface ReimbursementProps {
  data: Reimbursement;
}

function ReimbursementComponent(props: ReimbursementProps) {
  const history = useHistory();
  const useReim = (state: ReimbursementState) => state.reimbursements;
  const reim = useSelector(useReim);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hello i am in checking mode");
    dispatch(thunkGetReimbursements());
  }, [dispatch]);
  console.log(reim);

  return (
    <div className="col reimbursement form">
      {reim.map((item) => {
        return (
          <div className="card-body">
            <tr>
              <th className="name">Name</th>
              <th className="courseName">CourseName</th>
              <th className="cost">Cost</th>
              <th className="subdate">Submitted Date</th>
              <th className="eventdate">Event Date</th>
              <th className="location">Location</th>
              <th className="description">Description</th>
              <th className="gradingformat">Grading Format</th>
              <th className="reimburseamt">Reimbursement Amount</th>
              <th className="empstatus">Employee Status</th>
              <th className="supstatus">Supervisor Status</th>
              <th className="hodstatus">HOD Status</th>
              <th className="bencostatus">BenCo Status</th>
            </tr>

            <tr>
              <td>{item.name}</td>
              <td>{item.courseName}</td>
              <td>{item.cost}</td>
              <td>{item.subdate}</td>
              <td>{item.eventdate}</td>
              <td>{item.location}</td>
              <td>{item.description}</td>
              <td>{item.gradingformat}</td>
              <td>{item.reimburseamt}</td>
              <td>{item.empstatus}</td>
              <td>{item.supstatus}</td>
              <td>{item.hodstatus}</td>
              <td>{item.bencostatus}</td>
            </tr>
          </div>
        );
      })}

      <Link className="empstatus" to={"/reimbursements/empstatus"}></Link>
    </div>
  );
}

export default ReimbursementComponent;
