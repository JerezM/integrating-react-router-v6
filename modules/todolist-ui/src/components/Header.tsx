import { FC } from "react";
import { TText } from "./utils/Texts";
import { TextType } from "../model/utils/TextType";
import { Colors } from "../utils/Colors";


export const Header: FC = () => {
    
    return (
        <div style={{backgroundColor: Colors.PRIMARY_ORANGE, display: 'flex', justifyContent: 'space-between', paddingLeft: '1%', height: '6vh', textAlign: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <TText type={TextType.HEADER2} style={{color: "white"}}>Home</TText>
            </div>
        </div>
    );
} 