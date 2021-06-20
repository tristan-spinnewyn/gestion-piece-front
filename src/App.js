import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import React, {useState} from 'react';
import {isConnected, logout} from './services/authService';
import PrivateRoute from './components/route/privateRoute';
import Login from './pages/login'
import Header from './components/header/header'
import User from './pages/user';
import {toast} from 'react-toastify'
import AddUser from "./pages/addUser";
import UpdateUser from "./pages/updateUser";
import PlanTravail from "./pages/plan_travail";
import AddPlanTravail from "./pages/addPlanTravail";
import UpdatePlanTravail from "./pages/updatePlanTravail";

toast.configure()

export const AuthContext = React.createContext({
    isConnected: false,
    setConnected: (value) => {
    }
})

function App() {

    const [auth, setAuth] = useState(isConnected())
    const contextValue = {
        isConnected: auth,
        setConnected: setAuth
    }

    return (
        <AuthContext.Provider value={contextValue}>
            <Router>

                <div className="App">
                    <div className="container-fluid">
                        <Header/>
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <PrivateRoute path="/utilisateur/:id" component={(props)=> <UpdateUser id={props.match.params.id} />} />
                            <PrivateRoute path="/utilisateur" component={User}/>
                            <PrivateRoute path="/add_user" component={AddUser}/>
                            <PrivateRoute path="/plan_travail/:id"component={(props)=> <UpdatePlanTravail id={props.match.params.id} />} />
                            <PrivateRoute path="/plan_travail" component={PlanTravail} />
                            <PrivateRoute path="/add_plan" component={AddPlanTravail}/>

                            <Route path="/logout" render={() => {
                                contextValue.setConnected(false)
                                logout()
                                console.log("disconnected")
                                document.location.href = '/'
                            }}/>
                            <PrivateRoute path="/"/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
