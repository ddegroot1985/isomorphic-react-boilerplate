import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';
import { match as matchPropType } from 'react-router-prop-types';
import { usingDevServer } from '../utilities/environment';
import { browserContext as browserContextPropType, store as storePropType } from './customPropTypes';

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

function wrapInitialDataComponent(Component) {
    class InitialDataComponent extends React.Component {
        componentDidMount() {
            const { store, match, browserContext } = this.props;

            // browserContext is defined as an optional prop because it is not needed on the server.
            // It is however required in the browser, componentDidMount is only trigged in the browser so
            // if browserContext is unavailable here throw an error.
            if (!browserContext) {
                throw Error(`Error fetching initial data for \`${InitialDataComponent.displayName}\`
                    \`browserContext\` is unavailable, make sure it's passed as a prop.`);
            }

            const fetchRequired = usingDevServer || !browserContext.isFirstRender;

            if (fetchRequired && Component.fetchInitialData) {
                Component.fetchInitialData(store.dispatch, match);
            }
        }
        render() {
            return <Component {...this.props} />;
        }
    }

    InitialDataComponent.propTypes = {
        store: storePropType.isRequired,
        match: matchPropType.isRequired,
        browserContext: browserContextPropType
    };

    InitialDataComponent.defaultProps = {
        browserContext: undefined
    };

    // Copy any static methods.
    hoistNonReactStatics(InitialDataComponent, Component);

    // Set display name for debugging.
    InitialDataComponent.displayName = `InitialDataComponent(${getDisplayName(Component)})`;

    return InitialDataComponent;
}

export default wrapInitialDataComponent;
