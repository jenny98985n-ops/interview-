import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { QuestionCard } from "./components/QuestionCard";
import { SalaryCalculator } from "./components/SalaryCalculator";
import { JdStrategyView } from "./components/JdStrategyView";
import { SelfIntroStudio } from "./components/SelfIntroStudio";
import { GlossaryView } from "./components/GlossaryView";
import { StandardsComparisonView } from "./components/StandardsComparisonView";
import { MockInterviewLab } from "./components/MockInterviewLab";
import { ExitScenarioGenerator } from "./components/ExitScenarioGenerator";
import { ReverseInterviewStudio } from "./components/ReverseInterviewStudio";
import { CategoryOverviewMatrix } from "./components/CategoryOverviewMatrix";
import { AmandaProfilePortfolio } from "./components/AmandaProfilePortfolio";
import { QUESTIONS_DATA, COMPANY_INFO } from "./data/interviewData";
import { QuestionCategory, UserPracticeState } from "./types";
import {
  Search,
  Filter,
  CheckCircle2,
  BookmarkCheck,
  Zap,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
  MessageSquareQuote
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("questions");
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "unattempted" | "practicing" | "mastered">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeMockQuestionId, setActiveMockQuestionId] = useState<string | null>(null);

  // Local storage for practice notes and mastery states
  const [userStates, setUserStates] = useState<Record<string, UserPracticeState>>(() => {
    try {
      const saved = localStorage.getItem("stanley_bd_packaging_practice_states");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("stanley_bd_packaging_practice_states", JSON.stringify(userStates));
    } catch (e) {
      console.error(e);
    }
  }, [userStates]);

  const handleUpdateState = (id: string, updates: Partial<UserPracticeState>) => {
    setUserStates((prev) => {
      const current = prev[id] || { status: "unattempted", notes: "" };
      return {
        ...prev,
        [id]: { ...current, ...updates },
      };
    });
  };

  const handleOpenMockLab = (questionId: string) => {
    setActiveMockQuestionId(questionId);
    setActiveTab("mock");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter questions
  const filteredQuestions = QUESTIONS_DATA.filter((q) => {
    const matchCategory = selectedCategory === "all" || q.category === selectedCategory;
    const currentState = userStates[q.id]?.status || "unattempted";
    const matchStatus = statusFilter === "all" || currentState === statusFilter;
    const matchSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.expertAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.actualCase && q.actualCase.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.notesRemark && q.notesRemark.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.caseStudy && q.caseStudy.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.keyTerms.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCategory && matchStatus && matchSearch;
  });

  // Calculate stats
  const totalCount = QUESTIONS_DATA.length;
  const masteredCount = (Object.values(userStates) as UserPracticeState[]).filter(
    (s) => s?.status === "mastered"
  ).length;

  const categoryTabs: { id: QuestionCategory; name: string; icon: string }[] = [
    { id: "all", name: "全部實戰題", icon: "📋" },
    { id: "structure", name: "結構設計與材質", icon: "📦" },
    { id: "testing", name: "ISTA 測試與品質", icon: "🧪" },
    { id: "cost_logistics", name: "成本工程與打棧", icon: "💰" },
    { id: "project_risk", name: "專案管理與交期風險", icon: "⏱️" },
    { id: "collaboration", name: "跨部門協調與合作", icon: "🤝" },
    { id: "culture_motivation", name: "外商動機與文化跨度", icon: "🌐" },
    { id: "career_strategy", name: "JD 擊破與薪資離職", icon: "💼" },
    { id: "ai_workflow", name: "AI 數位與渲染工作流", icon: "⚡" },
  ];

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 font-sans flex flex-col">
      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        masteredCount={masteredCount}
        totalQuestions={totalCount}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
        {/* VIEW 0: Amanda's Profile & Portfolio Specification */}
        {activeTab === "profile" && <AmandaProfilePortfolio />}

        {/* VIEW 1: Questions Bank */}
        {activeTab === "questions" && (
          <div className="space-y-6">
            {/* Quick Hero Banner - Crisp, High-Contrast Clean Theme */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-amber-400 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded tracking-wider uppercase">
                      STANLEY BLACK & DECKER GSMA
                    </span>
                    <span className="text-xs text-stone-600 font-mono font-medium">
                      Structural Packaging Engineer
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                    結構包裝工程師 — 全維度面試實戰題庫
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                    以資深包裝設計專家視角，8 大核心領域、33 道實戰攻防拆解。涵蓋全紙化防護、ISTA 1A 落摔除錯、打棧與成本優化、專案交期快打、跨部門衝突折衷與 63K 薪資談判。
                  </p>
                </div>

                {/* Quick Action Shortcuts */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1 lg:pt-0 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedCategory("career_strategy");
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-semibold transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>速查：離職原因轉化話術</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("ask-company")}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-semibold transition-colors"
                  >
                    <MessageSquareQuote className="w-3.5 h-3.5 text-stone-700" />
                    <span>詢問公司的問題 (反向提問)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("salary")}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-colors shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>查看 63K 薪資精算</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 題庫分類全景導覽 (Category Curriculum Matrix) */}
            <CategoryOverviewMatrix
              questions={QUESTIONS_DATA}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              userStates={userStates}
            />

            {/* Search & Filter Controls */}
            <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    id="search-questions-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜尋題目標題、STAR關鍵詞、ISTA、SolidWorks、專利、DEWALT..."
                    className="w-full text-xs sm:text-sm pl-9 pr-4 py-2.5 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-700"
                    >
                      清除
                    </button>
                  )}
                </div>

                {/* Status filter buttons */}
                <div className="flex items-center space-x-1.5 shrink-0 text-xs">
                  <span className="text-stone-500 font-medium hidden md:inline">熟練狀態：</span>
                  {[
                    { id: "all", label: "全部" },
                    { id: "unattempted", label: "未標記" },
                    { id: "practicing", label: "練習中" },
                    { id: "mastered", label: "已熟練" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStatusFilter(s.id as any)}
                      className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                        statusFilter === s.id
                          ? "bg-stone-900 text-white"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Pills with Live Count Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                {categoryTabs.map((cat) => {
                  const count =
                    cat.id === "all"
                      ? QUESTIONS_DATA.length
                      : QUESTIONS_DATA.filter((q) => q.category === cat.id).length;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      id={`category-pill-${cat.id}`}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                        isSelected
                          ? "bg-amber-400 text-stone-950 font-bold shadow-xs ring-1 ring-amber-500/50"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isSelected
                            ? "bg-stone-900 text-amber-300 font-bold"
                            : "bg-stone-200 text-stone-600"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* If Career Strategy or Exit Reason category is selected, showcase the Scenario Generator prominently */}
            {(selectedCategory === "career_strategy" || selectedCategory === "exit_reason") && (
              <div className="mb-4">
                <ExitScenarioGenerator
                  defaultKeywords="接單狀況下滑、組織裁撤、轉型期"
                  currentNotes={userStates["q9-exit-reason-rescue"]?.notes || ""}
                  onSaveToNotes={(notes) => {
                    handleUpdateState("q9-exit-reason-rescue", { notes });
                  }}
                />
              </div>
            )}

            {/* Questions List */}
            {filteredQuestions.length > 0 ? (
              <div className="space-y-4">
                <div className="text-xs text-stone-500 flex justify-between items-center px-1">
                  <span>共找到 {filteredQuestions.length} 道面試攻防題目</span>
                  <span>點擊每題卡片可查看【專家擬答】、【STAR拆解】與【AI點評】</span>
                </div>

                {filteredQuestions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    practiceState={userStates[q.id] || { status: "unattempted", notes: "" }}
                    onUpdateState={handleUpdateState}
                    onOpenMockLab={handleOpenMockLab}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-6 space-y-3">
                <Filter className="w-8 h-8 text-stone-300 mx-auto" />
                <h3 className="text-sm font-bold text-stone-700">沒有符合搜尋條件的題目</h3>
                <p className="text-xs text-stone-500">
                  請嘗試清除搜尋關鍵字或切換為「全部題目」分類。
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setStatusFilter("all");
                  }}
                  className="text-xs font-semibold bg-stone-900 text-amber-400 px-4 py-2 rounded-lg"
                >
                  重設所有篩選條件
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 1.2: Packaging Testing Standards (ASTM vs ISTA 1A / 2A / 3A) */}
        {activeTab === "standards" && <StandardsComparisonView />}

        {/* VIEW 1.5: Reverse Interview Studio (我可以詢問公司的問題) */}
        {activeTab === "ask-company" && <ReverseInterviewStudio />}

        {/* VIEW 2: Mock Interview Lab */}
        {activeTab === "mock" && (
          <MockInterviewLab
            questions={QUESTIONS_DATA}
            selectedQuestionId={activeMockQuestionId}
            onSelectQuestion={setActiveMockQuestionId}
          />
        )}

        {/* VIEW 3: Salary Calculator & Strategy */}
        {activeTab === "salary" && <SalaryCalculator />}

        {/* VIEW 4: JD Strategy Strike */}
        {activeTab === "jd" && <JdStrategyView />}

        {/* VIEW 5: 1-Minute Self-Intro */}
        {activeTab === "self-intro" && <SelfIntroStudio />}

        {/* VIEW 6: Packaging Engineering Glossary */}
        {activeTab === "glossary" && (
          <GlossaryView onNavigateToStandards={() => setActiveTab("standards")} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-6 border-t border-stone-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-semibold text-white">Packaging Design Expert Interview Bank</span>
            <span className="text-stone-500">|</span>
            <span>Structural Packaging Engineer Interview Simulator</span>
          </div>

          <div className="text-stone-500 text-center sm:text-right">
            針對 Stanley Black & Decker GSMA 供應鏈包裝工程實戰特訓 • 內建 STAR 架構與即時 AI 評核
          </div>
        </div>
      </footer>
    </div>
  );
}
