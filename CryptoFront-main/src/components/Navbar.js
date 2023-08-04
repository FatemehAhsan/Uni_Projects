import React, { Component } from 'react';
import { connect } from 'react-redux'
import { chThm } from './actions/recentActions'
import { Link } from 'react-router-dom'

class Navbar extends Component{
    handleThm = ()=> {
        this.props.chThm();
    }

    render(){
        let clr = this.props.thm === 0 ? '' : 'clrbgb';
        return(
            <nav class={clr}>
                <Link to="/" class="navItem navLink">IE Final Project</Link>
                <button to="/" onClick={() => this.handleThm()} class="navItem navBtn">Change Theme</button>     
            </nav>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      thm: state.thm
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        chThm: ()=>{dispatch(chThm())}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)