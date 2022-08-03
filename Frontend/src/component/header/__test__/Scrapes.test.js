import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Scrapes } from '../Scrapes';


describe('', () => {
    it('', () => {
        let getscrapesCountMock = jest.fn();
        let component = mount(<Scrapes getscrapesCount={getscrapesCountMock} oldData={[{
            key: '1',
            batchId: '#123',
            family: 'Sarees',
            source: 'Amazon',
            results: 85,
            imported: 85,
            lastUpdated: 'March 10, 2022',
            link: 'https://www.google.com',
            status: 'inactive',
        }]} />)

        expect(getscrapesCountMock).toHaveBeenCalledTimes(1)
    })

})
