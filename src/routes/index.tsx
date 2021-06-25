import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AdminRoom } from '../pages/AdminRoom';

import { CreateRoom } from '../pages/CreateRoom';
import { Home } from '../pages/Home';
import { Room } from '../pages/Room';

const Routes: FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/rooms/new" component={CreateRoom} />

      <Route path="/rooms/:roomId/admin" component={AdminRoom} />

      <Route path="/rooms/:roomId" component={Room} />
    </Switch>
  );
};

export { Routes };
