import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import { route as routePropType } from 'react-router-prop-types';
import { browserContext as browserContextPropType, store as storePropType } from './utilities/customPropTypes';

const Layout = ({ route, store, browserContext }) => {
    return (
        <div>
            <nav>
                <Link to="">Home</Link> | <Link to="/users">Users</Link> | <Link to="/posts">Posts</Link> | <Link to="/redirect-example">Redirect</Link>
            </nav>
            <div className="wrapper">
                <main>
                    {renderRoutes(route.routes, { store, browserContext })}
                </main>
                <aside>
                    {/* These images are here to prove webpack loads in the images properly. */}
                    <div className="image-bg" />
                    <img src="/images/react-logo.svg" alt="" />
                </aside>
            </div>
        </div>
    );
};

Layout.propTypes = {
    route: routePropType.isRequired,
    store: storePropType.isRequired,
    browserContext: browserContextPropType
};

Layout.defaultProps = {
    browserContext: undefined
};

export default Layout;
