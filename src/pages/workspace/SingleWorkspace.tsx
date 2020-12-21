import { Divider, Empty} from 'antd';
import React, { useMemo} from 'react';
import {RouteComponentProps} from "react-router";
import {useWorkspaceContext} from "../../contexts/worskspaceContext";
import {workspaceSelector} from "../../utils";
import {useProjectContext} from "../../contexts/projectContext";
import { workspaceObj} from "../../types";
import ProjectHeader from "../../components/projectHeader";

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
                    <ProjectHeader project={project}/>
                )
            }
        })
    },[workspace])

    return (
        <div>
            <Divider orientation="left">{workspace.name}</Divider>
            {render && render.length === 0 ? (<Empty />):  render}
        </div>
    );
}

export default SingleWorkspace;