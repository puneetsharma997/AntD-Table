import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

window.matchMedia = window.matchMedia || function () { return { matches: false, addListener: function () { }, removeListener: function () { } }; };


describe('Navbar ', () => {

    it('should have div with length 3', () => {
        let component = shallow(<Navbar />)
        expect(component.find('div')).toHaveLength(3);
    })

    it('should have class name of nav-container', () => {
        let component = shallow(<Navbar />)
        expect(component.find('.nav-container')).toBeDefined();
    })

    it('should have class name of nav-left', () => {
        let component = shallow(<Navbar />)
        expect(component.find('.nav-left')).toBeDefined();
    })

    it('should have class name of nav-right', () => {
        let component = shallow(<Navbar />)
        expect(component.find('.nav-right')).toBeDefined();
    })





})