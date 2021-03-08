import {useState, useEffect} from "react";
import {Container} from "../UI/UI";
import styles from "./ProfileDetails.module.scss";
import {withRouter} from "react-router-dom"

function ProfileDetails(props){
    const {user} = props;

    const [menu, setMenu] = useState("posts");
    const followers = user.followers;
    const following = user.following;

    const onClickHandler =(e)=>{
        e.preventDefault();
        props.history.push(`/profile/${e.target.attributes.name.nodeValue}`);
    }

    useEffect(() => {
        setMenu("posts");
    }, [user])

    return(
       <Container nopadding>
           <div className={styles.ProfileDetails}>
                    <div className={styles.topContainer}>
                        <p onClick={()=>setMenu("posts")} className={menu=="posts"?`${styles.active}`:null}>Posts</p>
                        <p onClick={()=>setMenu("followers")} className={menu=="followers"?`${styles.active}`:null}>Followers</p>
                        <p onClick={()=>setMenu("following")} className={menu=="following"?`${styles.active}`:null}>Following</p>
                    </div>
                    <div className={styles.bottomContainer}>
                        {menu=="posts" && (
                              null
                        )}
                        {menu=="followers" && (
                               <div className={styles.followers}>
                                   {followers.length==0?(<p>No followers exist</p>):null}
                                   {followers.map(follower=>{
                                       return (
                                           <div key={follower._id} className={styles.follower} name={follower._id} onClick={onClickHandler} >
                                                    <img key={follower._id} src={`http://localhost:5000${follower.profilePicture}`} alt={follower.username}/>
                                                    <p>{follower.username}</p>
                                           </div>
                                       )
                                   })}
                               </div>
                        )}
                        {menu=="following" && (
                                <div className={styles.followers}>
                                {following.length==0?(<p>User doesn't follow anyone</p>):null}
                                {following.map(f=>{
                                    return (
                                        <div key={f._id} className={styles.follower} name={f._id} onClick={onClickHandler} >
                                                <img key={f._id} src={`http://localhost:5000${f.profilePicture}`} alt={f.username}/>
                                                <p>{f.username}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
       </Container>
    )
}

export default withRouter(ProfileDetails);