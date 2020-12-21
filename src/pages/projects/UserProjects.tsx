import React, {useEffect, useMemo} from 'react';
import {useProjectContext} from "../../contexts/projectContext";
import {getAuthenticatedUser} from "../../utils";
import ProjectHeader from "../../components/projectHeader";
import {Divider, Empty} from 'antd';

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
                    <ProjectHeader project={project}/>
                )
            })
        }

    }, [state.userProjects])


    return (

        <div>
            <Divider>User Projects</Divider>
            {renderProjects && renderProjects.length === 0 ? (<Empty />):  renderProjects}
        </div>
    );
}

export default UserProjects;