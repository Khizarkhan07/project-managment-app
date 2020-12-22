import React from 'react';
import { shallow } from "enzyme";
import CommentEditor from '../components/commentEditor'
import CreateModal from "../components/createModal";
test('comment editor label', () => {

    const comp = shallow(<CreateModal label={"comment"}/>);
    expect(comp.childAt(0).find('label').text()).toEqual(" comment ")
});

test('create modal input on Change', () => {
    const onChangeMock = jest.fn();
    const event = {
        preventDefault() {},
        target: { value: 'the-value' }
    };
    const component = shallow(<CreateModal
        onChange={ onChangeMock }
    />);
    component.find('div').childAt(1).simulate('change', event);
    expect(onChangeMock).toBeCalledWith(event);

});



