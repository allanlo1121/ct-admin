

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Form from '@/lib/domain/tunnel/ui/create-form'
import { sectionRepository } from "@/lib/domain/section/repositories";

export default async function Page() {

  const sections = await sectionRepository.findRefs()
  return (



    <Card className="w-full mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>新建隧道</CardTitle>

        <CardDescription>请填写隧道的相关信息</CardDescription>
      </CardHeader>

      <CardContent>
        <Form sections={sections}
        />
      </CardContent>
    </Card>
  );
}
