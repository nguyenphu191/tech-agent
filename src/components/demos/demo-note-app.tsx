'use client';

import React, { useState } from 'react';
import { NOTES_FOLDERS, NOTES_ITEMS } from '@/data/demos';
import { Plus, Folder, FileText, Trash2, Tag } from 'lucide-react';

export function DemoNoteApp() {
  const [selectedFolder, setSelectedFolder] = useState<string | undefined>(undefined);
  const [selectedNote, setSelectedNote] = useState(NOTES_ITEMS[0]);
  const [isCreating, setIsCreating] = useState(false);

  const filteredNotes = selectedFolder
    ? NOTES_ITEMS.filter((note) => note.folderId === selectedFolder)
    : NOTES_ITEMS;

  const renderFolderTree = (parentId?: string, depth = 0) => {
    const folders = NOTES_FOLDERS.filter((f) => f.parentId === parentId);
    return folders.map((folder) => (
      <div key={folder.id}>
        <button onClick={() => setSelectedFolder(folder.id)} className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ml-${depth * 4} ${selectedFolder === folder.id ? 'bg-primary/20 text-primary' : 'hover:bg-muted/50 text-muted-foreground'}`}>
          <Folder className="w-4 h-4" />
          <span className="text-sm font-medium">{folder.name}</span>
        </button>
        {renderFolderTree(folder.id, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <button onClick={() => setIsCreating(true)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors mb-6">
          <Plus className="w-5 h-5" />New Note
        </button>
        <div className="mb-8">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Folders</p>
          <div className="space-y-2">
            <button onClick={() => setSelectedFolder(undefined)} className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${selectedFolder === undefined ? 'bg-primary/20 text-primary' : 'hover:bg-muted/50 text-muted-foreground'}`}>
              <FileText className="w-4 h-4" /><span className="text-sm font-medium">All Notes</span>
            </button>
            {renderFolderTree()}
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <p className="text-sm text-muted-foreground mb-4">{filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}</p>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredNotes.map((note) => (
                <button key={note.id} onClick={() => setSelectedNote(note)} className={`w-full text-left p-4 rounded-lg border transition-all ${selectedNote.id === note.id ? 'bg-primary/20 border-primary/50' : 'bg-card border-border hover:border-muted-foreground/30'}`}>
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{note.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{note.content}</p>
                  <p className="text-xs text-muted-foreground/60">{new Date(note.updatedAt).toLocaleDateString()}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-border">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-2">{selectedNote.title}</h2>
                  <p className="text-muted-foreground text-sm">Created on {new Date(selectedNote.createdAt).toLocaleDateString()} • Updated {new Date(selectedNote.updatedAt).toLocaleDateString()}</p>
                </div>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-destructive"><Trash2 className="w-5 h-5" /></button>
              </div>
              {selectedNote.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedNote.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium"><Tag className="w-3 h-3" />{tag}</span>
                  ))}
                </div>
              )}
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">{selectedNote.content}</p>
              </div>
              <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">Edit Note</button>
            </div>
          </div>
        </div>
      </div>

      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setIsCreating(false)}>
          <div className="bg-card border border-border rounded-xl p-8 max-w-xl w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-foreground mb-6">Create New Note</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Title</label>
                <input type="text" placeholder="Note title..." className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Folder</label>
                <select className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:border-primary/50">
                  <option value="">All Notes</option>
                  {NOTES_FOLDERS.map((folder) => (<option key={folder.id} value={folder.id}>{folder.name}</option>))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setIsCreating(false)} className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-foreground transition-colors">Cancel</button>
              <button onClick={() => setIsCreating(false)} className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
