import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const inputStyle = {
    input: {
        color: "black",
        backgroundColor: "white",
        border:"1px solid #ccc",
        "border-radius": "4px",
        fontFamily: "iranyekan",
        "padding-left": "2%",
        height: "32px",
        width:"100%"
    }
};

class NewShop extends Component{

    buttonClick () {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': "Token " + this.props.token
            },
            body: JSON.stringify({
                "name": document.getElementById("name").value,
                "link": document.getElementById("address").value
            })
        };
        fetch('http://127.0.0.1:8000/addshop/', requestOptions)
            .then((res) => {
                if(res.status === 400) {}
                else {}
                }
            ).then((json) => {
                {   
                    
                }  
            })
    }

    changeNameFocusStyle(){
        document.getElementById("name").style.boxShadow = "0px 0px 0px 3px #e8f1ff";
    }

    changeNameBlurStyle(){
        document.getElementById("name").style.boxShadow = "unset";
    }

    changeAddressFocusStyle(){
        document.getElementById("address").style.boxShadow = "0px 0px 0px 3px #e8f1ff";
    }

    changeAddressBlurStyle(){
        document.getElementById("address").style.boxShadow = "unset";
    }
    
    render(){
        return(
            (
                <body>
                    <div class="resgister-page">
                        <Link to="/shop" class="register-return">
                            <div class="register-return-text">
                                بازگشت
                            </div>
                            ×
                        </Link>
                        <div class="resgister-container">
                            <div class="resgister-title" >
                                اطلاعات فروشگاه     
                            </div>
                            <div class="login-register-input-div">
                                <div class="resgister-input-label">
                                    نام فروشگاه
                                </div>
                                <input autoComplete='off' id="name" onFocus={this.changeNameFocusStyle.bind(this)} onBlur={this.changeNameBlurStyle.bind(this)} style={inputStyle.input}/> 
                            </div>
                            <div class="login-register-input-div">
                                <div class="resgister-input-label">
                                    آدرس سایت فروشگاه بدون www     
                                </div>
                                <input autoComplete='off' id="address" onFocus={this.changeAddressFocusStyle.bind(this)} onBlur={this.changeAddressBlurStyle.bind(this)} style={inputStyle.input}/> 
                            </div>
                            <button id="button" onClick={this.buttonClick.bind(this)} class="register-button">ثبت فروشگاه</button>
                        </div>
                    </div>
                </body>
            )
        )        
    }          
}
const mapStateToProps = (state)=>{
    return {
      username: state.username,
      token: state.token
    }
}
export default connect(mapStateToProps)(NewShop)
