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
import Machine from "./pages/machine";
import AddMachine from "./pages/addMachine";
import UpdateMachine from "./pages/updateMachine";
import Fournisseur from "./pages/fournisseur";
import AddFournisseur from "./pages/addFournisseur";
import UpdateFournisseur from "./pages/updateFournisseur";
import Piece from "./pages/piece";
import AddPiece from "./pages/addPiece";
import UpdatePiece from "./pages/updatePiece";
import Operation from "./pages/operation";
import AddOperation from "./pages/addOperation";
import UpdateOperation from "./pages/updateOperation";
import Gamme from "./pages/gamme";
import UpdateGamme from "./pages/updateGamme";
import MatPrem from "./pages/matPrem";
import AddMatPrem from "./pages/addMatPrem";
import UpdateMatPrem from "./pages/updateMatPrem";
import Realisation from "./pages/realisation";
import UpdateRealisation from "./pages/updateRealisation";
import Achat from "./pages/achat";
import UpdateAchat from "./pages/updateAchat";
import AddAchat from "./pages/addAchat";
import Client from "./pages/client";
import AddClient from "./pages/addClient";
import UpdateClient from "./pages/updateClient";
import UpdateDevis from "./pages/updateDevis";
import Devis from "./pages/devis";
import AddDevis from "./pages/addDevis";
import Commande from "./pages/commande";
import UpdateCommande from "./pages/updateCommande";
import AddCommande from "./pages/addCommande";

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
                            <PrivateRoute path="/machine/:id"component={(props)=> <UpdateMachine id={props.match.params.id} />} />
                            <PrivateRoute path="/machine" component={Machine}/>
                            <PrivateRoute path="/add_machine" component={AddMachine}/>
                            <PrivateRoute path="/add_plan" component={AddPlanTravail}/>
                            <PrivateRoute path="/fournisseur/:id" component={(props)=> <UpdateFournisseur id={props.match.params.id} />} />
                            <PrivateRoute path="/fournisseur" component={Fournisseur}/>
                            <PrivateRoute path="/add_fournisseur" component={AddFournisseur}/>
                            <PrivateRoute path="/piece/:id" component={(props)=> <UpdatePiece id={props.match.params.id} />}/>
                            <PrivateRoute path="/piece" component={Piece}/>
                            <PrivateRoute path="/add_piece" component={AddPiece}/>
                            <PrivateRoute path="/operation/:id" component={(props)=> <UpdateOperation id={props.match.params.id} />}/>
                            <PrivateRoute path="/operation" component={Operation}/>
                            <PrivateRoute path="/add_operation" component={AddOperation}/>
                            <PrivateRoute path="/gamme/:id" component={(props)=> <UpdateGamme id={props.match.params.id} />} />
                            <PrivateRoute path="/gamme" component={Gamme}/>
                            <PrivateRoute path="/mat_prem/:id" component={(props)=> <UpdateMatPrem id={props.match.params.id} />} />
                            <PrivateRoute path="/mat_prem" component={MatPrem}/>
                            <PrivateRoute path="/add_mat_prem" component={AddMatPrem}/>
                            <PrivateRoute path="/realisation/:id" component={(props)=> <UpdateRealisation id={props.match.params.id} />} />
                            <PrivateRoute path="/realisation" component={Realisation}/>
                            <PrivateRoute path="/achat/:id" component={(props)=> <UpdateAchat id={props.match.params.id} />} />
                            <PrivateRoute path="/achat" component={Achat}/>
                            <PrivateRoute path="/add_achat" component={AddAchat}/>

                            <PrivateRoute path="/client/:id" component={(props)=> <UpdateClient id={props.match.params.id} />} />
                            <PrivateRoute path="/client" component={Client}/>
                            <PrivateRoute path="/add_client" component={AddClient}/>

                            <PrivateRoute path="/devis/:id" component={(props)=> <UpdateDevis id={props.match.params.id} />} />
                            <PrivateRoute path="/devis" component={Devis}/>
                            <PrivateRoute path="/add_devis" component={AddDevis}/>

                            <PrivateRoute path="/commande/:id" component={(props)=> <UpdateCommande id={props.match.params.id} />} />
                            <PrivateRoute path="/commande" component={Commande}/>
                            <PrivateRoute path="/add_commande" component={AddCommande}/>

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
