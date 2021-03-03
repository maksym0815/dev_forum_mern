const URL = "http://localhost:5000";

export const getProfile = (userId, token)=>{
    return fetch(`${URL}/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(data=> data.json())
    .catch(error=> console.log(error))
}

export const getUsers = ()=>{
    return fetch(`${URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(data=> data.json())
    .catch(error=> console.log(error))
}