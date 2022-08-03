import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar/Sidebar';


describe('App ', () => {
    it('should have app container class defined', () => {
        let component = shallow(<App />)
        expect(component.find('.app-container')).toBeDefined();
    })

    it('should have div ', () => {
        let component = shallow(<App />)
        expect(component.find('div')).toHaveLength(1);
    })

    it('should have Navbar component ', () => {
        let component = shallow(<App />)
        expect(component.find(Navbar)).toBeDefined();
    })

    it('should have Sidebar component ', () => {
        let component = shallow(<App />)
        expect(component.find(Sidebar)).toBeDefined();
    })

    it('navbar component should not be undefined ', () => {
        let component = shallow(<App />)
        expect(component.find(Navbar)).not.toBeUndefined();
    })

    it('sidebar component should not be undefined', () => {
        let component = shallow(<App />)
        expect(component.find(Sidebar)).not.toBeUndefined();
    })


})
