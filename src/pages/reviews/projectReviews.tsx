import React, {useCallback, useMemo, useState} from 'react';
import {RouteComponentProps} from "react-router";
import {useReviewContext} from "../../contexts/reviewContext";
import {getAuthenticatedUser, singleProjectSelector, userSelector} from "../../utils";
import {Divider, Comment, Tooltip, Avatar, Select} from "antd";
import moment from 'moment';
import CommentEditor from "../../components/commentEditor";
import {useProjectContext} from "../../contexts/projectContext";
import {projectObject} from "../../types";
const { Option } = Select;
type TParams = { id: string };
const ProjectReviews = ({ match }: RouteComponentProps<TParams>) => {
    const {state, dispatch} = useReviewContext();
    const {state: projectState} = useProjectContext();
    const [value, setValue] = useState('')
    const [member, setMember] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const user = getAuthenticatedUser();

    const project = singleProjectSelector(projectState.projects, parseInt(match.params.id)) as projectObject

    const ProjectReviews = state.reviews.filter(review=> review.project.id == parseInt(match.params.id));

    const userReviews = ProjectReviews.filter(project => project.reviewTo.id == member || project.reviewBy.id == member  )

    const reviewTo = userSelector(project.team, member);


    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    },[value]);

    const handleTeamChange = useCallback((value: string) => {
        setMember(value)
    },[member])

    const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        setSubmitting(true)

        dispatch({type: 'ADD_REVIEW', payload: {id:state.reviews.length+1 ,comment: value, reviewBy: user, reviewTo, project, createdAt: new Date(Date.now()) }})
        setValue("");
        setSubmitting(false)
    },[value]);


    const team = useMemo(()=> {
        return project.team.map((user) => {
            if(user.id != getAuthenticatedUser().id){
                return (
                    <Option value={user.id}> {user.username} </Option>
                )
            }

        })
    }, [project])

    const renderReviews = useMemo(()=> {
        return userReviews.map((review)=> {
            return (
                <Comment
                    author={<a>{review.reviewBy.username}</a>}
                    avatar={
                        <Avatar>{review.reviewBy.username.substr(0,1).toUpperCase()}</Avatar>
                    }
                    content={
                        <p>{review.comment}</p>
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(new Date(review.createdAt), 'YYYY.MM.DD').fromNow()}</span>
                        </Tooltip>
                    }
                />

            )
        })
    },[userReviews])



    return (
        <div>

            <div className="form-group col-md-12">
                <label className={"mr-2"} htmlFor="Team1">Select Member</label>
                <Select  style={{ width: 200 }} onChange={handleTeamChange}>
                    {team}
                </Select>
            </div>

            {member !== '' ? (<div>
                <Divider orientation="left">{ProjectReviews[0]?.project.name}</Divider>

                {renderReviews}
                <hr/>
                <Comment
                    avatar={
                        <Avatar>{user.username.substr(0,1).toUpperCase()}</Avatar>
                    }
                    content={
                        <CommentEditor submitting={submitting} value={value} onChange={handleChange} onSubmit={handleSubmit}/>
                    }
                />
            </div>): (<h5>Select a team member</h5>)}


        </div>
    );
}

export default ProjectReviews;