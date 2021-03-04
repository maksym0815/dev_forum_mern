import {useState} from "react";
import {withRouter, Link} from "react-router-dom"
import styles from "./Nav.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
import {isLoggedIn} from "../../api/auth"

function Nav(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const LogoutHandler = (e)=>{
        e.preventDefault();
        setDropdownOpen(false);
        localStorage.removeItem("user");
        props.history.push("/");
    }

    const toggleDropdownOpen = ()=>{
        setDropdownOpen(true);
    }

    const toggleDropdownClose = ()=>{
        setDropdownOpen(false);
    }

    return (
        <nav>
        <div className={styles.navLeft}>
        <Link to="/">
            <div className={styles.logo}>FORUM</div>
        </Link>
        </div>
        <div className={styles.navRight}>
        <Link to="/" className={props.history.location.pathname==="/"?`${styles.link} ${styles.active}`:styles.link}>Home</Link>
        <Link to="/users" className={props.history.location.pathname==="/users"?`${styles.link} ${styles.active}`:styles.link}>Users</Link>
        {!isLoggedIn()?
            <>
                <Link to="/login" className={props.history.location.pathname==="/login"?`${styles.link} ${styles.active}`:styles.link}>Login</Link>
                <Link to="/register" className={props.history.location.pathname==="/register"?`${styles.link} ${styles.active}`:styles.link}>Register</Link>
            </>
        :
            <> 
                <p 
                    className={`${styles.link} ${styles.dropdownToggler}`} 
                    onMouseEnter={toggleDropdownOpen} 
                    onMouseLeave={toggleDropdownClose}>
                        {isLoggedIn().username} <FontAwesomeIcon className={styles.icon} icon={faCaretSquareDown}/>
                </p>
                <div 
                    className={dropdownOpen?`${styles.dropdownOpen} ${styles.dropdown}`:`${styles.dropdownClose} ${styles.dropdown}`} 
                    onMouseEnter={toggleDropdownOpen}  
                    onMouseLeave={toggleDropdownClose}>
                        <Link to="/profile" className={props.history.location.pathname==="/profile"?`${styles.link} ${styles.active}`:styles.link}>Profile</Link>
                        <Link to="/logout" className={styles.link} onClick={e=>LogoutHandler(e)}>Logout</Link>
                </div>
            </>}
        </div>
        </nav>
    );
  }
  
  export default withRouter(Nav);