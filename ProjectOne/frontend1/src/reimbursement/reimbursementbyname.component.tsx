import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReimbursementState, UserState } from "../reducer";
import { getReimbersementsByName } from "../actions";
//import {  thunkGetReimbursementsByName } from '../thunks';
import reimbursementService from "./reimbursement.service";

interface ReimbursementProps {
  match: any;
}

function ReimbursementsByNameComponent(props: ReimbursementProps) {
  const history = useHistory();
  const useReimb = (state: ReimbursementState) => state.reimbursementbyname;
  const userContext = useSelector((state: UserState) => state.user);
  const reimb = useSelector(useReimb);
  // const reimbbyname = reimb.filter((item)=> item.name === userContext.name);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props.match.params.id);
    reimbursementService
      .getReimbursementsByName(props.match.params.id)
      .then((reimb) => {
        console.log("hello this is from reimb by name:" + reimb);
        dispatch(getReimbersementsByName(reimb));
      });
  }, [dispatch, console.log("hello this is useffect"), props.match.params.id]);

  if (reimb.length > 0) {
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
              <th className="bencostatus">Benco Status</th>
              <th className="resultofevent">Result of event</th>
              <th className="balancereimbamt">Balance Reimbursement Amount</th>
            </tr>
          </thead>
          {reimb.map((item) => {
            return (
              <tr>
                <td>{item.name}</td>
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
        YOU HAVE NOT MADE ANY REIMBURSEMENTS REQUEST YET! PLEASE FILL IN THE
        FORM TO DO SO!
      </p>
    );
  }
}
export default ReimbursementsByNameComponent;
