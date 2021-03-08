import React, { useState, useEffect, useRef } from "react";
import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/UI";
import {useParams, withRouter} from "react-router-dom";
import {isLoggedIn, updateLocalStorageData} from "../../api/auth";
import {getProfile, followUser, unfollowUser} from "../../api/user";
import {Container, Button} from "../../components/UI/UI";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import styles from "./Profile.module.scss";
import {updateUser} from "../../api/user";

function Profile(props){
    let {userId} = useParams();

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        _id: "",
        username: "",
        email: "",
        createdAt: "",
        updatedAt: "",
        status: "",
        profilePicture: "",
        followers: [],
        following: []
    });


    const [images, setImages] = useState(null);

    const [uploadImage, setUploadImage] = useState(false);

    const [editProfile, setEditProfile] = useState(false);

    const[editProfileData, setEditProfileData] = useState({
        username: "",
        email: "",
        status: ""
    })

    const [isUserFollowed, setIsUserFollowed] = useState(false);

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
                // localStorage.removeItem("user");
                dispatch(actions.startError("An unexpected error occured. Please login and try again."));
                dispatch(actions.endLoading());
                return props.history.push("/");
            }
            if(response.user.followers.find(follower => follower._id == isLoggedIn()._id)){
                setIsUserFollowed(true)
            }else{
                setIsUserFollowed(false)
            }
            setUser(response.user);
            dispatch(actions.endLoading());
        });
    }, [userId]);

    const imageUploadHandler=(e)=>{
        dispatch(actions.startLoading());
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", images);
        updateUser(user._id, formData, isLoggedIn().token, "picture").then(response=>{
            if(response.error){
                return dispatch(actions.startError("Image could not be changed. Please try again later."));
            }
            setUser(response.user);
            dispatch(actions.endLoading());
            setUploadImage(false);
        })
    }

    const isInputValid = (field)=>{
        switch(field){
            case "username":
                if(editProfileData["username"].length==0){
                    dispatch(actions.startError("Username cannot be empty."));
                    return false;
                }
                break;
            case "email":
                if(editProfileData["email"].length==0){
                    dispatch(actions.startError("Email cannot be empty."));
                    return false;
                }
                break;
            case "status":
                if(editProfileData["status"].length==0){
                    dispatch(actions.startError("Status cannot be empty."));
                    return false;
                }
            default:
                return true;
            } 
        return true;
    }

    const editProfileHandler=(e)=>{
        e.preventDefault();
        dispatch(actions.startLoading());
        const field = e.target.getAttribute("name");
        if(isInputValid(field)){
            const formData = new FormData();
            formData.append("user", JSON.stringify({
                [field]: editProfileData[field]
            }));
            updateLocalStorageData(field, editProfileData[field])
            dispatch(actions.startLoading());
            updateUser(user._id, formData, isLoggedIn().token, field).then(response=>{
                if(response.error){
                    dispatch(actions.endLoading());
                    return dispatch(actions.startError(response.message));
                }
                setUser(response.user);
                setEditProfile(false);
                setEditProfileData({
                    username: "",
                    email: "",
                    status: ""
                });
                dispatch(actions.endLoading());
            });
        }
        dispatch(actions.endLoading());
    }

    const FollowHandler = (e)=>{
        e.preventDefault();
        dispatch(actions.startLoading());
        followUser(user._id, isLoggedIn().token).then(response=>{
            if(response.error){
                dispatch(actions.endLoading());
                return dispatch(actions.startError(response.message));
            }
            setIsUserFollowed(true);
            setUser(response.user);
            return dispatch(actions.startError("User followed successfully!"));
        });
        dispatch(actions.endLoading());
    }

    const UnfollowHandler = (e)=>{
        e.preventDefault();
        dispatch(actions.startLoading());
        unfollowUser(user._id, isLoggedIn().token).then(response=>{
            if(response.error){
                dispatch(actions.endLoading());
                return dispatch(actions.startError(response.message));
            }
            setIsUserFollowed(false);
            setUser(response.user);
            return dispatch(actions.startError("User unfollowed successfully!"));
        });
        dispatch(actions.endLoading());
    }

    return (
        <main>
            <Container>
                <div className={styles.Profile}>

                    <div className={styles.profileLeft}>
                        <div className={styles.profileLeftPicture}>
                            <img src={`${process.env.REACT_APP_URL}${user.profilePicture}`} alt={user.username}/>
                            {isLoggedIn() && isLoggedIn()._id==user._id && <button onClick={()=>{
                                setUploadImage(!uploadImage);
                                setEditProfile(false);
                                }}>UPLOAD IMAGE</button>}
                        </div>
                        <div className={styles.profileLeftInfo}>
                            <h2>Welcome {user.username},</h2>
                            <p><span>Email:</span> {user.email}</p>
                            <p><span>Joined on:</span> {new Date(user.createdAt).toLocaleDateString('en-US')}</p>
                            {isLoggedIn() && isLoggedIn()._id==user._id && <p><span>Last profile change on:</span> {new Date(user.updatedAt).toLocaleDateString('en-US')}</p>}
                        </div>
                    </div>

                    <div className={styles.profileRight}>

                        {isLoggedIn() && isLoggedIn()._id==user._id && 
                        (<Button type="warning" click={()=>{
                            setEditProfile(!editProfile);
                            setUploadImage(false);
                            }}>EDIT PROFILE</Button>)}

                        {isLoggedIn() && isLoggedIn()._id!=user._id && !isUserFollowed && 
                        (<Button type="success" click={FollowHandler}>FOLLOW</Button>)}

                        {isLoggedIn() && isLoggedIn()._id!=user._id && isUserFollowed && 
                        (<Button type="warning" click={UnfollowHandler}>UNFOLLOW</Button>)}
                            
                    </div>

                </div>
                <p className={styles.status}><span>Status:</span> {user.status}</p>
            </Container>

            {uploadImage && isLoggedIn()._id==user._id?(
            <Container>
                <div className={styles.editImageForm}>
                    <form onSubmit={imageUploadHandler} onChange={()=>{
                        imageElement.current.innerText="Image selected!";
                    }}>
                        <div className={styles.uploadFileContainer}>
                            <p ref={imageElement} >Upload image!</p>
                            <input type="file" name="file" onChange={(e)=>setImages(e.target.files[0])}/>
                        </div>
                        <button type="submit">SUBMIT</button>
                    </form>
                </div>
            </Container>):null}

            {editProfile && isLoggedIn()._id==user._id &&(
            <Container>
                <div className={styles.editForm}>
                    <form onSubmit={editProfileHandler} name="username">
                        <input placeholder="Enter your updated username!" type="text" name="username" value={editProfileData.username} onChange={(e)=>setEditProfileData({...editProfileData, username: e.target.value})}/>
                        <button type="submit">EDIT</button>
                    </form>
                    <form onSubmit={editProfileHandler}  name="email">
                        <input placeholder="Enter your updated email!" type="email" name="email" value={editProfileData.email}  onChange={(e)=>setEditProfileData({...editProfileData, email: e.target.value})}/>
                        <button type="submit">EDIT</button>
                    </form>
                    <form onSubmit={editProfileHandler}  name="status">
                        <input placeholder="Enter a new status!" type="text" name="status" value={editProfileData.status}  onChange={(e)=>setEditProfileData({...editProfileData, status: e.target.value})}/>
                        <button type="submit">EDIT</button>
                    </form>
                </div>
            </Container>)}

            <ProfileDetails user={user}/>
        </main>
           
    )
}

export default withRouter(Profile);