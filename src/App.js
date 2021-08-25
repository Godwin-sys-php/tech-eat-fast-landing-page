import 'bulma/css/bulma.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import Store from './Stores/storeConfig';
import Index from './Screens/Index';
import Home from './Screens/Home';

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Switch>
          <Route exact path='/application/inRestaurant/:slug' component={Index} />
          <Route exact path='/application/home' component={Home} />

        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
