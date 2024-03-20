import { FunctionComponent } from "react";
import { RouteDefinition } from "./App.routes";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../components/NotFoundPage";


interface RoutesRendererProps {
    routes: RouteDefinition[];
}

export const RoutesRenderer: FunctionComponent<RoutesRendererProps> = ({routes}) => {
  
    const getElement = (route: RouteDefinition) => {        
        if (route.Component) {
            return (<route.Component {...route as any}/>);
        } else {
            return route.element;
        }
    }

    const generateRoutesTree = (route: RouteDefinition, parentKey: number): JSX.Element => {
        // If the route has nested routes, first create a component <Route> for the parent route
        if (route.routes) {
            return (                
                <Route key={parentKey} path={route.path} element={getElement(route)}>                    
                    {route.routes.map((childRoute, childIndex) => generateRoutesTree(childRoute, childIndex))}
                </Route>
            );
        } else {
            const routes = [<Route key={parentKey} path={route.path} element={getElement(route)} />];

            if (route.isIndex) {
                // For index routes, ensure they are rendered at the parent path
                routes.unshift(<Route key={`${parentKey}-index`} index element={route.element} />);
                // Add a catch-all not-found route specific to this nested route's context
                routes.push(<Route key={`${parentKey}-notfound`} path="*" element={<NotFoundPage/>} />);
            }

            return <>{routes}</>;
        }
    }

    return (
        <Routes>
            {routes.map((route, index) => (
                generateRoutesTree(route, index)
            ))}                        
            <Route key={'not-found'} path={'*'} element={<NotFoundPage/>}/>          
        </Routes>        
    );
};