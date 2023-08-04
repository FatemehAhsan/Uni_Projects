import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AddProduct extends Component{

    constructor(props) {
        super(props);
   
        this.state = {
            items : []
        };
    }

    componentDidMount() {
        
        this.setState({
        })

        console.log("shop_id" + this.props.location.shop_id)
        console.log("token" + this.props.token)
        const requestOptions2 = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.props.token
            }
        };
        fetch("http://localhost:8000/reports/" + this.props.location.shop_id + "/", requestOptions2
        ).then((res) => res.json())
            .then((json) => {
                console.log(json.favorites)
                this.setState({
                        items: json
                    }
                );
            })
    }
    

    buttonClick(){
        this.setState({
        })
    }

    
    removeClick(){
    }

    render(){
        let report_blocks = this.state.items ? 
        (
            this.state.items.map((item) => {
                return(
                    <div class="report-cart">
                        <div class="prdocut-detail-block">
                            {item.product.name}
                        </div>
                        <div class="report-detail-block">
                            {item.user.username}
                            <br/>
                            {item.description === "a"? "این کالا مربوط به این صفحه نیست":
                                (item.description === "b")? "قیمت یا موجودی صحیح نیست":
                                    "میخواهم سفارشم را از این فروشگاه پیگیری کنم"
                            }
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
                <div onFocus={this.removeClick.bind(this)} class="resgister-page">
                    <Link to="/shop" class="report-return">
                        <div class="register-return-text">
                            بازگشت
                        </div>
                        ×
                    </Link>
                    <div class="report-container">
                        <div class="resgister-title" >
                            گزارش‌ها      
                        </div>
                    </div>
                    {report_blocks}    
                </div>
            )
        )        
    }          
}
const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(AddProduct)
