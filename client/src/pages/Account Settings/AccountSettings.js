import React, { useState} from "react";
import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/UI";
import {isLoggedIn} from "../../api/auth";
import {deleteUser, updateUser} from "../../api/user";
import {Container, Button} from "../../components/UI/UI";
import styles from "./AccountSettings.module.scss";

function AccountSettings(props){
    const dispatch = useDispatch();
    
    const [settingsType, setSettingsType] = useState("changePassword");

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const [deleteAccountPassword, setDeleteAccountPassword] = useState("")

    const deleteUserHandler=(e)=>{
        e.preventDefault();
        dispatch(actions.startLoading());
        deleteUser(isLoggedIn()._id, deleteAccountPassword, isLoggedIn().token).then(response=>{
            if(response.error){
                dispatch(actions.startError(response.message));
            }else{
                localStorage.removeItem("user");
                dispatch(actions.startError("Account deleted successfully."));
            }
            dispatch(actions.endLoading());
        });
    }

    const isPasswordValid = ()=>{
        if(passwordData["newPassword"].length<6){
            dispatch(actions.startError("Password length must be more than 6 characters."));
            return false;
        }
        if(passwordData["newPassword"]!=passwordData["confirmNewPassword"]){
            dispatch(actions.startError("Passwords do not match."));
            return false;
        }
        return true;
    }

    const passwordChangeHandler = (e)=>{
        e.preventDefault();
        dispatch(actions.startLoading());
        if(isPasswordValid()){
            const formData = new FormData();
            formData.append("user", JSON.stringify({
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            }));
            updateUser(isLoggedIn()._id, formData, isLoggedIn().token, "password").then(response=>{
                if(response.error){
                    dispatch(actions.startError(response.message));
                }else{
                    dispatch(actions.startError("Password changed successfully."));
                }
            })
        }
        dispatch(actions.endLoading());
    }


    return (
        <main>
            <Container nopadding>
                <div className={styles.innerContainer}>
                    <div className={styles.leftContainer}>
                        <p onClick={()=>setSettingsType("changePassword")} className={settingsType=="changePassword"?`${styles.active}`:null}>Change Password</p>
                        <p onClick={()=>setSettingsType("deleteAccount")} className={settingsType=="deleteAccount"?`${styles.active}`:null}>Delete Account</p>
                    </div>
                    <div className={styles.rightContainer}>
                        {settingsType=="changePassword" && (
                              <form onSubmit={passwordChangeHandler}>
                                <input placeholder="Enter your old password!" type="password" name="oldPassword" value={passwordData.oldPassword} onChange={(e)=>setPasswordData({...passwordData, oldPassword: e.target.value})}/>
                                <input placeholder="Enter your new password!" type="password" name="newPassword" value={passwordData.newPassword} onChange={(e)=>setPasswordData({...passwordData, newPassword: e.target.value})}/>
                                <input placeholder="Confirm your new password!" type="password" name="confirmnewPassword" value={passwordData.confirmNewPassword} onChange={(e)=>setPasswordData({...passwordData, confirmNewPassword: e.target.value})}/>
                                <Button type="success">CHANGE PASSWORD</Button>
                              </form>
                        )}
                        {settingsType=="deleteAccount" && (
                                <form onSubmit={deleteUserHandler}>
                                    <input placeholder="Enter your password to delete account!" type="password" name="oldPassword" value={deleteAccountPassword} onChange={(e)=>setDeleteAccountPassword(e.target.value)}/>
                                    <Button type="danger">DELETE ACCOUNT</Button>
                                    <p>Note: This action is permanent and all account information will be deleted.</p>
                                </form>
                        )}
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default AccountSettings;