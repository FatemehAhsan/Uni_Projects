import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addRecent, curItem } from './actions/recentActions'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';

class Search extends Component{

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
    handleAddRcnt = (id)=> {
        this.props.addRecent(id); 
    }
    handleAddRcntItem = (id)=>{
        this.props.curItem(id);   
    }
    toUpperCase = (name) =>{
        return name.toLocaleUpperCase();
    }

    updateInput = (event) => {
        let text = event.target.value
        this.setState({search : text})
        console.log(text)
        let result = text.replaceAll(" ", "%2C%20");
        if (result === "")
            result = "null" 
        else{  
            var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + result 
            fetch(url
                ).then((res) => res.json())
                .then((json) => {
                    this.setState({
                        items: json,
                        DataisLoaded: true,
                        search: ''
                    },() => {
                        if(this.state.items.length > 0)
                            this.handleAddRcnt(this.state.items[0].id);
                    });
                })
        }
    }
    
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false,
            search: ""
        };
        this.updateInput = this.updateInput.bind(this);
    }

    componentDidMount() {
        document.getElementById("input1").focus();
    }
    componentDidUpdate() {
    }

    render(){
        const { DataisLoaded } = this.state;
        let clr = this.props.thm === 0 ? '' : 'clrb';
        let clrbg = this.props.thm === 0 ? '' : 'clrbgb';
        let addedItems = DataisLoaded?
            (  
                this.state.items.map( (item)=> {
                    return(
                        <ol key = { item.id } >
                                <Link onClick={() => this.handleAddRcntItem(item.id)} to={"/MoreInfo/" + item.id} class={"listrow "+clr}>
                                    <p class={"mrktcp "+clr}>
                                        $ {this.setComma(item.market_cap)}M 
                                    </p>
                                    <p class="change">
                                        { item.price_change_percentage_24h } 
                                    </p>
                                    <p class={"price "+clr}>
                                        $ {this.setComma(item.current_price)} 
                                    </p>
                                    <div class={"verflex symname " + clr}>
                                        <p>
                                            {this.toUpperCase(item.symbol)}
                                        </p>
                                        <p class="name">
                                            { item.name } 
                                        </p>
                                    </div>
                                    <div class="icondiv">
                                        <img class="icon" src={ item.image }/> 
                                    </div>
                                </Link>
                                <hr class="listsprtr"/>
                            </ol>
                    )
                })
            ):
            (
                <p></p>
            ) 
        return(
            <body class="search">
                <Navbar/>
                <div class="verflex">
                    <p class="serachtitle">
                        Search Coin
                    </p>
                    <p class="serachcontent">
                        Get Information From Here
                    </p>
                </div>
                <div class={"verflex list " + clrbg}>
                    <p class={"listtitle " + clr}>
                        Cryptocurrency Prices by Market Cap
                    </p>
                    <div class="listcontent"> 
                        <input type="text" id="input1" onInputCapture={this.updateInput} placeholder="Search For a Crypto Currency.." class="srchbtn"/>
                        <div class="listhorflex yellwlt">
                            <p class="firstelem">
                                Coin                        
                            </p>
                            <p>
                                Price                        
                            </p>
                            <p>
                                24h Change                        
                            </p>
                            <p>
                                Market Cap                        
                            </p>
                        </div>
                    </div>
                    <div class="crpcrnc">
                        {addedItems}
                    </div>
                </div>
            </body>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items,
      thm: state.thm
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addRecent: (id)=>{dispatch(addRecent(id))},
        curItem: (id)=>{dispatch(curItem(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search)