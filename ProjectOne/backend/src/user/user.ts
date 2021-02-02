import logger from '../log';
import userService from './user.service';

export class User {
    public role: string = 'Customer';
    constructor(public name: string, public password: string, role: string,public reportingmanager:string,public elireimburseamt:number) {
        if (role) {
            this.role = role;
        }
    };
}

export async function login(name: string, password: string): Promise<User|null> {
    logger.debug(`${name +' '+ password}`);
    return await userService.getUserByName(name).then((user)=> {
        if (user && user.password === password) {
            console.log(user);
            return user
        } else {
            return null;
        }
    })
}

export function register(username: string, password: string, role: string,reportingmanager:string,elireimburseamt:number, callback?: Function) {
    userService.addUser(new User(username, password, role,reportingmanager,elireimburseamt)).then((res) => {
        logger.trace(res);
        //callback();
    }).catch((err) => {
        logger.error(err);
        console.log('Error, this probably means that the username is already taken.')
        //callback();
    });
}

export function updateUser(user: User) {
    userService.updateUser(user).then((success) => {
        logger.info('user updated successfully');
    }).catch((error) => {
        logger.warn('user not updated');
    });
}
