import { CSSProperties, FunctionComponent } from "react";
import { TextType } from "../../model/utils/TextType";


interface TextProps {
    children: React.ReactNode;
    style?: CSSProperties;
    type: TextType;
}

export const TText: FunctionComponent<TextProps> = (props: TextProps) => {    
    return (
        <span
            style={props.style}
            className={`${props.type ? props.type : TextType.TEXT}`}
        >
            {props.children}
        </span>
    );
}