const URL = "http://localhost:5000";

export const signup = (data)=>{
    return fetch(`${URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(data=> data.json())
    .catch(error=> console.log(error))
}

export const login = (data)=>{
    return fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(data=> data.json())
    .catch(error=> console.log(error))
}