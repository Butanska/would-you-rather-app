import './App.css';
import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from './actions/common';
import { connect } from 'react-redux';
import Login from './components/Signin';
import Nav from './components/Nav';
import Home from './components/Home';
import NewPoll from './components/NewQuestion';
import UserInfo from './components/UserInfo';
import Error from './components/Error';
import Leaderboard from './components/Leaderboard';

function App({ authUser, handleInitialData }) {
  useEffect(() => {
    handleInitialData();
  }, [handleInitialData]); // Pass handleInitialData as a dependency

  return (
    <Router>
      <div className='app'>
        {authUser === null ? (
          <Route render={() => <Login />} />
        ) : (
          <Fragment>
            <Nav />
            <Route exact path="/" component={Home} />
            <Route path="/questions/:question_id" component={UserInfo} />
            <Route path="/add" component={NewPoll} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/questions/error" component={Error} />
          </Fragment>
        )}
      </div>
    </Router>
  );
}

function mapStateToProps({ authUser }) {
  return { authUser };
}

export default connect(mapStateToProps, { handleInitialData })(App);