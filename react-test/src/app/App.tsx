import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Index } from './index';
import { Chat } from './chat/chat';
import { Footer } from './footer/footer';
import { Company } from './company/company';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade">
              <Switch location={location}>
                <Route path="/" exact component={Index} />
                <Route path="/chat" component={Chat} />
                <Route path="/company" component={Company} />
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
