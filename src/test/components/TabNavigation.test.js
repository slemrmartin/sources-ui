import React from 'react';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';

import { Tabs } from '@patternfly/react-core/dist/js/components/Tabs/Tabs';
import { TabButton } from '@patternfly/react-core/dist/js/components/Tabs/TabButton';
import { TabTitleIcon } from '@patternfly/react-core/dist/js/components/Tabs/TabTitleIcon';
import { TabTitleText } from '@patternfly/react-core/dist/js/components/Tabs/TabTitleText';
import RedhatIcon from '@patternfly/react-icons/dist/js/icons/redhat-icon';
import CloudIcon from '@patternfly/react-icons/dist/js/icons/cloud-icon';

import { componentWrapperIntl } from '../../utilities/testsHelpers';
import { CLOUD_VENDOR, REDHAT_VENDOR } from '../../utilities/constants';
import TabNavigation from '../../components/TabNavigation';
import * as actions from '../../redux/sources/actions';

describe('TabNavigation', () => {
  let store;
  let wrapper;

  it('renders correctly on Cloud vendor', () => {
    store = configureStore()({
      sources: {
        activeVendor: CLOUD_VENDOR,
      },
    });

    wrapper = mount(componentWrapperIntl(<TabNavigation />, store));

    expect(wrapper.find(Tabs)).toHaveLength(1);
    expect(wrapper.find(TabTitleIcon)).toHaveLength(2);
    expect(wrapper.find(TabTitleText)).toHaveLength(2);
    expect(wrapper.find(RedhatIcon)).toHaveLength(1);
    expect(wrapper.find(CloudIcon)).toHaveLength(1);

    expect(wrapper.find(Tabs).props().activeKey).toEqual(CLOUD_VENDOR);
  });

  it('renders correctly on Red Hat vendor', () => {
    store = configureStore()({
      sources: {
        activeVendor: REDHAT_VENDOR,
      },
    });

    wrapper = mount(componentWrapperIntl(<TabNavigation />, store));

    expect(wrapper.find(Tabs)).toHaveLength(1);
    expect(wrapper.find(TabTitleIcon)).toHaveLength(2);
    expect(wrapper.find(TabTitleText)).toHaveLength(2);
    expect(wrapper.find(RedhatIcon)).toHaveLength(1);
    expect(wrapper.find(CloudIcon)).toHaveLength(1);

    expect(wrapper.find(Tabs).props().activeKey).toEqual(REDHAT_VENDOR);
  });

  it('triggers redux changed', async () => {
    actions.setActiveVendor = jest.fn().mockImplementation(() => ({ type: 'something' }));

    expect(actions.setActiveVendor).not.toHaveBeenCalled();

    await act(async () => {
      wrapper.find(TabButton).first().simulate('click');
    });
    wrapper.update();

    expect(actions.setActiveVendor).toHaveBeenCalledWith(CLOUD_VENDOR);

    actions.setActiveVendor.mockClear();

    await act(async () => {
      wrapper.find(TabButton).last().simulate('click');
    });
    wrapper.update();

    expect(actions.setActiveVendor).toHaveBeenCalledWith(REDHAT_VENDOR);
  });
});
