import {Route, Redirect} from "react-router-dom";
import {isLoggedIn} from "../api/auth";

function ProtectedRoute({ component: Component, ...rest }) {
    let auth = isLoggedIn();
    return (
      <Route
        {...rest}
        render={({ location }) =>
        auth ? (
            <Component/>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default ProtectedRoute;