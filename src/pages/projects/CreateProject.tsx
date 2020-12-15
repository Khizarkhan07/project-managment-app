import React, {useCallback, useMemo, useState} from 'react';
import {Button, Col, Divider, Form, Input, Row, Select } from "antd";
import {useAuthContext} from "../../contexts/authContext";
import {getAuthenticatedUser} from "../../utils";
import { Redirect } from 'react-router-dom';
import {useProjectContext} from "../../contexts/projectContext";
const { Option } = Select;
const { TextArea } = Input;
const CreateProject = () => {
    const {state, dispatch} = useAuthContext();
    const {state: projectState, dispatch: projectDispatch} = useProjectContext();
    const [stateValue, setStateValue] = useState({name: '', description: '', tech: ''})
    const [team1, setSTeam1] = useState('')
    const [team2, setSTeam2] = useState('')


    const handleSubmit = useCallback(()=> {
        projectDispatch({type: 'CREATE_PROJECT', payload: {name: stateValue.name, description: stateValue.description, tech: stateValue.tech, team1, team2 , users: state.users}})
    }, [stateValue, team1, team2])

    const handleChange = useCallback( (e:any) => {
        const value = e.target.value;
        setStateValue({
            ...stateValue,
            [e.target.name]: value
        });
    }, [stateValue])

    const handleTeam1Change = useCallback( (value: string) => {
        setSTeam1(value);
    },[team1])

    const handleTeam2Change = useCallback((value: string) => {
        setSTeam2(value)
    },[team2])

    const team = useMemo(()=> (
            state.users?.map((user)=> {
              return (
                  <Option value={user.id}>{user.username}</Option>
              )
            })

    ), [state.users])

    return (
        <div>
            {getAuthenticatedUser().role !== 'Manager' && <Redirect to={'/'}/>}
            <Divider orientation="left">Create</Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={6}>

                </Col>
                <Col className="gutter-row" span={12}>

                    <form>
                        <div className="form-group col-md-12">
                            <label htmlFor="title">Project Name</label>
                            <Input placeholder="Enter Article Title" name= "name" value={stateValue.name} onChange={handleChange}/>
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="body">Description</label>
                            <TextArea
                                name="description"
                                onChange={handleChange}
                                placeholder="Brief project overview"
                                value={stateValue.description}
                                autoSize={{ minRows: 5 }}
                            />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="Tech Stack">Tech Satck</label>
                            <Input placeholder="Comma seperated tech" name= "tech" value={stateValue.tech} onChange={handleChange}/>
                        </div>

                        <div className="form-group col-md-12">
                            <label className={"mr-2"} htmlFor="Team1">Team 1</label>
                            <Select  style={{ width: 200 }} onChange={handleTeam1Change}>
                                {team}
                            </Select>
                        </div>

                        <div className="form-group col-md-12">
                            <label className={"mr-2"} htmlFor="Team2">Team 2</label>
                            <Select  style={{ width: 200 }} onChange={handleTeam2Change}>
                                {team}
                            </Select>
                        </div>


                        <div className={"form-group col-md-12"}>
                            <Button
                                onClick={handleSubmit}
                                type={"primary"}
                            >
                                Submit
                            </Button>
                        </div>

                    </form>

                </Col>
                <Col className="gutter-row" span={6}>

                </Col>
            </Row>
        </div>
    );
}

export default CreateProject;