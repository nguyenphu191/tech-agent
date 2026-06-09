'use client';

import React, { useState } from 'react';
import { DemoLayout } from '@/components/demos/demo-layout';
import { NOTES_FOLDERS, NOTES_ITEMS, getDemoBySlug } from '@/data/demos';
import { Plus, Folder, FileText, Trash2, Tag } from 'lucide-react';

export default function NoteAppDemo() {
  const demo = getDemoBySlug('note-app');
  const [selectedFolder, setSelectedFolder] = useState<string | undefined>(undefined);
  const [selectedNote, setSelectedNote] = useState(NOTES_ITEMS[0]);
  const [isCreating, setIsCreating] = useState(false);

  if (!demo) return null;

  const filteredNotes = selectedFolder
    ? NOTES_ITEMS.filter((note) => note.folderId === selectedFolder)
    : NOTES_ITEMS;

  const renderFolderTree = (parentId?: string, depth = 0) => {
    const folders = NOTES_FOLDERS.filter((f) => f.parentId === parentId);
    return folders.map((folder) => (
      <div key={folder.id}>
        <button
          onClick={() => setSelectedFolder(folder.id)}
          className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ml-${depth * 4} ${
            selectedFolder === folder.id
              ? 'bg-indigo-500/20 text-indigo-400'
              : 'hover:bg-white/5 text-white/70'
          }`}
        >
          <Folder className="w-4 h-4" />
          <span className="text-sm font-medium">{folder.name}</span>
        </button>
        {renderFolderTree(folder.id, depth + 1)}
      </div>
    ));
  };

  return (
    <DemoLayout
      title={demo.title}
      description={demo.description}
      gradient={demo.gradient}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* New Note Button */}
          <button
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-colors mb-6"
          >
            <Plus className="w-5 h-5" />
            New Note
          </button>

          {/* Folders */}
          <div className="mb-8">
            <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Folders</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedFolder(undefined)}
                className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  selectedFolder === undefined
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'hover:bg-white/5 text-white/70'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">All Notes</span>
              </button>
              {renderFolderTree()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Notes List */}
            <div className="lg:col-span-1">
              <p className="text-sm text-white/60 mb-4">
                {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
              </p>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredNotes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => setSelectedNote(note)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedNote.id === note.id
                        ? 'bg-indigo-500/20 border-indigo-500/50'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <h3 className="font-semibold text-white line-clamp-2 mb-2">
                      {note.title}
                    </h3>
                    <p className="text-xs text-white/50 mb-2 line-clamp-2">
                      {note.content}
                    </p>
                    <p className="text-xs text-white/40">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Note Editor */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedNote.title}
                    </h2>
                    <p className="text-white/60 text-sm">
                      Created on {new Date(selectedNote.createdAt).toLocaleDateString()} •
                      Updated {new Date(selectedNote.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-red-400">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Tags */}
                {selectedNote.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedNote.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-medium"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                    {selectedNote.content}
                  </p>
                </div>

                {/* Edit Button */}
                <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors">
                  Edit Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {isCreating && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsCreating(false)}
        >
          <div
            className="bg-white/10 border border-white/20 rounded-xl p-8 max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Create New Note</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Note title..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Folder
                </label>
                <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500/50">
                  <option value="">All Notes</option>
                  {NOTES_FOLDERS.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsCreating(false)}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </DemoLayout>
  );
}
