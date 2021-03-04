const URL = process.env.REACT_APP_URL;

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

export const deleteUser = (userId, token)=>{
    return fetch(`${URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(data=> data.json())
    .catch(error=> console.log(error))
}

export const updateUser = (user, fileData, token)=>{
    return fetch(`${URL}/user/${user._id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: fileData
    })
    .then(data=> data.json())
    .catch(error=> console.log(error))
}