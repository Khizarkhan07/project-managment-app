import React from 'react';
import {useAuthContext} from "../../contexts/authContext";
import {List, Avatar, Divider} from 'antd';

const AllTeam = () => {
    const {state} = useAuthContext();
    return (
        <div>
            <Divider orientation="left">MEET OUR TEAM</Divider>
            <List
                itemLayout="horizontal"
                dataSource={state.users}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar>{item.username.substring(0,1)} </Avatar>}
                            title={<a href="https://ant.design">{item.username}</a>}
                            description={item.role}
                        />
                    </List.Item>
                )}
            />
        </div>

    );
}

export default AllTeam;