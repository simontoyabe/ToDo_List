class RequestManager {
    static baseUrl = 'https://ctd-todo-api.herokuapp.com/v1';

    static getToken() {
        return localStorage.getItem('token');
    }

    static get(endPoint) {
        console.log('obtenido por request manager')
        return fetch(RequestManager.baseUrl + endPoint, {
            headers: {
                authorization: RequestManager.getToken()
            }
        }).then(data => {
            return data.json();
        })
    }

    static post(endPoint, body) {
        return fetch(this.baseUrl + endPoint, {
            method: 'POST',
            headers: {
                authorization: RequestManager.getToken(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(data => {
            return data.json();
        })
    }

    static put(endPoint, body) {
        return fetch(this.baseUrl + endPoint, {
            method: 'PUT',
            headers: {
                authorization: RequestManager.getToken(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(data => {
            return data.json();
        })
    }

    static delete(endPoint) {
        return fetch(this.baseUrl + endPoint, {
            method: 'DELETE',
            headers: {
                authorization: RequestManager.getToken()
            },
        }).then(data => {
            return data.json();
        })
    }

}
// export class { RequestManager };
// module.exports = RequestManager;