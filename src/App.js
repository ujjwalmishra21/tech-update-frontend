import React, { Component } from 'react';
import { Route, Switch,  withRouter} from 'react-router-dom';  
import { connect } from 'react-redux';
import './App.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncPosts = asyncComponent(() => {
  return import ('./components/Posts/Posts');
})

class App extends Component {
 
  render(){
    let route = (
      <Switch>
        <Route path="/" component={asyncPosts}/>
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
