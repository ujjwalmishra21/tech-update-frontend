import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom';  
import { connect } from 'react-redux';
import './App.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncPosts = asyncComponent(() => {
  return import ('./components/Posts/Posts');
});

const asyncPostHome = asyncComponent(() => {
  return import ('./components/PostHome/PostHome');
});


class App extends Component {
 
  render(){
    let route = (
      <Switch>
        
        <Route exact path="/posts/:postId" component={asyncPostHome} />
        <Route exact path="/" component={asyncPosts}/>
        
      </Switch>
    );
    return (
      <div className="App">
        <header className="App-header">
        
         {route}
        </header>
      </div>
    );
  }
}



export default withRouter(App);
