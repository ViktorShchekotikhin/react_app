import React, {useState, useRef, useMemo, useEffect} from 'react'
import {usePosts} from "../hooks/usePost";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/page";
import PostService from "../API/PostService";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import MyLoader from "../components/UI/MyLoader/MyLoader";
import Paggination from "../components/UI/pagination/Paggination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {
    const [posts, setPosts] = useState([])
    const [editedPost, setEditedPost] = useState(null)
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchPosts, isPostLoading, postError] = useFetching( async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })
    const [fetchEditPostById, isLoading, error] = useFetching(async (edPost) => {
        const response = await PostService.editPostById(edPost)
        const idx = posts.findIndex(post => {
            return post.id === response.data.id;
        });
        const newPosts = [...posts]
        newPosts[idx] = response.data
        setPosts(newPosts)
    })

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1)
    })
    useEffect(()=> {
        fetchPosts(limit, page)
    }, [page, limit])

    useEffect(()=> {
        if(editedPost){
            fetchEditPostById(editedPost)
        }
    },[editedPost])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    const editPost = (post) => {
        setEditedPost(post)
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>Create Post</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin:'15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Quantity elements on page"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '20'},
                    {value: -1, name: 'All'},
                ]}
            />
            {postError && <h1>Error {postError}</h1>}
            {isPostLoading &&
            <div style={{display: 'flex', justifyContent: "center", marginTop: 50}}>
                <MyLoader/>
            </div>
            }
            <PostList remove={removePost} edit = {editPost} posts = {sortedAndSearchedPosts} title={'Posts'}></PostList>
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            <Paggination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;


