import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SharedData } from '@/types';
import { PostType } from '@/types/post';
import { useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MessageCircle } from 'lucide-react';
import { FormEventHandler, useCallback, useState } from 'react';

dayjs.extend(relativeTime);
dayjs.locale('es');

const Post = ({ post }: { post: PostType }) => {
  const { auth } = usePage<SharedData>().props;
  const [editing, setEditing] = useState(false);

  const {
    data,
    setData,
    patch,
    processing,
    reset,
    errors,
    delete: destroy,
  } = useForm({
    title: post.title,
    body: post.body,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('posts.update', post.id), {
      onSuccess: () => {
        setEditing(false);
        reset();
      },
    });
  };

  const handleEdit = useCallback(() => setEditing(true), []);
  const handleDelete = useCallback(() => destroy(route('posts.destroy', post.id)), [post.id]);

  return (
    <div className="my-3 flex space-x-2 bg-indigo-400 p-2">
      <MessageCircle className="h-4 w-4 text-gray-50" />
      <div className="flex-1">
        <PostHeader post={post} authUserId={auth.user?.id} onEdit={handleEdit} onDelete={handleDelete} />
        {editing ? (
          <form onSubmit={submit}>
            <div>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm leading-6 text-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                autoFocus
              />
              <InputError message={errors.title} />
            </div>
            <div>
              <textarea
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm leading-6 text-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={data.body}
                onChange={(e) => setData('body', e.target.value)}
              />
              <InputError message={errors.body} />
            </div>
            <div className="mt-2 flex justify-end space-x-2 text-white">
              <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={processing}>
                Guardar
              </Button>
            </div>
          </form>
        ) : (
          <>
            <p className="mt-2 text-2xl font-semibold text-gray-50">{post.title.toUpperCase()}</p>
            <p className="text-sm text-gray-50">{post.body}</p>
          </>
        )}
      </div>
    </div>
  );
};

const PostHeader = ({ post, authUserId, onEdit, onDelete }: { post: PostType; authUserId?: number; onEdit: () => void; onDelete: () => void }) => (
  <div className="my-1 flex items-center justify-between">
    <div>
      <span className="font-bold text-gray-200">{post.user.name}</span>
      <small className="ml-2 text-xs text-gray-200">{dayjs(post.created_at).fromNow()}</small>
      {post.created_at !== post.updated_at && <small className="ml-2 text-xs text-gray-200">&middot; editado</small>}
    </div>
    {authUserId === post.user_id && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <span className="text-gray-50">...</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600">
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </div>
);

export default Post;
