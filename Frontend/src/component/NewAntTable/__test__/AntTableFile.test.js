import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import { render, screen, cleanup, } from '@testing-library/react';
import '@testing-library/jest-dom';
import AntTable from '../AntTable';
import { DropDown, Menuu } from '../Dropdown';
import { Dropdown, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { handleSort, handleSourceSort, handleStateSort, handleSwitch } from '../functions';

import axios from "axios";
import { deleteData, fetchData, getscrapesCount } from '../../fetchdata/FetchData';
jest.mock("axios");

afterEach(cleanup);


window.matchMedia = window.matchMedia || function () { return { matches: false, addListener: function () { }, removeListener: function () { } }; };


describe('Table ', () => {
    let setSelectedRowMock = jest.fn();
    let setCurrentPageMock = jest.fn();
    let setTotalPageMock = jest.fn();
    let setDataMock = jest.fn();
    let deleteDataMock = jest.fn()

    it('should have Table component from ant design', () => {
        render(<AntTable selectedRows={['1']} setSelectedRows={setSelectedRowMock} setData={setDataMock} setCurrentPage={setCurrentPageMock}
            setTotalPage={setTotalPageMock} currentPage={['1']} totalPage={['20']} oldData={[{
                key: '1',
                batchId: '#123',
                family: 'Sarees',
                source: 'Amazon',
                results: 85,
                imported: 85,
                lastUpdated: 'March 10, 2022',
                link: 'https://www.google.com',
                status: 'inactive',
            }]}
        />)
        expect(screen.getByRole('table')).toBeInTheDocument();
    })

    it('should have Table component with data source property', () => {
        let component = shallow(<AntTable selectedRows={['1']} setSelectedRows={setSelectedRowMock} setData={setDataMock}
            setCurrentPage={setCurrentPageMock}
            setTotalPage={setTotalPageMock} currentPage={['1']} totalPage={['20']} oldData={[{
                key: '1',
                batchId: '#123',
                family: 'Sarees',
                source: 'Amazon',
                results: 85,
                imported: 85,
                lastUpdated: 'March 10, 2022',
                link: 'https://www.google.com',
                status: 'inactive',
            }]}
        />);
        expect(component.find(Table).prop('dataSource')).toBeDefined();
    })

    it('should have Columns in table component', () => {
        let component = shallow(<AntTable selectedRows={['1']} />);
        expect(component.find(Table).find(Column).exists()).toBe(true);
    })

    it('should toggle row selection on onChange and clear row selection', () => {
        let component = shallow(<AntTable selectedRows={['1']} setSelectedRows={setSelectedRowMock} />);
        component.find(Table).props().rowSelection.onChange([1])
        expect(component.find(Table).props().rowSelection.selectedRowKeys).toEqual(['1']);

        component.find('.main-wrapper').find('.clearRowSelection').simulate('click')
        expect(setSelectedRowMock).toBeCalledTimes(2)
    })

    it('should called set current page ', () => {
        const event = { current: '2' }
        let component = shallow(<AntTable selectedRows={['1']} setSelectedRows={setSelectedRowMock} setCurrentPage={setCurrentPageMock} />);
        component.find(Table).simulate('change', event)
        expect(setCurrentPageMock).toHaveBeenCalledTimes(1);
    })

    it('should call delete data function when click on delete rows', () => {
        let component = shallow(<AntTable selectedRows={['1']} setSelectedRows={setSelectedRowMock} deleteData={deleteDataMock} />);
        component.find(Table).props().rowSelection.onChange([1])
        expect(component.find(Table).props().rowSelection.selectedRowKeys).toEqual(['1']);

        component.find('.main-wrapper').find('.deleteRowSelection').at(0).simulate('click')
        expect(deleteDataMock).toBeCalledTimes(1)
    })
})


describe('Dropdown.js ', () => {
    let data = [{
        key: '1',
        batchId: '#123',
        family: 'Sarees',
        source: 'Amazon',
        results: 85,
        imported: 85,
        lastUpdated: 'March 10, 2022',
        link: 'https://www.google.com',
        status: 'inactive',
    }]
    let handleSortMock = jest.fn();
    let setAttributeMock = jest.fn();
    let setDataMock = jest.fn();
    let setVisibleMock = jest.fn()

    it('should call handleSort function when clicked', () => {
        const items = [
            { key: '1', label: 'Ascending' },
            { key: '2', label: 'Descending' },
        ]

        let component = shallow(<Menuu
            setVisible={setVisibleMock}
            handleSort={handleSortMock}
            items={items}
            oldData={data}
            setData={setDataMock}
            attribute={setAttributeMock} />);

        component.simulate('click');
        expect(handleSortMock).toHaveBeenCalledTimes(1);
    })

    it('should change set visible state to true when clicked on dropdown', () => {
        let component = shallow(<DropDown setAttribute={setAttributeMock} />)
        component.find(Dropdown).simulate('click')
        expect(component.find(Dropdown).props().visible).toBe(true)
    })

    it('should change set attribute state when clicked on span ', () => {
        let component = shallow(<DropDown setAttribute={setAttributeMock} />)
        component.find(Dropdown).find('span').at(0).simulate('click')
        expect(setAttributeMock).toHaveBeenCalledTimes(1);
    })

})


describe('function.js', () => {
    let setDataMock = jest.fn();

    it('should set data when handle sort is called with key 1', async () => {
        axios.post.mockResolvedValue({ data: { productResults: 'dummy data' } });
        await handleSort({ key: '1' }, setDataMock, 'family', '1')
        expect(setDataMock).toHaveBeenCalledTimes(1)
    })
    it('should set data when handle sort is called with key 2', async () => {
        axios.post.mockResolvedValue({ data: { productResults: 'dummy data' } });
        await handleSort({ key: '2' }, setDataMock, 'family', '1')
        expect(setDataMock).toHaveBeenCalledTimes(1)
    })

    it('should set data when handleSourceSort is called with key 1', async () => {
        axios.post.mockResolvedValue({ data: { productResults: 'dummy data' } });
        await handleSourceSort({ key: '1' }, setDataMock, '1')
        expect(setDataMock).toHaveBeenCalledTimes(1)
    })
    it('should set data when handleSourceSort is called with key 2', async () => {
        axios.post.mockResolvedValue({ data: { productResults: 'dummy data' } });
        await handleSourceSort({ key: '2' }, setDataMock, '1')
        expect(setDataMock).toHaveBeenCalledTimes(1)
    })
    it('should set data when handleSourceSort is called with key 3', async () => {
        axios.post.mockResolvedValue({ data: { productResults: 'dummy data' } });
        await handleSourceSort({ key: '3' }, setDataMock, '1')
        expect(setDataMock).toHaveBeenCalledTimes(1)
    })
    it('should set data when handleSourceSort is called with key 4', async () => {
        axios.post.mockResolvedValue({ data: { productResults: 'dummy data' } });
        await handleSourceSort({ key: '4' }, setDataMock, '1')
        expect(setDataMock).toHaveBeenCalledTimes(1)
    })

    it('should set data when handleStateSort is called with key 1', async () => {
        axios.post.mockResolvedValue({ data: { productResults: 'dummy data' } });
        await handleStateSort({ key: '1' }, setDataMock, '1')
        expect(setDataMock).toHaveBeenCalledTimes(1)
    })

    it('should set data when handleStateSort is called with key 2', async () => {
        axios.post.mockResolvedValue({ data: { productResults: 'dummy data' } });
        await handleStateSort({ key: '2' }, setDataMock, '1')
        expect(setDataMock).toHaveBeenCalledTimes(1)
    })

    it('should set data when handleStateSort is called', async () => {
        axios.post.mockResolvedValue({ data: { productResults: 'dummy data' } });
        await handleSwitch(true, '1', setDataMock, '1')
        expect(setDataMock).toHaveBeenCalledTimes(1)
    })
})


describe('axios ', () => {

    let setSelectedRowsMock = jest.fn();
    let setTotalPageMock = jest.fn();
    let setDataMock = jest.fn();
    let setScrapesMock = jest.fn();
    let setTotalProductsLengthMock = jest.fn();

    it('should set data when fetchData function gets called', async () => {
        axios.get.mockResolvedValue({ data: { productResults: 'dummy data' } });
        await fetchData('1', setDataMock, setTotalPageMock)
        expect(setDataMock).toHaveBeenCalledTimes(1)
        expect(setTotalPageMock).toHaveBeenCalledTimes(1)
    })

    it('should set scrapes when getscrapesCount function gets called ', async () => {
        axios.get.mockResolvedValue({ data: { active: 'active' } });
        await getscrapesCount(setScrapesMock, setTotalProductsLengthMock)
        expect(setScrapesMock).toHaveBeenCalledTimes(1)
        expect(setTotalProductsLengthMock).toHaveBeenCalledTimes(1)
    })

    it('should set data and total page when deleteData function gets called', async () => {
        axios.delete.mockResolvedValue({ data: { productResults: 'dummy data' } });
        await deleteData('1', '1', setDataMock, setTotalPageMock, setSelectedRowsMock);
        expect(setDataMock).toHaveBeenCalledTimes(1)
        expect(setTotalPageMock).toHaveBeenCalledTimes(1)
        expect(setSelectedRowsMock).toHaveBeenCalledTimes(1)
    })
})
