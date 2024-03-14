import './styles/App.css';
import { Todolist } from './components/Todolist';
import { TText } from './components/utils/Texts';
import { TextType } from './model/utils/TextType';
import { Colors } from './utils/Colors';

export const App = () => {
  return (
    <div className="App">
      <div style={{backgroundColor: Colors.PRIMARY_ORANGE, paddingTop: "2%"}}>
        <TText type={TextType.HEADER2} style={{color: "white"}}>App Header</TText>
      </div>
      <Todolist/>
    </div>
  );
}
