import React, {useCallback, useMemo} from 'react';
import {Layout, Menu} from 'antd'
import {LaptopOutlined} from "@ant-design/icons";
import {getAuthenticatedUser} from "../../utils";
import {Link} from "react-router-dom";
import CreateModal from "../../components/createModal";
import {useAuthContext} from "../../contexts/authContext";
import {useWorkspaceContext} from "../../contexts/worskspaceContext";
const {Sider} = Layout;
const {SubMenu} = Menu
const SideBar: React.FC = () => {
    const {state, dispatch} = useAuthContext();
    const {state: workspaceState, dispatch:workspaceDispatch } = useWorkspaceContext();
    const [visible, setVisible] = React.useState(false);
    const [teamVisible, setTeamVisible] = React.useState(false);
    const [name, setName] = React.useState('');

    const showModal = useCallback(() => {
        setVisible(true);
    }, [visible]);

    const showTeamModal = useCallback(() => {
        setTeamVisible(true);
    }, [teamVisible]);

    const handleTeamCancel = useCallback( () => {
        setTeamVisible(false);
    }, [teamVisible]);


    const handleTeamOK = useCallback(()=> {
        dispatch({type: 'AddTeamMember', payload: name})
        setTeamVisible(false)
    }, [name])

    const handleOk = useCallback(()=> {
        workspaceDispatch({type: 'CREATE_WORKSPACE', payload: {name:name}})
        setVisible(false)
    }, [name])

    const handleCancel = useCallback( () => {
        setVisible(false);
    }, [visible]);


    const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>)=> {
        setName(e.target.value)
    }, [name])


    const workspaces = useMemo(()=> {
        return workspaceState.workspaces.map((workspace) => {
            return (
                <Menu.Item key= {workspace.name + workspace.id}><Link to={`/workspace/${workspace.id}`}> {workspace.name} </Link></Menu.Item>
            )
        })
    },[workspaceState.workspaces])


    return (
        <div>
            <CreateModal label={"Member Name"} placeholder={"Team Member name"}   onChange={handleName} onSubmit={handleTeamOK} visible={teamVisible} title={"Add Team Member"} onCancel={handleTeamCancel}/>
            <CreateModal label={"Workspace Name"} placeholder={"Enter Workspace name"} onChange={handleName} onSubmit={handleOk} visible={visible} title={"Create Workspace"} onCancel={handleCancel}/>
            <Sider width={300} className="site-layout-background menu-style">
                <Menu
                    theme={"dark"}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="sub3" icon={<LaptopOutlined />} title="Workspaces">
                        {getAuthenticatedUser().role === 'Manager' && <Menu.Item key="7" onClick={showModal}> Create Workspace </Menu.Item>}
                        {workspaces}
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="Projects">
                        {getAuthenticatedUser().role === 'Manager' && <Menu.Item key="4"><Link to={'/create'}> Create Project </Link></Menu.Item>}
                        <Menu.Item key="5"><Link to={'/'}> Current Projects </Link></Menu.Item>
                        <Menu.Item key="6"><Link to={'/myProjects'}> My projects </Link></Menu.Item>
                    </SubMenu>


                    <SubMenu key="sub4" icon={<LaptopOutlined />} title="Team">
                        {getAuthenticatedUser().role === 'Manager' && <Menu.Item key="8" onClick={showTeamModal}> Add team member </Menu.Item>}
                        <Menu.Item key="9"><Link to={'/Team'}>View Team </Link></Menu.Item>
                    </SubMenu>

                </Menu>
            </Sider>
        </div>

    );
}

export default SideBar;