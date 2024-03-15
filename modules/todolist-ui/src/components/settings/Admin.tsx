import { FunctionComponent } from "react";
import { TText } from "../utils/Texts";
import { TextType } from "../../model/utils/TextType";

export const Admin: FunctionComponent = () => {

    return (
        <TText type={TextType.HEADER2}>Admin View!</TText>         
    );
}