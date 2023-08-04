import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeUsername } from './actions/actions'

const searchinputStyle = {
    input: {
        color: "black",
        backgroundColor: "white",
        border: 0,
        fontFamily: "iranyekan",
        direction: "rtl",
        "padding-bottom": "10px"
    }
};

const searchInputStyle_m = {
    input: {
        color: "black",
        backgroundColor: "#f2f3f5",
        border: 0,
        height: "43px",
        width:"100%",
        fontFamily: "iranyekan",
        "font-size": "16px",
        "padding-bottom": "2px",
        direction: "rtl"
    }
};

const nameinputStyle = {
    input: {
        color: "black",
        backgroundColor: "white",
        border: 0,
        "padding-left": "10px",
        height: "26px",
        width:"95.7%",
        "padding-bottom": "0px",
        fontFamily: "iranyekan",
    }
};

function hasLowerCase(str) {
    return (/[a-z]/.test(str));
}

function hasUpperCase(str) {
    return (/[A-Z]/.test(str));
}

function hasMoreThan7letter(str) {
    return str.length > 7;
}

function hasEmailForm(str) {
    return (/\S+@\S+\.\S+/.test(str));
}

class Home extends Component{

    constructor(props) {
        super(props);
   
        this.state = {
            mtdisp: 'displaynone',
            laptopdisp: 'displaynone',
            loginregisterdialogue: 'displaynone',
            dim: '',
            loginchange: 'login-register-change-mode',
            registerchange: 'displaynone',
            emailClass: 'login-register-input-div-home',
            userdropdown: 'displaynone',
            usernameError: 'displaynone',
            passwordError: 'displaynone',
            emailError: 'displaynone',
            searchblock: 'displaynone',
            searchItems: [],
            registered: false
        };
    }

    componentDidMount() {
        
        this.setState({
            mtdisp: 'displaynone',
            laptopdisp: 'displaynone',
            loginregisterdialogue: 'displaynone',
            dim: '',
            loginchange: 'login-register-change-mode',
            registerchange: 'displaynone',
            emailClass: 'login-register-input-div-home',
            userdropdown: 'displaynone',
            usernameError: 'displaynone',
            passwordError: 'displaynone',
            emailError: 'displaynone',
            searchblock: 'displaynone'
        })
            
    }

    mobileDropdown(){
        let dispv = this.state.mtdisp === 'disp' ? 'displaynone': 'disp'
        this.setState({
            mtdisp: dispv
        })
    }

    laptopDropdown(){
        let dispv = this.state.laptopdisp === 'disp' ? 'displaynone': 'disp'
        this.setState({
            laptopdisp: dispv
        })
    }


    userButtonClick(){
        let dimv = this.props.username !== null ? '' : (this.state.dim === 'dim' ? '': 'dim')
        let userdropdownv = this.props.username === null ? 'displaynone' : 'user-dropdown'
        let loginregisterdialoguev = this.props.username !== null ? 'displaynone' : (this.state.loginregisterdialogue === 'login-register-dialogue' ? 'displaynone': 'login-register-dialogue')
        this.setState({
            dim: dimv,
            loginregisterdialogue: loginregisterdialoguev,
            userdropdown: userdropdownv
        })
    }

    changePasswordType(){
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
    }

    removeClick(){
        this.state.dim === 'dim' ? this.setState({dim: ''}) : this.setState({})
        this.state.mtdisp === 'disp' ? this.setState({mtdisp: 'displaynone'}) : this.setState({})
        this.state.laptopdisp === 'disp' ? this.setState({laptopdisp: 'displaynone'}) : this.setState({})
        this.state.userdropdown === 'user-dropdown' ? this.setState({userdropdown: 'displaynone'}) : this.setState({})
        this.state.loginregisterdialogue === 'login-register-dialogue' ? this.setState({loginregisterdialogue: 'displaynone'}) : this.setState({})
        this.setState({
            loginchange: 'login-register-change-mode',
            registerchange: 'displaynone',
            emailClass: 'login-register-input-div-home'
        })
        this.setState({searchblock: 'displaynone'})
    }

