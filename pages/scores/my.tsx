import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Scores from "../../components/Scores";
import Seo from "../../components/Seo";
import { RootState } from "../../store";
import { Container } from "../../components/ui";

const MyScoresPage: FC = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Layout hideRightSidebar containerMaxWidth="md">
      <Container shadow="sm" bgColor="white" maxWidth="lg">
        <Seo title="Your Scores" />

        <Scores />
      </Container>
    </Layout>
  );
};

export default MyScoresPage;
