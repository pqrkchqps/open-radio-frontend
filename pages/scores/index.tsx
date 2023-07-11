import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Seo";
import TabEditor from "../../components/TabEditor/TabEditor";

export default function Score() {
  return (
    <Layout hideRightSidebar hideLeftSidebar containerMaxWidth="md">
      <Seo title="New Score" />
      <TabEditor />
    </Layout>
  );
}
