import './App.css';
import { useEffect } from "react";
import { Moralis } from "moralis";
import { Layout } from 'antd';
import { Route, Routes } from "react-router-dom";
import Map from "./map/Map";
import HomePage from "./components/homepage/HomePage"
import Navbar from './utils/navbar/Navbar';
import OfficeList from './components/office/OfficeList';
import CreateRequest from './components/createRequest/CreateRequest';
import { MORALIS_APP_ID, MORALIS_SERVER } from "./utils/constants/Constants"
import AuthoritySign from './components/authoritySign/AuthoritySign';
import ViewRequest from './components/viewRequest/ViewRequest';
import Chat from './components/Chat/Chat';
import Video from './components/Video/Video';

const { Content } = Layout;

function App() {

  useEffect(() => {
    Moralis.initialize(MORALIS_APP_ID);
    Moralis.serverURL = MORALIS_SERVER;
    Moralis.start({ appId: MORALIS_APP_ID, serverUrl: MORALIS_SERVER });
    console.log("start moralis", MORALIS_APP_ID, MORALIS_SERVER);
  }, []);

  return (
    <div className="App">
      <Layout className='layout'>
        <Navbar />
        <Content style={{ padding: "0 50px" }}>
          <div className='container'>
            <Routes>
              <Route exact path='/' element={<HomePage />} />
              <Route path='/user/map' element={<Map />} />
              <Route path='/user/office' element={<OfficeList />} />
              <Route path='/user/create' element={<CreateRequest />} />
              <Route path='/user/chat' element={<Chat />} />
              <Route path='/user/videos' element={<Video />} />
              <Route path='/authority/sign/' element={<ViewRequest />} />
              <Route path='/authority/sign/:signId/' element={<AuthoritySign />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </div >
  );
}

export default App;
