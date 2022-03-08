import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import PostList from "./PostList";

const PostForm = ({create, edit}) => {
    // const bodyInputRef = useRef()
    const [post, setPost] = useState({title:'', body:''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title:'', body:''})
    }
    const editPost = (e) => {
        e.preventDefault()
        edit(post)
        setPost({title:'', body:''})
    }
    return (
        <form>
            <MyInput
                type="text"
                placeholder="Post name"
                value={post.title}
                onChange = {e => setPost({...post, title: e.target.value})}
            />
            <MyInput
                type="text"
                placeholder="Post description"
                value={post.body}
                onChange = {e => setPost({...post, body: e.target.value})}
            />
            {
                edit
                    ? <MyButton onClick={editPost}>Edit post</MyButton>
                    : <MyButton onClick={addNewPost}>Create post</MyButton>
            }

        </form>

    );
};

export default PostForm;
