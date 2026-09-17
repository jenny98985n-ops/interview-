import React, { useState } from "react";
import { QuestionItem, UserPracticeState, AICritiqueResult } from "../types";
import { ExitScenarioGenerator } from "./ExitScenarioGenerator";
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Volume2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Send,
  Loader2,
  Bookmark,
  BookmarkCheck,
  Target,
  ArrowRight,
  TrendingUp,
  UserCheck,
  MessageSquareQuote,
  Box,
  FlaskConical,
  TrendingDown,
  Clock,
  Users,
  Compass,
  Briefcase,
  Quote
} from "lucide-react";

interface QuestionCardProps {
  question: QuestionItem;
  practiceState: UserPracticeState;
  onUpdateState: (id: string, updates: Partial<UserPracticeState>) => void;
  onOpenMockLab: (questionId: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  practiceState,
  onUpdateState,
  onOpenMockLab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    "strategy" | "star" | "answer" | "pitfalls" | "notes" | "ai" | "generator"
  >("answer");
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [userDraft, setUserDraft] = useState(practiceState.notes || "");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AICritiqueResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isCardExpanded, setIsCardExpanded] = useState(true);

  // Copy expert answer to clipboard
  const handleCopyAnswer = () => {
    navigator.clipboard.writeText(question.expertAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Web Speech API for reading question aloud
  const handlePlayAudio = () => {
    if (!("speechSynthesis" in window)) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(question.title);
    utterance.lang = "zh-TW";
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  // Save personal notes / practice answer
  const handleSaveDraft = () => {
    onUpdateState(question.id, { notes: userDraft });
  };

  // Toggle mastery state
  const handleToggleMastery = () => {
    const nextStatus =
      practiceState.status === "mastered"
        ? "unattempted"
        : practiceState.status === "practicing"
        ? "mastered"
        : "practicing";
    onUpdateState(question.id, { status: nextStatus, lastPracticedAt: new Date().toISOString() });
  };

  // Request AI critique
  const handleRequestAiCritique = async () => {
    const contentToReview = userDraft.trim() || question.expertAnswer;
    setIsAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch("/api/ai-critique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionTitle: question.title,
          questionCategory: question.categoryName,
          targetRole: "Structural Packaging Engineer (結構包裝工程師)",
          candidateAnswer: contentToReview,
          starContext: question.star,
        }),
      });
      if (!res.ok) {
        throw new Error(`伺服器回應錯誤 (${res.status})`);
      }
      const data = await res.json();
      setAiResult(data);
      setActiveSubTab("ai");
    } catch (err: any) {
      setAiError(err.message || "AI 評析連線異常，請稍後重試");
    } finally {
      setIsAiLoading(false);
    }
  };

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case "structure":
        return "bg-cyan-100 text-cyan-900 border-cyan-300";
      case "testing":
        return "bg-blue-100 text-blue-900 border-blue-300";
      case "cost_logistics":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "project_risk":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "collaboration":
        return "bg-purple-100 text-purple-900 border-purple-300";
      case "culture_motivation":
        return "bg-rose-100 text-rose-900 border-rose-300";
      case "career_strategy":
        return "bg-stone-200 text-stone-900 border-stone-300";
      case "ai_workflow":
        return "bg-amber-100 text-amber-950 border-amber-300";
      default:
        return "bg-stone-100 text-stone-700 border-stone-200";
    }
  };

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case "structure":
        return <Box className="w-3 h-3 text-cyan-700 shrink-0" />;
      case "testing":
        return <FlaskConical className="w-3 h-3 text-blue-700 shrink-0" />;
      case "cost_logistics":
        return <TrendingDown className="w-3 h-3 text-emerald-700 shrink-0" />;
      case "project_risk":
        return <Clock className="w-3 h-3 text-amber-700 shrink-0" />;
      case "collaboration":
        return <Users className="w-3 h-3 text-purple-700 shrink-0" />;
      case "culture_motivation":
        return <Compass className="w-3 h-3 text-rose-700 shrink-0" />;
      case "career_strategy":
        return <Briefcase className="w-3 h-3 text-stone-700 shrink-0" />;
      case "ai_workflow":
        return <Sparkles className="w-3 h-3 text-amber-700 shrink-0" />;
      default:
        return null;
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case "基礎概念":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "進階實戰":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "深水攻防":
        return "bg-amber-100 text-amber-900 border-amber-400";
      default:
        return "bg-stone-100 text-stone-800";
    }
  };

  const isReverseQuestion = question.category === "ask_company" || question.id.includes("ask-");
  const isHR = question.targetAudience === "hr" || question.targetAudienceName === "人資 (HR)";

  return (
    <div
      id={`question-card-${question.id}`}
      className={`bg-white rounded-xl border transition-shadow overflow-hidden mb-5 ${
        isReverseQuestion
          ? isHR
            ? "border-purple-200/90 shadow-xs hover:shadow-sm"
            : "border-amber-200/90 shadow-xs hover:shadow-sm"
          : "border-stone-200 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Header bar */}
      <div className={`p-5 sm:p-6 border-b border-stone-100 ${
        isReverseQuestion ? (isHR ? "bg-purple-50/25" : "bg-amber-50/20") : "bg-stone-50/50"
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded ${
              isReverseQuestion ? "bg-stone-800 text-amber-300" : "bg-stone-900 text-amber-400"
            }`}>
              {question.number}
            </span>

            {isReverseQuestion && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-300 flex items-center gap-1">
                <MessageSquareQuote className="w-3 h-3 text-stone-600" />
                <span>反向提問</span>
              </span>
            )}

            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex items-center space-x-1.5 ${getCategoryBadgeStyle(question.category)}`}>
              {renderCategoryIcon(question.category)}
              <span>{question.categoryName}</span>
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded border ${getDifficultyBadge(question.difficulty)}`}>
              {question.difficulty}
            </span>
            {question.targetAudienceName && (
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border flex items-center space-x-1 ${
                isHR
                  ? "bg-purple-50 text-purple-900 border-purple-200"
                  : "bg-amber-50 text-amber-900 border-amber-200"
              }`}>
                <UserCheck className="w-3 h-3 text-current" />
                <span>{isHR ? "適用：人資 HR" : "適用：用人主管"}</span>
              </span>
            )}
            {question.recommendedTiming && (
              <span className="text-[11px] text-stone-500 font-medium hidden sm:inline">
                • {question.recommendedTiming}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Audio Listen */}
            <button
              id={`audio-btn-${question.id}`}
              onClick={handlePlayAudio}
              title="朗讀問題"
              className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 transition-colors ${
                isPlayingAudio
                  ? "bg-amber-100 border-amber-400 text-amber-900"
                  : "bg-white border-stone-200 text-stone-600 hover:bg-stone-100"
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isPlayingAudio ? "播放中" : "聽題目"}</span>
            </button>

            {/* Practice in Lab */}
            <button
              id={`practice-btn-${question.id}`}
              onClick={() => onOpenMockLab(question.id)}
              className="p-1.5 px-2.5 rounded-lg bg-stone-800 text-amber-300 text-xs font-medium hover:bg-stone-900 flex items-center space-x-1"
            >
              <Target className="w-3.5 h-3.5" />
              <span>進入計時模擬</span>
            </button>

            {/* Mastery status toggle */}
            <button
              id={`mastery-btn-${question.id}`}
              onClick={handleToggleMastery}
              className={`p-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors ${
                practiceState.status === "mastered"
                  ? "bg-emerald-600 text-white"
                  : practiceState.status === "practicing"
                  ? "bg-blue-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {practiceState.status === "mastered" ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>已熟練</span>
                </>
              ) : practiceState.status === "practicing" ? (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>練習中</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-stone-400" />
                  <span>標記狀態</span>
                </>
              )}
            </button>

            {/* Collapse toggle */}
            <button
              id={`collapse-btn-${question.id}`}
              onClick={() => setIsCardExpanded(!isCardExpanded)}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded"
            >
              {isCardExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-stone-950 leading-snug">
          {question.title}
        </h3>

        {question.scenario && (
          <p className="text-sm sm:text-base text-stone-700 mt-2.5 bg-stone-100/90 p-3.5 rounded-lg border border-stone-200 leading-relaxed">
            <strong className="text-stone-900 font-bold">面試場景意圖：</strong> {question.scenario}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded border border-amber-200/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Expanded Content Area */}
      {isCardExpanded && (
        <div className="p-5 sm:p-6">
          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-stone-200 pb-2.5 mb-5">
            <button
              id={`tab-answer-${question.id}`}
              onClick={() => setActiveSubTab("answer")}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center space-x-1.5 transition-colors ${
                activeSubTab === "answer"
                  ? "bg-amber-400 text-stone-950 shadow-xs font-bold"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>專家示範回答</span>
            </button>

            <button
              id={`tab-star-${question.id}`}
              onClick={() => setActiveSubTab("star")}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center space-x-1.5 transition-colors ${
                activeSubTab === "star"
                  ? "bg-amber-400 text-stone-950 shadow-xs font-bold"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <Target className="w-4 h-4" />
              <span>STAR 架構拆解</span>
            </button>

            <button
              id={`tab-strategy-${question.id}`}
              onClick={() => setActiveSubTab("strategy")}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center space-x-1.5 transition-colors ${
                activeSubTab === "strategy"
                  ? "bg-amber-400 text-stone-950 shadow-xs font-bold"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>核心解題思維</span>
            </button>

            <button
              id={`tab-pitfalls-${question.id}`}
              onClick={() => setActiveSubTab("pitfalls")}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center space-x-1.5 transition-colors ${
                activeSubTab === "pitfalls"
                  ? "bg-amber-400 text-stone-950 shadow-xs font-bold"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>避雷禁忌 ({question.pitfalls.length})</span>
            </button>

            <button
              id={`tab-notes-${question.id}`}
              onClick={() => setActiveSubTab("notes")}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center space-x-1.5 transition-colors ${
                activeSubTab === "notes"
                  ? "bg-amber-400 text-stone-950 shadow-xs font-bold"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>自練筆記 {practiceState.notes ? "•" : ""}</span>
            </button>

            <button
              id={`tab-ai-${question.id}`}
              onClick={() => setActiveSubTab("ai")}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center space-x-1.5 transition-colors ${
                activeSubTab === "ai"
                  ? "bg-stone-900 text-amber-300 shadow-xs font-bold"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI 面試官點評</span>
            </button>

            {question.category === "exit_reason" && (
              <button
                id={`tab-generator-${question.id}`}
                onClick={() => setActiveSubTab("generator")}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center space-x-1.5 transition-all ${
                  activeSubTab === "generator"
                    ? "bg-amber-400 text-stone-950 font-bold shadow-xs"
                    : "bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300"
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>情境生成器 (客製話術)</span>
              </button>
            )}
          </div>

          {/* Sub-tab 1: Expert Answer */}
          {activeSubTab === "answer" && (
            <div className="space-y-4">
              {/* Exit Scenario Generator Shortcut Banner for exit_reason questions */}
              {question.category === "exit_reason" && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-amber-400 text-stone-950 rounded-lg shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-stone-900">
                        想針對目前公司的具體狀況客製話術？使用「情境生成器」
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                        支援輸入如「接單狀況下滑」、「組織裁撤」、「轉型期」等關鍵詞，自動產生客觀、積極且專注個人發展的說明草稿！
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveSubTab("generator")}
                    className="inline-flex items-center space-x-1.5 bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-semibold px-3.5 py-2 rounded-lg shrink-0 transition-colors shadow-xs"
                  >
                    <span>開啟情境生成器</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-bold text-stone-600 uppercase tracking-wider">
                  專家擬答實戰逐字稿 (含工程名詞與商業量化)
                </span>
                <button
                  id={`copy-btn-${question.id}`}
                  onClick={handleCopyAnswer}
                  className="inline-flex items-center space-x-1 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg border border-stone-200 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "已複製擬答" : "複製擬答"}</span>
                </button>
              </div>

              <div className="bg-stone-50 text-stone-900 p-5 sm:p-6 rounded-xl text-base sm:text-[17px] leading-relaxed md:leading-loose whitespace-pre-line font-sans border border-stone-200 shadow-xs">
                {question.expertAnswer}
              </div>

              {/* Case Study / Real Project Context if present */}
              {question.caseStudy && (
                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 sm:p-5 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-950 font-bold text-sm sm:text-base">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>真實專案實例 (Real Case Context)</span>
                  </div>
                  <div className="text-sm sm:text-base text-stone-800 leading-relaxed whitespace-pre-line font-sans">
                    {question.caseStudy}
                  </div>
                </div>
              )}

              {/* Spoken Draft / Oral Version */}
              {question.spokenDraft && (
                <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm sm:text-base">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-xs font-mono">口語化實戰範例</span>
                      <span className="text-stone-500 text-xs font-normal">面試現場自然發音表達</span>
                    </div>
                  </div>
                  <div className="text-sm sm:text-base text-stone-800 leading-relaxed whitespace-pre-line bg-stone-50/80 p-4 rounded-lg border border-stone-200">
                    {question.spokenDraft}
                  </div>
                </div>
              )}

              {/* Failure Case Analysis Table if available */}
              {question.failureCases && question.failureCases.length > 0 && (
                <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  <div className="bg-stone-100/90 px-4 py-3 border-b border-stone-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-800 font-bold text-sm sm:text-base flex items-center space-x-1.5">
                        <span>✅</span>
                        <span>ISTA 測試失敗實例</span>
                      </span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[760px]">
                      <thead className="bg-stone-50 text-stone-800 font-bold border-b border-stone-200">
                        <tr>
                          <th className="p-3 whitespace-nowrap bg-stone-50/80 w-[140px]">測試項目</th>
                          <th className="p-3 min-w-[140px]">現象</th>
                          <th className="p-3 min-w-[200px]">原因</th>
                          <th className="p-3 min-w-[180px]">思考方向/關鍵因素</th>
                          <th className="p-3 min-w-[240px]">解法</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {question.failureCases.map((fc, idx) => (
                          <tr key={idx} className="hover:bg-stone-50/60 transition-colors align-top">
                            <td className="p-3 font-semibold text-stone-900 bg-stone-50/40">
                              <div className="font-bold text-stone-900">{fc.testType.split("\n")[0]}</div>
                              {fc.testType.split("\n")[1] && (
                                <div className="text-xs text-stone-500 font-normal mt-0.5">{fc.testType.split("\n")[1]}</div>
                              )}
                            </td>
                            <td className="p-3 text-stone-900 font-medium whitespace-pre-line leading-relaxed">
                              {fc.phenomenon}
                            </td>
                            <td className="p-3 text-stone-800 leading-relaxed">
                              <div className="space-y-2">
                                {fc.cause.split("\n\n").map((part, pIdx) => (
                                  <p key={pIdx} className="whitespace-pre-line">{part}</p>
                                ))}
                              </div>
                            </td>
                            <td className="p-3 text-stone-700 leading-relaxed">
                              {fc.thinking ? (
                                <div className="space-y-2">
                                  {fc.thinking.split("\n\n").map((part, pIdx) => (
                                    <p key={pIdx} className="whitespace-pre-line">{part}</p>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-stone-300">-</span>
                              )}
                            </td>
                            <td className="p-3 text-stone-800 leading-relaxed">
                              <div className="space-y-2">
                                {fc.solution.split("\n\n").map((part, pIdx) => {
                                  if (part.includes("▶ 是失敗經驗，也是成功經驗")) {
                                    return (
                                      <div key={pIdx} className="pt-1">
                                        <span className="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded text-xs border border-blue-200">
                                          <span>▶</span>
                                          <span>是失敗經驗，也是成功經驗</span>
                                        </span>
                                      </div>
                                    );
                                  }
                                  return (
                                    <p
                                      key={pIdx}
                                      className="whitespace-pre-line text-stone-800"
                                      dangerouslySetInnerHTML={{
                                        __html: part.replace(
                                          /固定卡扣/g,
                                          '<u class="font-bold underline decoration-stone-800 decoration-2">固定卡扣</u>'
                                        ),
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Additional Structured Table Sections if available */}
              {question.tableSections && question.tableSections.map((sec, sIdx) => (
                <div key={sIdx} className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs space-y-0">
                  <div className="bg-stone-100/90 px-4 py-3 border-b border-stone-200 font-bold text-sm sm:text-base text-stone-900 flex items-center justify-between">
                    <span>{sec.title}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
                      <thead className="bg-stone-50 text-stone-800 font-bold border-b border-stone-200">
                        <tr>
                          {sec.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 whitespace-nowrap bg-stone-50/80">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {sec.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-stone-50/60 align-top">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={`p-3 text-stone-800 whitespace-pre-line leading-relaxed ${cIdx === 0 ? "font-semibold bg-stone-50/30" : ""}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Drop Test Insight Callout if drop section */}
                  {sec.title.includes("落下測試") && (
                    <div className="p-4 bg-stone-50/80 border-t border-stone-200 text-xs sm:text-sm text-stone-800 space-y-1">
                      <div className="font-bold text-stone-900 flex items-center space-x-1.5">
                        <Quote className="w-4 h-4 text-stone-600" />
                        <span>結構設計洞察 (Structural Design Insight)：</span>
                      </div>
                      <p className="leading-relaxed italic pl-1 text-stone-700">
                        「雖然 1A/2A 的單次要求高度較高（<strong>760~970 mm</strong>），但 3A 高達 <strong>17 次</strong> 的反覆衝擊（<strong>460 mm</strong>）更容易導致瓦楞紙箱的『<strong>疲勞破損</strong>』。緩衝材（如 EPE 或紙塑）的設計不能只看單次最大抗衝擊，還需評估多次形變後的恢復率。」
                      </p>
                    </div>
                  )}

                  {/* Vibration Test SBD Callout if vibration section */}
                  {sec.title.includes("震動測試") && (
                    <div className="p-4 bg-amber-50/60 border-t border-amber-200 text-xs sm:text-sm text-stone-800 space-y-1.5">
                      <div className="font-bold text-amber-950 flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>Stanley Black & Decker 實務面試關鍵亮點：</span>
                      </div>
                      <p className="leading-relaxed text-stone-800">
                        若面試官問：<strong className="text-stone-950">「1A 跌落高度是 760mm，2A 甚至高達 970mm，而 3A 只有 460mm，這是不是代表 1A/2A 的跌落測試比 3A 更難通過？」</strong><br />
                        <strong className="text-stone-950">滿分答法：</strong>「這正是典型的經驗陷阱！1A 與 2A 雖然單次高度高（760~970mm），但只摔 10 次；而 3A 高達 <strong>17 次</strong> 複合反覆衝擊（分為震動前、震動後兩階段），並包含特定面的 <strong>910mm 極端落下</strong>。五金重件在 17 次反覆衝擊下，瓦楞紙板受剪力與壓潰會產生<strong>疲勞累積效應</strong>，使內襯卡榫斷裂或紙托粉化；加上 3A 是帶有<strong>頂載 (Top Load)</strong> 的 <strong>1~200 Hz 廣頻隨機震動（陸運 0.53 Grms / 空運 1.05 Grms）</strong>，因此 3A 的綜合破壞力與真實物流嚴苛度遠高於 1A！」
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Stanley context banner */}
              {question.stanleyContext && (
                <div className="bg-amber-50/80 border-l-4 border-amber-400 p-3.5 rounded-r-lg text-sm sm:text-base text-amber-950 leading-relaxed">
                  <span className="font-bold">Stanley Black & Decker 企業視角：</span> {question.stanleyContext}
                </div>
              )}

              {/* Reverse Question Specials: English phrasing & Follow-up Pitch */}
              {question.englishPhrasing && (
                <div className="bg-stone-950 text-stone-200 rounded-xl p-4 border border-stone-800 space-y-1.5">
                  <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider block">
                    Professional English Version (外商高階英文版問法)
                  </span>
                  <p className="text-sm sm:text-base text-stone-200 font-mono leading-relaxed">
                    "{question.englishPhrasing}"
                  </p>
                </div>
              )}

              {question.followUpPitch && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 space-y-1.5">
                  <div className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center space-x-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>主管回答後的接球金句 (Follow-up Pitch 二次自我推薦)</span>
                  </div>
                  <p className="text-sm sm:text-base text-emerald-900 leading-relaxed">
                    {question.followUpPitch}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Sub-tab 2: STAR Framework */}
          {activeSubTab === "star" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm sm:text-base mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-mono font-bold">
                    S
                  </span>
                  <span>Situation (情境痛點)</span>
                </div>
                <p className="text-sm sm:text-base text-stone-800 leading-relaxed">{question.star.situation}</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm sm:text-base mb-1">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-mono font-bold">
                    T
                  </span>
                  <span>Task (核心任務與限制)</span>
                </div>
                <p className="text-sm sm:text-base text-stone-800 leading-relaxed">{question.star.task}</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm sm:text-base mb-1">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center text-xs font-mono font-bold">
                    A
                  </span>
                  <span>Action (關鍵行動與技術突破)</span>
                </div>
                <p className="text-sm sm:text-base text-stone-800 leading-relaxed">{question.star.action}</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm sm:text-base mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-xs font-mono font-bold">
                    R
                  </span>
                  <span>Result (量化成果與商業價值)</span>
                </div>
                <p className="text-sm sm:text-base text-stone-800 leading-relaxed">{question.star.result}</p>
              </div>
            </div>
          )}

          {/* Sub-tab 3: Core Strategy */}
          {activeSubTab === "strategy" && (
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-stone-850 leading-relaxed">
                <div className="flex items-center space-x-2 font-bold text-amber-950 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>包裝設計專家解題維度</span>
                </div>
                {question.coreStrategy}
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">
                  建議提及之包裝工程專業關鍵詞：
                </h4>
                <div className="flex flex-wrap gap-2">
                  {question.keyTerms.map((term) => (
                    <span
                      key={term}
                      className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 font-mono text-xs sm:text-sm border border-stone-200 font-medium"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 4: Pitfalls & Red Lines */}
          {activeSubTab === "pitfalls" && (
            <div className="space-y-3">
              <div className="text-xs sm:text-sm font-bold text-red-900 flex items-center space-x-1.5 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>絕對避雷紅線 (面試扣分重災區)</span>
              </div>
              <ul className="space-y-2.5">
                {question.pitfalls.map((pitfall, idx) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-2.5 text-sm sm:text-base text-stone-900 bg-red-50/70 p-3.5 rounded-lg border border-red-200/60 leading-relaxed"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-600 mt-2 shrink-0" />
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sub-tab 5: Personal Notes & Practice Draft */}
          {activeSubTab === "notes" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-stone-700">
                  我的練習擬答或筆記重點 (會自動保存在瀏覽器)
                </label>
                <button
                  id={`save-draft-btn-${question.id}`}
                  onClick={handleSaveDraft}
                  className="text-xs sm:text-sm font-semibold bg-stone-900 text-white px-3.5 py-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                >
                  儲存筆記
                </button>
              </div>
              <textarea
                id={`draft-textarea-${question.id}`}
                value={userDraft}
                onChange={(e) => setUserDraft(e.target.value)}
                placeholder="在此練習寫下你的自述回答，或記錄想強化的個人實例細節..."
                rows={5}
                className="w-full text-sm sm:text-base p-3.5 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:border-amber-400 font-sans leading-relaxed"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-stone-500">
                  已輸入 {userDraft.length} 字
                </span>
                <button
                  id={`ai-critique-draft-btn-${question.id}`}
                  onClick={handleRequestAiCritique}
                  disabled={isAiLoading}
                  className="text-xs sm:text-sm font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5"
                >
                  {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-600" />}
                  <span>送交 AI 面試官評核</span>
                </button>
              </div>
            </div>
          )}

          {/* Sub-tab 6: AI Critique & Follow-up */}
          {activeSubTab === "ai" && (
            <div className="space-y-4">
              {!aiResult && !isAiLoading && (
                <div className="text-center py-6 bg-stone-50 rounded-xl border border-dashed border-stone-300 p-4">
                  <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm text-stone-700 mb-3">
                    點擊下方按鈕，讓「Stanley Black & Decker 包裝工程總監」針對本題標準答法或你的個人練習給出深度評析與追問！
                  </p>
                  <button
                    id={`trigger-ai-btn-${question.id}`}
                    onClick={handleRequestAiCritique}
                    className="inline-flex items-center space-x-2 bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>開始 AI 模擬評核</span>
                  </button>
                </div>
              )}

              {isAiLoading && (
                <div className="text-center py-8 bg-stone-50 rounded-xl border border-stone-200">
                  <Loader2 className="w-6 h-6 text-amber-500 animate-spin mx-auto mb-2" />
                  <p className="text-sm text-stone-700 font-medium">
                    Stanley Black & Decker 外商包裝總監正在審視回答中的 STAR 架構與工程數據...
                  </p>
                </div>
              )}

              {aiError && (
                <div className="p-3 bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700 rounded-lg">
                  {aiError}
                </div>
              )}

              {aiResult && (
                <div className="bg-stone-900 text-stone-100 rounded-xl p-5 sm:p-6 border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm text-stone-400">總體評分</span>
                      <span className="text-2xl font-bold text-amber-400">{aiResult.score} / 100</span>
                    </div>
                    <div className="flex space-x-2 text-xs sm:text-sm">
                      <span className="bg-stone-800 px-2.5 py-1 rounded text-stone-300">
                        技術評級: <strong className="text-amber-400">{aiResult.technicalRating}</strong>
                      </span>
                      <span className="bg-stone-800 px-2.5 py-1 rounded text-stone-300">
                        溝通評級: <strong className="text-amber-400">{aiResult.communicationRating}</strong>
                      </span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-stone-300 mb-1">總監點評總結：</h5>
                    <p className="text-sm sm:text-base text-stone-200 leading-relaxed">{aiResult.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="bg-stone-800/80 p-3.5 rounded-lg border border-stone-700">
                      <div className="font-bold text-emerald-400 mb-1.5 flex items-center space-x-1.5">
                        <Check className="w-4 h-4" />
                        <span>核心優勢亮點</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-stone-300 leading-relaxed">
                        {aiResult.strengths?.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-stone-800/80 p-3.5 rounded-lg border border-stone-700">
                      <div className="font-bold text-amber-400 mb-1.5 flex items-center space-x-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>建議強化方向</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-stone-300 leading-relaxed">
                        {aiResult.improvementPoints?.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {aiResult.modelAnswerHighlight && (
                    <div className="bg-amber-400/10 border border-amber-400/30 p-3.5 rounded-lg text-xs sm:text-sm text-amber-200 leading-relaxed">
                      <strong className="text-amber-400 font-bold block mb-1">外商主管青睞之金句潤飾：</strong>
                      "{aiResult.modelAnswerHighlight}"
                    </div>
                  )}

                  {aiResult.followUpQuestion && (
                    <div className="bg-stone-800 p-4 rounded-lg border border-amber-400/40">
                      <div className="text-xs sm:text-sm font-bold text-amber-400 mb-1.5 flex items-center space-x-1.5">
                        <Target className="w-4 h-4" />
                        <span>現場可能遭遇的深度追問 (Follow-up Challenge)：</span>
                      </div>
                      <p className="text-sm sm:text-base text-white font-medium leading-relaxed">{aiResult.followUpQuestion}</p>
                    </div>
                  )}

                  <div className="text-right">
                    <button
                      id={`re-evaluate-btn-${question.id}`}
                      onClick={handleRequestAiCritique}
                      className="text-xs sm:text-sm text-stone-400 hover:text-stone-200 underline"
                    >
                      重新評核
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-tab 7: Exit Scenario Generator */}
          {activeSubTab === "generator" && question.category === "exit_reason" && (
            <div className="space-y-4">
              <ExitScenarioGenerator
                defaultKeywords="接單狀況下滑、組織裁撤、轉型期"
                currentNotes={userDraft}
                onSaveToNotes={(notes) => {
                  onUpdateState(question.id, { notes });
                  setUserDraft(notes);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
