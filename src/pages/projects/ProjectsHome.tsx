import React, {useMemo} from 'react';
import {useProjectContext} from "../../contexts/projectContext";
import {Divider, Empty} from 'antd';
import ProjectHeader from "../../components/projectHeader";

const ProjectsHome: React.FC = () =>{
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
            {renderProjects && renderProjects.length === 0 ? (<Empty />):  renderProjects}
        </div>
    );
}

export default ProjectsHome;