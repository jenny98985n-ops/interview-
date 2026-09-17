import React, { useState, useEffect } from "react";
import { CURATED_REVERSE_QUESTIONS } from "../data/reverseQuestionsData";
import { CustomReverseQuestion, ReverseQuestionAnalysis } from "../types";
import {
  MessageSquareQuote,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  UserCheck,
  Clock,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  FileText,
  Share2,
  Briefcase
} from "lucide-react";

interface ReverseInterviewStudioProps {
  onOpenMockLab?: (questionId: string) => void;
}

const STORAGE_KEY = "stanley_custom_reverse_questions_v1";
const NOTES_STORAGE_KEY = "stanley_reverse_notes_v1";

export const ReverseInterviewStudio: React.FC<ReverseInterviewStudioProps> = () => {
  // State for questions
  const [customQuestions, setCustomQuestions] = useState<CustomReverseQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notesState, setNotesState] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(NOTES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("stanley_reverse_bookmarks_v1");
      return saved ? JSON.parse(saved) : ["rev-1-new-tech-goals", "rev-5-newcomer-success-factors", "rev-7-salary-structure-hr"];
    } catch {
      return ["rev-1-new-tech-goals", "rev-5-newcomer-success-factors", "rev-7-salary-structure-hr"];
    }
  });

  // Filter states
  const [audienceFilter, setAudienceFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "curated" | "custom" | "bookmarked">("all");

  // New item modal/form state
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAudience, setNewAudience] = useState<"用人主管" | "人資 (HR)" | "處長/部門大主管" | "同儕/未來夥伴">("用人主管");
  const [newDifficulty, setNewDifficulty] = useState<"簡單" | "中等" | "困難">("簡單");
  const [newWhy, setNewWhy] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<ReverseQuestionAnalysis | null>(null);

  // Audio and copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customQuestions));
  }, [customQuestions]);

  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesState));
  }, [notesState]);

  useEffect(() => {
    localStorage.setItem("stanley_reverse_bookmarks_v1", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Combine curated + custom
  const allQuestions = [...CURATED_REVERSE_QUESTIONS, ...customQuestions];

  // Filtering
  const filteredQuestions = allQuestions.filter((q) => {
    const matchAudience =
      audienceFilter === "all" ||
      (audienceFilter === "用人主管" && (q.targetAudience === "用人主管" || q.targetAudience === "處長/部門大主管")) ||
      (audienceFilter === "人資 (HR)" && q.targetAudience === "人資 (HR)");

    const matchDifficulty = difficultyFilter === "all" || q.difficulty === difficultyFilter;

    const matchSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.bestPhrasing.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.englishPhrasing && q.englishPhrasing.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.whyAskThis.toLowerCase().includes(searchQuery.toLowerCase());

    const isCustom = q.isCustom;
    const isBookmarked = bookmarkedIds.includes(q.id);

    if (activeTab === "curated" && isCustom) return false;
    if (activeTab === "custom" && !isCustom) return false;
    if (activeTab === "bookmarked" && !isBookmarked) return false;

    return matchAudience && matchDifficulty && matchSearch;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, id: string, lang = "zh-TW") => {
    if ("speechSynthesis" in window) {
      if (playingId === id) {
        window.speechSynthesis.cancel();
        setPlayingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = lang.startsWith("en") ? 0.95 : 1.0;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      setPlayingId(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveNotes = (id: string, notes: string) => {
    setNotesState((prev) => ({ ...prev, [id]: notes }));
  };

  // AI Polish
  const handleAIPolish = async () => {
    if (!newTitle.trim()) return;
    setIsPolishing(true);
    setAiAnalysis(null);
    try {
      const res = await fetch("/api/polish-reverse-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawQuestion: newTitle,
          targetAudience: newAudience,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiAnalysis(data);
      } else {
        throw new Error("API call failed");
      }
    } catch {
      // Fallback
      setAiAnalysis({
        polishedChinese: `「想請教${newAudience}，針對${newTitle.trim()}這項議題，貴公司在亞洲 GSMA 團隊目前的整體推動方針與標準大約是如何呢？」`,
        professionalEnglish: `Could you provide some insight regarding ${newTitle.trim()} from the perspective of GSMA packaging operations?`,
        psychologicalGoal: "展現主動思考與對團隊整體戰略的投入度，證明自己具備長遠眼光。",
        timingAdvice: newAudience === "人資 (HR)" ? "建議在談到福利制度時提出。" : "建議在用人主管面試尾聲反向提問時提出。",
        followUpPitch: "「非常感謝說明，這與我一貫重視細節與落地的工程思維非常契合。」",
        riskyPitfalls: "避免語氣過於銳利或帶有質疑，保持謙虛求教與共創雙贏的態度。",
        suitabilityScore: 90,
      });
    } finally {
      setIsPolishing(false);
    }
  };

  // Submit new custom question
  const handleSaveNewQuestion = () => {
    if (!newTitle.trim()) return;

    const newQuestion: CustomReverseQuestion = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      difficulty: newDifficulty,
      targetAudience: newAudience,
      whyAskThis: newWhy.trim() || aiAnalysis?.psychologicalGoal || "深入了解公司實務運作與團隊期待，展現主動性。",
      recommendedTiming: aiAnalysis?.timingAdvice || (newAudience === "人資 (HR)" ? "HR 輪次面試" : "面試結尾反向提問"),
      bestPhrasing: aiAnalysis?.polishedChinese || newTitle.trim(),
      englishPhrasing: aiAnalysis?.professionalEnglish || "",
      followUpPitch: aiAnalysis?.followUpPitch || "「謝謝主管說明，這正是我擅長發揮的範疇。」",
      pitfalls: aiAnalysis?.riskyPitfalls || "避免顯得過度被動，聽完主管回答後務必給予積極接球反饋。",
      createdAt: new Date().toISOString().split("T")[0],
      isCustom: true,
    };

    setCustomQuestions((prev) => [newQuestion, ...prev]);
    // Reset form
    setNewTitle("");
    setNewWhy("");
    setAiAnalysis(null);
    setIsAddingNew(false);
  };

  const handleDeleteCustom = (id: string) => {
    if (confirm("確定要刪除這道自訂提問嗎？")) {
      setCustomQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  // Quick preset chips for rapid question creation
  const presetChips = [
    "部門對自動化折盒的規劃",
    "產線試產遇到交期延誤的處理機制",
    "團隊在永續包材測試上的失敗容忍度",
    "未來與北美總部的溝通頻率",
    "考績評核時最看重的量化指標",
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner - Crisp High-Contrast Clean Theme */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded tracking-wider uppercase">
                REVERSE INTERVIEW STRATEGY
              </span>
              <span className="text-xs text-stone-600 font-mono font-medium">
                Stanley Black & Decker GSMA 反向提問庫 (對象分流專區)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-2.5">
              <span>我可以詢問公司的問題</span>
              <MessageSquareQuote className="w-5 h-5 text-amber-500" />
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
              面試是雙向評估。平庸的應徵者結尾只會說「我沒有問題」；具備大局觀的包裝工程師，會利用反向提問
              <strong className="text-stone-900 font-semibold">展現技術前瞻性、對齊部門藍圖</strong>
              ，並在面試官回答後發動精準的
              <strong className="text-stone-900 font-semibold">「接球金句 (Follow-up Pitch)」</strong>，在最後 10 分鐘敲定錄取！
            </p>
          </div>

          <button
            onClick={() => setIsAddingNew(true)}
            className="inline-flex items-center justify-center space-x-2 bg-amber-400 hover:bg-amber-300 text-stone-950 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>新增自訂提問 (+ 新的item)</span>
          </button>
        </div>

        {/* 3 Core Rules Quick Bar */}
        <div className="mt-5 pt-5 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700">
          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 flex items-start space-x-2.5">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-1.5 py-0.5 rounded text-[11px] shrink-0">
              心法 1
            </span>
            <p className="leading-relaxed">
              <strong className="text-stone-900 font-bold">切忌「我沒有問題」</strong>：這代表求職渴望低。務必準備至少 3 道有深度的工程與戰略問題。
            </p>
          </div>
          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 flex items-start space-x-2.5">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-1.5 py-0.5 rounded text-[11px] shrink-0">
              心法 2
            </span>
            <p className="leading-relaxed">
              <strong className="text-stone-900 font-bold">嚴格對象分流</strong>：技術主管問新目標與工程流程；
              <strong className="text-amber-800 font-bold">薪資福利與保底月數務必留到 HR 關卡才問</strong>。
            </p>
          </div>
          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 flex items-start space-x-2.5">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-1.5 py-0.5 rounded text-[11px] shrink-0">
              心法 3
            </span>
            <p className="leading-relaxed">
              <strong className="text-stone-900 font-bold">關鍵在於「接球 (Pitch)」</strong>：主管回答後不要句點，立刻接一句說明自己如何對齊該目標！
            </p>
          </div>
        </div>
      </div>

      {/* New Question Modal / Expansion Drawer */}
      {isAddingNew && (
        <div className="bg-white border-2 border-amber-400 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-amber-400 text-stone-950 rounded-lg">
                <Plus className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                新增我想詢問公司的問題 (+ 新的item)
              </h3>
            </div>
            <button
              onClick={() => setIsAddingNew(false)}
              className="text-stone-400 hover:text-stone-600 text-sm font-medium px-2 py-1 rounded"
            >
              取消
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                問題標題 / 您心中最想問的事：
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="例如：想請教貴公司在未來一年內，包裝設計部門有特別推動的新技術或新目標嗎？"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />

              {/* Preset Chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[11px] text-stone-600 self-center font-medium">快捷靈感：</span>
                {presetChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setNewTitle(chip)}
                    className="text-[11px] bg-stone-100 hover:bg-stone-200 text-stone-700 px-2 py-1 rounded-md transition-colors"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  預計詢問的對象：
                </label>
                <select
                  value={newAudience}
                  onChange={(e) => setNewAudience(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="用人主管">用人主管 (Packaging Lead / Manager)</option>
                  <option value="人資 (HR)">人資 (HR) — 適合問薪酬福利、保底月數</option>
                  <option value="處長/部門大主管">處長 / 部門大主管 (Director)</option>
                  <option value="同儕/未來夥伴">同儕 / 團隊未來夥伴</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  題目難度 / 屬性分類：
                </label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="簡單">簡單 (基礎定位 / 日常流程 / 薪資結構)</option>
                  <option value="中等">中等 (部門新目標 / ESG 永續戰略)</option>
                  <option value="困難">困難 (組織挑戰 / 跨國博弈決策)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                發問初衷與背景（選填）：
              </label>
              <textarea
                rows={2}
                value={newWhy}
                onChange={(e) => setNewWhy(e.target.value)}
                placeholder="例如：想了解史丹利是否真的重視無塑包裝，以及入職後我有沒有自主發揮專利的空間..."
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* AI Polish Trigger */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    怕問得太直接或太冒昧？點擊「AI 總監幫我潤飾」
                  </div>
                  <div className="text-[11px] text-stone-600">
                    自動升級為外商高情商中文問法、英文加分版、面試官心理分析與接球金句！
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAIPolish}
                disabled={!newTitle.trim() || isPolishing}
                className="inline-flex items-center space-x-1.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-amber-300 px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors shadow-xs"
              >
                {isPolishing ? (
                  <>
                    <span className="w-3 h-3 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
                    <span>AI 深度潤飾中...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI 總監幫我潤飾</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Output Preview if available */}
            {aiAnalysis && (
              <div className="bg-stone-50 rounded-xl p-4 space-y-3 text-xs border border-stone-200">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="font-bold text-stone-900 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>AI 潤飾結果（專家適合度：{aiAnalysis.suitabilityScore}/100）</span>
                  </span>
                  <span className="text-[10px] text-stone-500">已自動套用至儲存草稿</span>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">高情商中文問法：</span>
                  <p className="text-stone-900 mt-1 leading-relaxed font-sans bg-white p-2.5 rounded-lg border border-stone-200">
                    {aiAnalysis.polishedChinese}
                  </p>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">專業外商英文加分版：</span>
                  <p className="text-stone-800 font-mono text-[11px] mt-1 bg-white p-2 rounded-lg border border-stone-200">
                    "{aiAnalysis.professionalEnglish}"
                  </p>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">主管回答後的接球金句 (Follow-up Pitch)：</span>
                  <p className="text-emerald-900 mt-1 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                    {aiAnalysis.followUpPitch}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 text-stone-600 hover:text-stone-800 text-xs font-semibold rounded-lg"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleSaveNewQuestion}
                disabled={!newTitle.trim()}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                儲存至反向提問清單
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Tab Navigation Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Row 1: Target Audience Tabs (Primary Distinction: 用人主管 vs 人資 HR) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-stone-700 mr-1.5 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>提問對象分流：</span>
            </span>
            <button
              onClick={() => setAudienceFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                audienceFilter === "all"
                  ? "bg-stone-900 text-white font-bold"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              全部對象
            </button>
            <button
              onClick={() => setAudienceFilter("用人主管")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                audienceFilter === "用人主管"
                  ? "bg-amber-600/90 text-white font-bold shadow-xs"
                  : "bg-amber-50/80 text-amber-900 hover:bg-amber-100 border border-amber-200/60"
              }`}
            >
              <span>👔 用人主管專用 (技術/流程/新目標)</span>
            </button>
            <button
              onClick={() => setAudienceFilter("人資 (HR)")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                audienceFilter === "人資 (HR)"
                  ? "bg-purple-700 text-white font-bold shadow-xs"
                  : "bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200/60"
              }`}
            >
              <span>💼 人資 HR 專用 (薪酬架構/考核/福利)</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋提問、關鍵詞或對象..."
              className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:bg-white"
            />
          </div>
        </div>

        {/* Row 2: Secondary View Scope & Difficulty */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === "all"
                  ? "bg-stone-200 text-stone-900 font-semibold"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              全部 ({allQuestions.length})
            </button>
            <button
              onClick={() => setActiveTab("curated")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === "curated"
                  ? "bg-stone-200 text-stone-900 font-semibold"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              專家精選 ({CURATED_REVERSE_QUESTIONS.length})
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === "custom"
                  ? "bg-stone-200 text-stone-900 font-semibold"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              自訂提問 ({customQuestions.length})
            </button>
            <button
              onClick={() => setActiveTab("bookmarked")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
                activeTab === "bookmarked"
                  ? "bg-amber-100 text-amber-900 font-semibold border border-amber-300/70"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <Bookmark className="w-3 h-3 text-amber-600" />
              <span>必問精選 ({bookmarkedIds.length})</span>
            </button>

            <span className="text-stone-300 mx-1">|</span>

            {/* Difficulty Filter */}
            <div className="flex items-center space-x-1">
              <span className="text-stone-500 text-[11px]">難度：</span>
              {["all", "簡單", "中等"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    difficultyFilter === diff
                      ? "bg-stone-700 text-white"
                      : "text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {diff === "all" ? "全部" : diff}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-stone-500">
            顯示 <strong className="text-stone-800 font-bold">{filteredQuestions.length}</strong> / {allQuestions.length} 題
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isBookmarked = bookmarkedIds.includes(q.id);
          const isHR = q.targetAudience === "人資 (HR)";

          return (
            <div
              key={q.id}
              className={`bg-white border rounded-2xl p-5 sm:p-6 transition-all shadow-xs hover:shadow-sm ${
                isBookmarked
                  ? "border-amber-300/80 bg-stone-50/40"
                  : isHR
                  ? "border-purple-200/90"
                  : "border-stone-200/80"
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-100 pb-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Target Audience Badge */}
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md flex items-center space-x-1.5 border ${
                        isHR
                          ? "bg-purple-50 text-purple-900 border-purple-200"
                          : "bg-amber-50 text-amber-900 border-amber-200"
                      }`}
                    >
                      <UserCheck className="w-3 h-3 text-current" />
                      <span>{isHR ? "人資 HR 專問" : "用人主管專問"}</span>
                    </span>

                    {/* Difficulty Badge */}
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                      {q.difficulty}
                    </span>

                    {q.isCustom && (
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded border border-amber-300">
                        自訂提問
                      </span>
                    )}

                    {/* Recommended Timing */}
                    <span className="text-[11px] text-stone-500 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{q.recommendedTiming}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug pt-0.5">
                    {q.title}
                  </h3>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-1.5 shrink-0 self-end sm:self-start">
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    title={isBookmarked ? "已在必問清單（點擊移除）" : "加入必問清單"}
                    className={`p-1.5 px-2.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                      isBookmarked
                        ? "bg-amber-100 border-amber-300 text-amber-900 font-semibold"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200"
                    }`}
                  >
                    {isBookmarked ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5 text-amber-700" />
                        <span>必問清單</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5 text-stone-400" />
                        <span>加入必問</span>
                      </>
                    )}
                  </button>

                  {q.isCustom && (
                    <button
                      onClick={() => handleDeleteCustom(q.id)}
                      title="刪除此自訂提問"
                      className="p-1.5 rounded-lg bg-stone-50 hover:bg-red-50 text-stone-400 hover:text-red-600 border border-stone-200 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Strategic Insights Grid - Softer, balanced low contrast */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3.5">
                {/* 1. Why ask this */}
                <div className="bg-stone-50/80 rounded-xl p-3 border border-stone-200/70 space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-800">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>為什麼要問這題？（戰略意圖與背後心理學）</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans">{q.whyAskThis}</p>
                </div>

                {/* 2. Pitfalls */}
                <div className="bg-amber-50/40 rounded-xl p-3 border border-amber-200/50 space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>提問地雷與避坑指南</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans">{q.pitfalls}</p>
                </div>
              </div>

              {/* Speech / Phrasing Box - Elegant light slate background, high readability, low eye strain */}
              <div className="space-y-3">
                {/* Chinese Phrasing (Primary Question Script) */}
                <div className="bg-stone-50/90 rounded-xl p-4 border border-stone-250/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 flex items-center space-x-1.5">
                      <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600" />
                      <span>推薦精準發問話術 (專業中文版)</span>
                    </span>
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleSpeak(q.bestPhrasing, `${q.id}-zh`, "zh-TW")}
                        className="inline-flex items-center space-x-1 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-[11px] px-2.5 py-1 rounded-md transition-colors"
                      >
                        {playingId === `${q.id}-zh` ? (
                          <>
                            <VolumeX className="w-3 h-3 text-amber-600" />
                            <span>停止</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-stone-500" />
                            <span>朗讀試聽</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleCopy(q.bestPhrasing, `${q.id}-zh`)}
                        className="inline-flex items-center space-x-1 bg-amber-400/90 hover:bg-amber-400 text-stone-950 text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors shadow-2xs"
                      >
                        {copiedId === `${q.id}-zh` ? (
                          <>
                            <Check className="w-3 h-3 text-stone-950" />
                            <span>已複製</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-stone-900" />
                            <span>複製發問詞</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-900 leading-relaxed font-sans whitespace-pre-line bg-white p-3 rounded-lg border border-stone-200">
                    {q.bestPhrasing}
                  </p>
                </div>

                {/* English Version */}
                {q.englishPhrasing && (
                  <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-stone-700 tracking-wide">
                        外商高階英文版 (English Version)
                      </span>
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleSpeak(q.englishPhrasing!, `${q.id}-en`, "en-US")}
                          className="text-stone-500 hover:text-stone-800 text-[11px] flex items-center space-x-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>朗讀</span>
                        </button>
                        <button
                          onClick={() => handleCopy(q.englishPhrasing!, `${q.id}-en`)}
                          className="text-amber-800 hover:text-amber-950 text-[11px] font-medium flex items-center space-x-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>複製英文</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-stone-800 font-mono leading-relaxed bg-white p-2.5 rounded-lg border border-stone-200">
                      "{q.englishPhrasing}"
                    </p>
                  </div>
                )}

                {/* Follow-up Pitch (接球金句) */}
                {q.followUpPitch && (
                  <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-950">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>主管回答後的接球金句 (Follow-up Pitch 二次自我推薦)</span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed font-sans bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                      {q.followUpPitch}
                    </p>
                  </div>
                )}
              </div>

              {/* Personal Notes / Memo */}
              <div className="mt-3.5 pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex-1">
                  <input
                    type="text"
                    value={notesState[q.id] || ""}
                    onChange={(e) => handleSaveNotes(q.id, e.target.value)}
                    placeholder="紀錄自己的調整筆記、或針對面試官背景的客製微調..."
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                {notesState[q.id] && (
                  <span className="text-[11px] text-emerald-600 font-medium shrink-0 flex items-center gap-1">
                    <Check className="w-3 h-3" /> 已自動暫存筆記
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-300 p-8 space-y-3">
            <HelpCircle className="w-10 h-10 text-stone-400 mx-auto" />
            <h4 className="text-stone-800 font-bold text-sm">找不到符合條件的反向提問</h4>
            <p className="text-xs text-stone-500">
              您可以嘗試清除篩選條件，或直接點擊上方按鈕「+ 新增自訂提問」！
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
