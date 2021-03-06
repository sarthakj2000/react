import React,{Fragment,Component} from 'react';
import { BrowserRouter as Router ,Switch,Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert'
import About from './pages/About'
import './App.css';
import axios from 'axios';
class App extends Component {
  state={
    users:[],
    loading:false,  
    alert:null,
    user:{},
    repos:[]
  }
  // async componentDidMount(){
  //   this.setState({loading:true});
  //   const res=await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({users:res.data,loading:false})
  // }
  searchUser=async (text)=>{
    this.setState({loading:true});
    const res=await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users:res.data.items,loading:false})
  }
  //get single user
  getUser=async (username)=>{
    this.setState({loading:true});
    const res=await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user:res.data,loading:false})
  }
  //get User repos
  getUserRepos=async (username)=>{
    this.setState({loading:true});
    const res=await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({repos:res.data,loading:false})
  }
  //clear user from state
  clearUser=()=>{
    this.setState({users:[],loading:false})
  }
  setAlert=(msg,type)=>{
    this.setState({alert:{msg:msg,type:type}});
    setTimeout(()=> this.setState({alert:null}),3000)
  }
  render(){
    const {users,loading,user,repos}=this.state;
    return (
      <Router>
        <div className="App">
        <Navbar />
        <div className="container"> 
        <Alert alert={this.state.alert} /> 
        <Switch>
          <Route exact path="/" render={props=>(
            <Fragment>
              <Search searchUser={this.searchUser} clearUser={this.clearUser} showClear={users.length!==0?true:false} setAlert={this.setAlert}/>
              <Users loading={loading} users={users} />
            </Fragment>
          )} />
          <Route exact path="/about" component={About} />
          <Route exact path="/users/:login" render={props=>(
            <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={repos} user={user} loading={loading}/>
          )}/>
        </Switch>
        
        </div>
      </div>
      </Router>
      
    );
  }
  
}

export default App;
