import React, { useState, useEffect, useRef } from "react";
import { QuestionItem, AICritiqueResult } from "../types";
import {
  Mic,
  MicOff,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Target,
  FileText,
  AlertCircle,
  CheckCircle2,
  Send,
  Loader2,
  Shuffle,
  Clock,
  Eye,
  EyeOff
} from "lucide-react";

interface MockInterviewLabProps {
  questions: QuestionItem[];
  selectedQuestionId: string | null;
  onSelectQuestion: (id: string) => void;
}

export const MockInterviewLab: React.FC<MockInterviewLabProps> = ({
  questions,
  selectedQuestionId,
  onSelectQuestion,
}) => {
  const currentQuestion =
    questions.find((q) => q.id === selectedQuestionId) || questions[0];

  const [timeLimit, setTimeLimit] = useState<number>(90); // default 90 seconds
  const [timeLeft, setTimeLeft] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [candidateResponse, setCandidateResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  // AI Evaluation state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiCritique, setAiCritique] = useState<AICritiqueResult | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);

  // Self Checklist State
  const [checklist, setChecklist] = useState({
    starUsed: false,
    quantMetrics: false,
    packagingTerms: false,
    businessAcumen: false,
    noPitfalls: false,
  });

  const timerRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  // Reset timer when question or timeLimit changes
  useEffect(() => {
    setIsTimerRunning(false);
    setTimeLeft(timeLimit);
    setCandidateResponse("");
    setAiCritique(null);
    setEvalError(null);
    setShowModelAnswer(false);
    setChecklist({
      starUsed: false,
      quantMetrics: false,
      packagingTerms: false,
      businessAcumen: false,
      noPitfalls: false,
    });
  }, [currentQuestion.id, timeLimit]);

  // Timer interval
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeLeft]);

  // Speech Recognition (Web Speech API)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("目前瀏覽器不支援即時語音轉文字功能，請直接在文字框中打字輸入練習！");
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "zh-TW";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setCandidateResponse((prev) => prev + " " + transcript);
      };

      recognition.onerror = (err: any) => {
        console.error("Speech error:", err);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
      if (!isTimerRunning && timeLeft > 0) {
        setIsTimerRunning(true);
      }
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  // Text-to-speech to read the question
  const handleListenQuestion = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentQuestion.title);
    utterance.lang = "zh-TW";
    window.speechSynthesis.speak(utterance);
  };

  // Pick random question
  const handleRandomQuestion = () => {
    const remaining = questions.filter((q) => q.id !== currentQuestion.id);
    const randomOne = remaining[Math.floor(Math.random() * remaining.length)];
    if (randomOne) onSelectQuestion(randomOne.id);
  };

  // Send answer for AI critique
  const handleEvaluate = async () => {
    if (!candidateResponse.trim() || candidateResponse.trim().length < 5) {
      setEvalError("請至少錄音或輸入一段完整的回答（至少 5 個字以上）再進行評核。");
      return;
    }
    setIsEvaluating(true);
    setEvalError(null);
    try {
      const res = await fetch("/api/ai-critique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionTitle: currentQuestion.title,
          questionCategory: currentQuestion.categoryName,
          targetRole: "Structural Packaging Engineer (結構包裝工程師)",
          candidateAnswer: candidateResponse,
          starContext: currentQuestion.star,
        }),
      });
      if (!res.ok) throw new Error(`評估失敗 (${res.status})`);
      const data = await res.json();
      setAiCritique(data);
    } catch (err: any) {
      setEvalError(err.message || "評估連線逾時，請檢查網路或稍後重試。");
    } finally {
      setIsEvaluating(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      {/* Top Controller Banner */}
      <div className="bg-stone-900 border border-stone-800 text-white rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Stanley Black & Decker 模擬面試演練室</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              結構包裝工程師 — 即時口說/打字答辯實驗室
            </h2>
            <p className="text-xs text-stone-300 mt-0.5">
              設定擬真倒數計時、支援即時語音轉文字 (Speech-to-Text) 與外商包裝工程總監 AI 深度點評。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Question Selector */}
            <select
              id="mock-question-select"
              value={currentQuestion.id}
              onChange={(e) => onSelectQuestion(e.target.value)}
              className="bg-stone-800 border border-stone-700 text-xs text-white rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            >
              {questions.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.number} | {q.title.slice(0, 32)}...
                </option>
              ))}
            </select>

            <button
              id="mock-random-btn"
              onClick={handleRandomQuestion}
              className="flex items-center space-x-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>隨機抽題</span>
            </button>
          </div>
        </div>
      </div>

      {/* Question Prompt Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold text-xs bg-stone-900 text-amber-400 px-2.5 py-1 rounded">
              {currentQuestion.number}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
              {currentQuestion.categoryName}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded border border-amber-300 bg-amber-50 text-amber-900">
              {currentQuestion.difficulty}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="mock-read-question-btn"
              onClick={handleListenQuestion}
              className="text-xs flex items-center space-x-1 bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1.5 rounded-lg font-medium"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              <span>聽面試官發問</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
            {currentQuestion.title}
          </h3>
          {currentQuestion.scenario && (
            <p className="text-xs text-stone-500 mt-2 bg-stone-50 p-2.5 rounded border border-stone-200/60 leading-relaxed">
              <strong>面試考察目的：</strong> {currentQuestion.scenario}
            </p>
          )}
        </div>

        {/* Timer Bar & Controls */}
        <div className="bg-stone-900 text-white rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[11px] text-stone-400 uppercase tracking-wider">答題倒數時間</div>
              <div
                className={`text-2xl font-black font-mono tracking-wider ${
                  timeLeft <= 15 ? "text-red-400 animate-pulse" : "text-amber-400"
                }`}
              >
                {timeFormatted}
              </div>
            </div>
          </div>

          {/* Time presets */}
          <div className="flex items-center space-x-1">
            {[60, 90, 120, 180].map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  setTimeLimit(sec);
                  setTimeLeft(sec);
                  setIsTimerRunning(false);
                }}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  timeLimit === sec
                    ? "bg-amber-400 text-stone-950 font-bold"
                    : "bg-stone-800 text-stone-400 hover:text-white"
                }`}
              >
                {sec}秒
              </button>
            ))}
          </div>

          {/* Start / Pause / Reset */}
          <div className="flex items-center space-x-2">
            {!isTimerRunning ? (
              <button
                id="mock-timer-start"
                onClick={() => setIsTimerRunning(true)}
                disabled={timeLeft <= 0}
                className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>開始計時</span>
              </button>
            ) : (
              <button
                id="mock-timer-pause"
                onClick={() => setIsTimerRunning(false)}
                className="flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold px-3 py-1.5 rounded-lg"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>暫停</span>
              </button>
            )}

            <button
              id="mock-timer-reset"
              onClick={() => {
                setIsTimerRunning(false);
                setTimeLeft(timeLimit);
              }}
              title="重設計時"
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Response Input Area */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-700 flex items-center space-x-1.5">
              <span>你的回答內容 (可打字或開啟語音轉文字)：</span>
            </label>
            <div className="flex items-center space-x-2">
              <button
                id="mock-speech-btn"
                onClick={toggleSpeechRecognition}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isRecording
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300"
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-amber-600" />}
                <span>{isRecording ? "語音輸入中 (點擊停止)" : "語音答題 (Speech-to-Text)"}</span>
              </button>

              <button
                id="toggle-model-answer-btn"
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="flex items-center space-x-1 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg"
              >
                {showModelAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showModelAnswer ? "隱藏擬答" : "偷看專家擬答"}</span>
              </button>
            </div>
          </div>

          <textarea
            id="mock-response-input"
            value={candidateResponse}
            onChange={(e) => setCandidateResponse(e.target.value)}
            placeholder="請在此開始口述或打字輸入你的回答（建議遵循 STAR 結構：S情境痛點、T核心任務、A關鍵行動與技術、R量化成果與對史丹利之價值）..."
            rows={6}
            className="w-full text-xs sm:text-sm p-4 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden font-sans leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-stone-400">
              字數統計：{candidateResponse.trim().length} 字
            </span>

            <button
              id="mock-submit-evaluate-btn"
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="flex items-center space-x-2 bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all disabled:opacity-50"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>外商總監評估中...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>交由 AI 面試官深度評核</span>
                </>
              )}
            </button>
          </div>
        </div>

        {evalError && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-lg">
            {evalError}
          </div>
        )}

        {/* Side-by-side Model Answer if toggled */}
        {showModelAnswer && (
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950">
              <span className="flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>專家標準擬答對照參考：</span>
              </span>
              <button
                onClick={() => setCandidateResponse(currentQuestion.expertAnswer)}
                className="text-[11px] underline text-amber-800 hover:text-amber-950"
              >
                帶入此擬答至輸入框測試
              </button>
            </div>
            <p className="text-xs text-stone-800 leading-relaxed whitespace-pre-line bg-white/70 p-3 rounded-lg border border-amber-200/50">
              {currentQuestion.expertAnswer}
            </p>
          </div>
        )}

        {/* Self-Scoring Rubric Checklist */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2.5">
          <h4 className="text-xs font-bold text-stone-800 flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>面試自我檢核表 (Self-Evaluation Checklist)：</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <label className="flex items-center space-x-2 text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.starUsed}
                onChange={(e) => setChecklist({ ...checklist, starUsed: e.target.checked })}
                className="rounded accent-amber-500 w-3.5 h-3.5"
              />
              <span>完整運用 STAR 結構 (情境/任務/行動/成果)</span>
            </label>

            <label className="flex items-center space-x-2 text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.quantMetrics}
                onChange={(e) => setChecklist({ ...checklist, quantMetrics: e.target.checked })}
                className="rounded accent-amber-500 w-3.5 h-3.5"
              />
              <span>包含量化指標 (G值降低%、提速70%、棧板+15%)</span>
            </label>

            <label className="flex items-center space-x-2 text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.packagingTerms}
                onChange={(e) => setChecklist({ ...checklist, packagingTerms: e.target.checked })}
                className="rounded accent-amber-500 w-3.5 h-3.5"
              />
              <span>置入專業包裝術語 (ISTA 1A, ECT, 楞向, VCI)</span>
            </label>

            <label className="flex items-center space-x-2 text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.businessAcumen}
                onChange={(e) => setChecklist({ ...checklist, businessAcumen: e.target.checked })}
                className="rounded accent-amber-500 w-3.5 h-3.5"
              />
              <span>展現商業與業務賦能思維 (TCO, 自鎖專利, ESG)</span>
            </label>

            <label className="flex items-center space-x-2 text-stone-700 cursor-pointer sm:col-span-2">
              <input
                type="checkbox"
                checked={checklist.noPitfalls}
                onChange={(e) => setChecklist({ ...checklist, noPitfalls: e.target.checked })}
                className="rounded accent-amber-500 w-3.5 h-3.5"
              />
              <span>嚴格避開扣分紅線 (不批評前東家、不傳播流言、不空泛宣稱)</span>
            </label>
          </div>
        </div>

        {/* AI Critique Output */}
        {aiCritique && (
          <div className="bg-stone-900 text-white rounded-xl p-5 sm:p-6 border border-stone-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-stone-400">AI 總監評分：</span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {aiCritique.score} <span className="text-xs font-normal text-stone-300">/ 100</span>
                </span>
              </div>
              <div className="flex space-x-2 text-xs">
                <span className="bg-stone-800 px-2.5 py-1 rounded text-stone-300">
                  技術深度: <strong className="text-amber-400">{aiCritique.technicalRating}</strong>
                </span>
                <span className="bg-stone-800 px-2.5 py-1 rounded text-stone-300">
                  溝通表達: <strong className="text-amber-400">{aiCritique.communicationRating}</strong>
                </span>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold text-stone-300 mb-1">外商總監總結評語：</h5>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">{aiCritique.summary}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700">
                <div className="font-bold text-emerald-400 mb-1 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>精準答辯亮點</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-stone-300">
                  {aiCritique.strengths?.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700">
                <div className="font-bold text-amber-400 mb-1 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>升級與精進建議</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-stone-300">
                  {aiCritique.improvementPoints?.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {aiCritique.modelAnswerHighlight && (
              <div className="bg-amber-400/15 border border-amber-400/30 p-3 rounded-lg text-xs text-amber-200">
                <strong className="text-amber-400 font-bold block mb-1">總監推薦潤飾語句：</strong>
                "{aiCritique.modelAnswerHighlight}"
              </div>
            )}

            {aiCritique.followUpQuestion && (
              <div className="bg-stone-800 p-4 rounded-xl border border-amber-400/50">
                <div className="text-xs font-bold text-amber-400 mb-1 flex items-center space-x-1.5">
                  <Target className="w-4 h-4" />
                  <span>面試官現場追問挑戰 (Deep Follow-up)：</span>
                </div>
                <p className="text-xs sm:text-sm text-white font-medium">{aiCritique.followUpQuestion}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
