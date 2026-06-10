'use client';

import React, { useState } from 'react';
import { LANGUAGE_COURSES } from '@/data/demos';
import { Play, CheckCircle, Lock, BookOpen, Clock } from 'lucide-react';

export function DemoLanguageApp() {
  const [selectedCourse, setSelectedCourse] = useState(LANGUAGE_COURSES[0]);
  const [expandedLessons, setExpandedLessons] = useState<string | null>(null);

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons(expandedLessons === lessonId ? null : lessonId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <h3 className="text-lg font-bold text-foreground mb-6">My Courses</h3>
        <div className="space-y-3">
          {LANGUAGE_COURSES.map((course) => (
            <button key={course.id} onClick={() => setSelectedCourse(course)} className={`w-full text-left p-4 rounded-lg border transition-all ${selectedCourse.id === course.id ? 'bg-primary/20 border-primary/50' : 'bg-card border-border hover:border-muted-foreground/30'}`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-foreground text-sm">{course.title}</h4>
                <span className="text-xs font-bold text-primary">{course.level}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${course.progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{selectedCourse.title}</h2>
              <p className="text-muted-foreground">{selectedCourse.description}</p>
            </div>
            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-bold text-sm capitalize">{selectedCourse.level}</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-muted-foreground text-sm mb-1">Progress</p>
              <p className="text-2xl font-bold text-primary">{selectedCourse.progress}%</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-muted-foreground text-sm mb-1">Lessons</p>
              <p className="text-2xl font-bold text-accent">{selectedCourse.lessons.length}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-muted-foreground text-sm mb-1">Hours</p>
              <p className="text-2xl font-bold text-purple-400">{(selectedCourse.lessons.reduce((sum, l) => sum + l.duration, 0) / 60).toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-foreground mb-6">Course Lessons</h3>
          <div className="space-y-4">
            {selectedCourse.lessons.map((lesson, index) => (
              <div key={lesson.id}>
                <button onClick={() => toggleLesson(lesson.id)} className="w-full flex items-center justify-between p-6 bg-card hover:bg-muted/50 border border-border rounded-lg transition-all group">
                  <div className="flex items-center gap-4 text-left flex-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                      {index < 2 ? <CheckCircle className="w-5 h-5 text-primary" /> : <span className="text-primary font-bold text-sm">{index + 1}</span>}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{lesson.title}</h4>
                      <p className="text-muted-foreground text-sm">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm"><Clock className="w-4 h-4" />{lesson.duration} min</div>
                    {index < 2 ? <CheckCircle className="w-5 h-5 text-success" /> : (
                      <div className={`p-2 rounded-lg transition-colors ${index === 2 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {index === 2 ? <Play className="w-5 h-5 fill-current" /> : <Lock className="w-5 h-5" />}
                      </div>
                    )}
                  </div>
                </button>
                {expandedLessons === lesson.id && (
                  <div className="mt-4 p-6 bg-card border border-border rounded-lg ml-4">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-muted-foreground text-sm mb-1">Lesson Duration</p>
                        <p className="text-foreground font-semibold">{lesson.duration} minutes</p>
                      </div>
                    </div>
                    {lesson.vocabulary && lesson.vocabulary.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-foreground mb-4">Vocabulary Covered</h5>
                        <div className="grid grid-cols-2 gap-3">
                          {lesson.vocabulary.map((word, i) => (
                            <div key={i} className="p-3 bg-muted/50 border border-border rounded-lg hover:border-primary/50 transition-colors">
                              <p className="text-foreground font-medium text-sm">{word}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-6 flex gap-3">
                      <button className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"><Play className="w-5 h-5" />Start Lesson</button>
                      <button className="px-4 py-3 bg-muted hover:bg-muted/80 border border-border text-foreground rounded-lg transition-colors">Preview</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-border">
          <h3 className="text-xl font-bold text-foreground mb-6">Learning Stats</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-success/20 to-success/30 rounded-lg p-6 border border-success/20">
              <p className="text-muted-foreground text-sm mb-2">Lessons Completed</p>
              <p className="text-3xl font-bold text-success">{selectedCourse.lessons.filter((_, i) => i < 2).length}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-6 border border-blue-500/20">
              <p className="text-muted-foreground text-sm mb-2">Words Learned</p>
              <p className="text-3xl font-bold text-blue-400">{selectedCourse.lessons.reduce((sum, l) => sum + (l.vocabulary?.length || 0), 0)}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-6 border border-purple-500/20">
              <p className="text-muted-foreground text-sm mb-2">Time Spent</p>
              <p className="text-3xl font-bold text-purple-400">{Math.floor((selectedCourse.lessons.reduce((sum, l) => sum + l.duration, 0) * 0.65) / 60)}h</p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/30 rounded-lg p-6 border border-primary/20">
              <p className="text-muted-foreground text-sm mb-2">Streak Days</p>
              <p className="text-3xl font-bold text-primary">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
