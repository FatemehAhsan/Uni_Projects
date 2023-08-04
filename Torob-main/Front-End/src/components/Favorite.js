import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const empty ="M21.233 3.881C20.077 2.693 18.535 2 16.898 2a6.268 6.268 0 0 0-4.433 1.881l-.385.396-.385-.396a6.104 6.104 0 0 0-8.768 0C1.674 5.07 1 6.752 1 8.436c0 1.683.674 3.366 1.83 4.554l8.48 8.713c.192.198.385.297.674.297.289 0 .481-.099.674-.297l8.479-8.713c1.156-1.188 1.83-2.871 1.83-4.554.193-1.684-.481-3.367-1.734-4.555zm-1.349 7.723l-7.804 8.02-7.804-8.02c-.867-.891-1.253-1.98-1.253-3.168 0-1.188.482-2.278 1.253-3.169.77-.89 1.927-1.287 2.987-1.287 1.156 0 2.216.396 3.083 1.287l1.06 1.09a.914.914 0 0 0 1.349 0l.963-1.09c.867-.792 1.927-1.287 3.18-1.287 1.156 0 2.216.495 3.083 1.287.77.891 1.252 1.98 1.252 3.169 0 1.188-.482 2.277-1.349 3.168z"
const fill ="M21.233 3.881C20.077 2.693 18.535 2 16.898 2a6.268 6.268 0 0 0-4.433 1.881l-.385.396-.385-.396a6.104 6.104 0 0 0-8.768 0C1.674 5.07 1 6.752 1 8.436c0 1.683.674 3.366 1.83 4.554l8.48 8.713c.192.198.385.297.674.297.289 0 .481-.099.674-.297l8.479-8.713c1.156-1.188 1.83-2.871 1.83-4.554.193-1.684-.481-3.367-1.734-4.555z"

const nameinputStyle = {
    input: {
        color: "black",
        backgroundColor: "white",
        border: 0,
        "padding-left": "10px",
        height: "26px",
        width:"300px",
        "padding-bottom": "0px",
        fontFamily: "iranyekan",
    }
};

