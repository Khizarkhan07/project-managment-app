import {shallow} from "enzyme";
import React from "react";
import ProjectsHome from "../pages/projects/ProjectsHome";
import {initialState} from "../contexts/projectContext";

it(">>>> Home should have two projects", async () => {

    const wrapper = shallow(<ProjectsHome/>);
    expect(wrapper.childAt(1).prop('project')).toBe(initialState.projects[0])
    expect(wrapper.childAt(2).prop('project')).toBe(initialState.projects[1])

});

it(">>>> Home should have divider", async () => {

    const wrapper = shallow(<ProjectsHome/>);
    expect(wrapper.find('Divider').length).toEqual(1)

});
