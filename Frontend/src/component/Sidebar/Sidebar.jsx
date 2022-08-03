import { NavLink } from 'react-router-dom';
import { Input } from 'antd';

const routesArray = [
    {
        key: '1',
        path: '/catalog',
        name: 'Catalog',
        icon: <span className="material-symbols-sharp"> style </span>,
    },
    {
        key: '2',
        path: '/family',
        name: 'Family',
        icon: <span className="material-symbols-sharp"> widgets </span>,
    },
    {
        key: '3',
        path: '/product',
        name: 'Product',
        icon: <span className="material-symbols-sharp"> category </span>,
    },
    {
        key: '4',
        path: '/marketplace',
        name: 'Marketplace',
        icon: <span className="material-symbols-sharp"> shopping_bag </span>,
    },
    {
        key: '5',
        path: '/model',
        name: 'Model',
        icon: <span className="material-symbols-sharp"> inventory_2 </span>,
    },
    {
        key: '6',
        path: '/',
        name: 'Web Scraping',
        icon: <span className="material-symbols-sharp"> hub </span>,
    },
    {
        key: '7',
        path: '/importt',
        name: 'Import',
        icon: <span className="material-symbols-sharp"> file_upload </span>,
    },
    {
        key: '8',
        path: '/User',
        name: 'User',
        icon: <span className="material-symbols-sharp"> manage_accounts </span>,
    }
]


const Sidebar = ({ children }) => {
    const { Search } = Input;

    return (
        <div className="main-container">
            <div className='sidebar'>

                <div className="rub-search-component">
                    <Search
                        placeholder="Search"
                        allowClear
                        prefix={<span className="material-symbols-sharp" style={{ color: '#0067ff' }}>search</span>}
                    />
                </div>

                <section className='routes'>

                    {routesArray.map((route) => (
                        <div className="navlink-container" key={route.key}>
                            <NavLink to={route.path} className='link' activeclassname='active'>
                                <div className="icon">{route.icon}</div>
                                <div className="link-text">{route.name}</div>
                            </NavLink>
                        </div>
                    ))}

                    <div className="footer">RUBICK.AI 0.5</div>

                </section>
            </div>

            <main>{children}</main>
        </div>
    )
}

export default Sidebar