const searchinputStyle = {
    input: {
        color: "black",
        backgroundColor: "white",
        border:"0",
        fontFamily: "iranyekan",
        direction: "rtl",
        width: "100%",
        height: "41px",
        "padding-bottom" : "2px",
        "border-radius": "4px",
        "padding-right": "10px"
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

class Mobiletablet extends Component{

    constructor(props) {
        super(props);
   
        this.state = {
            mtdisp: 'displaynone',
            laptopdisp: 'displaynone',
            userdropdownClick: 1,
            searchblock: 'displaynone',
            searchItems: [],
            items:[],
            loginregisterdialogue: 'displaynone',
            dim: '',
            loginchange: 'login-register-change-mode',
            registerchange: 'displaynone',
            emailClass: 'login-register-input-div-home',
            userdropdown: 'displaynone',
            usernameError: 'displaynone',
            passwordError: 'displaynone',
            emailError: 'displaynone',
        };
    }

    componentDidMount() {
        
        this.setState({
            mtdisp: 'displaynone',
            laptopdisp: 'displaynone'
        })        

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token " + this.props.token
            }
        };
        fetch("http://localhost:8000/profile/" + this.props.username + "/", requestOptions
        ).then((res) => res.json())
            .then((json) => {
                this.setState({
                        items: json.favorites
                    }
                );
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
    
    mobileDropdown(){
        let dispv = this.state.mtdisp === 'disp' ? 'displaynone': 'disp-nav'
        this.setState({
            mtdisp: dispv
        })
    }

    laptopDropdown(){
        let dispv = this.state.laptopdisp === 'disp' ? 'displaynone': 'disp-nav'
        this.setState({
            laptopdisp: dispv
        })
    }

    changeFocusStyle(){
        document.getElementById("searchinput").style.border = "2px solid black"; 
    }

    changeBlurStyle(){
        document.getElementById("searchinput").style.border = "0"; 
        this.setState({searchblock: 'displaynone'})
    }

    userButtonClick(){
        let dimv = this.props.username !== null ? '' : (this.state.dim === 'dim' ? '': 'dim')
        document.getElementById("user-button").style.backgroundColor = "var(--white)";
        let userdropdownv = this.state.userdropdownClick && this.props.username !== null? 'user-dropdown-nav' : 'displaynone'
        let loginregisterdialoguev = this.props.username !== null ? 'displaynone' : (this.state.loginregisterdialogue === 'login-register-dialogue' ? 'displaynone': 'login-register-dialogue')
        this.setState({
            dim: dimv,
            userdropdown: userdropdownv,
            userdropdownClick: ~this.state.userdropdownClick,
            loginregisterdialogue: loginregisterdialoguev
        })
    }

    closeClick(){
        this.props.changeUsername(null)
    }

    removeClick(){
        this.state.dim === 'dim' ? this.setState({dim: ''}) : this.setState({})
        this.state.mtdisp === 'disp-nav' ? this.setState({mtdisp: 'displaynone'}) : this.setState({})
        this.state.laptopdisp === 'disp-nav' ? this.setState({laptopdisp: 'displaynone'}) : this.setState({})
        this.state.userdropdown === 'user-dropdown-nav' ? this.setState({userdropdown: 'displaynone'}) : this.setState({})
        this.state.loginregisterdialogue === 'login-register-dialogue' ? this.setState({loginregisterdialogue: 'displaynone'}) : this.setState({})
        this.setState({
            loginchange: 'login-register-change-mode',
            registerchange: 'displaynone',
            emailClass: 'login-register-input-div-home'
        })
    }

    loginRegisterClick() {
        let allow = true
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
        if(allow)
            this.props.changeUsername(document.getElementById("username").value)
    }

    closeClick(){
        this.props.changeUsername(null)
    }

    changeloginRegisterMode(){
        this.state.loginchange === 'displaynone' ? this.setState({loginchange: 'login-register-change-mode'}) : this.setState({loginchange: 'displaynone'})
        this.state.registerchange === 'login-register-change-mode' ? this.setState({registerchange: 'displaynone'}) : this.setState({registerchange: 'login-register-change-mode'})
        this.state.loginchange === 'login-register-change-mode' ? this.setState({emailClass: 'displaynone'}) : this.setState({emailClass: 'login-register-input-div-home'})
    }

    changePasswordType(){
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
    }

    changeUsernameFocusStyle(){
        document.getElementById("username").style.border = "2px solid black"; 
    }

    changeUsernameBlurStyle(){
        document.getElementById("username").style.border = "0"; 
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
        this.setState({searchblock: 'displaynone'})
    }

    searchInput(){
        this.setState({searchblock: 'search-block-nav'})
        fetch("http://localhost:3000/api/" + document.getElementById("searchinput").value
            ).then((res) => res.json())
            .then((json) => {
                this.setState({
                    searchItems: json
                }
            );
        })
    }


    render(){
        let favorite_blocks = this.state.items ? (
            this.state.items.map((item) => {
                return(
                    <div class="favorite-card">
                        <Link to={"/products/" + item.product_id} class="favorite-link">
                            <div class="product-img-block">
                                <img src={item.img_src}></img>
                            </div>
                            <div class="product-detail">
                                {item.name}
                            </div>
                            <div class="product-price">
                                از {item.min_price} تومان   
                            </div>
                        </Link> 
                        <div class="favorite">
                            <svg fill={"#d73948"} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="علاقه‌مندی"><g><path d={fill}></path></g></svg>
                        </div> 
                    </div>
                )
            })
        ):
        (
            <div>
            </div>
        )
        let userbuttonname = this.props.username ? this.props.username : "ورود / ثبت نام"
        return(
            <body class="browse-page">
                <div class={this.state.loginregisterdialogue}>
                    <div class="login-register-close-flex">
                        <div onClick={this.removeClick.bind(this)} class="login-register-close">
                            ×
                        </div>
                    </div>
                    <div class="login-register-div">
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
                            <input autoComplete='off' id="email" style={nameinputStyle.input} onFocus={this.changeEmailFocusStyle.bind(this)} onBlur={this.changeEmailBlurStyle.bind(this)} type="text" /> 
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
                <div onClick={this.removeClick.bind(this)} class={this.state.dim}>
                    <nav>
                        <div class="navtop">
                            <div class="nav-dropdown">
                                <button id="user-button" onClick={this.userButtonClick.bind(this)} class="nav-userbutton">
                                    {userbuttonname}
                                </button>
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
                            <div class="nav-search-icon">
                                <div class="nav-search">
                                    <div class="nav-serachicon">     
                                        <svg fill="white" height="33" viewBox="0 0 24 24" width="33" xmlns="http://www.w3.org/2000/svg" title="search"> <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path> <path d="M0 0h24v24H0z" fill="none"></path> </svg>
                                    </div>
                                    <input id="searchinput" onInput={this.searchInput.bind(this)} onFocus={this.changeFocusStyle.bind(this)} onBlur={this.changeBlurStyle.bind(this)} style={searchinputStyle.input} type="text" placeholder="نام کالا را وارد کنید" />
                                </div>
                                <div class={this.state.searchblock}>
                                </div>
                                <Link to="/">
                                    <div class="nav-title-icon">
                                        <p class="navtitle">
                                            ترب
                                        </p>
                                        <img src="https://torob.com/static/images/torob_logo.svg" class="nav-icon"/>
                                    </div>    
                                </Link>
                            </div>
                        </div>
                        <div class="navlinks">
                            <a onClick={this.mobileDropdown.bind(this)} class="navitem">موبایل و تبلت</a>
                            <a onClick={this.laptopDropdown.bind(this)} class="navitem" >لپ‌تاپ</a>
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
                    </nav>
                    <div>
                        <div class="favorite-panel">
                            <div class="category-list-title"> 
                                محبوب‌ها   
                            </div>
                            <div class="favorites">
                                {favorite_blocks}
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        username: state.username,
        token: state.token
    }
  }

export default connect(mapStateToProps)(Mobiletablet)