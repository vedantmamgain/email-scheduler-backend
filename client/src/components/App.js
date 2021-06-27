import React from 'react';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Scheduler from './Scheduler';
import Login from './Login';
import History from './History';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Container>
      <div
        className='w-100 d-flex flex-column align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/' component={Scheduler} />
              <PrivateRoute exact path='/history' component={History} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
