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

export const deleteUser = (userId, deleteAccountPassword, token)=>{
    return fetch(`${URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            password: deleteAccountPassword})
    })
    .then(data=> data.json())
    .catch(error=> console.log(error))
}

export const updateUser = (userId, formData, token, edit)=>{
    return fetch(`${URL}/user/${userId}?edit=${edit}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
    .then(data=> data.json())
    .catch(error=> console.log(error))
}

export const searchUser = (searchQuery)=>{
    return fetch(`${URL}/user?search=${searchQuery}`, {
        method: "GET"
    })  
    .then(data=> data.json())
    .catch(error=> console.log(error))
}

export const followUser = (userId, token)=>{
    return fetch(`${URL}/user/${userId}/follow`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })  
    .then(data=> data.json())
    .catch(error=> console.log(error)) 
}

export const unfollowUser = (userId, token)=>{
    return fetch(`${URL}/user/${userId}/unfollow`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })  
    .then(data=> data.json())
    .catch(error=> console.log(error)) 
}