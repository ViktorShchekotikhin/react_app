import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, title, remove, edit}) => {

    if(!posts.length){
        return(
            <h1 style={{textAlign: "center"}}>
                Posts not found!
            </h1>
        )
    }
    return (
            <div>
                <h1 style={{textAlign: "center"}}>
                    {title}
                </h1>
                <TransitionGroup>
                    {posts.map((p, i) =>
                        <CSSTransition
                            key={p.id}
                            timeout={500}
                            classNames="post">
                            <PostItem remove={remove} edit={edit}number={i + 1} post={p} />
                        </CSSTransition>

                    )}
                </TransitionGroup>
            </div>


    );
};

export default PostList;
