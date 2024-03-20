import { RouteProps } from "react-router-dom";
import { Home } from "../components/Home";
import { Todolist } from "../components/todolist/Todolist";
import { Profile } from "../components/settings/Profile";
import { Admin } from "../components/settings/Admin";
import { Views, getPath } from "./Routes";
import Settings from "../components/settings/Settings";

interface CustomRouteProps {
    routes?: RouteDefinition[];
    isIndex?: boolean;// Defines if the route is index. Is used to indicate when a child route is the default route of a nested routes.
    label?: string;
}

export type RouteDefinition = RouteProps & CustomRouteProps; 

export const getRoutes = (): RouteDefinition[] => ([
    {
        path: getPath(Views.HOME),
        element: <Home/>,
        label: "Home"
    },
    {
        path: getPath(Views.ITEMS),
        element: <Todolist/>,
        label: "Items"
    },
    {
        path: getPath(Views.SETTINGS),
        Component: Settings,
        label: "Settings",
        routes: [
            {
                path: getPath(Views.PROFILE),
                element: <Profile/>,
                label: "Profile"
            },
            {
                path: getPath(Views.ADMIN),
                element: <Admin/>,
                label: "Admin"
            }
        ]
    }
]);