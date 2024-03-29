import React, {Component} from "react"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free/css/all.min.css';
// import headerLogo from '\images\yelow.jpg';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import axios from "axios"

import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST,ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
import ProductsCards from "./ProductsCards";
import LinkInClass from "./LinkInClass";
import Header from "./header";
import Footer from "./footer";
import Head from "./head";
import Pictures from "./pictures";
import Include from "./include";
// import logo from "../images/water1.jpg";


export default class DisplayAllProducts extends Component
{
    filtered;
    constructor(props)
    {
        super(props)

        this.state = {
            products:[],
            selectedProducts: [],
            alphabetSort: 1,
            priceSort: 1,
        }
    }


     componentDidMount() {
        // needed for sessions to work
         axios.get(`${SERVER_HOST}/products`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Records read")
                        this.setState({products: res.data, selectedProducts:res.data})
                        this.filtered = res.data;
                    }
                } else {
                    console.log("Record not found")
                }
            })


    }

    handleReset(e) {
        axios.get(`${SERVER_HOST}/resetDB`).then(res=>{
            if(res.data) {
                res.data.map((data) => console.log(data))
            }})
        }


    handleWomenFilter = async () => {
         this.filtered = this.state.products.filter(product => product.gender === "WOMEN");
        await this.setState({selectedProducts: this.filtered})
    }

    handleMenFilter = async () => {
        this.filtered = this.state.products.filter(product => product.gender === "MEN");
        await this.setState({selectedProducts: this.filtered})
    }


    handleKidsFilter = async () => {
        this.filtered = this.state.products.filter(product => product.gender === "KIDS");
        await this.setState({selectedProducts: this.filtered})
    }

    handleSearchArray =  (e) => {
        let newProducts = this.filtered.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase()) || product.price.toString().includes(e.target.value));
         this.setState({selectedProducts: newProducts})
    }

    handleAlphabetical =  (e) => {
        let newProducts = this.state.selectedProducts.sort((a, b) => (a.name > b.name) ? this.state.alphabetSort : -this.state.alphabetSort);
         this.setState({selectedProducts: newProducts, alphabetSort: this.state.alphabetSort * -1})
    }

    handlePrice =  (e) => {
        let newProducts = this.state.selectedProducts.sort((a, b) => (a.price > b.price) ? this.state.priceSort : -this.state.priceSort);
         this.setState({selectedProducts: newProducts, priceSort: this.state.priceSort * -1})
    }


    render()
    {
        return (
            <div>

            <body>
            <div id="ab">
                <div id="jk">
               <Head /></div>
            <Header selectedProducts={this.state.selectedProducts} handleSearchArray={this.handleSearchArray} handleWomenFilter={this.handleWomenFilter} handleMenFilter={this.handleMenFilter} handleKidsFilter={this.handleKidsFilter} />

                {/*<header/>*/}

                <div id="mn" style={{width: "100%", height: "40%"}}>
                    <Pictures/>
                    {/*<img src={logo}  height="700px" width="1500px"/>*/}
                </div>
            <button onClick={this.handleAlphabetical}>Alphabetical Sort</button>
            <button onClick={this.handlePrice}>Price Sort</button>
            <div className="form-container">
                {localStorage.accessLevel >  ACCESS_LEVEL_GUEST ?
                    <div className="logout">
                        <Logout/>
                    </div>
                    :
                    <div>
                        <Link className="green-button" to={"/Login"}>Login</Link>
                        <Link className="blue-button" to={"/Register"}>Register</Link>
                        <Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link>  <br/><br/><br/></div>
                }

                {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                    <div className="add-new-car">
                        <Link className="blue-button" to={"/AddProduct"}>Add New Shoe</Link>
                    </div>
                    :
                    null
                }
                {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                    <div className="add-new-car">
                        <Link className="blue-button" to={"/UsersPage"}>Users Page</Link>
                    </div>
                    :
                    null
                }
                <div className="add-new-car" >
                    <LinkInClass value="RESET" className="red-button" onClick={this.handleReset}/>


                </div>
                <div className="table-container">
                    <ProductsCards product={this.state.selectedProducts} />


                </div>
                <Include/>
                <Footer/>
            </div>
            </div>
            </body>
            </div>
        )
    }
}