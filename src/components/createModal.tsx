import React from 'react';
import {Modal} from "antd";
type Props = {
    onSubmit?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCancel?: () => void;
    submitting?: boolean,
    value? : string,
    name? :string,
    title?: string,
    visible? : boolean
    label? : string,
    placeholder?: string,

}
const CreateModal: React.FC<Props> = ({title, name, value,onCancel, onChange, onSubmit, visible, label,placeholder}) => {
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={onSubmit}
            onCancel={onCancel}
        >

            <div className="form-group col-md-12">
                <label htmlFor="first_name"> {label} </label>
                <input type="text" id="name" onChange={onChange} name="name" className="form-control" placeholder={placeholder} />
            </div>

        </Modal>
    );
}

export default React.memo(CreateModal);