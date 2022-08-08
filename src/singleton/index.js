import { BehaviorSubject } from 'rxjs';

export const fetchUsers = async () => {

    const resJson = await fetch('https://jsonplaceholder.typicode.com/users')

    const response = await resJson.json()

    return response
};

export const observable = new BehaviorSubject(null);

export default class SingletonData {
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
    }
}