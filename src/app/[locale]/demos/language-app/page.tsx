'use client';

import React, { useState } from 'react';
import { DemoLayout } from '@/components/demos/demo-layout';
import { LANGUAGE_COURSES, getDemoBySlug } from '@/data/demos';
import { Play, CheckCircle, Lock, BookOpen, Clock } from 'lucide-react';

export default function LanguageAppDemo() {
  const demo = getDemoBySlug('language-app');
  const [selectedCourse, setSelectedCourse] = useState(LANGUAGE_COURSES[0]);
  const [expandedLessons, setExpandedLessons] = useState<string | null>(null);

  if (!demo) return null;

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons(expandedLessons === lessonId ? null : lessonId);
  };

  return (
    <DemoLayout
      title={demo.title}
      description={demo.description}
      gradient={demo.gradient}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Course List Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-white mb-6">My Courses</h3>
          <div className="space-y-3">
            {LANGUAGE_COURSES.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedCourse.id === course.id
                    ? 'bg-cyan-500/20 border-cyan-500/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white text-sm">{course.title}</h4>
                  <span className="text-xs font-bold text-cyan-400">{course.level}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-xs text-white/60">{course.progress}% complete</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Course Content */}
        <div className="lg:col-span-3">
          {/* Course Header */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedCourse.title}
                </h2>
                <p className="text-white/70">{selectedCourse.description}</p>
              </div>
              <span className="px-4 py-2 bg-cyan-500 text-white rounded-full font-bold text-sm capitalize">
                {selectedCourse.level}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white/60 text-sm mb-1">Progress</p>
                <p className="text-2xl font-bold text-cyan-400">{selectedCourse.progress}%</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white/60 text-sm mb-1">Lessons</p>
                <p className="text-2xl font-bold text-blue-400">{selectedCourse.lessons.length}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white/60 text-sm mb-1">Hours</p>
                <p className="text-2xl font-bold text-purple-400">
                  {(selectedCourse.lessons.reduce((sum, l) => sum + l.duration, 0) / 60).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Lessons */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Course Lessons</h3>
            <div className="space-y-4">
              {selectedCourse.lessons.map((lesson, index) => (
                <div key={lesson.id}>
                  <button
                    onClick={() => toggleLesson(lesson.id)}
                    className="w-full flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
                  >
                    <div className="flex items-center gap-4 text-left flex-1">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                        {index < 2 ? (
                          <CheckCircle className="w-5 h-5 text-cyan-400" />
                        ) : (
                          <span className="text-cyan-400 font-bold text-sm">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{lesson.title}</h4>
                        <p className="text-white/60 text-sm">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Clock className="w-4 h-4" />
                        {lesson.duration} min
                      </div>
                      {index < 2 ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <div className={`p-2 rounded-lg transition-colors ${
                          index === 2
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'bg-white/5 text-white/40'
                        }`}>
                          {index === 2 ? (
                            <Play className="w-5 h-5 fill-current" />
                          ) : (
                            <Lock className="w-5 h-5" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Lesson Details */}
                  {expandedLessons === lesson.id && (
                    <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-lg ml-4">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white/60 text-sm mb-1">Lesson Duration</p>
                          <p className="text-white font-semibold">{lesson.duration} minutes</p>
                        </div>
                      </div>

                      {lesson.vocabulary && lesson.vocabulary.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-white mb-4">Vocabulary Covered</h5>
                          <div className="grid grid-cols-2 gap-3">
                            {lesson.vocabulary.map((word, i) => (
                              <div
                                key={i}
                                className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-colors"
                              >
                                <p className="text-white font-medium text-sm">{word}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6 flex gap-3">
                        <button className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                          <Play className="w-5 h-5" />
                          Start Lesson
                        </button>
                        <button className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors">
                          Preview
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Overall Stats */}
          <div className="mt-12 pt-12 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Learning Stats</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg p-6 border border-emerald-500/20">
                <p className="text-white/60 text-sm mb-2">Lessons Completed</p>
                <p className="text-3xl font-bold text-emerald-400">
                  {selectedCourse.lessons.filter((_, i) => i < 2).length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-6 border border-blue-500/20">
                <p className="text-white/60 text-sm mb-2">Words Learned</p>
                <p className="text-3xl font-bold text-blue-400">
                  {selectedCourse.lessons.reduce((sum, l) => sum + (l.vocabulary?.length || 0), 0)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-6 border border-purple-500/20">
                <p className="text-white/60 text-sm mb-2">Time Spent</p>
                <p className="text-3xl font-bold text-purple-400">
                  {Math.floor((selectedCourse.lessons.reduce((sum, l) => sum + l.duration, 0) * 0.65) / 60)}h
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-lg p-6 border border-cyan-500/20">
                <p className="text-white/60 text-sm mb-2">Streak Days</p>
                <p className="text-3xl font-bold text-cyan-400">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
}
