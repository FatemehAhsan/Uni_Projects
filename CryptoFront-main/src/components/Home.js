import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { curItem, chThm } from './actions/recentActions'


class Home extends Component{

    
    handleThm = ()=> {
        this.props.chThm();
    }
    handleClickItem = (id)=>{
        this.props.curItem(id);   
    }
    constructor(props) {
        super(props);
   
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
            ).then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json
                }
            );
        })
    }
    
    render(){
        let bg = this.props.thm === 0 ? 'bgl' : 'bgb';
        let clr = this.props.thm === 0 ? '' : 'clrb ';
        let clrbrclr = this.props.thm === 0 ? '' : 'clrbrclr';
        let clrbrbt = this.props.thm === 0 ? '' : 'clrbrbt';
        let addedItems = this.props.items.length && this.state.items && this.state.items.length?
            (  
                this.props.items.map(itemid=>{
                    let addedItem = this.state.items.find(item=> item.id === itemid)
                    return(
                        <Link onClick={() => this.handleClickItem(addedItem.id)}  to={"/MoreInfo/" + addedItem.id} >
                            <div class={"horflexlast last3searchbutton " + clrbrbt}>
                            <img src={addedItem.image} class="iconHome"/ >
                            <div class={"verflex symname " + clr}>
                                <p>
                                    ${ addedItem.current_price }
                                </p>
                                <p class="nameHome">
                                    { addedItem.name } 
                                </p>
                                </div>
                            </div>    
                        </Link> 
                    )
                })
            ):
            (
                <p></p>
            ) 
            return(
                <div class={"main "+bg}>
                    <div class="verflex left">
                        <p class={"title "+clr}>
                            Search & 
                            <p>
                                Buy <span class="yellw">Crypto</span>
                            </p>
                        </p>
                        <p class={"content "+clr}>
                            Shahid Beheshti University
                            <br/>
                            IE Final Project
                        </p>
                        <Link class={"searchbutton "+ clr} to="/search">SEARCH MORE</Link>
                    </div>
                    <div class="verflex right">
                        <button class={"changethemebutton " + clrbrclr} onClick={()=> this.handleThm()}>
                            Change Theme
                        </button>
                        <div class="horflexlast3">
                            {addedItems}
                        </div>
                    </div>
                </div>
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
        chThm: ()=>{dispatch(chThm())},
        curItem: (id)=>{dispatch(curItem(id))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
