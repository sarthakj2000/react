import React, { Component } from 'react'
import PropTypes from 'prop-types';
class Search extends Component {
    state={
        text:''
    }
    static propTypes={
        searchUser:PropTypes.func.isRequired,
        clearUser:PropTypes.func.isRequired,
        showClear:PropTypes.bool.isRequired,
        setAlert:PropTypes.func.isRequired,
        
    }
    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit=(e)=>{
        e.preventDefault();
        if(this.state.text===''){
            this.props.setAlert('Please enter a text','light');
        }
        else{
            this.props.searchUser(this.state.text);
            this.setState({text:''});
        }
        
    }


    render() {
        const {showClear,clearUser}=this.props;

        return (
            <div>
                <form action="form" onSubmit={this.onSubmit}>
                    <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {showClear===true?<button class="btn btn-light btn-block" onClick={clearUser}>Clear</button>:null}
                
            </div>
        )
    }
}


export default Search
