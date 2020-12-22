import React from 'react';
import {render, shallow } from "enzyme";
import CommentEditor from '../components/commentEditor'

/*
test('comment editor value', () => {

    const comp = render(<CommentEditor value={"comment"}/>);
    const input = comp.find('TextArea')
    expect(input.val()).toEqual("comment")
});
*/


test('comment on click', () => {

    let test = false;
    const comp = shallow(
        <CommentEditor
            onSubmit={(e) => {
                test = true;
            }}
        />
    );

    comp.find('Button').simulate("click");
    expect(test).toBe(true);
});




test('comment on change', () => {

    const onChangeMock = jest.fn();
    const event = {
        preventDefault() {},
        target: { value: 'the-value' }
    };
    const component = shallow(<CommentEditor
        onChange={ onChangeMock }
    />);
    component.find('div').childAt(0).childAt(0).simulate('change', event);
    expect(onChangeMock).toBeCalledWith(event);

});



