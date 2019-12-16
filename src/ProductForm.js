import React, { Component } from 'react'

const RESET_VALUES = {id: '', category: '', price: '', name: '', inStock:false}


class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.state = {
            product: Object.assign({}, RESET_VALUES),
            errors: {}
        }
    }
    handleChange(e) {
        const target = e.target
        let value = target.value
        const name = target.name
        if(target.type === 'checkbox'){
            value = target.checked
        }
        this.setState((prevState) => {
            this.props.product.product[name] = value
            return { product: this.props.product }
        })
    }
    handleSave(e) {
        this.props.onSave(this.props.product);
        // reset the form values to blank after submitting
        this.setState({
            product: Object.assign({}, RESET_VALUES),
            errors: {}
        })
        e.preventDefault()
    }

    render () {
        let currentProduct = this.props.product;
        let formHeading = currentProduct.id === '' ? "Add a new Product" : "Update Product"
        let saveUpdateButton = currentProduct.id === '' ? "Save" : "Update"
        return (
            <form>
                <h4>{formHeading}</h4>
                <p>
                    <label>Product Id <br /> 
                    <input type="text" className="form-control" name="productid" onChange={this.handleChange} value={currentProduct.product.productid} /></label>
                </p>
                <p>
                    <label>Name <br /> 
                    <input type="text" className="form-control" name="name" onChange={this.handleChange} value={currentProduct.product.name} /></label>
                </p>
                <p>
                    <label>Category <br /> 
                    <input type="text" className="form-control" name="category" onChange={this.handleChange} value={currentProduct.product.category} /></label>
                </p>
                <p>
                    <label>Price <br /> 
                    <input type="text" className="form-control" name="price" onChange={this.handleChange} value={currentProduct.product.price} /></label>
                </p>
                <p>                                   
                    <label>In Stock &nbsp; 
                    <input type="checkbox" className="" name="inStock" onChange={this.handleChange} checked={currentProduct.product.inStock} /></label>
                </p>
                <input type="submit" className="btn btn-info" value={saveUpdateButton} onClick={this.handleSave}></input>
            </form>
        )
    }
}

export default ProductForm