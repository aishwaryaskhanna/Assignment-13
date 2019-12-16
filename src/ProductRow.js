import React, { Component } from 'react'

class ProductRow extends Component {
    constructor(props) {
        super(props)
        this.destroy = this.destroy.bind(this)
        this.update = this.update.bind(this)
    }

    destroy() {                
        this.props.onDestroy(this.props.product.id);
    }

    update(){
        this.props.onEdit(this.props.product)
    }

    render () {
        let currentProduct = this.props.product.product;
        return (
            <tr>
                <td>{currentProduct.productid}</td>
                <td>{currentProduct.name}</td>
                <td>{currentProduct.category}</td>
                <td>{currentProduct.price}</td>
                <td>{currentProduct.inStock ? "Yes" : "No"}</td>
                <td className="text-right"><button onClick={this.update} className="btn btn-info">Update</button></td>
                <td className="text-right"><button onClick={this.destroy} className="btn btn-info">Delete</button></td>
            </tr>
        )
    }
}

export default ProductRow