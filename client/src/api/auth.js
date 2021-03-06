const URL = process.env.REACT_APP_URL;

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

export const isLoggedIn = ()=>{
    if(localStorage.getItem("user")){
        return JSON.parse(localStorage.getItem("user"));
    }else{
        return false;
    }
}

export const updateLocalStorageData = (field, data)=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user[field]){
        user[field] = data;
    }
    localStorage.setItem("user", JSON.stringify(user));
}