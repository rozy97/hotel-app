import React from "react";
import PostInterface from "../../componentsV2/containers/postInterface/index";
import { useGetPosts } from "../../hooks";

const AllPublications = () => {
    const { postsList } = useGetPosts("all");

    return (
        <>
            <PostInterface postsList={postsList} />
        </>
    );
};

export default AllPublications;
