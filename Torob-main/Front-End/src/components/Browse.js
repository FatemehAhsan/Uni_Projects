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
        width:"100%",
        "padding-bottom": "0px",
        fontFamily: "iranyekan",
    }
};

const priceInputStyle = {
    input: {
        color: "black",
        backgroundColor: "white",
        "padding-left": "10px",
        border: 0,
        height: "35px",
        fontFamily: "iranyekan",
        "font-size": "14px",
        "padding-bottom": "2px"
    }
};

const searchInputStyle = {
    input: {
        color: "black",
        backgroundColor: "white",
        border: 0,
        height: "41px",
        width:"90%",
        fontFamily: "iranyekan",
        "font-size": "14px",
        "padding-bottom": "2px",
        direction: "rtl"
    }
};

function convertToEnglishNumber(inp){
    return inp.replace(/[۰-۹]/g, c => String.fromCharCode(c.charCodeAt(0) - 1728))
}
function convertToPersianNumber(inp){
    return inp.replace(/[0-9]/g, c => String.fromCharCode(c.charCodeAt(0) + 1728))
}

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


class Browse extends Component{

    constructor(props) {
        super(props);
   
        this.state = {
            mtdisp: 'displaynone',
            laptopdisp: 'displaynone',
            sortbuttonClicked: null,
            categoryDropdownClicked: null,
            priceDropdownClicked: null,
            showPriceButtonClicked: null,
            minValues: '۰',
            maxValues : '۲۰۰۰۰۰۰۰',
            favoriteClickColor: "#999",
            favorites: [],
            userdropdownClick: 1,
            searchblock: 'displaynone',
            searchItems: [],
            loginregisterdialogue: 'displaynone',
            dim: '',
            loginchange: 'login-register-change-mode',
            registerchange: 'displaynone',
            emailClass: 'login-register-input-div-home',
            userdropdown: 'displaynone',
            usernameError: 'displaynone',
            passwordError: 'displaynone',
            emailError: 'displaynone',
            user_favorites: [],
            items: undefined
        };

        let followPath = ""
        this.props.match.params.categoryid ? followPath += '/' + this.props.match.params.categoryid : followPath = followPath
        this.props.match.params.subcategoryid ? followPath += '/' + this.props.match.params.subcategoryid : followPath = followPath

        let head = this.props.match.params.headid ? this.props.match.params.headid : ""

        fetch("http://127.0.0.1:8000/browse/" + head + followPath + "/"
            ).then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json
                }
            );
        })

        if(this.props.token){
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
                            user_favorites: json.favorites
                        }
                    );
                })
        }
    }

    componentDidMount() {
        
        this.setState({
            mtdisp: 'displaynone',
            laptopdisp: 'displaynone',
            head: this.props.match.params.headid,
            category: this.props.match.params.categoryid,
            subcategory: this.props.match.params.subcategoryid,
        })
        
    }
    
    updateProducts = () => {
        let followPath = ""
        this.props.match.params.categoryid ? followPath += '/' + this.props.match.params.categoryid : followPath = followPath
        this.props.match.params.subcategoryid ? followPath += '/' + this.props.match.params.subcategoryid : followPath = followPath

        let head = this.props.match.params.headid ? this.props.match.params.headid : ""

        fetch("http://127.0.0.1:8000/browse/" + head + followPath + "/"
            ).then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json
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

    showCategoryDropdown(){
        document.getElementById("categorydropdown").style.backgroundColor = "unset";
        this.setState({categoryDropdownClicked: ~this.state.categoryDropdownClicked})
    }

    showPriceDropdown(){
        document.getElementById("pricedropdown").style.backgroundColor = "unset";
        this.setState({priceDropdownClicked: ~this.state.priceDropdownClicked})
    }


    saveSortButtonClick(){
        document.getElementById("sortbuttonicon").style.backgroundColor = "unset";
        this.setState({sortbuttonClicked: ~this.state.sortbuttonClicked})
    }

    priceButtonClick(){
        var filteredItems = this.state.items
        filteredItems = filteredItems.filter((a) => (a.max_price <= Number(convertToEnglishNumber(this.state.maxValues)) && a.min_price >= Number(convertToEnglishNumber(this.state.minValues))))
        this.setState({
            showPriceButtonClicked: ~this.state.showPriceButtonClicked,
            items: filteredItems
        })
    }

    changeUsernameBlurStyle(){
        document.getElementById("username").style.border = "1px solid #ccc"; 
    }

    minValueInput(){
        this.setState({minValues: document.getElementById("minvalue").value})
    }

    maxValueInput(){
        this.setState({maxValues: document.getElementById("maxvalue").value})
    }


    removePriceClick(){
        this.setState({showPriceButtonClicked: ~this.state.showPriceButtonClicked})
    }

    sortByDate(){
        const sortedItems = [].concat(this.state.items)
        sortedItems.sort((a, b) => (a.date < b.date) ? 1 : -1)
        this.setState({items: sortedItems})
    }

    sortByMaxPrice(){
        const sortedItems = [].concat(this.state.items)
        sortedItems.sort((a, b) => (a.price < b.price) ? 1 : -1)
        this.setState({items: sortedItems})
    }

    sortByMinPrice(){
        const sortedItems = [].concat(this.state.items)
        sortedItems.sort((a, b) => (a.price > b.price) ? 1 : -1)
        this.setState({items: sortedItems})
    }
    
    userButtonClick(){
        let dimv = this.props.username !== null ? '' : (this.state.dim === 'dim' ? '': 'dim')
        document.getElementById("user-button").style.backgroundColor = "var(--white)";
        let userdropdownv = this.state.userdropdownClick && this.props.username !== null? 'user-dropdown-nav' : 'displaynone'
        let loginregisterdialoguev = this.props.username !== null ? 'displaynone' : (this.state.loginregisterdialogue === 'login-register-dialogue' ? 'displaynone': 'login-register-dialogue')
        this.setState({
            dim: dimv,
            userdropdown: userdropdownv,
            loginregisterdialogue: loginregisterdialoguev,
            userdropdownClick: ~this.state.userdropdownClick
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

    closeClick(){
        this.props.changeUsername(null)
    }

    setCommaPart = (string) => {
        if(string){
            let revString = [...string].reverse().join('');
            let chunks = revString.match(/.{1,3}/g);
            let finalString = chunks.join(',');
            return [...finalString].reverse().join('');
        }
        else
            return "";
    }

    setComma = (number) => {
        let string = number.toString()
        let strings = string.split(".")
        let chunks = []
        chunks[0] = this.setCommaPart(strings[0])
        chunks[1] = this.setCommaPart(strings[1])
        if(chunks[1])
            return chunks.join(".")
        else
            return chunks.join("")
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

    brandInput(){
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

    setFavorite(productid) {
        const requestOptionsforfavorite = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': "Token " + this.props.token
            },
            body: JSON.stringify({
                "username": this.props.username,
                "product_id": productid
            })
        };
       
        
        fetch("http://127.0.0.1:8000/addfavorite/", requestOptionsforfavorite)
            .then((res) => res.json())
            .then((json) => {
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
                            user_favorites: json.favorites
                        }
                    );
                })
    }

    removeFavorite(productid) {
        const requestOptionsforfavorite = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': "Token " + this.props.token
            },
            body: JSON.stringify({
                "username": this.props.username,
                "product_id": productid
            })
        };
       
        
        fetch("http://127.0.0.1:8000/removefavorite/", requestOptionsforfavorite)
            .then((res) => res.json())
            .then((json) => {
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
                            user_favorites: json.favorites
                        }
                    );
                })
    }

    render(){
        let userbuttonname = this.props.username ? this.props.username : "ورود / ثبت نام"
        let head = this.props.match.params.headid
        let category = this.props.match.params.categoryid
        let subCategory = this.props.match.params.subcategoryid
        let brandName
        switch(head){
            case('mobiletablet'):
                head = 'موبایل و تبلت'
                break;
            case('laptop'):
                head = 'لپ‌تاپ'
                break;
        }
        switch(category){
            case('laptop'):
                category = 'لپ‌تاپ'
                break;
            case('mobile'):
                category = 'موبایل'
                break;
            case('tablet'):
                category = 'تبلت'
                break;
            case('apple'):
                category = 'اپل (Apple)'
                break;
            case('samsung'):
                category = 'سامسونگ (Samsung)'
                break;
            case('xiaomi'):
                category = 'شیائومی (Xiaomi)'
                break;                
        }
        switch(subCategory){
            case('apple'):
                subCategory = 'اپل (Apple)'
                brandName = 'اپل'
                break;
            case('samsung'):
                subCategory = 'سامسونگ (Samsung)'
                brandName = 'سامسونگ'
                break;
            case('xiaomi'):
                subCategory = 'شیائومی (Xiaomi)'
                brandName = 'شیائومی'
                break;
            case('lenovo'):
                subCategory = 'لنوو (Lenovo)'
                brandName = 'لنوو'
                break;
            case('asus'):
                subCategory = 'ایسوس (Asus)'
                brandName = 'ایسوس'
                break; 
        }
        let categorySlashShow = category ? '\\' : 'displaynone'
        let subCategorySlashShow = subCategory ? '\\' : 'displaynone'
        let title = category ? category : head
        subCategory ? title = subCategory : title = title
        head === 'موبایل و تبلت' && category === undefined ? title = 'محصولات ' + title : title = title
        category === 'موبایل' ? title = 'گوشی ' + title : title = title
        category === 'تبلت' && subCategory !== undefined ? title = 'تبلت ' + title : title = title
        head === 'لپ‌تاپ' && subCategory !== undefined ? title = 'لپ‌تاپ ' + title : title = title
        let leftPanelTitle = category ? 'انتخاب برند' : 'دسته‌بندی دقیق‌تر'
        let showCategoryButtonClicked = subCategory ? 1 : 0
        let addedItems = this.state.items ?
            (  
                this.state.items.map((item) => {
                    let favorite
                    if(this.state.user_favorites)
                        favorite = this.state.user_favorites.find((fav) => fav.product_id === item.product_id)
                    return(
                        <div key = {item.id} class="product-card">
                            <Link to={"/products/" + item.product_id + "/"} class="favorite-link">
                                <div>
                                    <img src={item.img_src}></img>
                                </div>
                                <div class="product-detail">
                                    {item.name}
                                </div>
                                <div class="product-price">
                                    از {this.setComma(convertToPersianNumber(item.min_price.toString()))} تومان
                                </div>    
                            </Link>
                            <div onClick={() => {favorite ? this.removeFavorite(item.product_id) : this.setFavorite(item.product_id)}} class="favorite">
                                <svg fill={favorite? "#d73948" : "#999"}
                                     width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="علاقه‌مندی">
                                    <g><path d={favorite? fill : empty}></path>
                                    </g>
                                </svg>
                            </div> 
                        </div>
                    )
                })
            ):
            (
                <p></p>
            ) 
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
                            <input autocomplete="off" id="username" onFocus={this.changeUsernameFocusStyle.bind(this)} onBlur={this.changeUsernameBlurStyle.bind(this)} style={nameinputStyle.input}/> 
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
                            <input autoComplete='off' id="email" style={nameinputStyle.input} onFocus={this.changeEmailFocusStyle.bind(this)} onBlur={this.changeEmailBlurStyle.bind(this)}/> 
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
                                    <input id="searchinput" onInput={this.searchInput.bind(this)} onFocus={this.changeFocusStyle.bind(this)} onBlur={this.changeBlurStyle.bind(this)} style={searchinputStyle.input}placeholder="نام کالا را وارد کنید" />
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
                                <Link to="/browse/mobiletablet" onClick={() => this.updateProducts()} class="dropdown-title">
                                    موبایل و تبلت
                                </Link>
                                <div class="dropdown-categories">
                                    <div class="category">
                                        <Link to="/browse/mobiletablet/mobile" onClick={() => this.updateProducts()} class="category-title">
                                            گوشی موبایل 
                                        </Link>
                                        <Link to="/browse/mobiletablet/mobile/samsung" onClick={() => this.updateProducts()} class="category-item">
                                            گوشی سامسونگ
                                        </Link>
                                        <Link to="/browse/mobiletablet/mobile/xiaomi" onClick={() => this.updateProducts()} class="category-item">
                                            گوشی شیائومی
                                        </Link>
                                        <Link to="/browse/mobiletablet/mobile/apple" onClick={() => this.updateProducts()} class="category-item">
                                            گوشی اپل
                                        </Link>
                                    </div>
                                    <div class="category">
                                        <Link to="/browse/mobiletablet/tablet" onClick={() => this.updateProducts()} class="category-title">
                                            تبلت 
                                        </Link>
                                        <Link to="/browse/mobiletablet/tablet/samsung" onClick={() => this.updateProducts()} class="category-item">
                                            تبلت سامسونگ
                                        </Link>
                                        <Link to="/browse/mobiletablet/tablet/xiaomi" onClick={() => this.updateProducts()} class="category-item">
                                            تبلت  شیائومی
                                        </Link>
                                        <Link to="/browse/mobiletablet/tablet/apple" onClick={() => this.updateProducts()} class="category-item">
                                            تبلت اپل
                                        </Link>
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <div class={this.state.laptopdisp}>
                            <div class="dropdown-items">
                                <Link to="/browse/laptop" onClick={() => this.updateProducts()} class="dropdown-title">
                                    لپتاپ
                                </Link>
                                <div class="dropdown-categories">
                                    <div class="category">
                                        <Link to="/browse/laptop/laptop" onClick={() => this.updateProducts()} class="category-title">
                                            لپتاپ 
                                        </Link>
                                        <Link to="/browse/laptop/laptop/lenovo" onClick={() => this.updateProducts()} class="category-item">
                                            لپتاپ لنوو
                                        </Link>
                                        <Link to="/browse/laptop/laptop/asus" onClick={() => this.updateProducts()} class="category-item">
                                            لپتاپ  ایسوس
                                        </Link>
                                        <Link to="/browse/laptop/laptop/apple" onClick={() => this.updateProducts()} class="category-item">
                                            لپتاپ اپل
                                        </Link>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </nav>
                    <div class="mobile-tablet-page">
                        <div class="category-left-panel">
                            <div class="category-left-panel-head">
                                <div>
                                    <button id="sortbuttonicon" class="sortbutton-icon" onClick={this.saveSortButtonClick.bind(this)}>
                                        <svg class="svg-arrow" fill="#333333" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="chevron-down" ><g><path d="M18.7 9.7l-6 6c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3l-6-6c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l5.3 5.3 5.3-5.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4z"></path></g></svg>  
                                        <div class="sortbutton">
                                            جدیدترین
                                        </div>
                                    </button>
                                    <div class={ this.state.sortbuttonClicked ? 'sortdropdown' : 'displaynone'}>
                                        <div onClick={this.sortByDate.bind(this)} class="sortdropdown-item">
                                            جدیدترین
                                        </div>
                                        <div onClick={this.sortByMinPrice.bind(this)} class="sortdropdown-item">
                                            ارزان‌ترین
                                        </div>
                                        <div onClick={this.sortByMaxPrice.bind(this)} class="sortdropdown-item">
                                            گران‌ترین
                                        </div>
                                    </div>
                                </div>
                                <div class="category-route">
                                    <div class="category-route-item"> 
                                        {subCategory}
                                    </div>
                                    <div class={subCategorySlashShow}>
                                        / 
                                    </div>
                                    <div class="category-route-item"> 
                                        {category}
                                    </div>
                                    <div class={categorySlashShow}>
                                        / 
                                    </div>
                                    <div class="category-route-item"> 
                                        {head}
                                    </div>
                                    <div>
                                        / 
                                    </div>
                                    <div class="category-route-item"> 
                                        همه دسته‌ها   
                                    </div>
                                </div>
                            </div>
                            <div class="category-line-left">  
                            </div>
                            <div class="category-list-title"> 
                                قیمت انواع {title}  
                            </div>
                            <div class={ this.state.showPriceButtonClicked || showCategoryButtonClicked ? 'showed-buttons-block' : 'displaynone'}>
                                <button class={ this.state.showPriceButtonClicked ? 'price-button-showed' : 'displaynone'}>
                                    <div onClick={this.removePriceClick.bind(this)} class="price-showed-close">
                                        ×
                                    </div>
                                    از {this.state.minValues} تا {this.state.maxValues}
                                </button>
                                <div  class={ showCategoryButtonClicked ? 'price-button-showed' : 'displaynone'}>
                                    <Link to={window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))} class="price-showed-close">
                                        ×
                                    </Link>
                                    {brandName}
                                </div>
                            </div>
                            <div class="products">
                                {addedItems}
                            </div>
                        </div>
                        <div class="category-right-panel">
                            <div class="brand-block">
                                <button id="categorydropdown" onClick={this.showCategoryDropdown.bind(this)} class="category-detail-block">
                                    <div class="category-detail">
                                        {leftPanelTitle}
                                    </div>
                                    <svg class="svg-arrow"  fill="#333333" width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="chevron-up" ><g><path d="M18.7 9.7l-6 6c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3l-6-6c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l5.3 5.3 5.3-5.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4z"></path></g></svg>  
                                </button>
                                <Link to="/browse/mobiletablet" onClick={() => this.updateProducts()} class={ ~this.state.categoryDropdownClicked && category === undefined ? 'subcategory-detail-block' : 'displaynone'} >
                                    <div class="subcategory-detail">
                                        موبایل و تبلت 
                                    </div>
                                    <svg class="svg-arrow-left"  fill="#333333" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="chevron-up" ><g><path d="M18.7 9.7l-6 6c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3l-6-6c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l5.3 5.3 5.3-5.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4z"></path></g></svg>  
                                </Link>
                                <Link to="/browse/mobiletablet/mobile" onClick={() => this.updateProducts()} class={ ~this.state.categoryDropdownClicked && category === undefined ? 'subcategory-detail-block' : 'displaynone'} >
                                    <div class="subsubcategory-detail">
                                        گوشی موبایل 
                                    </div>
                                </Link>
                                <Link to="/browse/mobiletablet/tablet" onClick={() => this.updateProducts()} class={ ~this.state.categoryDropdownClicked && category === undefined ? 'subcategory-detail-block' : 'displaynone'} >
                                    <div class="subsubcategory-detail">
                                        تبلت 
                                    </div>
                                </Link>
                                <div class={ ~this.state.categoryDropdownClicked && category ? 'input-search-brand' : 'displaynone'}>
                                    <input autocomplete="off" id="searchvalue" placeholder='جستجوی برند' onInput={this.brandInput.bind(this)} style={searchInputStyle.input}/> 
                                    <svg fill="#808080" class="search-svg" height="26" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg" title="search"> <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path> <path d="M0 0h24v24H0z" fill="none"></path> </svg>    
                                </div>
                                <div class = {~this.state.categoryDropdownClicked ? "brands" : "displaynone"}>
                                    <div class = {category === 'موبایل' ? "" : "displaynone"}>
                                        <Link to="/browse/mobiletablet/mobile/samsung" onClick={() => this.updateProducts()} class = {subCategory === 'سامسونگ (Samsung)' ? "block-brand-active" : "block-brand"}>
                                            <div >
                                                سامسونگ
                                            </div>
                                            <div>
                                                Samsung
                                            </div>  
                                        </Link>
                                        <Link to="/browse/mobiletablet/mobile/xiaomi" onClick={() => this.updateProducts()} class = {subCategory === 'شیائومی (Xiaomi)' ? "block-brand-active" : "block-brand"}>
                                            <div>
                                                شیائومی
                                            </div>
                                            <div>
                                                Xiaomi
                                            </div>
                                        </Link>
                                        <Link to="/browse/mobiletablet/mobile/apple" onClick={() => this.updateProducts()} class = {subCategory === 'اپل (Apple)' ? "block-brand-active" : "block-brand"}>
                                            <div>
                                                اپل
                                            </div>
                                            <div>
                                                Apple
                                            </div>
                                        </Link>  
                                    </div>
                                    <div class = {category === 'تبلت' ? "" : "displaynone"}>
                                        <Link to="/browse/mobiletablet/tablet/samsung" onClick={() => this.updateProducts()} class = {subCategory === 'سامسونگ (Samsung)' ? "block-brand-active" : "block-brand"}>
                                            <div >
                                                سامسونگ
                                            </div>
                                            <div>
                                                Samsung
                                            </div>  
                                        </Link>
                                        <Link to="/browse/mobiletablet/tablet/xiaomi" onClick={() => this.updateProducts()} class = {subCategory === 'شیائومی (Xiaomi)' ? "block-brand-active" : "block-brand"}>
                                            <div>
                                                شیائومی
                                            </div>
                                            <div>
                                                Xiaomi
                                            </div>
                                        </Link>
                                        <Link to="/browse/mobiletablet/tablet/apple" onClick={() => this.updateProducts()} class = {subCategory === 'اپل (Apple)' ? "block-brand-active" : "block-brand"}>
                                            <div>
                                                اپل
                                            </div>
                                            <div>
                                                Apple
                                            </div>
                                        </Link>  
                                    </div>
                                    <div class = {category === 'لپ‌تاپ' ? "" : "displaynone"}>
                                        <Link to="/browse/laptop/laptop/lenovo" onClick={() => this.updateProducts()} class = {subCategory === 'لنوو (Lenovo)' ? "block-brand-active" : "block-brand"}>
                                            <div >
                                                لنوو
                                            </div>
                                            <div>
                                                Lenovo
                                            </div>  
                                        </Link>
                                        <Link to="/browse/laptop/laptop/asus" onClick={() => this.updateProducts()} class = {subCategory === 'ایسوس (Asus)' ? "block-brand-active" : "block-brand"}>
                                            <div>
                                                ایسوس
                                            </div>
                                            <div>
                                                Asus
                                            </div>
                                        </Link>
                                        <Link to="/browse/laptop/laptop/apple" onClick={() => this.updateProducts()} class = {subCategory === 'اپل (Apple)' ? "block-brand-active" : "block-brand"}>
                                            <div>
                                                اپل
                                            </div>
                                            <div>
                                                Apple
                                            </div>
                                        </Link>  
                                    </div>
                                </div>
                                <div class="category-line-right">
                                </div> 
                            </div>
                            <button id="pricedropdown" onClick={this.showPriceDropdown.bind(this)} class="price-detail-block">
                                <div class="category-detail">
                                    قیمت (تومان)
                                </div>
                                <svg class="svg-arrow"  fill="#333333" width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="chevron-down" ><g><path d="M18.7 9.7l-6 6c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3l-6-6c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l5.3 5.3 5.3-5.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4z"></path></g></svg>  
                            </button>
                            <div class={ this.state.priceDropdownClicked ? 'displaynone' : 'price-block' }>
                                <div class="price-input-block">
                                    <div class="input-block-price">
                                        <input autocomplete="off" id="minvalue" defaultValue={this.state.minValues} value={this.state.minValues} onInput={this.minValueInput.bind(this)} style={priceInputStyle.input} /> 
                                        <div class="input-block-text">
                                            از
                                        </div>
                                    </div>
                                    <div class="input-block-price">
                                        <input autocomplete="off" id="maxvalue" defaultValue={this.state.maxValues} value={this.state.maxValues} onInput={this.maxValueInput.bind(this)} style={priceInputStyle.input}/> 
                                        <div class="input-block-text">
                                            تا
                                        </div>
                                    </div>      
                                </div>
                                <button onClick={this.priceButtonClick.bind(this)} class="price-button">اعمال فیلتر قیمت</button>   
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        )
    }
}
const mapStateToProps = (state)=> {
    return {
        username: state.username,
        token: state.token
    }
}


export default connect(mapStateToProps)(Browse)