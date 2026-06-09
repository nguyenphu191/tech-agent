import { DemoCourse } from '@/types';

export const LANGUAGE_COURSES: DemoCourse[] = [
  {
    id: 'course-1',
    title: 'Spanish Basics',
    description: 'Learn essential Spanish phrases and grammar fundamentals',
    language: 'Spanish',
    level: 'beginner',
    progress: 65,
    lessons: [
      {
        id: 'lesson-1-1',
        courseId: 'course-1',
        title: 'Greetings & Introductions',
        description: 'Learn how to greet people and introduce yourself',
        duration: 15,
        vocabulary: ['Hola', 'Buenos días', 'Me llamo', 'Encantado'],
      },
      {
        id: 'lesson-1-2',
        courseId: 'course-1',
        title: 'Numbers & Colors',
        description: 'Master numbers 1-100 and basic colors',
        duration: 20,
        vocabulary: ['Uno', 'Dos', 'Rojo', 'Azul'],
      },
    ],
  },
  {
    id: 'course-2',
    title: 'French Conversational',
    description: 'Build real-world conversation skills in French',
    language: 'French',
    level: 'intermediate',
    progress: 42,
    lessons: [
      {
        id: 'lesson-2-1',
        courseId: 'course-2',
        title: 'Daily Conversations',
        description: 'Practice conversations about daily life',
        duration: 25,
        vocabulary: ['Parlez', 'Café', 'Restaurant'],
      },
    ],
  },
];
