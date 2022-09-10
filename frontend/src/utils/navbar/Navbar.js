import { Menu, Layout } from 'antd';
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

function Navbar() {
    const navigate = useNavigate();
    const path = window.location.pathname;
    const isUser = path.startsWith("/user");

    return (
        <Header>
            <Menu mode="horizontal">
                <Menu.Item key={0}>
                    {/* logo goes here */}
                    {/* <img
                        src={logo}
                        className="header-logo pointer"
                        onClick={() => navigate("/")}
                        /> 
                    */}
                </Menu.Item>
                {isUser ?
                    <>
                        <Menu.Item key={1} onClick={() => navigate("/")}>
                            user1
                        </Menu.Item>
                        <Menu.Item key={2} onClick={() => navigate("/")}>
                            user2
                        </Menu.Item>
                    </> :
                    <>
                        <Menu.Item key={1} onClick={() => navigate("/")}>
                            authority1
                        </Menu.Item>
                        <Menu.Item key={2} onClick={() => navigate("/")}>
                            authority2
                        </Menu.Item>
                    </>
                }
            </Menu>
        </Header>
    )
}

export default Navbar;