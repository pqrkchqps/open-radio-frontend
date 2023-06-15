import { useRouter } from "next/router";
import TabEditor from "../../components/TabEditor/TabEditor";

export default function Score() {
  const router = useRouter();

  const scoreId = router.query.id as string;

  return <TabEditor scoreId={scoreId} />;
}
