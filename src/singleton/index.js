import { ajax } from 'rxjs/ajax';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export const fetchUsers = async () => {

    const resJson = await fetch('https://jsonplaceholder.typicode.com/users')

    const response = await resJson.json()

    return response

    // let responseData = []

    // const response = ajax(`https://jsonplaceholder.typicode.com/users`).subscribe(
    //     ({ response }) => {
    //         responseData = response

    //         debugger

    //         return response
    //     },
    //     err => console.error(err),
    // );

    // debugger


    // return responseData
};

export const observable = new BehaviorSubject(null);
// const observableOnlyChanged = observable.pipe(distinctUntilChanged());

export default class SingletonData {
    // stateUsers = []

    constructor() {


        if (!!SingletonData.instance) {
            return SingletonData.instance;
        }

        this.stateUsers = []

        SingletonData.instance = this;

        return this;

    }

    get getUsers() {
        return this.stateUsers
    }


    fetchUsersData = async () => {
        const users = await fetchUsers()

        observable.next(users)

        this.stateUsers = users;
    }



    init = () => {
        this.fetchUsersData()

        // console.info(observableOnlyChanged, 'observableOnlyChanged')
        // console.info(observable, 'observable')
    }

}