import { SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";
import { connect, ConnectedProps, useSelector } from "react-redux";
import { ReimbursementState, UserState } from "../reducer";
import "./reimbursement.css";
import reimbursementService from "./reimbursement.service";
import { changeReimbursement } from "../actions";
import { Reimbursement } from "./reimbursement";

// This is the prop I want to connect from redux
const reimbursementProp = (state: ReimbursementState) => ({
  reimbursement: state.reimbursement,
});
// This is the dispatcher I want to use from redux
const mapDispatch = {
  updateReimbursement: (reimbursement: Reimbursement) =>
    changeReimbursement(reimbursement),
};

// Put them in the connector

const connector = connect(reimbursementProp, mapDispatch);

// Function Component
// get the types of the props we created above so we can tell our component about them.
type PropsFromRedux = ConnectedProps<typeof connector>;

function AddReimbursementComponent(props: PropsFromRedux) {
  const history = useHistory();
  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);
  const loggedUser = user.name;

  // This function is going to handle my onChange event.
  // SyntheticEvent is how React simulates events.
  function handleFormInput(e: SyntheticEvent) {
    let r: any = { ...props.reimbursement };
    r[
      (e.target as HTMLInputElement).name
    ] = (e.target as HTMLInputElement).value;
    props.updateReimbursement(r);
  }
  function submitForm() {
    props.reimbursement.empstatus = "Submitted";
    props.reimbursement.supstatus = "Pending";
    props.reimbursement.name = loggedUser;
     console.log("this is from add reimb:" + props.reimbursement);
    reimbursementService.addReimbursement(props.reimbursement).then(() => {
      props.updateReimbursement(new Reimbursement());

      // call the callback function from the parent component so that it will re-render
      history.push("/");
    });
  }

  return (
    <div className="reimbursement form">
      <label>Course Name</label>
      <br />
      <select className="form" name="courseName" onChange={handleFormInput}>
        <option placeholder="select">Select</option>
        <option value="University Courses">University Courses</option>
        <option value="Seminar">Seminar</option>
        <option value="Certification Preparation Classes">
          Certification Preparation Classes
        </option>
        <option value="Certification">Certification</option>
        <option value="Technical Training">Technical Training</option>
        <option value="Others">Others</option>
      </select>{" "}
      <br />
      <label>Cost</label>
      <br />
      <input type="text" name="cost" onChange={handleFormInput} />
      <br />
      <label>Submission Date</label>
      <br />
      <input type="date" name="subdate" onChange={handleFormInput} />
      <br />
      <label>Event Date</label>
      <br />
      <input type="date" name="eventdate" onChange={handleFormInput} />
      <br />
      <label>Location</label>
      <br />
      <input type="text" name="location" onChange={handleFormInput} />
      <br />
      <label>Description</label>
      <br />
      <input type="text" name="description" onChange={handleFormInput} />
      <br />
      <label>Justification</label>
      <br />
      <input type="text" name="justification" onChange={handleFormInput} />
      <br />
      <label>Grading Format</label>
      <br />
      <input type="text" name="gradingformat" onChange={handleFormInput} />
      <br />
      <button className="btn btn-primary" onClick={submitForm}>
        Add Reimbursement
      </button>
    </div>
  );
}

//connect my prop and dispatcher to my component
export default connector(AddReimbursementComponent);
