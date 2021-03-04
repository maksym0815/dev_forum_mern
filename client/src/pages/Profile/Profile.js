import React, { useState, useEffect, useRef } from "react";
import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/UI";
import {useParams} from "react-router-dom";
import {isLoggedIn} from "../../api/auth";
import {getProfile} from "../../api/user";
import {Container, Button} from "../../components/UI/UI";
import styles from "./Profile.module.scss";
import {deleteUser, updateUser} from "../../api/user";

function Profile(props){
    let {userId} = useParams();

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        _id: "",
        username: "",
        email: "",
        createdAt: "",
        updatedAt: "",
        profilePicture: ""
    });

    const [images, setImages] = useState(null);

    const [deleteSlider, setDeleteSlider] = useState(false);

    const [uploadImage, setUploadImage] = useState(false);

    const imageElement = useRef(null);
    
    useEffect(()=>{
        dispatch(actions.startLoading());
        if(!userId){
            userId = isLoggedIn()._id;
        }
        getProfile(userId, isLoggedIn().token).then((response)=>{
            if(response.message=="jwt malformed"){
                dispatch(actions.startError("Please login to continue."));
                dispatch(actions.endLoading());
                return props.history.push("/login");
            }
            if(response.error){
                dispatch(actions.startError("An unexpected error occured. Please try again."));
                dispatch(actions.endLoading());
                return props.history.push("/");
            }
            setUser(response.user);
            dispatch(actions.endLoading());
        });
    }, [userId]);

    const deleteProfileHandler = ()=>{
        setDeleteSlider(true);
    }

    const deleteProfile=(userId)=>{
        deleteUser(userId, isLoggedIn().token).then(response=>{
            setDeleteSlider(false);
            localStorage.removeItem("user");
            if(response.error){
                dispatch.startError("Account could not be deleted. Please try again later.");
            }else{
                dispatch(actions.startError("Account deleted successfully."));
            }
            props.history.push("/");
        });
    }

    const imageUploadHandler=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", images);
        formData.append("user", user);
        updateUser(user, formData, isLoggedIn().token).then(response=>{
            setUser(response.user);
            console.log(response);
        })
    }

    return (
        <main>
            <Container>
                <div className={styles.Profile}>
                    <div className={styles.profileLeft}>
                        <div className={styles.profileLeftPicture}>
                            <img src={`${process.env.REACT_APP_URL}${user.profilePicture}`} alt={user.username}/>
                            {isLoggedIn() && isLoggedIn()._id==user._id && <button onClick={()=>{setUploadImage(!uploadImage)}}>UPLOAD IMAGE</button>}
                        </div>
                        <div className={styles.profileLeftInfo}>
                            <h2>Welcome {user.username},</h2>
                            <p><span>Email:</span> {user.email}</p>
                            <p><span>Joined on:</span> {new Date(user.createdAt).toLocaleDateString('en-US')}</p>
                        </div>
                    </div>
                    <div className={styles.profileRight}>
                        {isLoggedIn() && isLoggedIn()._id==user._id && 
                        (<><Button type="warning">EDIT PROFILE</Button>
                        <Button type="danger" click={deleteProfileHandler}>DELETE PROFILE</Button>
                        <div className={deleteSlider?`${styles.confirmModal} ${styles.confirmModalOpen}`:`${styles.confirmModal}`}>
                            <Button type="success" click={()=>deleteProfile(user._id)}>CONFIRM DELETE</Button>
                            <Button type="danger" click={()=>setDeleteSlider(false)}>NO</Button>
                        </div></>)}
                    </div>
                </div>
            </Container>

            {uploadImage && isLoggedIn() && isLoggedIn()._id==user._id?(
            <Container>
                <div className={styles.editForm}>
                    <form onSubmit={imageUploadHandler} onChange={()=>{
                        imageElement.current.innerText="File selected!";
                    }}>
                        <div className={styles.uploadFileContainer}>
                            <p ref={imageElement} >Upload your file!</p>
                            <input type="file" name="file" onChange={(e)=>setImages(e.target.files[0])}/>
                        </div>
                        <button type="submit">SUBMIT</button>
                    </form>
                </div>
            </Container>):null}
            
        </main>
           
    )
}

export default Profile;