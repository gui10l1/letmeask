import { useState, useEffect } from 'react';
import { database } from '../services/firebase';

interface IQuestion {
  key: string;
  author: {
    authorAvatar: string;
    authorId: string;
    authorName: string;
  };
  content: string;
  isAnswred: boolean;
  isHighlighted: boolean;
  likes: {
    key: string;
    authorId: string;
  }[];
}

interface IFirebaseQuestionContent {
  author: {
    authorName: string;
    authorAvatar: string;
    authorId: string;
  };
  content: string;
  isAnswred: boolean;
  isHighlighted: boolean;
  likes: {
    [key: string]: {
      authorId: string;
    };
  };
}

interface IUseRoom {
  questions: IQuestion[];
}

export function useRoom(roomId: string): IUseRoom {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      if (!room.val().questions) {
        return;
      }

      const parsedQuestions = Object.entries(room.val().questions).map(
        ([key, content]) => {
          const parsedContent = content as IFirebaseQuestionContent;

          return {
            key,
            author: parsedContent.author,
            content: parsedContent.content,
            isAnswred: parsedContent.isAnswred,
            isHighlighted: parsedContent.isHighlighted,
            likes: Object.entries(parsedContent.likes ?? {}).map(
              ([id, like]) => ({
                key: id,
                authorId: like.authorId,
              }),
            ),
          };
        },
      );

      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off();
    };
  }, [roomId]);

  return {
    questions,
  };
}
