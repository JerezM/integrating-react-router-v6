import { FunctionComponent } from "react";
import { TText } from "./utils/Texts";
import { TextType } from "../model/utils/TextType";


export const Home: FunctionComponent = () => {
    return (
        <TText type={TextType.HEADER2}>Hello World!</TText>
    );
}