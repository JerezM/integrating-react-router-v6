import { FC } from "react";
import "../styles/Header.css"
import { TText } from "./utils/Texts";
import { TextType } from "../model/utils/TextType";
import { RouteDefinition } from "../routing/App.routes";
import { NavLink } from "react-router-dom";

interface HeaderProps {
    routes: RouteDefinition[];
}

export const Header: FC<HeaderProps> = ({routes}) => {
    
    return (
        <div className="header">
            <ul className="header-ul">
                { 
                    routes.map((route, index) => (
                        <li key={index} style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                            <NavLink className={({ isActive }) => isActive ? "header-nav-active" : "header-nav"} to={route.path?.toString() as string}>
                                <TText type={TextType.HEADER2} style={{textAlign: 'center'}}>{route.label}</TText>
                            </NavLink>                        
                        </li>
                    ))                 
                }     
            </ul>
        </div>
    );
} 