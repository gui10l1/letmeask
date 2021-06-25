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
  isAnswered: boolean;
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
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: {
    [key: string]: {
      authorId: string;
    };
  };
}

interface IUseRoom {
  questions: IQuestion[];
  loading: boolean;
}

export function useRoom(roomId: string): IUseRoom {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setIsLoading] = useState(true);

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
            isAnswered: parsedContent.isAnswered,
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
      setIsLoading(false);
    });

    return () => {
      roomRef.off();
    };
  }, [roomId]);

  return {
    questions,
    loading,
  };
}
