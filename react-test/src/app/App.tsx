import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Chat } from './chat/chat';
import { Footer } from './footer/footer';
import { Company } from './company/company';

import './App.css';
import { Job } from './job/job';
import { My } from './my/my';

const App: React.FC = () => {
  return (
    <Router>
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
