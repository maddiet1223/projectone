import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

export interface Courses{
        CID : number;
        courseName:string
}    
async function addItem(item: Courses): Promise<boolean>{
    let params = {
        TableName: 'courses',
        Item: item
    };

    

    return await docClient.put(params).promise().then((result) => {
        console.log(result);
        return true;
    }).catch((error) => {
        console.error(error);
        return false;
    })
}

let courses : Courses = {
    CID: 1,
    courseName:'University Courses',
    
}

addItem(courses).then((result)=>{
    console.log(result);
});

courses = {
    CID: 2,
    courseName:'Seminar',
}
addItem(courses).then((result)=>{
    console.log(result);
});

courses = {
    CID: 3,
    courseName:'Certification Preperation',
}
addItem(courses).then((result)=>{
    console.log(result);
});

courses = {
    CID: 4,
    courseName:'Certification',
}
addItem(courses).then((result)=>{
    console.log(result);
});

courses = {
    CID: 5,
    courseName:'Technical Training',
}
addItem(courses).then((result)=>{
    console.log(result);
});