    loginRegisterClick() {
        let allow = true
        if(this.state.loginchange === 'login-register-change-mode'){
            if (!hasLowerCase(document.getElementById("password").value)){
                this.setState({passwordError: 'error-block'})
                allow = false
            }
            else
                this.setState({passwordError: 'displaynone'})
            if (!hasUpperCase(document.getElementById("password").value)){
                this.setState({passwordError: 'error-block'})
                allow = false
            }
            else
                this.setState({passwordError: 'displaynone'})
            if (!hasMoreThan7letter(document.getElementById("password").value)){
                this.setState({passwordError: 'error-block'})
                allow = false
            }
            else
                this.setState({passwordError: 'displaynone'})
            if (!hasEmailForm(document.getElementById("email").value)){
                this.setState({emailError: 'error-block'})
                allow = false
            }
            else
                this.setState({emailError: 'displaynone'})
            if(allow){
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": document.getElementById("username").value,
                        "password": document.getElementById("password").value,
                        "email": document.getElementById("email").value,
                        "phone_number": Number(document.getElementById("phonenumber").value)})
                };
                fetch('http://127.0.0.1:8000/register/', requestOptions)
                    .then((res) => {
                        if(res.status === 400) {this.setState({usernameError: 'error-block'})}
                        else this.props.changeUsername(document.getElementById("username").value, null)
                        }
                    ).then((json) => {
                        
                    })
            }
        }
        else{
            if (!hasLowerCase(document.getElementById("password").value)){
                this.setState({passwordError: 'error-block'})
                allow = false
            }
            else
                this.setState({passwordError: 'displaynone'})
            if (!hasUpperCase(document.getElementById("password").value)){
                this.setState({passwordError: 'error-block'})
                allow = false
            }
            else
                this.setState({passwordError: 'displaynone'})
            if (!hasMoreThan7letter(document.getElementById("password").value)){
                this.setState({passwordError: 'error-block'})
                allow = false
            }
            if(allow){
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": document.getElementById("username").value,
                        "password": document.getElementById("password").value
                    })
                };
                fetch('http://127.0.0.1:8000/login/', requestOptions)
                    .then((res) => {
                        if(res.status === 400) this.setState({usernameError: 'error-block'})
                        else return res.json() 
                        }
                    ).then((json) => {
                        {   
                            this.props.changeUsername(document.getElementById("username").value, json.token) 
                        }  
                    })  
            }
        }
    }

    closeClick(){
        this.props.changeUsername(null, null)
    }

    changeloginRegisterMode(){
        this.state.loginchange === 'displaynone' ? this.setState({loginchange: 'login-register-change-mode'}) : this.setState({loginchange: 'displaynone'})
        this.state.registerchange === 'login-register-change-mode' ? this.setState({registerchange: 'displaynone'}) : this.setState({registerchange: 'login-register-change-mode'})
        this.state.loginchange === 'login-register-change-mode' ? this.setState({emailClass: 'displaynone'}) : this.setState({emailClass: 'login-register-input-div-home'})
    }

    changeUsernameFocusStyle(){
        document.getElementById("username").style.border = "2px solid black"; 
    }

    changeUsernameBlurStyle(){
        document.getElementById("username").style.border = "0"; 
    }

    changePhoneNumberFocusStyle(){
        document.getElementById("phonenumber").style.border = "2px solid black"; 
    }

    changePhoneNumberBlurStyle(){
        document.getElementById("phonenumber").style.border = "0"; 
    }

    changePasswordFocusStyle(){
        document.getElementById("password").style.border = "2px solid black"; 
    }

    changePasswordBlurStyle(){
        document.getElementById("password").style.border = "0"; 
    }

    changeEmailFocusStyle(){
        document.getElementById("email").style.border = "2px solid black"; 
    }

    changeEmailBlurStyle(){
        document.getElementById("email").style.border = "0"; 
    }

    changeBlurStyle(){
        document.getElementById("searchinput").style.border = "0"; 
    }

    searchInput(){
        this.setState({searchblock: 'search-block'})
        fetch("http://localhost:8000/search/" + document.getElementById("searchinput").value
            ).then((res) => res.json())
            .then((json) => {
                console.log("search-json", json.length)
                this.setState({
                    searchItems: json
                }
            );
        })
    }

    render(){
        let search_items_blocks = this.state.searchItems ?
            (
                this.state.searchItems.map((item) => {
                    return(
                        <div class="prdocut-detail-block">
                            <Link class="search-item" to={"/products/" + item.product_id + "/"}>
                                    {item.name}
                            </Link>
                        </div>
                    )
                })
            ):
            (
                <div>
                </div>
            )
        const resolution = window.innerWidth;
        const isDesktop = resolution >= 768
        let loginregistervalue = this.props.username === null ? "ورود / ثبت نام" : this.props.username  
        return isDesktop ? (
            <div class="home-page">
                <div class={this.state.loginregisterdialogue}>
                    <div class="login-register-close-flex">
                        <div onClick={this.removeClick.bind(this)} class="login-register-close">
                            ×
                        </div>
                    </div>
                    <div class="login-register-div">
                        <div class="login-register-title">
                            ورود یا ثبت نام{ this.state.registered }
                        </div>
                        <div class="login-register-line">
                        </div>
                    </div>
                    <div class="login-register-input-div-home">
                        <div class="login-register-input-label">
                            نام کاربری{}
                        </div>
                        <div class="input-block">
                            <input autocomplete="off" id="username" onFocus={this.changeUsernameFocusStyle.bind(this)} onBlur={this.changeUsernameBlurStyle.bind(this)} style={nameinputStyle.input} type="text" /> 
                        </div>
                        <div class={this.state.usernameError}>
                            نام کاربری قبلا استفاده شده است.
                        </div>
                    </div>
                    <div class={this.state.loginchange !== 'displaynone' ? "login-register-input-div-home" : "displaynone"}>
                        <div class="login-register-input-label">
                            شماره موبایل 
                        </div>
                        <div class="input-block">
                            <input autocomplete="off" id="phonenumber" onFocus={this.changePhoneNumberFocusStyle.bind(this)} onBlur={this.changePhoneNumberBlurStyle.bind(this)} style={nameinputStyle.input} type="text" /> 
                        </div>
                    </div>
                    <div class="login-register-input-div-home">
                        <div class="login-register-input-label">
                            رمز عبور
                        </div>
                        <div class="input-block">
                            <input id="password" autoComplete='off' onFocus={this.changePasswordFocusStyle.bind(this)} onBlur={this.changePasswordBlurStyle.bind(this)} style={nameinputStyle.input} type="password" /> 
                        </div>
                        <label>
                            <input type="checkbox" onClick={this.changePasswordType.bind(this)}/>
                            <span class="checkbox-text">
                                show password
                            </span>
                        </label>
                        <div class={this.state.passwordError}>
                            رمز عبور باید دارای حداقل ۸ حرف و شامل یک حرف بزرگ، یک حرف کوچک و یک عدد باشد.
                        </div>
                    </div>
                    <div class={this.state.emailClass}>
                        <div class="login-register-input-label">
                            آدرس ایمیل
                        </div>
                        <div class="input-block">
                            <input autoComplete='off' id="email" style={nameinputStyle.input} onFocus={this.changeEmailFocusStyle.bind(this)} onBlur={this.changeEmailBlurStyle.bind(this)} type="text" /> 
                        </div>
                        <div class={this.state.emailError}>
                            آدرس ایمیل وارد شده معتبر نیست.
                        </div>
                    </div>
                    <button id="usernamebutton" onClick={this.loginRegisterClick.bind(this)} class="login-register-button">{this.state.loginchange === 'displaynone' ? "ورود" : "ثبت نام"} </button>
                    <a onClick={this.changeloginRegisterMode.bind(this)} class={this.state.loginchange}>
                        .قبلاً در ترب حساب کاربری داشتم
                    </a>
                    <a onClick={this.changeloginRegisterMode.bind(this)} class={this.state.registerchange}>
                        .حساب کاربری جدید می‌سازم
                    </a>   
                </div>
                <div onClick={this.removeClick.bind(this)} class={"home " + this.state.dim}>
                    <div class="navbar">
                        <div class="nav-links">
                            <a onClick={this.mobileDropdown.bind(this)} class="nav-item">موبایل و تبلت</a>
                            <a onClick={this.laptopDropdown.bind(this)} class="nav-item" >لپ‌تاپ</a>
                        </div>
                        <div>
                            <button onClick={this.userButtonClick.bind(this)} class="user-button">{loginregistervalue}</button>
                            <div class={this.state.userdropdown}>
                                <Link class="navlinks" to="/favorite">
                                    محبوب‌ها
                                </Link>
                                <Link class="navlinks" to="/history">
                                    مشاهدات اخیر
                                </Link>
                                <div class="navlinks" onClick={this.closeClick.bind(this)}>
                                    خروج
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class={this.state.mtdisp}>
                        <div class="dropdown-items">
                            <Link to="/browse/mobiletablet" class="dropdown-title">
                                موبایل و تبلت
                            </Link>
                            <div class="dropdown-categories">
                                <div class="category">
                                    <Link to="/browse/mobiletablet/mobile" class="category-title">
                                        گوشی موبایل 
                                    </Link>
                                    <Link to="/browse/mobiletablet/mobile/samsung" class="category-item">
                                        گوشی سامسونگ
                                    </Link>
                                    <Link to="/browse/mobiletablet/mobile/xiaomi" class="category-item">
                                        گوشی شیائومی
                                    </Link>
                                    <Link to="/browse/mobiletablet/mobile/apple" class="category-item">
                                        گوشی اپل
                                    </Link>
                                </div>
                                <div class="category">
                                    <Link to="/browse/mobiletablet/tablet" class="category-title">
                                        تبلت 
                                    </Link>
                                    <Link to="/browse/mobiletablet/tablet/samsung" class="category-item">
                                        تبلت سامسونگ
                                    </Link>
                                    <Link to="/browse/mobiletablet/tablet/xiaomi" class="category-item">
                                        تبلت  شیائومی
                                    </Link>
                                    <Link to="/browse/mobiletablet/tablet/apple" class="category-item">
                                        تبلت اپل
                                    </Link>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div class={this.state.laptopdisp}>
                        <div class="dropdown-items">
                            <Link to="/browse/laptop" class="dropdown-title">
                                لپتاپ
                            </Link>
                            <div class="dropdown-categories">
                                <div class="category">
                                    <Link to="/browse/laptop/laptop" class="category-title">
                                        لپتاپ 
                                    </Link>
                                    <Link to="/browse/laptop/laptop/lenovo" class="category-item">
                                        لپتاپ لنوو
                                    </Link>
                                    <Link to="/browse/laptop/laptop/asus" class="category-item">
                                        لپتاپ  ایسوس
                                    </Link>
                                    <Link to="/browse/laptop/laptop/apple" class="category-item">
                                        لپتاپ اپل
                                    </Link>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div class="home-content">
                        <div class="home-title-icon">   
                            <div class="home-title-detail">
                                <div class="home-title">
                                    ترب
                                </div>
                                <div class="home-detail">
                                    موتور جستجوی هوشمند خرید
                                </div>
                            </div>
                            <Link to="/">
                                <img src="https://torob.com/static/images/torob_logo.svg"/>
                            </Link>
                        </div>
                        <div class="search">
                            <input autoFocus id="searchinput" onInput={this.searchInput.bind(this)} onBlur={this.changeBlurStyle.bind(this)} style={searchinputStyle.input} type="text" placeholder="نام کالا را وارد کنید" />
                            <img class="serachicon" src="https://torob.com/static/images/search.svg"/>       
                        </div>
                        <div class={this.state.searchblock}>
                            {search_items_blocks}
                        </div>
                    </div>
                    <div class="navbar-bottom">
                        <Link to={{
                            pathname: "/shop",
                            state: {
                                username: this.props.username
                            }
                        }} class="nav-item-bottom">پنل فروشگاه‌ها</Link>
                    </div>
                </div>    
            </div>
        ):
        (
            <div>
                <div class={this.state.loginregisterdialogue}>
                    <div class="login-register-close-flex">
                        <div onClick={this.removeClick.bind(this)} class="login-register-close">
                            ×
                        </div>
                    </div>
                    <div class="login-register-input-div-home">
                        <div class="login-register-title">
                            ورود یا ثبت نام
                        </div>
                        <div class="login-register-line">
                        </div>
                    </div>
                    <div class="login-register-input-div-home">
                        <div class="login-register-input-label">
                            نام کاربری
                        </div>
                        <div class="input-block">
                            <input autocomplete="off" id="username" onFocus={this.changeUsernameFocusStyle.bind(this)} onBlur={this.changeUsernameBlurStyle.bind(this)} style={nameinputStyle.input} type="text" /> 
                        </div>
                        <div class={this.state.usernameError}>
                            نام کاربری قبلا استفاده شده است.
                        </div>
                    </div>
                    <div class="login-register-input-div-home">
                        <div class="login-register-input-label">
                            رمز عبور
                        </div>
                        <div class="input-block">
                            <input id="password" autoComplete='off'onFocus={this.changePasswordFocusStyle.bind(this)} onBlur={this.changePasswordBlurStyle.bind(this)} style={nameinputStyle.input} type="password" /> 
                        </div>
                        <label>
                            <input type="checkbox" onClick={this.changePasswordType.bind(this)}/>
                            <span class="checkbox-text">
                                show password
                            </span>
                        </label>
                        <div class={this.state.passwordError}>
                            رمز عبور باید دارای حداق ۸ حرف و شامل یک حرف بزرگ، یک حرف کوچک و یک عدد باشد.
                        </div>
                    </div>
                    <div class={this.state.emailClass}>
                        <div class="login-register-input-label">
                            آدرس ایمیل
                        </div>
                        <div class="input-block">
                            <input autocomplete="off" id="email" style={nameinputStyle.input} onFocus={this.changeEmailFocusStyle.bind(this)} onBlur={this.changeEmailBlurStyle.bind(this)} type="text" /> 
                        </div>
                        <div class={this.state.emailError}>
                            آدرس ایمیل وارد شده معتبر نیست.
                        </div>
                    </div>
                    <button id="usernamebutton" onClick={this.loginRegisterClick.bind(this)} class="login-register-button">ثبت نام</button>
                    <a onClick={this.changeloginRegisterMode.bind(this)} class={this.state.loginchange}>
                        .قبلاً در ترب حساب کاربری داشتم
                    </a>
                    <a onClick={this.changeloginRegisterMode.bind(this)} class={this.state.registerchange}>
                        .حساب کاربری جدید می‌سازم
                    </a>   
                </div>
                <div class="home-m">
                    <Link to="/">
                        <img src="https://torob.com/static/images/torob_logo.svg"/>
                    </Link>
                    <div class='search-m'>
                        <input autocomplete="off" id="maxvalue" placeholder="نام کالا را وارد کنید" style={searchInputStyle_m.input} type="text" /> 
                        <svg fill="#808080" class="search-svg-m" height="50" viewBox="0 0 24 24" width="50" xmlns="http://www.w3.org/2000/svg" title="search"> <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path> <path d="M0 0h24v24H0z" fill="none"></path> </svg>    
                    </div>
                </div>
                <div class="navbar-bottom-m">
                    <div onClick={this.userButtonClick.bind(this)} class="navbar-bottom-item-m">
                        <svg stroke="currentColor" color="#808080" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        ترب من
                    </div>
                    <div class="navbar-bottom-item-m">
                        <svg fill="#808080" class="search-svg-icon-m" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" title="search"> <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path> <path d="M0 0h24v24H0z" fill="none"></path> </svg>    
                        جستجو
                    </div>
                </div>        
            </div>     
        )        
    }
}
const mapStateToProps = (state)=>{
    return {
      username: state.username,
      token: state.token
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        changeUsername: (username, token) => {dispatch(changeUsername(username, token))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
