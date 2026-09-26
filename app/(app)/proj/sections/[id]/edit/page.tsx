import EditForm from '@/lib/domain/section/ui/edit-form';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { projectRepository } from '@/lib/domain/project/repositories';
import { sectionRepository } from '@/lib/domain/section/repositories';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Section',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [section, projects] = await Promise.all([
    sectionRepository.findById(id),
    projectRepository.fetchRefs(),
  ]);

  if (!section) {
    notFound();
  }

  return (
    <Card className="w-full mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>编辑工点</CardTitle>

        <CardDescription>请更新工点的相关信息</CardDescription>
      </CardHeader>

      <CardContent>
        <EditForm section={section} projects={projects} />
      </CardContent>
    </Card>
  );
}