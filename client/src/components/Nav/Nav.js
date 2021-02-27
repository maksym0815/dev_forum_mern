import {withRouter, Link} from "react-router-dom"
import styles from "./Nav.module.scss";

function Nav(props) {
    return (
        <nav>
        <div className={styles.navLeft}>
        <Link to="/">
            <div className={styles.logo}>FORUM</div>
        </Link>
        </div>
        <div className={styles.navRight}>
        <Link to="/" className={props.history.location.pathname==="/"?`${styles.link} ${styles.active}`:styles.link}>Home</Link>
        <Link to="/login" className={props.history.location.pathname==="/login"?`${styles.link} ${styles.active}`:styles.link}>Login</Link>
        <Link to="/register" className={props.history.location.pathname==="/register"?`${styles.link} ${styles.active}`:styles.link}>Register</Link>
        </div>
        </nav>
    );
  }
  
  export default withRouter(Nav);