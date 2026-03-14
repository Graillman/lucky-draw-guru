import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SpinningWheel } from '@/components/SpinningWheel';

interface ClassData {
  name: string;
  students: string[];
}

const STORAGE_KEY = 'teacher-classes';
const DEMO_CLASS: ClassData = {
  name: 'Class 1',
  students: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack'],
};

const TeacherPickerInner = () => {
  const [classes, setClasses] = useState<ClassData[]>([DEMO_CLASS]);
  const [activeClass, setActiveClass] = useState(0);
  const [pickedStudents, setPickedStudents] = useState<Set<string>>(new Set());
  const [winner, setWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [newStudentName, setNewStudentName] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [editingClass, setEditingClass] = useState(false);
  const [tab, setTab] = useState<'pick' | 'manage'>('pick');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: ClassData[] = JSON.parse(saved);
        if (parsed.length > 0) setClasses(parsed);
      }
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(classes)); } catch {}
  }, [classes]);

  // Cleanup timer
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const current = classes[activeClass] ?? classes[0];

  // Students available (not yet picked in this round)
  const available = current?.students.filter(s => !pickedStudents.has(s)) ?? [];

  const participants = available.map(s => ({ pseudo: s, weight: 1 }));

  const handleDraw = useCallback(() => {
    if (isSpinning || available.length < 1) return;
    if (available.length === 1) {
      setWinner(available[0]);
      setPickedStudents(prev => new Set([...prev, available[0]]));
      return;
    }
    setIsSpinning(true);
    setWinner(null);
    wheelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isSpinning, available]);

  const handleComplete = useCallback((w: string[]) => {
    const selected = w[0];
    setWinner(selected);
    setPickedStudents(prev => new Set([...prev, selected]));
    setIsSpinning(false);

    // Start answer timer if configured
    if (timerSeconds > 0) {
      setTimeLeft(timerSeconds);
      setTimerActive(true);
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setTimerActive(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
  }, [timerSeconds]);

  const resetRound = useCallback(() => {
    setPickedStudents(new Set());
    setWinner(null);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
    setTimeLeft(0);
  }, []);

  const addStudent = useCallback(() => {
    const name = newStudentName.trim();
    if (!name || !current) return;
    if (current.students.includes(name)) return;
    setClasses(prev => prev.map((cls, i) =>
      i === activeClass ? { ...cls, students: [...cls.students, name] } : cls
    ));
    setNewStudentName('');
  }, [newStudentName, current, activeClass]);

  const removeStudent = useCallback((student: string) => {
    setClasses(prev => prev.map((cls, i) =>
      i === activeClass ? { ...cls, students: cls.students.filter(s => s !== student) } : cls
    ));
    setPickedStudents(prev => { const n = new Set(prev); n.delete(student); return n; });
  }, [activeClass]);

  const addClass = useCallback(() => {
    const name = newClassName.trim() || `Class ${classes.length + 1}`;
    setClasses(prev => [...prev, { name, students: [] }]);
    setActiveClass(classes.length);
    setNewClassName('');
    setEditingClass(false);
    setPickedStudents(new Set());
    setWinner(null);
  }, [newClassName, classes.length]);

  const deleteClass = useCallback((idx: number) => {
    if (classes.length <= 1) return;
    setClasses(prev => prev.filter((_, i) => i !== idx));
    setActiveClass(Math.max(0, idx - 1));
    setPickedStudents(new Set());
    setWinner(null);
  }, [classes.length]);

  const progress = current ? ((pickedStudents.size / current.students.length) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Class selector */}
      <div className="flex flex-wrap gap-2 items-center">
        {classes.map((cls, i) => (
          <button
            key={i}
            onClick={() => { setActiveClass(i); setPickedStudents(new Set()); setWinner(null); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeClass === i
                ? 'bg-primary text-primary-foreground shadow'
                : 'bg-card border border-border text-foreground hover:border-primary/50'
            }`}
          >
            {cls.name}
            <span className="text-xs ml-1.5 opacity-70">({cls.students.length})</span>
          </button>
        ))}
        {editingClass ? (
          <div className="flex gap-1">
            <input
              autoFocus
              type="text"
              value={newClassName}
              onChange={e => setNewClassName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addClass(); if (e.key === 'Escape') setEditingClass(false); }}
              placeholder="Class name..."
              className="px-2 py-1 text-sm rounded border border-border bg-card text-foreground outline-none focus:ring-1 focus:ring-primary w-28"
            />
            <button onClick={addClass} className="px-2 py-1 text-sm bg-primary text-primary-foreground rounded font-bold">✓</button>
            <button onClick={() => setEditingClass(false)} className="px-2 py-1 text-sm bg-muted rounded text-muted-foreground">✕</button>
          </div>
        ) : (
          <button onClick={() => setEditingClass(true)} className="px-3 py-1.5 rounded-lg text-sm border border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors">
            + New class
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(['pick', 'manage'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium -mb-px border-b-2 transition-colors ${
              tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'pick' ? '🎲 Pick Student' : '📋 Manage Class'}
          </button>
        ))}
      </div>

      {tab === 'pick' ? (
        <div className="grid md:grid-cols-[1fr,260px] gap-6 items-start">

          {/* Wheel + controls */}
          <div className="space-y-4">
            {/* Progress */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">
                  {pickedStudents.size} / {current?.students.length ?? 0} students called
                </span>
                {pickedStudents.size > 0 && (
                  <button onClick={resetRound} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Reset round</button>
                )}
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              {available.length === 0 && current?.students.length > 0 && (
                <p className="text-sm text-primary font-medium text-center py-2">
                  ✅ Every student has been called this round!
                </p>
              )}
            </div>

            {/* Wheel */}
            <div ref={wheelRef} className="flex flex-col items-center space-y-4">
              {available.length >= 2 ? (
                <>
                  <SpinningWheel
                    participants={participants}
                    isSpinning={isSpinning}
                    onComplete={handleComplete}
                    mode="simple"
                    winnersCount={1}
                    onSpin={handleDraw}
                  />
                  {!isSpinning && !winner && (
                    <button
                      onClick={handleDraw}
                      className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:opacity-90 hover:shadow-lg transition-all"
                    >
                      🎲 Pick a student
                    </button>
                  )}
                </>
              ) : available.length === 1 ? (
                <div className="text-center space-y-3 py-8">
                  <p className="text-muted-foreground text-sm">One student remaining:</p>
                  <button
                    onClick={handleDraw}
                    className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all"
                  >
                    Pick {available[0]}
                  </button>
                </div>
              ) : null}
            </div>

            {/* Winner display */}
            {winner && !isSpinning && (
              <div className="text-center space-y-3 p-5 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground">Selected student:</p>
                <p className="text-3xl font-bold text-primary">{winner}</p>

                {/* Answer timer */}
                {(timerActive || timeLeft > 0) && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Time to answer:</p>
                    <div className={`text-4xl font-mono font-bold ${timeLeft <= 5 ? 'text-destructive' : 'text-foreground'}`}>
                      {timeLeft}s
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-1000"
                        style={{ width: `${(timeLeft / timerSeconds) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {available.length > 0 && (
                  <button
                    onClick={() => { setWinner(null); if (timerRef.current) { clearInterval(timerRef.current); setTimerActive(false); setTimeLeft(0); } }}
                    className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Pick next →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            {/* Timer config */}
            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <h3 className="text-sm font-semibold text-foreground">⏱ Answer timer</h3>
              <div className="flex items-center gap-2">
                <input
                  type="range" min={0} max={120} step={5} value={timerSeconds}
                  onChange={e => setTimerSeconds(Number(e.target.value))}
                  className="flex-1 accent-primary"
                />
                <span className="text-sm font-medium text-foreground w-12 text-right">
                  {timerSeconds === 0 ? 'Off' : `${timerSeconds}s`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Countdown starts after a student is picked</p>
            </div>

            {/* Student list */}
            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Students ({current?.students.length})</h3>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {current?.students.map(student => (
                  <div key={student} className={`flex items-center justify-between px-2 py-1 rounded-lg text-sm group ${
                    pickedStudents.has(student) ? 'text-muted-foreground bg-muted/30 line-through' : 'text-foreground'
                  }`}>
                    <span>{student}</span>
                    {pickedStudents.has(student) && <span className="text-xs text-primary ml-1">✓</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy badge */}
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-xs text-green-700 dark:text-green-300">
              🔒 <strong>No student data collected.</strong> Class rosters are stored only in your browser's local storage. Nothing is sent to any server.
            </div>
          </div>
        </div>
      ) : (
        /* Manage tab */
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border space-y-3">
              <h3 className="font-semibold text-foreground">{current?.name} — Add students</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addStudent()}
                  placeholder="Student name..."
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
                <button onClick={addStudent} className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">+ Add</button>
              </div>
              <p className="text-xs text-muted-foreground">One student per line — press Enter to add quickly</p>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Student list</h3>
                {classes.length > 1 && (
                  <button onClick={() => deleteClass(activeClass)} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Delete class</button>
                )}
              </div>
              <div className="space-y-1 max-h-52 overflow-y-auto">
                {current?.students.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-2">No students yet. Add some above.</p>
                ) : current?.students.map(student => (
                  <div key={student} className="flex items-center justify-between px-2 py-1 rounded-lg hover:bg-muted/30 group text-sm text-foreground">
                    <span>{student}</span>
                    <button onClick={() => removeStudent(student)} className="text-muted-foreground/30 opacity-0 group-hover:opacity-100 hover:text-destructive transition-all text-xs">✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TeacherPickerIsland = () => (
  <LanguageProvider>
    <TeacherPickerInner />
  </LanguageProvider>
);

export default TeacherPickerIsland;
