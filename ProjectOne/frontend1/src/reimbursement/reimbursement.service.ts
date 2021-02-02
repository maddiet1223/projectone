import axios from "axios";
import { isPropertySignature } from "typescript";
import { Reimbursement } from "./reimbursement";

class ReimbursementService {
  private URI: string;
  constructor() {
    this.URI = "http://localhost:3000/reimbursements";
  }

  getReimbursements(): Promise<Reimbursement[]> {
    return axios.get(this.URI + "/").then((results) => results.data);
  }

  getReimbursement(id: string): Promise<Reimbursement> {
    return axios.get(this.URI + "/" + id).then((result) => result.data);
  }

  getReimbursementsByName(id: string): Promise<Reimbursement[]> {
    const result = axios
      .get(this.URI + "/" + id)
      .then((results) => results.data);
    console.log(result);
    return result;
  }
  getReimbursementsBySupervisor(): Promise<Reimbursement[]> {
    const result = axios
      .get(this.URI + "/" + "sup" + "/" + "pending")
      .then((results) => results.data);
    console.log(result);
    return result;
  }
  addReimbursement(r: Reimbursement): Promise<null> {
    return axios.post(this.URI + "/addreimbursement", r).then((result) => null);
  }
  updateReimbursement(r: Reimbursement[]): Promise<null> {
    return axios.put(this.URI + "/addreimbursement", r).then((result) => null);
  }

  //supervisor approval update
  updateSupervisorApproval(id: string): Promise<null> {
    return axios
      .put(this.URI + "/sup/approve" + "/" + id)
      .then((result) => null);
  }

  updateSupervisorRejection(id: string): Promise<null> {
    return axios
      .put(this.URI + "/sup/reject" + "/" + id)
      .then((result) => null);
  }

  //Hod approval update

  getReimbursementsByHod(): Promise<Reimbursement[]> {
    const result = axios
      .get(this.URI + "/" + "hod" + "/" + "pending")
      .then((results) => results.data);
    console.log(result);
    return result;
  }
  updateHodApproval(id: string): Promise<null> {
    return axios
      .put(this.URI + "/hod/approve" + "/" + id)
      .then((result) => null);
  }

  updateHodRejection(id: string): Promise<null> {
    return axios
      .put(this.URI + "/hod/reject" + "/" + id)
      .then((result) => null);
  }

  //Benco approval and update

  getReimbursementsByBenco(): Promise<Reimbursement[]> {
    const result = axios
      .get(this.URI + "/" + "benco" + "/" + "pending")
      .then((results) => results.data);
    console.log(result);
    return result;
  }
  updateBencoApproval(id: string): Promise<null> {
    return axios
      .put(this.URI + "/benco/approve" + "/" + id)
      .then((result) => null);
  }

  updateBencoRejection(id: string): Promise<null> {
    return axios
      .put(this.URI + "/benco/reject" + "/" + id)
      .then((result) => null);
  }

  //benco final approval

  getReimbursementsForBencoFinalApproval(): Promise<Reimbursement[]> {
    const result = axios
      .get(this.URI + "/" + "bencofinal" + "/" + "pending")
      .then((results) => results.data);
    console.log(result);
    return result;
  }
  updateBencoFinalApproval(id: string): Promise<null> {
    return axios
      .put(this.URI + "/bencofinal/approve" + "/" + id)
      .then((result) => null);
  }

  updateBencoFinalRejection(id: string): Promise<null> {
    return axios
      .put(this.URI + "/bencofinal/reject" + "/" + id)
      .then((result) => null);
  }

  //employee proof submit
  getReimbursementsByProofSubmit(): Promise<Reimbursement[]> {
    const result = axios
      .get(this.URI + "/" + "emp" + "/" + "proof")
      .then((results) => results.data);
    console.log(result);
    return result;
  }

  updateProofSubmission(id: string): Promise<null> {
    return axios
      .put(this.URI + "/empproof/submit" + "/" + id)
      .then((result) => null);
  }


  //employee reimbursement amt updated after benco final approval

  getReimbursementsForAmountUpdate(): Promise<Reimbursement[]> {
    const result = axios
      .get(this.URI + "/empamt/available")
      .then((results) => results.data);
    console.log(result);
    return result;
  }


  updateReimbursementAvailable(r: Reimbursement[]): Promise<null> {
    return axios.put(this.URI + "/empamt/update"+ r).then((result) => null);
  }
  //-------------------------------------------------

  deleteReimbursement(id: string): Promise<null> {
    return axios
      .delete(this.URI + "/" + id, { withCredentials: true })
      .then((result) => null);
  }
}

export default new ReimbursementService();
