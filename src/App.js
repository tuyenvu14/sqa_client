import { BrowserRouter,   Route , Switch, Redirect } from "react-router-dom";
import Login from "./login/Login"
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import items from './pages/item/item';
import Supplier from './pages/supplier';
import Customer from './pages/customer/customer';
import Me from './pages/me';
import Import from './pages/import';
import Sale from './pages/sale';
import Staff from './pages/staff';

function App() {
  return (
    <BrowserRouter>
      <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/items" component={items} />
      <PrivateRoute exact path="/suppliers" component={Supplier} />
      <PrivateRoute exact path="/customers" component={Customer} />
      <PrivateRoute exact path="/imports" component={Import} />
      <PrivateRoute exact path="/me" component={Me} />
      <PrivateRoute exact path="/sales" component={Sale}/>
      <PrivateRoute exact path="/staffs" component={Staff} />
      <PublicRoute exact path='/login' component={Login} />
      <PublicRoute path="/error" component={ErrorPage} />
      <Redirect to="/error" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
