import React, {useEffect, useMemo} from 'react';
import {useProjectContext} from "../../contexts/projectContext";
import {getAuthenticatedUser} from "../../utils";
import {ProjectWrapper} from "./project.styles";
import {Avatar, Button, Descriptions, PageHeader} from "antd";
import {Link} from "react-router-dom";

const UserProjects = () => {
    const {state, dispatch} = useProjectContext();
    const user = getAuthenticatedUser();
    useEffect(()=> {
        dispatch({type: 'USER_PROJECTS', payload: user.id})
    },[])

    const renderProjects = useMemo(()=> {
        if(state.userProjects){
            return state.userProjects.map((project)=> {
                return(
                    <ProjectWrapper>
                        <PageHeader
                            key={project.id}
                            ghost={false}
                            title={project.name}
                            extra={[
                                <Button key="1" type="primary">
                                    <Link to = {`/project/reviews/${project.id}`}>Reviews</Link>
                                </Button>,
                            ]}
                        >
                            <Descriptions size="small" column={3}>
                                <Descriptions.Item label="Created By">{project.createdBy}</Descriptions.Item>
                                <Descriptions.Item label="id">
                                    <a>{project.id}</a>
                                </Descriptions.Item>
                                <Descriptions.Item label="Creation Time">{new Date(project.createdAt).toLocaleDateString()}</Descriptions.Item>
                                <Descriptions.Item label="Effective Time">{new Date(project.createdAt).toLocaleDateString()}</Descriptions.Item>
                                <Descriptions.Item label="Tech stack">{
                                    project.tech.map((tech: any)=> {
                                        return tech + " "
                                    })
                                }</Descriptions.Item>

                                <Descriptions.Item label="Team">
                                    {project.team.map((member: any)=> {
                                        return (
                                            <Avatar>{member.username.substr(0,1).toUpperCase()}</Avatar>
                                        )
                                    })}
                                </Descriptions.Item>

                                <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
                            </Descriptions>
                        </PageHeader>
                    </ProjectWrapper>

                )
            })
        }

    }, [state.userProjects])


    return (

        <div>
            {renderProjects}
        </div>
    );
}

export default UserProjects;