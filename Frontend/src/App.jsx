import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Webscraping from './component/NewAntTable/AntTable';
import Sidebar from './component/Sidebar/Sidebar';
import Navbar from './component/Navbar';
import { useState } from 'react';
import { Scrapes } from './component/header/Scrapes';
import { getscrapesCount } from './component/fetchdata/FetchData';
import { deleteData } from '../src/component/fetchdata/FetchData';


function App() {

  const [selectedRows, setSelectedRows] = useState([])
  const [oldData, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  return (
    <div className='app-container'>
      <Navbar />

      <BrowserRouter>
        <Scrapes oldData={oldData} getscrapesCount={getscrapesCount} />

        <Sidebar>
          <Routes>
            <Route path='/user' />
            <Route path='/catalog' />
            <Route path='/family' />
            <Route path='/importt' />
            <Route path='/marketplace' />
            <Route path='/model' />
            <Route path='/product' />
            <Route path='/' element={
              <Webscraping
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                oldData={oldData}
                setData={setData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
                setTotalPage={setTotalPage}
                deleteData={deleteData}
              />} />
          </Routes>
        </Sidebar>

      </BrowserRouter>
    </div>

  )
}




export default App;