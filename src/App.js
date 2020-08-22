import React from 'react';
import Header from './components/header'
import Przedmioty from './pages/przedmioty'
import Przedmiot from './pages/szczegoly-przedmiot'
import Payment from './pages/szczegóły-card-payment'
import AddItem from './pages/dodaj-przedmiot'
import Login from './pages/auth/login'
import Panel from './pages/auth/panel'
import RegisterForm from './pages/auth/register';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux"
import reducerUser from "./state/reducers/reducer-user"
import thunkMiddleware from "redux-thunk"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {createBrowserHistory } from 'history'

const history = createBrowserHistory()
const store = createStore(reducerUser, applyMiddleware(thunkMiddleware))

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header></Header>
        <Switch>
          <Route exact path='/' component={Przedmioty}/>
          <Route exact path='/szczegóły/:id/' component={Przedmiot}/>
          <Route path='/login/' component={Login}/>
          <Route path='/register/' component={RegisterForm}/>
          <Route path='/panel/'    component={Panel}/>
          <Route path='/payment/'  component={Payment}/>
          <Route path='/add/'  component={AddItem}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
