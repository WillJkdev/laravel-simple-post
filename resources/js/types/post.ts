export interface PostType {
    id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    user: { id: number; name: string };
  }
  