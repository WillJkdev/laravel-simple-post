import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function PostForm({ onSuccess }: { onSuccess: () => void }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    body: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('posts.store'), {
      onSuccess: () => {
        reset();
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block font-medium">Título</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
          className="w-full rounded border p-2"
          placeholder="Título del post"
          autoFocus
        />
        <InputError message={errors.title} />
      </div>
      <div>
        <label className="block font-medium">Contenido</label>
        <textarea
          value={data.body}
          onChange={(e) => setData('body', e.target.value)}
          className="w-full rounded border p-2"
          placeholder="Contenido del post"
        />
        <InputError message={errors.body} />
      </div>
      <Button
        variant="default"
        type="submit"
        disabled={processing}
        className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {processing ? 'Guardando...' : 'Publicar'}
      </Button>
    </form>
  );
}
