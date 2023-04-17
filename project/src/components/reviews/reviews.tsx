import { FC } from 'react';
import { TComments } from '../../types/comment';
import { Review } from '../review/review';

export const Reviews:FC<{ filmComments: TComments }> = ({ filmComments }) => {
  if(!filmComments.length) {
    return <p style={{ background: 'rgba(0,0,0,0.5)', padding: '5px' }}>No comments yet...</p>;
  }

  const commentsColumns = filmComments.reduce((acc, comment, idx) => {
    if(idx % 2 === 0) {
      acc.leftColumnComments.push(comment);
    } else {
      acc.rightColumnComments.push(comment);
    }

    return acc;
  }, {
    leftColumnComments: ([] as TComments),
    rightColumnComments: ([] as TComments)
  });

  const { leftColumnComments, rightColumnComments } = commentsColumns;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {
          leftColumnComments.map((comment) => (<Review key={comment.id} review={comment} />))
        }
      </div>
      {rightColumnComments.length && (
        <div className="film-card__reviews-col">
          {
            rightColumnComments.map((comment) => (<Review key={comment.id} review={comment} />))
          }
        </div>
      )}
    </div>
  );};
