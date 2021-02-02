import * as AWS from 'aws-sdk';
import userService from '../user/user.service';


// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
    TableName: 'users'
}

const removeReimbursements = {
    TableName : 'reimburse'
}



const removeApprovalFlow = {
    TableName : 'approvalflow'
}
const usersSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};




ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(usersSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateUsersTable();
                }, 10000);
            }
        });
    }, 5000);
});

function populateUsersTable() {
    userService.addUser({name: 'Linda', password: '1234', role: 'Employee',reportingmanager:'Jim',elireimburseamt:1000}).then(()=>{});
    userService.addUser({name: 'Maddie', password: 'pass', role: 'Employee',reportingmanager:'Jim',elireimburseamt:1000}).then(()=>{});
    userService.addUser({name: 'Jim', password: 'pass', role: 'Supervisor',reportingmanager:'Anthony',elireimburseamt:1000}).then(()=>{});
    userService.addUser({name:'Anthony',password: 'pass',role: 'HOD',reportingmanager:'Josh',elireimburseamt:1000}).then(()=>{});
    userService.addUser({name:'Josh',password: 'pass',role: 'BenCo',reportingmanager:'BencoManager',elireimburseamt:1000}).then(()=>{});
}


const ReimbursementsSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        },
        {
            AttributeName:'courseName',
            AttributeType:'S'    

        }
              

    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'courseName',
            KeyType: 'RANGE'
        },

      
       
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'reimburse',
    StreamSpecification: {
        StreamEnabled: false
    }
};




ddb.deleteTable(removeReimbursements, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(ReimbursementsSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                ;
            }
        });
    }, 5000);
});



const approvalFlowSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        },
        {
            AttributeName: 'CID',
            AttributeType: 'N'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'CID',
            KeyType: 'RANGE'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'approvalflow',
    StreamSpecification: {
        StreamEnabled: false
    }
};





ddb.deleteTable(removeApprovalFlow, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(approvalFlowSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                
            }
        });
    }, 5000);
});
