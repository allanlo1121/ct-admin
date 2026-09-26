
import Form from '@/lib/domain/section/ui/create-form';

import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { projectRepository } from '@/lib/domain/project/repositories';

export const metadata: Metadata = {
  title: '新建工点',
};

export default async function Page() {
  const projects = await projectRepository.fetchRefs();

  return (
    <Card className="w-full mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>新建工点</CardTitle>

        <CardDescription>请填写工点的相关信息</CardDescription>
      </CardHeader>

      <CardContent>
        <Form projects = { projects } 
        />
      </CardContent>
    </Card>
  );
}