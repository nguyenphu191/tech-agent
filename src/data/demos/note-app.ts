import { DemoNote, DemoFolder } from '@/types';

export const NOTES_FOLDERS: DemoFolder[] = [
  {
    id: 'folder-1',
    name: 'Work Projects',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'folder-2',
    name: 'Personal',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 'folder-3',
    name: 'Ideas',
    parentId: 'folder-2',
    createdAt: new Date('2024-03-20'),
  },
];

export const NOTES_ITEMS: DemoNote[] = [
  {
    id: 'note-1',
    title: 'Q2 Planning Meeting Notes',
    content: 'Discussed quarterly goals, team expansion, and product roadmap...',
    folderId: 'folder-1',
    tags: ['work', 'planning', 'goals'],
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-05-15'),
  },
  {
    id: 'note-2',
    title: 'Product Feature Ideas',
    content: 'Dark mode support, offline sync, collaborative editing...',
    folderId: 'folder-3',
    tags: ['ideas', 'product', 'features'],
    createdAt: new Date('2024-05-12'),
    updatedAt: new Date('2024-05-18'),
  },
  {
    id: 'note-3',
    title: 'Meeting with Client ABC',
    content: 'Requirements discussion for new dashboard implementation...',
    folderId: 'folder-1',
    tags: ['work', 'client', 'meeting'],
    createdAt: new Date('2024-05-14'),
    updatedAt: new Date('2024-05-16'),
  },
];
