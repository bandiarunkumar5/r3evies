import React, { Component } from 'react';
import CatalogService from '../services/Catalog';
import Alert from './Alert';
import {Link} from 'react-router-dom';
const CATALOG_FETCHING ='CATALOG_FETCHING';
const CATALOG_FETCHED ='CATALOG_FETCHED';
const CATALOG_FETCH_FAILED ='CATALOG_FETCH_FAILED';

class Catalog extends Component {
    state= {
        products:null,
        error:null
    };
    render()
     {
        const{status,error,products}=this.state;
        let el = null;

        switch(status)
        {
            case CATALOG_FETCHING:
            el =(
                <Alert type="info">
                     <strong>products are being fetched
                    
                    </strong> 
                </Alert>
                /*<div className="alert alert-info alert-dismissible fade show" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">Close</span>
                    </button>
                    <strong>products are being fetched
                    
                    </strong> 
                </div>*/
            );
                break;
            case CATALOG_FETCHED:
                el =(
                    <div className="row">
                        {
                            products.map(product=> (
                                <Link className="col-4 my-3" to={`/catalog/${product.id}`}>
                         <div className="card">
                        <img className="card-img-top" src={product.imageUrl} alt=""/>
                        <div className="card-body">
                            <h4 className="card-title">{product.name}</h4>
                            <p className="card-text">{product.price}</p>
                        </div>
                        </div>
                        </Link>
                ))
                        }
                </div>);            
                
                break;
            case CATALOG_FETCH_FAILED:
                el=(
                    <Alert type="danger">
                         <strong>products are unable to fetch
                        <br/>{error.message}</strong>
                    </Alert>
                    /*<div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">Close</span>
                    </button>
                    
                </div>*/
                )
                break;
            default:
                el =null;
                 break;
        }
        return (
            <div>
                <h2>Catalog</h2>
                <hr/>
                {el}
            </div>
        );
    }
    //cdm- for backend call
    componentDidMount() {

        this.setState({
            state: CATALOG_FETCHING
        });
        CatalogService.getProducts()
        .then((products)=>{
            this.setState({
                products: products,
                status : CATALOG_FETCHED
            })

        })
        .catch((error)=>
        {
            this.setState({
                error:error,
                products:null,
                status : CATALOG_FETCH_FAILED

            })
        })
    }
}

export default Catalog;