import React, { Component } from 'react';
import CatalogService from '../services/Catalog';
import Alert from './Alert';
import {Link} from 'react-router-dom';
const REVIEWS_FETCHING ='REVIEWS_FETCHING';
const REVIEWS_FETCHED ='REVIEWS_FETCHED';
const REVIEWS_FETCH_FAILED ='REVIEWS_FETCH_FAILED';
class Reviews extends Component {
    state= {
       
        reviews:null,
        error:null
    };

    render()
     {
        const{status,error,reviews}=this.state;
        let el = null;

        switch(status)
        {
            case REVIEWS_FETCHING:
            el =(
                <Alert type="info">
                     <strong>products reviews are being fetched
                    
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
            case REVIEWS_FETCHED:
                el =(
                    <div className="row">
                        {
                            reviews.map(review=> (
                                <Link className="col-4 my-3" to={`/catalog/product.id/{reviews}`} style={{textDecoration: 'none', color: 'initial'}}>
                         <div className="card">
                        {/*<img className="card-img-top" src={product.imageUrl} alt=""/>*/}
                        <div className="card-body">
                            <h4 className="card-title">Reviewer:{review.reviewer}</h4>
                            <p className="card-text">Title:{review.title}</p>
                            <p className="card-text">Text:{review.text}</p>
                        </div>
                        </div>
                        </Link>
                ))
                        }
                </div>);            
                
                break;
            case REVIEWS_FETCH_FAILED:
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
            state: REVIEWS_FETCHING
        });
        CatalogService.getReviews(this.props.id)
        .then((reviews)=>{
            this.setState({
                reviews: reviews,
                status : REVIEWS_FETCHED
            })

        })
        .catch((error)=>
        {
            this.setState({
                error:error,
                reviews:null,
                status : REVIEWS_FETCH_FAILED

            })
        })
    }
}

export default Reviews;