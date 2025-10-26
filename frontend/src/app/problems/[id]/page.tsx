import ProblemPageClient from '@/components/problems/ProblemPageClient';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;       // <-- ici on await
  const problemId = Number(id);

  return <ProblemPageClient problemId={problemId} />;
}
