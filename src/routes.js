import Layout from './Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Posts from './pages/Posts';
import RedirectExample from './pages/RedirectExample';
import UserDetails from './pages/UserDetails';
import Users from './pages/Users';
import wrapInitialDataComponent from './utilities/wrapInitialDataComponent';

function wrapRoutes(routes) {
    routes.forEach((route) => {
        route.component = wrapInitialDataComponent(route.component); // eslint-disable-line no-param-reassign

        if (route.routes) {
            wrapRoutes(route.routes);
        }
    });
}

const routes = [
    {
        component: Layout,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/posts',
                component: Posts
            },
            {
                path: '/users',
                component: Users,
                routes: [
                    {
                        path: '/users/:id',
                        component: UserDetails
                    }
                ]
            },
            {
                path: '/redirect-example',
                component: RedirectExample
            },
            {
                path: '*',
                component: NotFound
            }
        ]
    }
];

wrapRoutes(routes);

export default routes;
