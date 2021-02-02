import { DocumentClient } from "aws-sdk/clients/dynamodb";
import dynamo from "../dynamo/dynamo";
import logger from "../log";
import { Reimbursement } from "./reimbursement";

class ReimbursementService {
  private doc: DocumentClient;
  constructor() {
    // The documentClient. This is our interface with DynamoDB
    this.doc = dynamo;
  }

  async getReimbursements(): Promise<Reimbursement[]> {
    const params = {
      TableName: "reimburse",
    };
    return await this.doc
      .scan(params)
      .promise()
      .then((data) => {
        return data.Items as Reimbursement[];
      })
      .catch((err) => {
        logger.error(err);
        return [];
      });
  }

  async getReimbursement(id: string): Promise<Reimbursement | null> {
    const params = {
      TableName: "reimburse",
      Key: {
        name: id,
      },
    };
    return await this.doc
      .get(params)
      .promise()
      .then((data) => {
        return data.Item as Reimbursement;
      })
      .catch((err) => {
        logger.error(err);
        return null;
      });
  }

  //get reimbursements for a given employee
  async getReimbursementsByName(name: String): Promise<Reimbursement[]> {
    const params = {
      TableName: "reimburse",
      /*
       Key :{
           'name':name
       }   */
      KeyConditionExpression: "#n = :n",
      // ProjectionExpression: '#name,#courseName,#cost,#subdate,#compdate,#location,#description,#gradingformat,#justification,#reqreimburseamt,#empstatus',
      ExpressionAttributeNames: {
        "#n": "name",
      },
      ExpressionAttributeValues: {
        ":n": name,
      },
    };
    console.log("params name: " + name);
    return await this.doc
      .query(params)
      .promise()
      .then((data) => {
        if (data && data.Items) {
          console.log("this is data items from db: " + data.Items);
          return data.Items as Reimbursement[];
        } else {
          logger.debug("hello, I failed ");
          return [];
        }
      });
  }

  //to get reimbursements for supervisor approval
  async getReimbursementsBySupervisor(): Promise<Reimbursement[]> {
    console.log("In service calls, for supervisor");
    const params = {
      TableName: "reimburse",
      FilterExpression: "#sa = :supstatus",
      ExpressionAttributeNames: {
        "#sa": "supstatus",
      },
      ExpressionAttributeValues: {
        ":supstatus": "Pending",
      },
    };
    return await this.doc
      .scan(params)
      .promise()
      .then((result) => {
        console.log(" In service class:" + result.Items);
        return result.Items as Reimbursement[];
      })
      .catch((err) => {
        logger.error(err);
        console.log("this is error:" + err);
        return [];
      });
  }

  async addReimbursement(reimb: Reimbursement): Promise<boolean> {
    const datayorb = { ...reimb };

    let reimbamt = 0;

    if (datayorb.courseName === "University Courses") {
      reimbamt = datayorb.cost * 0.8;
      console.log("this is inside reimb:" + reimbamt);
    } else if (datayorb.courseName === "Seminar") {
      reimbamt = datayorb.cost * 0.6;
    } else if (datayorb.courseName === "Certification Preparation Classes") {
      reimbamt = datayorb.cost * 0.75;
    } else if (datayorb.courseName === "Certification") {
      reimbamt = datayorb.cost * 1;
    } else if (datayorb.courseName === "Technical Training") {
      reimbamt = datayorb.cost * 0.9;
    } else if (datayorb.courseName === "Others") {
      reimbamt = datayorb.cost * 0.3;
    }
    if (reimbamt > 1000) {
      reimbamt = 1000;
      console.log("this is outside reimb" + reimbamt);
    }

    datayorb.reimburseamt = reimbamt;

    // object to be sent to AWS.
    const params = {
      // TableName - the name of the table we are sending it to
      TableName: "reimburse",
      // Item - the object we are sending
      Item: datayorb,
      ConditionExpression: "#name <> :name",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": datayorb.name,
      },
    };

