import React, {useMemo} from 'react';
import {useProjectContext} from "../../contexts/projectContext";
import { Divider, PageHeader, Button, Descriptions,  Avatar, Image } from 'antd';
import {ProjectWrapper} from "./project.styles";

const ProjectsHome = () =>{
    const{state, dispatch} = useProjectContext();

    const renderProjects = useMemo(()=> {
        return state.projects.map((project)=> {
            return(
                <ProjectWrapper>
                    <PageHeader
                        key={project.id}
                        ghost={false}
                        title={project.name}
                        extra={[
                            <Button key="1" type="primary">
                                Reviews
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
    }, [])

    return (
        <div>
            <Divider>Projects</Divider>
            {renderProjects}
        </div>
    );
}

export default ProjectsHome;