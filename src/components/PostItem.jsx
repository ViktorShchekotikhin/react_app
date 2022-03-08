import React, {useState} from 'react';
import MyButton from "./UI/button/MyButton";
import { useNavigate } from 'react-router-dom'
import PostForm from "./PostForm";
import MyModal from "./UI/MyModal/MyModal";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
const PostItem = (props) => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)

    const editPost = (editedPost) => {
        props.edit({id: props.post.id,...editedPost})
        setModal(false)
    }
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>
                    Open
                </MyButton>
                <MyButton onClick={() => props.remove(props.post)}>
                    Delete
                </MyButton>
                <MyButton onClick={() => setModal(true)}>
                    Edit
                </MyButton>
                <MyModal visible={modal} setVisible={setModal}>
                    <PostForm edit={editPost}/>
                </MyModal>
            </div>
        </div>
    );
};

export default PostItem;
