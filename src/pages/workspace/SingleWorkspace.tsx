import {Avatar, Button, Descriptions, Divider, PageHeader} from 'antd';
import React, { useMemo} from 'react';
import {RouteComponentProps} from "react-router";
import {useWorkspaceContext} from "../../contexts/worskspaceContext";
import {workspaceSelector} from "../../utils";
import {useProjectContext} from "../../contexts/projectContext";
import { workspaceObj} from "../../types";
import {ProjectWrapper} from "../projects/project.styles";

type TParams = { id: string };

const SingleWorkspace = ({ match }: RouteComponentProps<TParams>) => {
    const {state} = useWorkspaceContext();
    const {state: projectState} = useProjectContext();
    const workspace = workspaceSelector(state.workspaces, parseInt(match.params.id)) as workspaceObj

    const render = useMemo(()=> {
        return workspace.projects.map((projectId) => {
            const project = projectState.projects.find((project => project.id == projectId))
            if(project) {
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
            }
        })
    },[workspace])

    return (
        <div>
            <Divider orientation="left">{workspace.name}</Divider>
            {render}
        </div>
    );
}

export default SingleWorkspace;