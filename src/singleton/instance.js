import SingletonData from './index'


export const SingletonInstance = new SingletonData()

export { observable } from './index'

export const state = SingletonInstance.stateUsers


export default SingletonInstance