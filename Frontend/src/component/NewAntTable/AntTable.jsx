import React, { useEffect, useState } from 'react'
import './AntTable.scss';
import 'antd/dist/antd.min.css'
import { Dropdown, Menu, Switch, Table } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import Column from "antd/lib/table/Column";
import { handleSort, handleSwitch } from './functions';
import { DropDown } from './Dropdown';

import { fetchData } from '../fetchdata/FetchData';

import 'antd/dist/antd.min.css'
import moment from 'moment';


const AntTable = (props) => {

    const [attribute, setAttribute] = useState('');
    const [prevRowSelected, setPrevRowSelected] = useState([]);

    const items = [
        { key: '1', label: 'Ascending' },
        { key: '2', label: 'Descending' },
    ]

    useEffect(() => {
        fetchData(props.currentPage, props.setData, props.setTotalPage);
    }, []);

    useEffect(() => {
        countRowsSelected()
    }, [prevRowSelected]);

    const deleteHandler = () => {
        props.deleteData(props.selectedRows, props.currentPage, props.setData, props.setTotalPage, props.setSelectedRows);
    }

    const onClearRowSelection = () => {
        props.setSelectedRows([]);
    }

    const handleChange = (event) => {
        props.setCurrentPage(event.current);
        fetchData(event.current, props.setData, props.setTotalPage);
    }

    const onSelectChange = (newSelectedRowKeys) => {
        props.setSelectedRows([...newSelectedRowKeys]);
        prevRowSelected[props.currentPage] = newSelectedRowKeys;
        setPrevRowSelected([...prevRowSelected]);
    }

    function countRowsSelected() {
        let array = [];
        for (let i = 1; i <= props.totalPage; i++) {
            if (prevRowSelected[i]?.length > 0) {
                array.push(...prevRowSelected[i]);
            }
        }
        props.setSelectedRows([...array]);
    }

    return (
        <div className='main-wrapper'>

            <div className='table-wrapper'>
                <Table
                    size={'large'}
                    pagination={{
                        current: props.currentPage,
                        total: props.totalPage * 10
                    }
                    }
                    dataSource={props.oldData}
                    onChange={handleChange}
                    rowSelection={{
                        typeTable: 'checkbox',
                        selectedRowKeys: props.selectedRows,
                        onChange: onSelectChange,
                    }} >

                    <Column
                        title='Batch ID'
                        width={140}
                        dataIndex='batchId'
                        key='key'
                        render={(text, record) => <a href={record.link} target='_blank' rel="noreferrer" > {text} </a>}
                    />

                    <Column
                        title={
                            <DropDown
                                title={'Family'}
                                dataName={'family'}
                                setAttribute={setAttribute}
                                items={items}
                                setData={props.setData}
                                attribute={attribute}
                                currentPage={props.currentPage}
                                handleSort={handleSort}
                            />
                        }
                        // sorter={true}
                        width={235}
                        dataIndex='family'
                        key='key'
                        render={(text, record) => <>
                            <img alt='' src={`http://localhost:4000/${record.img}`} style={{ height: '30px', width: '30px', marginRight: '10px' }} />
                            <span> {text} </span>
                        </>}
                    />

                    <Column
                        title={
                            <DropDown
                                title={'Source'}
                                dataName={'source'}
                                setAttribute={setAttribute}
                                items={[{ key: '1', label: 'Amazon' },
                                { key: '2', label: 'Flipkart' },
                                { key: '3', label: 'Meesho' },
                                { key: '4', label: 'Myntra' }]}
                                setData={props.setData}
                                attribute={attribute}
                                currentPage={props.currentPage}
                            />
                        }
                        width={200}
                        dataIndex='source'
                        key='key'
                    />

                    <Column
                        title={
                            <DropDown
                                title={'State'}
                                dataName={'state'}
                                setAttribute={setAttribute}
                                items={[{ key: '1', label: 'Active' }, { key: '2', label: 'Inactive' }]}
                                setData={props.setData}
                                attribute={attribute}
                                currentPage={props.currentPage}
                            />
                        }
                        width={150}
                        dataIndex='status'
                        key='key'
                        render={(text, record) => <>
                            <Switch
                                size='small'
                                className={text ? 'activeToggle' : 'inactiveToggle'}
                                defaultChecked={text}
                                onChange={(event) => { handleSwitch(event, props.currentPage, props.setData, record.key) }}
                            />
                        </>}
                    />

                    <Column
                        title={
                            <DropDown
                                title={'Results'}
                                dataName={'results'}
                                setAttribute={setAttribute}
                                items={items}
                                setData={props.setData}
                                attribute={attribute}
                                currentPage={props.currentPage}
                                handleSort={handleSort}
                            />
                        }
                        width={159}
                        dataIndex='results'
                        key='key'
                    />

                    <Column
                        title={
                            <DropDown
                                title={'Imported'}
                                dataName={'imported'}
                                setAttribute={setAttribute}
                                items={items}
                                setData={props.setData}
                                attribute={attribute}
                                currentPage={props.currentPage}
                                handleSort={handleSort}
                            />
                        }
                        width={159}
                        dataIndex='imported'
                        key='key'
                    />

                    <Column
                        title='Last Updated'
                        dataIndex='lastUpdated'
                        key='key'
                        width={150}
                        render={(text) => <div>{moment(text).format('MMM Do Y')}</div>}
                    />

                    <Column
                        title={
                            <span className="material-symbols-sharp" style={{ color: '#0067ff' }}>more</span>
                        }
                        width={60}
                        dataIndex='action'
                        key='key'
                        render={() =>
                            <Dropdown overlay={<Menu items={[{ key: '1', label: 'View' }, { key: '2', label: 'Edit' }]} />}
                                trigger='click' >
                                <MoreOutlined />
                            </Dropdown>}
                    />

                </Table>
            </div>

            {props.selectedRows.length > 0 ?
                <div className="table-footer">
                    <div className="table-toolbar">{props.selectedRows.length} Row{props.selectedRows.length > 1 ? 's' : null} Selected</div>
                    <div className="table-toolbar">
                        <a className='clearRowSelection' onClick={() => onClearRowSelection(props.setSelectedRows)} >Clear Selection</a>
                        <a className='deleteRowSelection' onClick={() => deleteHandler(props.setData, props.oldData, props.selectedRows, props.setSelectedRows)} >
                            <span className="material-symbols-sharp">delete</span>
                            <span className='deleteRow'>Delete</span>
                        </a>
                    </div>
                </div>
                : null}
        </div>
    )
}

export default AntTable;
