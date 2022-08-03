import axios from "axios"

export const handleSort = async (e, setData, attribute, currentPage) => {
    if (e.key === '1') {
        let result = await axios.post('http://localhost:4000/rubick/sortdata', { data: { option: e.key, column: attribute, currentpage: currentPage } })
        setData([...result.data.productResults])
    }
    else {
        let result = await axios.post('http://localhost:4000/rubick/sortdata', { data: { option: e.key, column: attribute, currentpage: currentPage } })
        setData([...result.data.productResults])
    }
}


export const handleSourceSort = async (e, setData, currentPage) => {
    if (e.key === '1') {
        let result = await axios.post('http://localhost:4000/rubick/sortsourcedata', { data: { option: e.key, currentpage: currentPage } })
        setData([...result.data.productResults])
    }
    else if (e.key === '2') {
        let result = await axios.post('http://localhost:4000/rubick/sortsourcedata', { data: { option: e.key, currentpage: currentPage } })
        setData([...result.data.productResults])
    }
    else if (e.key === '3') {
        let result = await axios.post('http://localhost:4000/rubick/sortsourcedata', { data: { option: e.key, currentpage: currentPage } })
        setData([...result.data.productResults])
    }
    else {
        let result = await axios.post('http://localhost:4000/rubick/sortsourcedata', { data: { option: e.key, currentpage: currentPage } })
        setData([...result.data.productResults])
    }
}

export const handleStateSort = async (e, setData, currentPage) => {
    if (e.key === '1') {
        let result = await axios.post('http://localhost:4000/rubick/sortstatedata', { data: { option: e.key, currentpage: currentPage } })
        setData([...result.data.productResults])
    }
    else {
        let result = await axios.post('http://localhost:4000/rubick/sortstatedata', { data: { option: e.key, currentpage: currentPage } })
        setData([...result.data.productResults])
    }
}


export const handleSwitch = async (event, currentPage, setData, key) => {

    let result = await axios.post('http://localhost:4000/rubick/toggle', { data: { state: event, currentpage: currentPage, key: key } })
    let productResults = result.data.productResults;
    setData(productResults);
}