    return await this.doc
      .put(params)
      .promise()
      .then((result) => {
        logger.info("Successfully created item");
        return true;
      })
      .catch((error) => {
        logger.error(error);
        return false;
      });
  }

  async updateReimbursement(reimb: Reimbursement): Promise<boolean> {
    console.log(reimb);
    const params = {
      TableName: "reimburse",
      Key: {
        name: reimb.name,
      },
      UpdateExpression:
        "set #courseName=:c, #cost=:p, #subdate=:s, #compdate=:cd, #location=:l, #description=:d, #gradingformat=:g, #justification=:j, #reqreimburseamt=:ra,#empestatus= :es",
      ExpressionAttributeValues: {
        ":c": reimb.courseName,
        ":s": reimb.subdate,
        ":cd": reimb.eventdate,
        ":p": reimb.cost,
        ":l": reimb.location,
        ":d": reimb.description,
        ":g": reimb.gradingformat,
        ":j": reimb.justification,
        ":ra": reimb.reimburseamt,
        ":rs": "Submitted",
      },
      ExpressionAttributeNames: {
        "#CID": "CID",
        "#subdate": "subdate",
        "#eventdate": "eventdate",
        "#location": "location",
        "#description": "description",
        "#gradingformat": "gradingformat",
        "#typeofevent": "typeofevent",
        "#justification": "justification",
        "#reqreimburseamt": "reqreimburseamt",
        "#reimbursestatus": "reimbursestatus",
      },
      ReturnValue: "UPDATED_NEW",
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info("Successfully updated reimbursement");
        return true;
      })
      .catch((error) => {
        logger.error(error);
        return false;
      });
  }
  //--------------------------------------Supervisor process-------------------------------
  //supervisor approval update
  async updateSupervisorApproval(id: string): Promise<boolean> {
    console.log("this is in the express service class " + id);
    let input = id.split(",");
    console.log("In express service input: " + input);
    const params = {
      TableName: "reimburse",
      Key: {
        name: input[0],
        courseName: input[1],
      },
      UpdateExpression: "set empstatus= :es, supstatus= :sa, hodstatus= :hs",
      ExpressionAttributeValues: {
        ":es": "In-Progress",
        ":sa": "Approved",
        ":hs": "Pending",
      },

      ReturnValue: "UPDATED_NEW",
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info("Successfully updated supervisor approval");
        return true;
      })
      .catch((error) => {
        logger.error(error);
        return false;
      });
  }

  //rejection of supervisor approval update
  async updateSupervisorRejection(id: string): Promise<boolean> {
    console.log("this is in the express service class " + id);
    let input = id.split(",");
    console.log("In express service input: " + input);
    const params = {
      TableName: "reimburse",
      Key: {
        name: input[0],
        courseName: input[1],
      },
      UpdateExpression: "set empstatus= :es,supstatus= :sa",
      ExpressionAttributeValues: {
        ":es": "Rejected",
        ":sa": "Rejected",
      },
      ReturnValue: "UPDATED_NEW",
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info("Successfully updated reimbursement");
        console.log("successfully updated rejection");
        return true;
      })
      .catch((error) => {
        logger.error(error);
        console.log("this is error" + error);
        return false;
      });
  }

  //-------------------------------------------------------------------------------------------

  //getting all the approvals with hod update status pending

  async getReimbursementsByHod(): Promise<Reimbursement[]> {
    console.log("In service calls, for hod");
    const params = {
      TableName: "reimburse",
      FilterExpression: "#hs = :hodstatus",
      ExpressionAttributeNames: {
        "#hs": "hodstatus",
      },
      ExpressionAttributeValues: {
        ":hodstatus": "Pending",
      },
    };
    return await this.doc
      .scan(params)
      .promise()
      .then((result) => {
        console.log(" In service class for hod status based:" + result.Items);
        return result.Items as Reimbursement[];
      })
      .catch((err) => {
        logger.error(err);
        console.log("this is error:" + err);
        return [];
      });
  }

  //update the status of benco approval after the approval of hod
  async updateHodApproval(id: string): Promise<boolean> {
    console.log("this is in the express service class " + id);
    let input = id.split(",");
    console.log("In express service input: " + input);
    const params = {
      TableName: "reimburse",
      Key: {
        name: input[0],
        courseName: input[1],
      },
      UpdateExpression: "set  hodstatus= :hs, bencostatus= :bs",
      ExpressionAttributeValues: {
        ":hs": "Approved",
        ":bs": "Pending",
      },

      ReturnValue: "UPDATED_NEW",
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info("Successfully updated hod approval");
        return true;
      })
      .catch((error) => {
        logger.error(error);
        return false;
      });
  }

  //hod approval rejection update

  async updateHodRejection(id: string): Promise<boolean> {
    console.log("this is in the express service class " + id);
    let input = id.split(",");
    console.log("In express service input: " + input);
    const params = {
      TableName: "reimburse",
      Key: {
        name: input[0],
        courseName: input[1],
      },
      UpdateExpression: "set empstatus= :es,supstatus= :sa,hodstatus= :hs",
      ExpressionAttributeValues: {
        ":es": "Rejected",
        ":sa": "Rejected",
        ":hs": "Rejected",
      },
      ReturnValue: "UPDATED_NEW",
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info("Successfully updated reimbursement for hod");
        console.log("successfully updated rejection for hod status");
        return true;
      })
      .catch((error) => {
        logger.error(error);
        console.log("this is error" + error);
        return false;
      });
  }

  //-------------------------------------------Benco process----------------------------------------------

  //getting all the approvals with benco update status pending

  async getReimbursementsByBenco(): Promise<Reimbursement[]> {
    console.log("In service calls, for Benco");
    const params = {
      TableName: "reimburse",
      FilterExpression: "#bs = :bencostatus",
      ExpressionAttributeNames: {
        "#bs": "bencostatus",
      },
      ExpressionAttributeValues: {
        ":bencostatus": "Pending",
      },
    };
    return await this.doc
      .scan(params)
      .promise()
      .then((result) => {
        console.log(" In service class for benco status based:" + result.Items);
        return result.Items as Reimbursement[];
      })
      .catch((err) => {
        logger.error(err);
        console.log("this is error:" + err);
        return [];
      });
  }

  //update the status of benco approval after the approval of hod
  async updateBencoApproval(id: string): Promise<boolean> {
    console.log("this is in the express service class benco " + id);
    let input = id.split(",");
    console.log("In express service input: " + input);
    const params = {
      TableName: "reimburse",
      Key: {
        name: input[0],
        courseName: input[1],
      },
      UpdateExpression:
        "set   empstatus= :es,bencostatus= :bs,resultafterevent= :ra",
      ExpressionAttributeValues: {
        ":es": "Approved-Pending-Disbursement",
        ":bs": "Approved-Pending-Disbursement",
        ":ra": "Pending-for-proof-submission",
      },

      ReturnValue: "UPDATED_NEW",
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info("Successfully updated benco approval");
        return true;
      })
      .catch((error) => {
        logger.error(error);
        return false;
      });
  }

  //hod approval rejection update

  async updateBencoRejection(id: string): Promise<boolean> {
    console.log("this is in the express service class " + id);
    let input = id.split(",");
    console.log("In express service input: " + input);
    const params = {
      TableName: "reimburse",
      Key: {
        name: input[0],
        courseName: input[1],
      },
      UpdateExpression:
        "set empstatus= :es,supstatus= :sa,hodstatus= :hs, bencostatus= :bs",
      ExpressionAttributeValues: {
        ":es": "Rejected",
        ":sa": "Rejected",
        ":hs": "Rejected",
        ":bs": "Rejected",
      },
      ReturnValue: "UPDATED_NEW",
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info("Successfully updated reimbursement for hod");
        console.log("successfully updated rejection for hod status");
        return true;
      })
      .catch((error) => {
        logger.error(error);
        console.log("this is error" + error);
        return false;
      });
  }

  //------------------------------------------------Benco Final approval-----------------------
  //for benco final approval

  //getting all the approvals with benco update status pending

  async getReimbursementsForBencoFinalApproval(): Promise<Reimbursement[]> {
    console.log("In service calls, for Benco");
    const params = {
      TableName: "reimburse",
      FilterExpression: "#ra = :resultafterevent",
      ExpressionAttributeNames: {
        "#ra": "resultafterevent",
      },
      ExpressionAttributeValues: {
        ":resultafterevent": "Proof-Submitted",
      },
    };
    return await this.doc
      .scan(params)
      .promise()
      .then((result) => {
        console.log(
          " In service class for benco final status based:" + result.Items
        );
        return result.Items as Reimbursement[];
      })
      .catch((err) => {
        logger.error(err);
        console.log("this is error:" + err);
        return [];
      });
  }

  async updateBencoFinalApproval(id: string): Promise<boolean> {
    console.log("this is in the express service class benco " + id);
    let input = id.split(",");
    console.log("In express service input: " + input);
    const balamt = 1000 - parseInt(input[2]);
    console.log("this is the balance amount"+balamt);
    const params = {
      TableName: "reimburse",
      Key: {
        name: input[0],
        courseName: input[1],
      },
      UpdateExpression:
        "set   empstatus= :es,bencostatus= :bs,resultafterevent= :ra,balancereimbamt= :ba",
      ExpressionAttributeValues: {
        ":es": "Approval-complete",
        ":bs": "Approval-complete-amount-disbursed",
        ":ra": "Proof Accepted",
        ":ba": balamt
      },

      ReturnValue: "UPDATED_NEW",
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info("Successfully updated benco approval");
        return true;
      })
      .catch((error) => {
        logger.error(error);
        return false;
      });
  }

  //hod approval rejection update

  async updateBencoFinalRejection(id: string): Promise<boolean> {
    console.log("this is in the express service class " + id);
    let input = id.split(",");
    console.log("In express service input: " + input);
    const params = {
      TableName: "reimburse",
      Key: {
        name: input[0],
        courseName: input[1],
      },
      UpdateExpression:
        "set empstatus= :es,supstatus= :sa,hodstatus= :hs, bencostatus= :bs, resultafterevent= :ra",
      ExpressionAttributeValues: {
        ":es": "Rejected",
        ":sa": "Rejected",
        ":hs": "Rejected",
        ":bs": "Rejected",
        ":ra": "Proof Rejected",
        
      },
      ReturnValue: "UPDATED_NEW",
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info("Successfully updated reimbursement for hod");
        console.log("successfully updated rejection for hod status");
        return true;
      })
      .catch((error) => {
        logger.error(error);
        console.log("this is error" + error);
        return false;
      });
  }

  //---------------------------------------------Proof submission by employee------------------------------------------------------

  async getReimbursementsByProofSubmit(): Promise<Reimbursement[]> {
    console.log("In service calls, for hod");
    const params = {
      TableName: "reimburse",
      FilterExpression: "#ra = :resultafterevent",
      ExpressionAttributeNames: {
        "#ra": "resultafterevent",
      },
      ExpressionAttributeValues: {
        ":resultafterevent": "Pending-for-proof-submission",
      },
    };
    return await this.doc
      .scan(params)
      .promise()
      .then((result) => {
        console.log(
          " In service class for benco final employee status based:" +
            result.Items
        );
        return result.Items as Reimbursement[];
      })
      .catch((err) => {
        logger.error(err);
        console.log("this is error:" + err);
        return [];
      });
  }

  //update the status of benco approval after the approval of hod
  async updateProofSubmission(id: string): Promise<boolean> {
    console.log("this is in the express service class " + id);
    let input = id.split(",");
    console.log("In express service input: " + input);
    const params = {
      TableName: "reimburse",
      Key: {
        name: input[0],
        courseName: input[1],
      },
      UpdateExpression: "set  resultafterevent= :ra",
      ExpressionAttributeValues: {
        ":ra": "Proof-Submitted",
      },

      ReturnValue: "UPDATED_NEW",
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info("Successfully updated hod approval");
        return true;
      })
      .catch((error) => {
        logger.error(error);
        return false;
      });
  }

  //-----------------------------------------------------------------------------
}

const reimbursementService = new ReimbursementService();
export default reimbursementService;
