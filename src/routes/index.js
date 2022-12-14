import { Switch } from 'react-router-dom';
import Route from './Route';
import Signin from '../pages/Signin';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={Signin} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} isPrivate />
            <Route exact path="/profile" component={Profile} is isPrivate />
        </Switch>
    );
    
}

