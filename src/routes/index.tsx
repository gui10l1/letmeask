import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { CreateRoom } from '../pages/CreateRoom';
import { Home } from '../pages/Home';

const Routes: FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/rooms/new" component={CreateRoom} />
    </Switch>
  );
};

export { Routes };
