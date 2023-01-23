import React, { Fragment } from 'react';
import Loader from './component/common/loader/loader'
import Header from './component/common/header/header'
import Sidebar from './component/common/sidebar/sidebar'
import Rightsidebar from './component/common/sidebar/rightsidebar'
import Footer from './component/common/footer/footer'
import ThemeCustomize from './component/common/theme-customizer/themeCustomize'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({children}) =>  {
  return (
    <Fragment> 
    <Loader/>
    <div className="page-wrapper">
      <div className="page-body-wrapper">
        <Header/>
        <Sidebar/>
        <Rightsidebar/>
          <div className="page-body">
              {children}
          </div>
        <Footer/> 
        <ThemeCustomize/>
      </div>  
    </div>
    <ToastContainer />
    </Fragment>
  );
}


export default App;
