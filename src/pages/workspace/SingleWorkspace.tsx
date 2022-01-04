import {Button, Divider, Empty} from 'antd';
import React, {useCallback, useMemo} from 'react';
import {RouteComponentProps} from "react-router";
import {useWorkspaceContext} from "../../contexts/worskspaceContext";
import {getAuthenticatedUser, workspaceSelector} from "../../utils";
import {useProjectContext} from "../../contexts/projectContext";
import { workspaceObj} from "../../types";
import ProjectHeader from "../../components/projectHeader";
import CreateModal from "../../components/createModal";

type TParams = { id: string };

const SingleWorkspace = ({ match }: RouteComponentProps<TParams>) => {
    const {state, dispatch} = useWorkspaceContext();
    const {state: projectState} = useProjectContext();
    const [visible, setVisible] = React.useState(false);

    const workspace = workspaceSelector(state.workspaces, parseInt(match.params.id)) as workspaceObj
    const [name, setName] = React.useState(workspace.name);

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

    const handleDelete = useCallback(()=> {
        dispatch ( {type: 'DELETE_WORKSPACE', payload: {id: match.params.id}});
        window.location.href= '/'
    },[state.workspaces])


    const deleteButton = useMemo(() => {
        return <Button onClick={handleDelete} className={"mt-2 mb-2 mr-2"} type="primary" danger>
            Delete Workspace
        </Button>
    }, [true])




    const showModal = useCallback(() => {
        setVisible(true);
    }, [visible]);

    const handleCancel = useCallback( () => {
        setVisible(false);
    }, [visible]);


    const handleOK = useCallback(()=> {
        dispatch({type: 'EDIT_WORKSPACE', payload: {name, id: match.params.id}})
        setVisible(false)
    }, [name])

    const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>)=> {
        setName(e.target.value)
    }, [name])

    const updateButton = useMemo(() => {
        return <Button onClick={showModal} className={"mt-2 mb-2"} type="primary">
            Update Workspace
        </Button>
    }, [true])

    return (
        <div>
            <Divider orientation="left">{workspace.name}</Divider>
            {getAuthenticatedUser().role === 'Manager' && deleteButton}
            {getAuthenticatedUser().role === 'Manager' && updateButton}
            {render && render.length === 0 ? (<Empty />):  render}
            <CreateModal value={name} label={"Workspace Name"}  onChange={handleName} onSubmit={handleOK} visible={visible} title={"Edit workspace"} onCancel={handleCancel}/>

        </div>
    );
}

export default SingleWorkspace;