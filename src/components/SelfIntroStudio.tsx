import React, { useState, useEffect, useRef } from "react";
import { SELF_INTRODUCTION } from "../data/interviewData";
import { AmandaProfilePortfolio } from "./AmandaProfilePortfolio";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Award,
  Globe,
  Clock,
  Sparkles,
  Layers,
  UserCircle
} from "lucide-react";

export const SelfIntroStudio: React.FC = () => {
  const [activeMode, setActiveMode] = useState<"pitch" | "profile">("profile");
  const [lang, setLang] = useState<"mandarin" | "english">("mandarin");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  // Teleprompter / Rehearsal Timer
  const [timerActive, setTimerActive] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  const handleStartTimer = () => setTimerActive(true);
  const handlePauseTimer = () => setTimerActive(false);
  const handleResetTimer = () => {
    setTimerActive(false);
    setSecondsElapsed(0);
  };

  const currentText = lang === "mandarin" ? SELF_INTRODUCTION.mandarin : SELF_INTRODUCTION.english;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Text to speech
  const handleToggleAudio = () => {
    if (!("speechSynthesis" in window)) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentText);
    utterance.lang = lang === "mandarin" ? "zh-TW" : "en-US";
    utterance.rate = lang === "mandarin" ? 1.0 : 0.95;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  // Timer pace calculation: 60s target
  const getPaceStatus = () => {
    if (secondsElapsed < 45) return { label: "節奏正常 (保持穩定語速)", color: "text-emerald-400" };
    if (secondsElapsed <= 65) return { label: "黃金收尾區間 (45-65秒最理想)", color: "text-amber-400" };
    return { label: "時間略長 (建議適度精簡或加速)", color: "text-red-400" };
  };

  return (
    <div className="space-y-6">
      {/* Top Switcher: Profile vs 1-Minute Pitch */}
      <div className="flex flex-wrap items-center gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
        <button
          onClick={() => setActiveMode("profile")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeMode === "profile"
              ? "bg-stone-900 text-amber-400 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <UserCircle className="w-4 h-4" />
          <span>個人履歷與設計專業 (Amanda's Profile)</span>
        </button>
        <button
          onClick={() => setActiveMode("pitch")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeMode === "pitch"
              ? "bg-stone-900 text-amber-400 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>1分鐘自介電梯簡報演練 (Elevator Pitch)</span>
        </button>
      </div>

      {activeMode === "profile" ? (
        <AmandaProfilePortfolio />
      ) : (
        <>
          {/* Header Banner */}
          <div className="bg-stone-900 border border-stone-800 text-white rounded-xl p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4" />
                  <span>1分鐘黃金電梯簡報 (Elevator Pitch)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  結構包裝工程師 — 中英文自我介紹精練演練
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                  聚焦跨領域背景、全紙化 SolidWorks 結構、ISTA 1A 測試、無膠專利研發、AI 渲染提速與業務賦能資料庫，為 Stanley Black & Decker 量身打造的高含金量自介。
                </p>
              </div>

              {/* Lang Switcher Buttons */}
              <div className="flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700 self-start sm:self-auto shrink-0">
                <button
                  id="lang-btn-zh"
                  onClick={() => {
                    if (isPlayingAudio) window.speechSynthesis.cancel();
                    setIsPlayingAudio(false);
                    setLang("mandarin");
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    lang === "mandarin"
                      ? "bg-amber-400 text-stone-950 shadow-xs"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  中文版 (60秒標準)
                </button>
                <button
                  id="lang-btn-en"
                  onClick={() => {
                    if (isPlayingAudio) window.speechSynthesis.cancel();
                    setIsPlayingAudio(false);
                    setLang("english");
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                    lang === "english"
                      ? "bg-amber-400 text-stone-950 shadow-xs"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>English Version</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Pitch Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Controls bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div className="flex items-center space-x-3">
                {/* Audio Speech */}
                <button
                  id="self-intro-audio-btn"
                  onClick={handleToggleAudio}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    isPlayingAudio
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200"
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>停止朗讀</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>語音朗讀範例 ({lang === "mandarin" ? "中文" : "English"})</span>
                    </>
                  )}
                </button>

                {/* Copy */}
                <button
                  id="self-intro-copy-btn"
                  onClick={handleCopy}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "已複製" : "複製全文"}</span>
                </button>
              </div>

              {/* Rehearsal Timer Widget */}
              <div className="flex items-center space-x-3 bg-stone-900 text-white px-4 py-2 rounded-xl border border-stone-800">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="flex items-baseline space-x-1">
                  <span className="text-xs text-stone-400">口說計時：</span>
                  <span className="font-mono text-base font-black text-amber-400">
                    {String(Math.floor(secondsElapsed / 60)).padStart(2, "0")}:
                    {String(secondsElapsed % 60).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-stone-400">/ 01:00</span>
                </div>

                <div className="flex items-center space-x-1 pl-2 border-l border-stone-700">
                  {!timerActive ? (
                    <button
                      id="timer-start-btn"
                      onClick={handleStartTimer}
                      title="開始計時演練"
                      className="p-1 hover:bg-stone-800 rounded text-emerald-400"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                  ) : (
                    <button
                      id="timer-pause-btn"
                      onClick={handlePauseTimer}
                      title="暫停"
                      className="p-1 hover:bg-stone-800 rounded text-amber-400"
                    >
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    </button>
                  )}
                  <button
                    id="timer-reset-btn"
                    onClick={handleResetTimer}
                    title="重設計時"
                    className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pitch Body */}
            <div className="relative bg-stone-50 border border-stone-200/90 rounded-2xl p-6 sm:p-8">
              <div className="text-stone-900 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans tracking-wide">
                {currentText}
              </div>

              {/* Pace status footer if timer running */}
              {secondsElapsed > 0 && (
                <div className="mt-4 pt-3 border-t border-stone-200 flex justify-between items-center text-xs">
                  <span className="text-stone-500">演練節奏診斷：</span>
                  <span className={`font-semibold ${getPaceStatus().color}`}>
                    {getPaceStatus().label}
                  </span>
                </div>
              )}
            </div>

            {/* 5 Core Highlights Breakdown */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-3 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>自介五大黃金錨定點 (Why Stanley B&D Must Hire You)：</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="text-stone-900 block mb-1">1. 跨領域工設背景</strong>
                  <span className="text-stone-600">兼具圖文傳播（美學CI）與結構設計（實體力學），具備全方位視角。</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="text-stone-900 block mb-1">2. ISTA 1A 全紙化落摔實證</strong>
                  <span className="text-stone-600">運用 SolidWorks 開發重型金屬件全紙緩衝，已通過國際落摔認證。</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="text-stone-900 block mb-1">3. 無膠環保專利審查通過</strong>
                  <span className="text-stone-600">前端發明量能，物理自鎖結構已由事務所撰寫專利中，對齊 ESG 永續。</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="text-stone-900 block mb-1">4. 無塑包裝資料庫賦能業務</strong>
                  <span className="text-stone-600">主動發起模組化資料庫，將業務報價等待從 5 天縮短為當日即時回應。</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="text-stone-900 block mb-1">5. 生成式 AI 渲染即戰力</strong>
                  <span className="text-stone-600">CAD 結合 AI 材質白底渲染，節省 70% 渲染等待時間，提升跨國提案敏捷度。</span>
                </div>
                <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200">
                  <strong className="text-amber-950 block mb-1">6. 史丹利百年工具品牌適配</strong>
                  <span className="text-amber-900">重型金屬防護經驗可 100% 平移至手工具與動力機具，零新人摸索期。</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
