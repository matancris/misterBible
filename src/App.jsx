import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from './cmps/AppHeader';
import About from './pages/About';
import BibleApp from './pages/BibleApp';


function App() {
  return (
    <section className="App">
      <AppHeader />
      <main className="app-main">
        <Switch>
          <Route component={BibleApp} path='/' exact />
          <Route component={About} path='/about'  />
        </Switch>
      </main>
    </section>
  );
}

export default App;
