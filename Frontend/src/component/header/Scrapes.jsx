import React, { useEffect, useState } from 'react'
import './Scrapes.scss';


const Scrapes = (props) => {

    const [scrapes, setScrapes] = useState(0)
    const [totalProductsLength, setTotalProductsLength] = useState(0)

    useEffect(() => {

        props.getscrapesCount(setScrapes, setTotalProductsLength)

    }, [props.oldData])

    return (
        <div className='table-header'>
            <div className="scrapes-container">
                <span>Scrapes</span>
            </div>

            <div className="status-container">
                <div className="active-container">
                    <span>{scrapes}</span>
                    <span>Active</span>
                </div>

                <div className="inactive-container">
                    <span>{totalProductsLength - scrapes}</span>
                    <span>Inactive</span>
                </div>
            </div>
        </div>
    )
}

export { Scrapes }


