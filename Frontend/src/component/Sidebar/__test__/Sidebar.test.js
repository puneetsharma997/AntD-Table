import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../Sidebar';

window.matchMedia = window.matchMedia || function () { return { matches: false, addListener: function () { }, removeListener: function () { } }; };


describe('Sidebar ', () => {

    it('should have class main-container', () => {
        let component = shallow(<Sidebar />)
        expect(component.find('.main-container')).toBeDefined();
    })

    it('should have class sidebar', () => {
        let component = shallow(<Sidebar />)
        expect(component.find('.sidebar')).toBeDefined();
    })

    it('should have class rub-search-component', () => {
        let component = shallow(<Sidebar />)
        expect(component.find('.rub-search-component')).toBeDefined();
    })

    it('should have class routes', () => {
        let component = shallow(<Sidebar />)
        expect(component.find('.routes')).toBeDefined();
    })

    it('should have class footer', () => {
        let component = shallow(<Sidebar />)
        expect(component.find('.footer')).toBeDefined();
    })



})
