import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { TText } from "../utils/Texts";
import { TextType } from "../../model/utils/TextType";
import "../../styles/Settings.css"
import { useEffect} from "react";
import { Views, getPath } from "../../routing/Routes";
import { RouteDefinition } from "../../routing/App.routes";

interface SettingsProps {
    routes?: RouteDefinition[];
}

export default function Settings({routes}: SettingsProps) {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Redirect to /settings/profile automatically when route 'settings' is loaded
        if (location.pathname === getPath(Views.SETTINGS)) {
            navigate(getPath(Views.PROFILE), { replace: true });
        }
    }, [navigate, location.pathname]);

    return (
        <div className="settings">
            <div className="side-bar">
                {routes?.map((route, index) => (
                    <NavLink key={index} className={({ isActive }) => isActive ? "settings-nav-active" : "settings-nav"} to={route.path?.toString() as string}>
                        <TText type={TextType.HEADER2} style={{color: "white", textAlign: 'center'}}>{route.label}</TText>
                    </NavLink>
                ))}                                        
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
}