import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './routes-exam/Home';
import Counter from './counter/Counter';
import About from './routes-exam/About';
import Header from './routes-exam/Header';
import Posts from './routes-exam/Posts';
import Login from './routes-exam/Login';
import MyPage from './routes-exam/MyPage';
import Search from './routes-exam/Search';
import NoMatch from './routes-exam/NoMatch';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/counter" component={Counter} />
              {/* url parameter */}
              <Route path="/about/:username" component={About} />
              <Route path="/posts" component={Posts} />
              <Route path="/login" component={Login} />
              <Route path="/myPage" component={MyPage} />
              <Route path="/search" component={Search} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}


App.propTypes = {

}
App.defaultProps = {

}