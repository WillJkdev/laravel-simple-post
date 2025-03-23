import Post from '@/components/Post';
import PostForm from '@/components/PostForm';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PostType } from '@/types/post';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Posts', href: '/posts' }];

export default function Index({ posts }: { posts: PostType[] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Posts" />
      <div className="mx-auto mt-10 w-full max-w-4xl rounded-md bg-white p-6 text-gray-900 shadow-md">
        <h1 className="mb-4 text-xl font-bold">Crear un nuevo Post</h1>
        <PostForm onSuccess={() => {}} />
        <div className="mt-4 flex flex-col gap-4 rounded-lg shadow-md">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
