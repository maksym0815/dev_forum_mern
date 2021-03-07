import React, { useState, useEffect, useRef} from "react";
import {useDispatch} from 'react-redux';
import * as actions from "../../store/actions/UI";
import {getUsers, searchUser} from "../../api/user";
import {Container, Button} from "../../components/UI/UI";
import styles from "./Users.module.scss";

function Users(props){
    const [users, setUsers] = useState([]);
    
    const searchEl = useRef();

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actions.startLoading());
        getUsers().then(response=>{
                setUsers(response.users);
                dispatch(actions.endLoading());
            })  
    }, []);

    const searchHandler=(e)=>{
        e.preventDefault();
        const searchQuery = searchEl.current["search"].value;
        dispatch(actions.startLoading());
        searchUser(searchQuery).then(response=>{
            if(response.error){
                dispatch(actions.endLoading());
                return dispatch(actions.startError(response.message));
            }
            setUsers(response.users);
        });
        dispatch(actions.endLoading());
    }

    return (
        <main>
            <Container>
                <form className={styles.Search} onChange={searchHandler} ref={searchEl}>
                    <input placeholder="Search user by name/email..." type="text" name="search"/>
                </form>
                <div className={styles.Users}>
                    {users.length==0?<p>No users available</p>:null}
                    {users.map((user)=>(
                            <div className={styles.userCard} key={user._id}>
                                <img src={`${process.env.REACT_APP_URL}${user.profilePicture}`} alt={user.username}/>
                                <div className={styles.userDetails}>
                                    <p><span>Username: </span>{user.username}</p>
                                    <p><span>Email: </span>{user.email}</p>
                                    <p><span>Joined On: </span>{new Date(user.createdAt).toLocaleDateString('en-US')}</p>
                                    <Button type="warning" click={(e)=>{
                                        e.preventDefault();
                                        props.history.push(`/profile/${user._id}`)
                                        }}>View Profile</Button>
                                </div>
                                <p className={styles.status}><span>Status:</span> {user.status}</p>
                            </div>
                        ))}
                </div>
            </Container>
        </main>
           
    )
}

export default Users;