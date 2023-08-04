import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ShopNav from './ShopNav';

class Shop extends Component{

    constructor(props) {
        super(props);
   
        this.state = {
            shops: []
        };
    }

    componentDidMount() {
        

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.props.token 
            }
            };

        fetch('http://127.0.0.1:8000/shops/', requestOptions)
            .then((res) => {
                if(res.status === 400) {}
                else { return res.json() }
                }
            ).then((json) => {
                {   
                    this.setState({
                        shops: json
                    });
                }  
            })   
            
    }
    
    render(){
        let shop_blocks = this.state ? (
            this.state.shops.map((item) => {
                console.log("shops--shop_id " + item.shop_id)
                return(
                    <div class="shop-container">
                        <div class="shop-title" >
                            {item.name}     
                        </div>
                        <div class="add-product-shop-button-block">
                            <Link to={{
                                pathname: "/addproduct",
                                shop_id: item.shop_id
                            }}
                                  class="add-product-shop-button">
                                افزودن محصول
                            </Link>
                            <Link to={{
                                pathname: "/report",
                                shop_id: item.shop_id
                            }} class="report-page-shop-button">
                                صفحه گزارش‌ها
                            </Link>
                        </div>
                    </div>
                )
            })
        ):
        (
            <div>
            </div>
        )
        return(
            (
                <div class="shop-page">
                    <ShopNav/>
                    <div class="shop-left-panel">                   
                        <div class="shop-left-panel-head">
                            <Link to="/addshop" class="add-shop-button">
                                افزودن فروشگاه
                            </Link>
                            <div class="shop-head-title" >
                                فروشگاه‌ها       
                            </div>
                        </div>
                        {shop_blocks}
                    </div> 
                </div>
            )
        )        
    }          
}

const mapStateToProps = (state)=>{
    return {
      token: state.token,
    }
}

export default connect(mapStateToProps)(Shop)
