import React, {useMemo} from 'react';
import {useProjectContext} from "../../contexts/projectContext";
import { Divider, PageHeader, Button, Descriptions,  Avatar, Image } from 'antd';
import {ProjectWrapper} from "./project.styles";
import { Link } from 'react-router-dom';
import ProjectHeader from "../../components/projectHeader";

const ProjectsHome = () =>{
    const{state, dispatch} = useProjectContext();

    const renderProjects = useMemo(()=> {
        return state.projects.map((project)=> {
            return(
                <ProjectHeader project={project}/>
            )
        })
    }, [state.projects])

    return (
        <div>
            <Divider>Projects</Divider>
            {renderProjects}
        </div>
    );
}

export default ProjectsHome;