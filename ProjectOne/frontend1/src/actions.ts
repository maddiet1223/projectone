import { Reimbursement } from "./reimbursement/reimbursement";
import { User } from "./user/user";

export enum ReimbursementActions {
  GetReimbursements = "GET_REIMBURSEMENTS",
  ChangeReimbursement = "CHANGE_REIMBURSEMENT",
  GetReimbursementsByName = "GET_REIMBURSEMENTS_BY_NAME",
  GetReimbursementsBySupervisor = "GET_REIMBURSEMENTS_BY_SUPERVISOR",
  GetReimbursementsByHod = "GET_REIMBURSEMENTS_BY_HOD",
  GetReimbursementsByBenco = "GET_REIMBURSEMENTS_BY_BENCO",
  GetReimbursementsForBencoFinalApproval = "GET_REIMBURSEMENTS_FOR_BENCO_FINAL_APPROVAL",
  GetReimbursementsByProofSubmit = "GET_REIMBURSEMENTS_BY_PROOF_SUBMIT",
}

export enum UserActions {
  GetUser = "GET_USER",
  LoginChange = "LOGIN_CHANGE",
}

export interface AppAction {
  type: string;
  payload: any;
}

export interface ReimbursementAction extends AppAction {
  type: ReimbursementActions;
  payload: Reimbursement | Reimbursement[];
}

export function getReimbersements(
  reimbs: Reimbursement[]
): ReimbursementAction {
  console.log("this is me from actions hello" + reimbs);
  const action: ReimbursementAction = {
    type: ReimbursementActions.GetReimbursements,
    payload: reimbs,
  };
  return action;
}

export function changeReimbursement(reimb: Reimbursement): ReimbursementAction {
  const action: ReimbursementAction = {
    type: ReimbursementActions.ChangeReimbursement,
    payload: reimb,
  };
  return action;
}
export interface UserAction extends AppAction {
  type: UserActions;
  payload: User;
}

export function getUser(user: User): UserAction {
  const action: UserAction = {
    type: UserActions.GetUser,
    payload: user,
  };
  return action;
}

export function loginAction(user: User): UserAction {
  const action: UserAction = {
    type: UserActions.LoginChange,
    payload: user,
  };
  return action;
}

export function getReimbersementsByName(
  reimb: Reimbursement[]
): ReimbursementAction {
  console.log("hello this is from actions :" + reimb);
  const action: ReimbursementAction = {
    type: ReimbursementActions.GetReimbursementsByName,
    payload: reimb,
  };
  return action;
}

export function getReimbersementsBySupervisor(
  reimb: Reimbursement[]
): ReimbursementAction {
  console.log("hello this is from actions :" + reimb);
  const action: ReimbursementAction = {
    type: ReimbursementActions.GetReimbursementsBySupervisor,
    payload: reimb,
  };
  return action;
}

export function getReimbersementsByHod(
  reimb: Reimbursement[]
): ReimbursementAction {
  console.log("hello this is from actions by HOD :" + reimb);
  const action: ReimbursementAction = {
    type: ReimbursementActions.GetReimbursementsByHod,
    payload: reimb,
  };
  return action;
}

export function getReimbersementsByBenco(
  reimb: Reimbursement[]
): ReimbursementAction {
  console.log("hello this is from actions by benco :" + reimb);
  const action: ReimbursementAction = {
    type: ReimbursementActions.GetReimbursementsByBenco,
    payload: reimb,
  };
  return action;
}

export function getReimbersementsForBencoFinalApproval(
  reimb: Reimbursement[]
): ReimbursementAction {
  console.log("hello this is from actions by benco :" + reimb);
  const action: ReimbursementAction = {
    type: ReimbursementActions.GetReimbursementsForBencoFinalApproval,
    payload: reimb,
  };
  return action;
}

export function getReimbersementsByProofSubmit(
  reimb: Reimbursement[]
): ReimbursementAction {
  console.log("hello this is from actions by benco :" + reimb);
  const action: ReimbursementAction = {
    type: ReimbursementActions.GetReimbursementsByProofSubmit,
    payload: reimb,
  };
  return action;
}
