import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Login from './login/Login';
import { QueryClient, QueryClientProvider } from 'react-query';

import '~/bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient()

const Root = () => (
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />

      <Route path="/login" component={Login} />

      <Route path="/error" component={ErrorPage} />
      <Redirect to="/error" />
    </Switch>
  </BrowserRouter>
  </QueryClientProvider>

);

export default Root;
