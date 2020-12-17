import React, {createContext, ReactNode, useContext, useReducer} from "react";
import {  reviewState} from "../types";
import {store} from "../utils";

const ADD_REVIEW = 'ADD_REVIEW'
const CURRENT_REVIEWS = 'CURRENT_REVIEWS'

const initialState:reviewState = {
    reviews : [
        {
            id: 1 ,
            createdAt: new Date(Date.now()),
            reviewBy: {id: '2', username: 'arslan@gmail.com', password: 'arslan', role: 'FE'},
            reviewTo: {id: '1', username: 'khizar@gmail.com', password: 'khizar', role: 'FE'},
            project : {
                id: 1,
                name: 'Project Management App',
                description: 'this is a mern stack project',
                tech: ['react', 'node'],
                team :[{id: '1', username: 'khizar@gmail.com'},
                    {id: '2', username: 'arslan@gmail.com',},],
                createdAt: new Date( Date.now()),
                createdBy: 'jabir',
                responsibility: [{id: '1', data: "Front End in react js"},
                    {id: '2', data: "Team lead and Front end development"},]
            },
            comment: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently"
        },

    ]
};

const ReviewContext = createContext<{
    state: reviewState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

const reducer = (state: reviewState, action: any): reviewState => {
    switch (action.type) {

        case CURRENT_REVIEWS : {
            return {
                ...state,
                reviews: action.payload
            }
        }
        case ADD_REVIEW: {
            const newState ={
                ...state,
                reviews: [...state.reviews, action.payload]
            }
            store(newState.reviews, 'reviewData')
            return newState;
        }

        default :
            return state
    }
}

type Props = {
    children: ReactNode;
};
const ReviewProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ReviewContext.Provider value={{ state, dispatch }}>
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviewContext = () => useContext(ReviewContext);
export { ReviewProvider };

