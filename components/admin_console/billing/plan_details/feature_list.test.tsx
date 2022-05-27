// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {shallow, ShallowWrapper} from 'enzyme';

import {CloudProducts} from 'utils/constants';

import FeatureList from './feature_list';

describe('components/admin_console/billing/plan_details/feature_list', () => {
    test('should match snapshot when running FREE tier', () => {
        const wrapper = shallow(
            <FeatureList
                subscriptionPlan={CloudProducts.STARTER}
                isPaidTier={false}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });
    test('should match snapshot when running paid tier and professional', () => {
        const wrapper = shallow(
            <FeatureList
                subscriptionPlan={CloudProducts.PROFESSIONAL}
                isPaidTier={true}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot when running paid tier and enterprise', () => {
        const wrapper = shallow(
            <FeatureList
                subscriptionPlan={CloudProducts.ENTERPRISE}
                isPaidTier={true}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot when running paid tier and starter', () => {
        const wrapper = shallow(
            <FeatureList
                subscriptionPlan={CloudProducts.STARTER}
                isPaidTier={true}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('all feature items must have different values', () => {
        const wrapperEnterprise = shallow(
            <FeatureList
                subscriptionPlan={CloudProducts.ENTERPRISE}
                isPaidTier={true}
            />,
        );

        const wrapperStarter = shallow(
            <FeatureList
                subscriptionPlan={CloudProducts.STARTER}
                isPaidTier={true}
            />,
        );

        const wrapperProfessional = shallow(
            <FeatureList
                subscriptionPlan={CloudProducts.PROFESSIONAL}
                isPaidTier={true}
            />,
        );

        const wrapperFreeTier = shallow(
            <FeatureList
                subscriptionPlan={CloudProducts.PROFESSIONAL}
                isPaidTier={false}
            />,
        );

        const wrappers = [wrapperProfessional, wrapperEnterprise, wrapperStarter, wrapperFreeTier];

        wrappers.forEach((wrapper: ShallowWrapper<typeof FeatureList>) => {
            const featuresSpanElements = wrapper.find('div.PlanDetails__feature > span');
            if (featuresSpanElements.length === 0) {
                console.error('No features found');
                expect(featuresSpanElements.length).toBeTruthy();
                return;
            }
            const featuresTexts = featuresSpanElements.map((element) => element.text());

            const hasDuplicates = (arr: any[]) => arr.length !== new Set(arr).size;

            expect(hasDuplicates(featuresTexts)).toBeFalsy();
        });
    });
});
