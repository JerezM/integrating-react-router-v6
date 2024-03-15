import { FunctionComponent } from "react";
import { Colors } from "../utils/Colors";
import { TText } from "./utils/Texts";
import { TextType } from "../model/utils/TextType";


export const NotFoundPage: FunctionComponent = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: Colors.SIDE_BAR, textAlign: 'center', color: 'white'}}>        
        <TText type={TextType.HEADER2}>404 Not Found</TText>
        <TText type={TextType.TEXT}>Lo sentimos, la página que estás buscando no se pudo encontrar.</TText>        
      </div>
    );
};