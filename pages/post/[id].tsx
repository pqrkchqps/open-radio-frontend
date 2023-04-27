import { FC } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { PostCard } from "../../components/Post";
import { Container } from "../../components/ui";
import Seo from "../../components/Seo";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import { Cookies, getCookie } from "../../utils";

const fetchPost = (token: string) => {
  return async ({ queryKey }) => {
    const [, postId] = queryKey;
    const { data } = await axios.get(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };
};

interface ProfilePageProps {
  post: any;
}

const PostPage: FC<ProfilePageProps> = ({ post }) => {
  const token = getCookie(Cookies.Token);

  const { data, refetch } = useQuery(["post", post._id], fetchPost(token), {
    initialData: post,
  });

  return (
    <Layout hideRightSidebar marginTop="none">
      <Seo title={post.title} image={post.image} />

      <Container maxWidth="md" marginTop="sm">
        <PostCard
          refetch={refetch}
          disableNavigation
          isCommentsOpen
          displayChannelName
          queryKey={["post", data._id]}
          post={data}
        />
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const token = getCookie(Cookies.Token, req.headers.cookie);
  const post = await fetchPost(token)({ queryKey: ["post", params.id] });
  return {
    props: {
      post,
    },
  };
};

export default PostPage;
