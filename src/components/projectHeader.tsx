import React from 'react';
import {Avatar, Button, Descriptions, PageHeader} from "antd";
import {ProjectWrapper} from "../pages/projects/project.styles";
import {projectObject} from "../types";
import {Link} from "react-router-dom";

type projectProp = {
    project : projectObject,
}
const  ProjectHeader: React.FC<projectProp> = ({project}) => {
    return (
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
    );
}

export default React.memo(ProjectHeader);