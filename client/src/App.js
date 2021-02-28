import MainRouter from "./MainRouter";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, combineReducers} from "redux";
import UIReducer from "./store/reducers/UI";

const rootReducer = combineReducers({
  UI: UIReducer
})

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainRouter/>
      </Router>
    </Provider>
  );
}

export default App;