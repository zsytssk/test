import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Chat } from './chat/chat';
import { Footer } from './footer/footer';
import { Company } from './company/company';

import './App.css';
import { Job } from './job/job';
import { My } from './my/my';
import { Test } from './test/test';

const App: React.FC = () => {
  const [name, setName] = useState('zsy');
  setTimeout(() => {
    setName('hello!');
  }, 3000);
  console.log(name);
  return (
    <Router>
      <Test name={name}></Test>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade">
              <Switch location={location}>
                <Route path="/chat" component={Chat} />
                <Route path="/company" component={Company} />
                <Route path="/job" component={Job} />
                <Route path="/my" component={My} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
      <Footer></Footer>
    </Router>
  );
};

export default App;
