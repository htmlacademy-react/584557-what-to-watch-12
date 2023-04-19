export type TComment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
}

export type TComments = Array<TComment>

export type TNewCommentData = { comment: string; rating: number; filmId: number }
