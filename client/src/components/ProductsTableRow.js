import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class ProductsTableRow extends Component
{
    render()
    {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.brand}</td>
                <td>{this.props.product.gender}</td>
                <td>{this.props.product.category}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.is_in_inventory}</td>
                <td>{this.props.product.items_left}</td>
                <td>{this.props.product.slug}</td>
                <td>


                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteCartProduct/" + this.props.product._id}>Delete</Link> : null}
                </td>
            </tr>
        )
    }
}