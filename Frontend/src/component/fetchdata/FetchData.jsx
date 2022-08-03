import axios from "axios";


// for fetching the data through api
const fetchData = async (currentPage, setData, setTotalPage) => {
    const res = await axios.get(`http://localhost:4000/rubick?page=${currentPage}`);
    setData(res.data.productResults);
    setTotalPage(res.data.totalpage);
}

// for deleting the data through api
const deleteData = async (selectedRows, currentPage, setData, setTotalPage, setSelectedRows) => {
    const res = await axios.delete('http://localhost:4000/rubick/delete', { data: { keys: selectedRows, currentpage: currentPage } })
    setData([...res.data.productResults])
    setTotalPage(res.data.totalpage)
    setSelectedRows([]);
}


// for getting all scrapes count
const getscrapesCount = (setScrapes, setTotalProductsLength) => {
    axios.get('http://localhost:4000/rubick/getscrapes').then((res) => {
        setScrapes(res.data.active);
        setTotalProductsLength(res.data.totalProductsData)
    })
}



export { fetchData, deleteData, getscrapesCount };
