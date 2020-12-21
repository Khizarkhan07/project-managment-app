import React from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
type commentProps = {
    onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onChange?: (e: any) => void;
    submitting?: boolean,
    value? : string

}

const CommentEditor: React.FC<commentProps> = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);

export default CommentEditor;