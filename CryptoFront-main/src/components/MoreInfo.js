import React, { Component } from 'react';
import { connect } from 'react-redux'
import Navbar from './Navbar';

class MoreInfo extends Component{

    constructor(props) {
        super(props);
   
        this.state = {
            items : [],
            item: {}
        };
    }

    // first time this component is mount, this function will execute
    componentDidMount() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + this.props.curItemInd
            ).then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json
                }
            );
        })
        fetch("https://api.coingecko.com/api/v3/coins/" + this.props.curItemInd
            ).then((res) => res.json())
            .then((json) => {
                this.setState({
                    item: json
                }
            );
        })
    }
    
    render(){
        let clr = this.props.thm === 0 ? '' : 'clrb ';
        let clrbg = this.props.thm === 0 ? '' : 'clrbgb';
        let newItem = this.state.item ?
            (  
                this.state.item       
            ):
            (
                ""
            )
        let description = newItem?
            (  
                newItem.description       
            ):
            (
                ""
            )
        let descriptionen = description?
            (  
                description.en.split(". ")[0] + '.'      
            ):
            (
                ""
            )
        let newItemInList = this.state.items && this.state.items.length > 0 ?
            (  
                this.state.items.find(item=> item.id === this.props.curItemInd)       
            ):
            (
                ""
            ) 
        return(
            descriptionen !== "" ?(
                <body class={"verflex " + clr + clrbg  }>
                    <Navbar/>
                    <div class="verflex detail" >
                    <img src={newItemInList.image}/>
                    <p class="cap">
                        {newItem.name}
                    </p>
                    <p class = "desc">
                        {descriptionen}
                    </p>
                    <p>
                        <span class="cap"> Rank: </span> {newItem.market_cap_rank}
                    </p>
                    <p>
                        <span class="cap">Current Price: </span>  $ {newItemInList.current_price}
                    </p>
                    <p>    
                        <span class="cap">Market Cap: </span>  $ {newItemInList.market_cap}M
                    </p>    
                </div>
                </body>
            ):
            (
                <body class={"verflex " + clr + clrbg  }>
                    <Navbar/>
                    <div class="verflex detail">
                    </div>
                </body>
            )
        )        
    }          
}
const mapStateToProps = (state)=>{
    return {
        items: state.items,
        curItemInd: state.curItemInd,
        thm: state.thm
    }
}
export default connect(mapStateToProps)(MoreInfo)
