import React from 'react';
import 'antd/dist/antd.css';

// import SignIn from 'components/auth/SignIn';
import { SignIn, SignUp } from 'components/auth';
import { Switch, Route } from 'wouter';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
