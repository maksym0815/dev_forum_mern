import React, { useState, useEffect} from "react";
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom"
import * as actions from "../../store/actions/UI";
import {getUsers} from "../../api/user";
import {Container, Button} from "../../components/UI/UI";
import styles from "./Users.module.scss";

function Users(props){
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actions.startLoading());
        getUsers().then(response=>{
                setUsers(response.users);
                dispatch(actions.endLoading());
            })  
    }, [])

    console.log(users)

    return (
        <main>
            <Container>
                <div className={styles.Users}>
                    {users.map((user)=>(
                            <div className={styles.userCard} key={user._id}>
                                <img src={`http://localhost:5000${user.profilePicture}`} alt={user.username}/>
                                <div className={styles.userDetails}>
                                    <p><span>Username: </span>{user.username}</p>
                                    <p><span>Email: </span>{user.email}</p>
                                    <p><span>Joined On: </span>{user.creationDate.slice(0,10)}</p>
                                    <Button type="warning" click={(e)=>{
                                        e.preventDefault();
                                        props.history.push(`/profile/${user._id}`)
                                        }}>View Profile</Button>
                                </div>
                            </div>
                        ))}
                </div>
            </Container>
        </main>
           
    )
}

export default Users;