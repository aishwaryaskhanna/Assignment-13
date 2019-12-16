import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'

const RESET_VALUES = { productid: '', category: '', price: '', name: '', inStock:false}

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            products: {},
            currentProduct:{
                id:'',
                product:Object.assign({}, RESET_VALUES)
            }
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.updateDB = this.createUpdateDatabase.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    //Fecth and display products from database
    componentDidMount(){
        fetch("http://localhost:4000/product/get/")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    filterText:'',
                    products:result,
                    currentProduct : {
                        id : '',
                        product :  Object.assign({}, RESET_VALUES)
                    }
                });
            },
            (error) => {
                this.setState({
                    filterText:'',
                    currentProduct : {
                        id : '',
                        product :  Object.assign({}, RESET_VALUES)
                    },
                    error
                })
            }
        )
    }

    //Create/Update the product
    createUpdateDatabase(product,operation){
        let endpoint="";
        if(operation === 'insert')
            endpoint = 'http://localhost:4000/product/create/'
        else
            endpoint = 'http://localhost:4000/product/update/' + product.id
        var xhr = new XMLHttpRequest()
        xhr.open('POST',endpoint)
        xhr.setRequestHeader('Content-Type','application/json')
        xhr.send(JSON.stringify(product));
        this.setState((prevState) => {
            let productList = prevState.products
            productList[product.id] = product
            return { productList }
        })
        this.setState({
            currentProduct : {
                id : '',
                product :  Object.assign({}, RESET_VALUES)
            }
        })
    }

    handleFilter(filterInput) {
        this.setState(filterInput)
    } 
    handleSave(product) {
        if (!product.id) {
            product.id = new Date().getTime()
            this.createUpdateDatabase(product,'insert')
        }
        else {
            this.createUpdateDatabase(product,'update')
        }
    }

    handleUpdate(product){
        this.setState((prevState) => {
            prevState.currentProduct = product;
            return {product}
        })
    }

    handleDestroy(productId) {
        fetch("http://localhost:4000/product/delete/" + productId)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    products:result,
                    currentProduct : {
                        id : '',
                        product :  Object.assign({}, RESET_VALUES)
                    }
                });
            },
            (error) => {
                this.setState({
                    filterText:'',
                    currentProduct : {
                        id : '',
                        product :  Object.assign({}, RESET_VALUES)
                    },
                    error
                })
            }
        )
    }

    render () {
        return (
            <div>
                <h1>My Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>
                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onDestroy={this.handleDestroy}
                    onEdit={this.handleUpdate}>
                </ProductTable>
                <ProductForm
                    onSave={this.handleSave} product={this.state.currentProduct}>
                </ProductForm>
            </div>
        )
    }
}

export default Products