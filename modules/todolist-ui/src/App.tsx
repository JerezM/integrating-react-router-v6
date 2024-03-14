import './styles/App.css';
import { Todolist } from './components/todolist/Todolist';
import { Header } from './components/Header';

export const App = () => {
  return (
    <div className="App">
      <Header/>
      <Todolist/>
    </div>
  );
}
