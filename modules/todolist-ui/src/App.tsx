import './styles/App.css';
import { Header } from './components/Header';
import { useMemo } from 'react';
import { getRoutes } from './routing/App.routes';
import { RoutesRenderer } from './routing/RoutesRenderer';

export const App = () => {

  const routes = useMemo(() => getRoutes(), []);

  return (
    <div className="App">
      <Header routes={routes}/>
      <RoutesRenderer routes={routes}/>
    </div>
  );
}
