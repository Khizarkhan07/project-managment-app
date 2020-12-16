import React, {useEffect, useMemo} from 'react';
import {useProjectContext} from "../../contexts/projectContext";
import {getAuthenticatedUser} from "../../utils";
import {ProjectWrapper} from "./project.styles";
import {Avatar, Button, Descriptions, PageHeader} from "antd";
import {Link} from "react-router-dom";
import ProjectHeader from "../../components/projectHeader";

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
            {renderProjects}
        </div>
    );
}

export default UserProjects;