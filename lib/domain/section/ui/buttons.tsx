import { Pencil, Plus, Trash } from 'lucide-react';
import Link from 'next/link';
// import { deleteSection } from '@/app/lib/actions';

export function CreateSection() {
  return (
    <Link
      href="/proj/sections/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Section</span>{' '}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSection({ id }: { id: string }) {
  return (
    <Link
      href={`/proj/sections/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil className="w-5" />
    </Link>
  );
}

// export function DeleteSection({ id }: { id: string }) {
//   const deleteSectionWithId = deleteSection.bind(null, id);

//   return (
//     <form action={deleteSectionWithId}>
//       <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <Trash className="w-5" />
//       </button>
//     </form>
//   );
// }