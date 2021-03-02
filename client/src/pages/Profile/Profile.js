import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/UI";
import {useParams} from "react-router-dom";
import {isLoggedIn} from "../../api/auth";
import {getProfile} from "../../api/user";
import {Container, Button} from "../../components/UI/UI";
import styles from "./Profile.module.scss";

function Profile(props){
    let {userId} = useParams();

    const dispatch = useDispatch();

    const [allowEdit, setAllowEdit] = useState(false);

    const [user, setUser] = useState({
        _id: "",
        username: "",
        email: "",
        creationDate: "",
        updatedDate: ""
    })
    
    useEffect(()=>{
        if(!userId){
            userId = isLoggedIn()._id;
        }
        getProfile(userId, isLoggedIn().token).then((response)=>{
            if(response.message=="jwt malformed"){
                dispatch(actions.startError("Please login to continue."));
                return props.history.push("/login");
            }
            if(response.error){
                dispatch(actions.startError("An unexpected error occured. Please try again."));
                return props.history.push("/");
            }
            setUser(response.user);
            if(isLoggedIn() && isLoggedIn()._id == userId){
                setAllowEdit(true);
            }
        });
    }, [])

    return (
        <main>
            <Container>
                <div className={styles.Profile}>
                    <div className={styles.profileLeft}>
                        <h2>Welcome {user.username},</h2>
                        <p><span>Email:</span> {user.email}</p>
                        <p><span>Account Created On:</span> {user.creationDate.slice(0,10)} </p>
                    </div>
                    {allowEdit?
                    <div className={styles.profileRight}>
                        <Button type="warning">EDIT PROFILE</Button>
                        <Button type="danger">DELETE PROFILE</Button>
                    </div>:null}
                </div>
            </Container>
        </main>
           
    )
}

export default Profile;