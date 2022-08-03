import { Dropdown, Menu, Space } from "antd"
import { useState } from "react"
import { handleSourceSort, handleStateSort } from './functions';

const Menuu = (props) => {
    return (
        <Menu className="ant-d-menu-dropdown"
            onClick={(e) => {
                if (props.attribute === 'source') { handleSourceSort(e, props.setData, props.currentPage) }
                else if (props.attribute === 'state') { handleStateSort(e, props.setData, props.currentPage) }
                else { props.handleSort(e, props.setData, props.attribute, props.currentPage) }
                props.setVisible(false);
            }}
            items={props.items}
        />
    )
}


const DropDown = (props) => {

    const [visible, setVisible] = useState(false);

    const handleVisibleChange = (event) => {
        // console.log('set visible is working')
        setVisible(event);
    };

    return (
        <Dropdown
            onClick={() => { setVisible(!visible) }}
            onVisibleChange={handleVisibleChange}
            visible={visible}
            overlay={<Menuu setVisible={setVisible} items={props.items} setData={props.setData} attribute={props.attribute} dataName={props.dataName} currentPage={props.currentPage} handleSort={props.handleSort} />}
            trigger={['click']}
            arrow>
            <span onClick={() => {
                props.setAttribute(props.dataName)

            }}>
                <Space> {props.title}
                    {visible ?
                        <span style={{ cursor: 'pointer', color: '#156DEC' }} className="material-symbols-outlined">
                            arrow_drop_up
                        </span>
                        :
                        <span style={{ cursor: 'pointer' }} className="material-symbols-outlined">
                            arrow_drop_down
                        </span>
                    }
                </Space>
            </span>
        </Dropdown>
    )
};


export { DropDown, Menuu }