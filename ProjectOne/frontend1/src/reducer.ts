import * as Actions from "./actions";
import { User } from "./user/user";
import { Reimbursement } from "./reimbursement/reimbursement";

export interface ReimbursementState {
  reimbursements: Reimbursement[];
  reimbursement: Reimbursement;
  reimbursementbyname: Reimbursement[];
  reimbursementbysupervisor: Reimbursement[];
  reimbursementbyhod: Reimbursement[];
  reimbursementbybenco: Reimbursement[];
  reimbursementbybencofinal: Reimbursement[];
  reimbursementbyproofsubmit: Reimbursement[];
 
}

export interface UserState {
  user: User;
  loginUser: User;
}

export interface AppState extends UserState, ReimbursementState {}

const initialState: AppState = {
  user: new User(),
  loginUser: new User(),
  reimbursements: [],
  reimbursement: new Reimbursement(),
  reimbursementbyname: [],
  reimbursementbysupervisor: [],
  reimbursementbyhod: [],
  reimbursementbybenco: [],
  reimbursementbybencofinal: [],
  reimbursementbyproofsubmit: [],
 
};

const reducer = (
  state: AppState = initialState,
  action: Actions.AppAction
): AppState => {
  console.log(action);
  // We want to call setState. (redux will do that when we return a new state object from the reducer)
  const newState = { ...state }; // If we return this, it will re render the application. (call setState)

  switch (action.type) {
    case Actions.ReimbursementActions.GetReimbursements:
      newState.reimbursements = action.payload as Reimbursement[];
      console.log("this is me from reducer 1" + newState);
      return newState;
    case Actions.ReimbursementActions.ChangeReimbursement:
      newState.reimbursement = action.payload as Reimbursement;
      return newState;
    case Actions.ReimbursementActions.GetReimbursementsByName:
      newState.reimbursementbyname = action.payload as Reimbursement[];
      console.log("this is from the reducer" + newState);
      return newState;
    case Actions.ReimbursementActions.GetReimbursementsBySupervisor:
      newState.reimbursementbysupervisor = action.payload as Reimbursement[];
      console.log("this is from the reducers" + newState);
      return newState;
    case Actions.ReimbursementActions.GetReimbursementsByHod:
      newState.reimbursementbyhod = action.payload as Reimbursement[];
      console.log("this is from the reducers for hod" + newState);
      return newState;
    case Actions.ReimbursementActions.GetReimbursementsByBenco:
      newState.reimbursementbybenco = action.payload as Reimbursement[];
      console.log("this is from the reducers for benco" + newState);
      return newState;
    case Actions.ReimbursementActions.GetReimbursementsForBencoFinalApproval:
      newState.reimbursementbybencofinal = action.payload as Reimbursement[];
      console.log("this is from the reducers for benco final" + newState);
      return newState;
    case Actions.ReimbursementActions.GetReimbursementsByProofSubmit:
      newState.reimbursementbyproofsubmit = action.payload as Reimbursement[];
      console.log("this is from the reducers for benco proof final" + newState);
      return newState;
    case Actions.UserActions.GetUser:
      newState.user = action.payload as User;
      return newState;
    case Actions.UserActions.LoginChange:
      newState.loginUser = action.payload as User;
      return newState;
    default:
      return state;
  }
};

export default reducer;
