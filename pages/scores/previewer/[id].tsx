import { useRouter } from "next/router";
import TabPreviewerWithRouter from "../../../components/TabPreviewer/TabPreviewer";

export default function Score() {
  const router = useRouter();

  const scoreId = router.query.id as string;

  return <TabPreviewerWithRouter scoreId={scoreId} />;
}
