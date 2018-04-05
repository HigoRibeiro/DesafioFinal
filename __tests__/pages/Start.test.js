/* Core */
import React from 'react';

/* Test */
import { shallow } from 'enzyme';
import sinon from 'sinon';

/**
 * Presentational
 */
import Button from 'components/Button';

import Start from 'pages/Start';
import Alert from 'components/Alert';

/* redux */
import configureStore from 'redux-mock-store';
import ActionCreators from 'store/ducks/user';

const mockStore = configureStore([]);

const initialStore = {
  user: {},
};

describe('Testing Start Page', () => {
  const store = mockStore(initialStore);
  let wrapper;

  function createWrapper() {
    return shallow(
      <Start />,
      { context: { store } },
    );
  }

  beforeEach(() => {
    wrapper = createWrapper().dive();
    store.clearActions();
  });

  it('Can get user information when is valid cell phone', () => {
    wrapper.setState({ cellphone: '9999999999' });
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).toContainEqual(ActionCreators.userGetInformation('9999999999'));
  });

  it('Can\'t get user information when is invalid cell phone', () => {
    sinon.spy(Alert, 'alert');
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).not.toContainEqual(ActionCreators.userGetInformation(''));
    expect(Alert.alert.calledOnce).toBe(true);
  });
});