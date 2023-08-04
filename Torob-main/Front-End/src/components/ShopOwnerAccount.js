import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

const emailinputStyle = {
    input: {
        color: "black",
        backgroundColor: "white",
        border: "1px solid #ccc",
        "border-top-left-radius": "4px",
        "border-bottom-left-radius": "4px",
        fontFamily: "iranyekan",
        "padding-left": "10px",
        height: "32px",
        width: "88%"
    }
};

class ShopOwnerAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailClass: 'login-register-input-div'
        };
    }

    componentDidMount() {

        this.setState({
            emailClass: 'login-register-input-div'
        })

    }


    userButtonClick() {
    }

    emailButtonClick() {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.props.token
            },
            body: JSON.stringify({
                "username": this.props.username,
                "email": document.getElementById("address").value
            })
        };
        fetch('http://127.0.0.1:8000/update/', requestOptions)
            .then((res) => {
                    if(res.status === 200) {alert("آدرس ایمیل با موفقیت تغییر یافت")}
                    else {}
                document.getElementById("address").value = ""
                }
            ).then((json) => {

            {

            }
        })
    }

    numberButtonClick() {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.props.token
            },
            body: JSON.stringify({
                "username": this.props.username,
                "phone_number": document.getElementById("number").value
            })
        };
        fetch('http://127.0.0.1:8000/update/', requestOptions)
            .then((res) => {
                    if(res.status === 200) {alert("شماره موبایل با موفقیت تغییر یافت")}
                    else {}
                    document.getElementById("number").value = ""
                }
            ).then((json) => {

            {

            }
        })
    }

    changeNameFocusStyle() {
        document.getElementById("name").style.boxShadow = "0px 0px 0px 3px #e8f1ff";
    }

    changeNameBlurStyle() {
        document.getElementById("name").style.boxShadow = "unset";
    }

    changeAddressFocusStyle() {
        document.getElementById("address").style.boxShadow = "0px 0px 0px 3px #e8f1ff";
    }

    changeAddressBlurStyle() {
        document.getElementById("address").style.boxShadow = "unset";
    }

    changeNumberFocusStyle() {
        document.getElementById("number").style.boxShadow = "0px 0px 0px 3px #e8f1ff";
    }

    changeNumberBlurStyle() {
        document.getElementById("number").style.boxShadow = "unset";
    }

    render() {
        return (
            <body class="shop-page">
            <div class="account-panel">
                <div class="shop-panel-item">
                    <Link to={{
                        pathname: "/shop"
                    }}>
                        <svg stroke="currentColor" color="#333333" fill="none" stroke-width="2" viewBox="0 0 24 24"
                             stroke-linecap="round" stroke-linejoin="round" height="35px" width="35px"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </Link>
                    <div class="shop-panel-item-name">
                        فروشگاه
                    </div>
                </div>
                <div class="shop-panel-item  active-item">
                    <Link to={{
                        pathname: "/shopowneraccount"
                    }}>
                        <svg stroke="currentColor" color="white" fill="none" stroke-width="2" viewBox="0 0 24 24"
                             stroke-linecap="round" stroke-linejoin="round" height="35px" width="35px"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </Link>
                    <div class="shop-panel-item-name">
                        حساب من
                    </div>
                </div>
            </div>
            <div class="middle-panel">
                <button id="usernamebutton" onClick={this.userButtonClick.bind(this)}
                        class="account-middle-panel-change">اطلاعات کاربری
                </button>
                <button id="usernamebutton" onClick={this.userButtonClick.bind(this)}
                        class="account-middle-panel-exit">خروج
                </button>
            </div>
            <div class="shop-account-left-panel">
                <div class="acconut-container">
                    <div class="shop-account-title">
                        اطلاعات فردی
                    </div>
                    <div class="login-register-input-div">
                        <div class="resgister-input-label">
                            نام کاربری
                        </div>
                        <div class="account-input-button">
                            <div className="account-username-block">{this.props.username}</div>
                        </div>
                    </div>
                    <div class="login-register-input-div">
                        <div class="resgister-input-label">
                            آدرس ایمیل
                        </div>
                        <div class="account-input-button">
                            <button id="emailbutton" onClick={this.emailButtonClick.bind(this)}
                                    class="account-change-button">تغییر آدرس ایمیل
                            </button>
                            <input autoComplete='off' id="address" onFocus={this.changeAddressFocusStyle.bind(this)}
                                   onBlur={this.changeAddressBlurStyle.bind(this)} style={emailinputStyle.input}
                            />
                        </div>
                    </div>
                    <div class="login-register-input-div">
                        <div class="resgister-input-label">
                            شماره موبایل
                        </div>
                        <div className="account-input-button">
                        <button id="numberbutton" onClick={this.numberButtonClick.bind(this)}
                                class="account-change-button">تغییر شماره موبایل
                        </button>
                        <input autoComplete='off' id="number" onFocus={this.changeNumberFocusStyle.bind(this)}
                               onBlur={this.changeNumberBlurStyle.bind(this)} style={emailinputStyle.input}/>
                        </div>
                    </div>
                    <div class="add-product-shop-button-block">
                    </div>
                </div>
            </div>
            </body>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        token: state.token
    }
}
export default connect(mapStateToProps)(ShopOwnerAccount)
