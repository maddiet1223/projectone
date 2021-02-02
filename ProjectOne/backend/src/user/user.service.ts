import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { User } from './user';

class UserService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    async getUsers(): Promise<User[]> {
        const params = {
            TableName: 'users'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as User[];
        })
    }

    //getUser
    async getUserByName(name: string): Promise<User | null> {
        // GetItem api call allows us to get something by the key
        const params = {
            TableName: 'users',
            Key: {
                'name': name
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                console.log(`hello ${data}`);
                logger.debug(`data.Item: ${JSON.stringify(data.Item)}`);
                return data.Item as User;
            } else {
                return null;
            }
        })
    }

    async addUser(user: User): Promise<boolean> {
        // object to be sent to AWS.
        const params = {
            // TableName - the name of the table we are sending it to
            TableName: 'users',
            // Item - the object we are sending
            Item: user,
            ConditionExpression: '#name <> :name',
            ExpressionAttributeNames: {
                '#name': 'name',
                //'#role': 'role'
            },
            ExpressionAttributeValues: {
                ':name': user.name,
                //':role': user.role
            }
        };

        /*
            The await is just returning all of that as another promise
                to be resolved by a different layer of the application.
            put function takes in our params, and PUTs (http method) the item in the db.
            promise function returns a promise representation of the request
        */
        return await this.doc.put(params).promise().then((result) => {
            logger.info('Successfully created item');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async updateUser(user: User) {
        const params = {
            TableName: 'users',
            Key: {
                'name': user.name
            },
            UpdateExpression: 'set password = :p, role = :r',
            ExpressionAttributeValues: {
                ':r': user.role,
                ':p': user.password
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return await this.doc.update(params).promise().then((data) => {
            logger.debug(data);
            return true;
        }).catch(error => {
            logger.error(error);
            return false;
        });
    }
}

const userService = new UserService();
export default userService;
