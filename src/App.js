import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';  
import { connect } from 'react-redux';

import './App.css';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import NavBar from '../src/elements/NavBar/NavBar';
import Footer from './elements/Footer/Footer';

import * as actions from './store/actions/index';



const asyncPosts = asyncComponent(() => {
  return import ('./components/Posts/Posts');
});

const asyncPostHome = asyncComponent(() => {
  return import ('./components/PostHome/PostHome');
});

const asyncLogout = asyncComponent(() => {
  return import ('./components/Logout/Logout');
});

const asyncLogin = asyncComponent(() => {
  return import ('./components/Login/Login');
});

const asyncSignup = asyncComponent(() => {
  return import ('./components/Signup/Signup');
});

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoLogin();
  }
  render(){
    let route = (
      <Switch>
        <Route exact path="/signup" component={asyncSignup} />
        <Route exact path="/" component={asyncLogin} />
      </Switch>
    );

    let paths = [
      {text:'Log In', path:'/'},
      {text:'Sign Up', path:'/signup'}
    ];    
    
    if(this.props.isAuthenticated){
     
      route = (
        <Switch>
          <Route exact path="/posts/:postId" component={asyncPostHome} />
          <Route exact path="/logout" component={asyncLogout} />
          <Route exact path="/" component={asyncPosts}/>
        </Switch>
      );
      paths = [
        {text:'Home', path:'/'},
        {text:'Logout', path:'/logout'}
      ];
    }
    return (
      <div className="App">
        <NavBar paths={paths}/>
        <header className="App-header">
          {route}
        </header>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  };
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
