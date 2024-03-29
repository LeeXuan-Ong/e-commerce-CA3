import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import Logout from "./components/Logout"
import AddCar from "./components/AddCar"
import LoggedInRoute from "./components/LoggedInRoute"
import DisplayAllProducts from "./components/DisplayAllProducts";
import EditProduct from "./components/EditProduct";
import DeleteProduct from "./components/DeleteProduct";
import DisplayCart from "./components/DisplayCart";
import AddProduct from "./components/AddProduct";
import DeleteCart from "./components/DeleteCartProducts";
import BuyProduct from "./components/BuyProduct"
import PayPalMessage from "./components/PayPalMessage"
import UserPage from "./components/UserPage";
import DeleteUser from "./components/DeleteUser";

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    

}

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />                    
                    <Route exact path="/" component={DisplayAllProducts} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/BuyProduct" component={BuyProduct} />
                    <Route exact path="/PayPalMessage/:messageType/:payPalPaymentID" component={PayPalMessage}/>
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <LoggedInRoute exact path="/AddCar" component={AddCar} />
                    <LoggedInRoute exact path="/AddProduct" component={AddProduct}/>
                    <LoggedInRoute exact path="/EditProduct/:id" component={EditProduct} />
                    <LoggedInRoute exact path="/DeleteProduct/:id" component={DeleteProduct} />
                    <LoggedInRoute exact path="/DeleteCartProducts" component={DeleteCart}/>
                    <LoggedInRoute exact path="/Carts/:id" component={DisplayCart}/>
                    <LoggedInRoute exact path="/DisplayCart" component={DisplayCart}/>
                    <LoggedInRoute exact path="/UsersPage" component={UserPage}/>
                    <LoggedInRoute exact path="/DeleteUser/:id" component={DeleteUser}/>
                    <Route exact path="/DisplayAllProducts" component={DisplayAllProducts}/>
                    <Route path="*" component={DisplayAllProducts}/>
                </Switch>
            </BrowserRouter>
        )
    }
}