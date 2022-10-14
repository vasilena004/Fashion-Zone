import { IdType } from "../model/shared-types";
import { User } from "../model/User";
import { ApiClientImpl, API_BASE_URL } from "./generic-service";


class UserService extends ApiClientImpl<IdType, User>{
    [x: string]: any;
    constructor(public apiCollectionSuffix: string) {
        super(apiCollectionSuffix);
    }

    create(user: User) {
        return this.handleRequest(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }
    addToFavorite(productId: IdType, userId: string, token: string) {
        return this.handleRequest(`${API_BASE_URL}/users/${userId}/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({ productId })
        });
    }
    login(email: string, password: string) {
        return this.handleRequest(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    }
    saveUser(userId: string) {
        return this.handleRequest(`${API_BASE_URL}/user-info`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
    }
    deleteUser(userId: string) {
        return this.handleRequest(`${API_BASE_URL}/user-info/${userId}`, {
            method: 'DELETE',
        })
    }
    getUser() {
        return this.handleRequest(`${API_BASE_URL}/user-info/`);
    }
    getFavoritesProduct(userId:IdType,token:string) {
        return this.handleRequest(`${API_BASE_URL}/users/${userId}/favorites`,{
            method:"get",
            headers: {
                'Authorization': "Bearer " + token
            },
        });
    }
}

export const UserApi = new UserService('users');