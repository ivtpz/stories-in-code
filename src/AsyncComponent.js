// @flow
import React, { type ComponentType } from 'react';

type ComponentFunc = () => Promise<ComponentType<*>>

type Props = {}
type State = {
  Component: ComponentType<*>
}

export default function asyncComponent(getComponent: ComponentFunc) {
  return class AsyncComponent extends React.Component<Props, State> {
    static Component = null;
    state = {
      Component: AsyncComponent.Component
    };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}
