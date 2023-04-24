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

export type TNewCommentRequestBody = TNewComment & { filmId: number }

export type TNewComment = { comment: string; rating: number }
