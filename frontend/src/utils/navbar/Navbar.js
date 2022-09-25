import { Menu, Layout } from 'antd';
import { useNavigate } from "react-router-dom";
import Logo from "../../logonav.png";
const { Header } = Layout;


function Navbar() {
    const navigate = useNavigate();
    const path = window.location.pathname;
    const isUser = path.startsWith("/user");
    const isAuthority = path.startsWith("/authority");

    return (
        <Header>
            <Menu mode="horizontal">
                <Menu.Item key={0}>
                    {/* logo goes here */}
                    <img
                        src={Logo}
                        className="header-logo pointer"
                        onClick={() => navigate("/")}
                    />

                </Menu.Item>
                {isUser ?
                    <>
                        <Menu.Item key={1} onClick={() => navigate("/user/chat")}>
                            Chat
                        </Menu.Item>
                        <Menu.Item key={2} onClick={() => navigate("/user/videos")}>
                            Help Videos
                        </Menu.Item>
                    </> :
                    <>
                    </>
                }
                {isAuthority ? <>
                </>
                    :
                    <></>}
            </Menu>
        </Header >
    )
}

export default Navbar;