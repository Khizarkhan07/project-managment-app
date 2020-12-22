import {shallow} from "enzyme";
import React from "react";
import {initialState} from "../contexts/reviewContext";
import ProjectReviews from "../pages/reviews/projectReviews";

const defaultProps: any = {
    history: {
        pathname: '/project/reviews/:id',
        match: {id: '1'}
    },
}

it(">>>> Should show select heading", async () => {

    const wrapper = shallow(<ProjectReviews {...defaultProps}/>);
    expect(wrapper.find('h5').text()).toEqual("Select a team member")
});

it(">>>> Should show two options", async () => {

    const wrapper = shallow(<ProjectReviews {...defaultProps}/>);
    expect(wrapper.find('Option').length).toEqual(2)
});
