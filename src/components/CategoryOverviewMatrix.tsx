import React, { useState } from "react";
import { QuestionCategory, QuestionItem, UserPracticeState } from "../types";
import {
  Box,
  FlaskConical,
  TrendingDown,
  Clock,
  Users,
  Compass,
  Briefcase,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  CheckCircle2,
  ArrowRight,
  Filter
} from "lucide-react";

interface CategoryOverviewMatrixProps {
  questions: QuestionItem[];
  selectedCategory: QuestionCategory;
  onSelectCategory: (cat: QuestionCategory) => void;
  userStates: Record<string, UserPracticeState>;
}

interface CategoryCardData {
  id: QuestionCategory;
  name: string;
  enName: string;
  icon: React.ComponentType<{ className?: string }>;
  color: {
    badge: string;
    border: string;
    activeRing: string;
    lightBg: string;
    bar: string;
    text: string;
  };
  summary: string;
  keyTopics: string[];
}

export const CategoryOverviewMatrix: React.FC<CategoryOverviewMatrixProps> = ({
  questions,
  selectedCategory,
  onSelectCategory,
  userStates,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const categories: CategoryCardData[] = [
    {
      id: "structure",
      name: "結構設計與材質工藝",
      enName: "Structure & Materials",
      icon: Box,
      color: {
        badge: "bg-cyan-100 text-cyan-900 border-cyan-300",
        border: "border-cyan-200 hover:border-cyan-400",
        activeRing: "ring-2 ring-cyan-500 bg-cyan-50/40",
        lightBg: "bg-cyan-50/30",
        bar: "bg-cyan-500",
        text: "text-cyan-900",
      },
      summary: "全紙化防潮耐候、瓦楞紙與紙托選型、高單價精品開盒阻尼感與五金重裝防護。",
      keyTopics: ["全紙化抗潮", "瓦楞 vs 紙托", "TWS雙層卡槽", "精品開盒體驗", "受力分散"],
    },
    {
      id: "testing",
      name: "ISTA 測試與品質把關",
      enName: "ISTA Testing & Quality",
      icon: FlaskConical,
      color: {
        badge: "bg-blue-100 text-blue-900 border-blue-300",
        border: "border-blue-200 hover:border-blue-400",
        activeRing: "ring-2 ring-blue-500 bg-blue-50/40",
        lightBg: "bg-blue-50/30",
        bar: "bg-blue-500",
        text: "text-blue-900",
      },
      summary: "ISTA 1A/2A/3A 實戰除錯、保護性四大驗證數據、雷切 0.5mm 破損分析、打樣規格表與試產干涉修正。",
      keyTopics: ["ISTA 1A/2A/3A", "跌落/振動/堆疊數據", "雷切 0.5mm 內縮公差", "固定卡扣防浮動", "試產干涉修正"],
    },
    {
      id: "cost_logistics",
      name: "成本工程與打棧物流",
      enName: "Cost Engineering & Pallet",
      icon: TrendingDown,
      color: {
        badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
        border: "border-emerald-200 hover:border-emerald-400",
        activeRing: "ring-2 ring-emerald-500 bg-emerald-50/40",
        lightBg: "bg-emerald-50/30",
        bar: "bg-emerald-500",
        text: "text-emerald-900",
      },
      summary: "全面包裝成本 TCP 控制矩陣、打棧數從 960 至 1280pcs 優化、取消過水油降本 10%。",
      keyTopics: ["TCP 成本四構成", "打棧數 +33%", "克重與紙等優化", "取消過水油增黏", "材積率極限"],
    },
    {
      id: "project_risk",
      name: "專案管理與交期風險",
      enName: "Project & Risk Management",
      icon: Clock,
      color: {
        badge: "bg-amber-100 text-amber-900 border-amber-300",
        border: "border-amber-200 hover:border-amber-400",
        activeRing: "ring-2 ring-amber-500 bg-amber-50/40",
        lightBg: "bg-amber-50/30",
        bar: "bg-amber-500",
        text: "text-amber-900",
      },
      summary: "RFQ 資訊不足假設設計、急件白樣並行快打、專案風險五型矩陣、48hr 重測時程 A/B 備案、供應商脫節應變。",
      keyTopics: ["RFQ 假設設計", "白樣並行作業", "風險評估矩陣", "48hr 快速重測備案", "精簡製程保交期"],
    },
    {
      id: "collaboration",
      name: "跨部門協調與合作",
      enName: "Cross-Functional Collaboration",
      icon: Users,
      color: {
        badge: "bg-purple-100 text-purple-900 border-purple-300",
        border: "border-purple-200 hover:border-purple-400",
        activeRing: "ring-2 ring-purple-500 bg-purple-50/40",
        lightBg: "bg-purple-50/30",
        bar: "bg-purple-500",
        text: "text-purple-900",
      },
      summary: "ME 機構公差爭議低成本折衷、業務超限規格溝通、無塑資料庫推廣阻力化解、外商失敗成長型思維。",
      keyTopics: ["ME 機構干涉溝通", "業務超承諾數據化解", "無塑資料庫推動", "量產防呆成長心態"],
    },
    {
      id: "culture_motivation",
      name: "外商動機與文化跨度",
      enName: "Culture & Motivation",
      icon: Compass,
      color: {
        badge: "bg-rose-100 text-rose-900 border-rose-300",
        border: "border-rose-200 hover:border-rose-400",
        activeRing: "ring-2 ring-rose-500 bg-rose-50/40",
        lightBg: "bg-rose-50/30",
        bar: "bg-rose-500",
        text: "text-rose-900",
      },
      summary: "加入史丹利 2 大動機與 3 大貢獻、跨國合作與英文坦誠計畫、自行車跨手工具產業跨度、核心三大價值權重。",
      keyTopics: ["史丹利百得雙重動機", "跨國多時區協作", "英文能力誠實坦承", "自行車零組件跨度", "核心三價值比重"],
    },
    {
      id: "career_strategy",
      name: "JD 擊破與薪資離職",
      enName: "JD Strategy & Career Defense",
      icon: Briefcase,
      color: {
        badge: "bg-stone-200 text-stone-900 border-stone-300",
        border: "border-stone-300 hover:border-stone-400",
        activeRing: "ring-2 ring-stone-600 bg-stone-100",
        lightBg: "bg-stone-50",
        bar: "bg-stone-700",
        text: "text-stone-900",
      },
      summary: "JD 痛點四大擊破、63K 月薪錨定談判、上一家離職高情商原因、標準提案資料庫建置規範。",
      keyTopics: ["JD 創新專利落實", "主動發起模組化庫", "63,000 月薪錨定", "離職客觀高情商話術", "6 大提案交付文件"],
    },
    {
      id: "ai_workflow",
      name: "AI 數位與渲染工作流",
      enName: "AI Packaging Workflow",
      icon: Sparkles,
      color: {
        badge: "bg-amber-100 text-amber-950 border-amber-300",
        border: "border-amber-200 hover:border-amber-400",
        activeRing: "ring-2 ring-amber-400 bg-amber-50/40",
        lightBg: "bg-amber-50/20",
        bar: "bg-amber-400",
        text: "text-amber-950",
      },
      summary: "生成式 AI 白底材質渲染軟體鏈（Vizcom / ControlNet）、CAD 線框骨架約束與前期提案效率倍增。",
      keyTopics: ["ControlNet 深度約束", "CAD 線框骨架渲染", "Vizcom 快速白模", "材質 LoRA 反射", "提案時間縮減 70%"],
    },
  ];

  // Calculate stats for each category
  const getCategoryStats = (catId: QuestionCategory) => {
    const catQuestions = questions.filter((q) => q.category === catId);
    const count = catQuestions.length;
    const mastered = catQuestions.filter((q) => userStates[q.id]?.status === "mastered").length;
    const questionNumbers = catQuestions.map((q) => q.number);
    return { count, mastered, questionNumbers };
  };

  const totalQuestions = questions.length;
  const totalMastered = (Object.values(userStates) as UserPracticeState[]).filter(
    (s) => s?.status === "mastered"
  ).length;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden transition-all">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 bg-white border-b border-stone-200 text-stone-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-amber-400 text-stone-950 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Full Curriculum Map
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-600 font-medium">
                共 8 大專業領域 / 33 道實戰攻防題
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-stone-900 flex items-center gap-2">
              <span>結構包裝工程師 — 題庫分類全景圖</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-auto">
          {/* Reset to All Button */}
          <button
            onClick={() => onSelectCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              selectedCategory === "all"
                ? "bg-amber-400 text-stone-950 shadow-xs"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>全部題目 ({totalQuestions})</span>
          </button>

          {/* Toggle Expand / Collapse */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors"
            title={isExpanded ? "收合分類導覽" : "展開分類導覽"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Grid Body */}
      {isExpanded && (
        <div className="p-4 sm:p-5 bg-stone-50/40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const { count, mastered, questionNumbers } = getCategoryStats(cat.id);
              const isSelected = selectedCategory === cat.id;
              const percent = count > 0 ? Math.round((mastered / count) * 100) : 0;

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`cursor-pointer rounded-xl p-3.5 border transition-all text-left flex flex-col justify-between relative group ${
                    isSelected
                      ? `${cat.color.activeRing} ${cat.color.lightBg} border-transparent shadow-xs`
                      : `bg-white ${cat.color.border} hover:shadow-xs`
                  }`}
                >
                  {/* Top Bar inside Card */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`p-1.5 rounded-md border ${cat.color.badge}`}
                        >
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-amber-600 transition-colors leading-tight">
                            {cat.name}
                          </h4>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {cat.enName}
                          </span>
                        </div>
                      </div>

                      {/* Question Count Pill */}
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 ${cat.color.badge}`}
                      >
                        {count} 題
                      </span>
                    </div>

                    {/* Summary Description */}
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-2.5">
                      {cat.summary}
                    </p>

                    {/* Key Topics Badges */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {cat.keyTopics.slice(0, 3).map((topic, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded border border-stone-200"
                        >
                          {topic}
                        </span>
                      ))}
                      {cat.keyTopics.length > 3 && (
                        <span className="text-[10px] text-stone-600 px-1 py-0.5">
                          +{cat.keyTopics.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Included Questions & Mastery Progress */}
                  <div className="pt-2.5 border-t border-stone-100">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
                      <div className="flex items-center space-x-1 font-mono text-[10px] text-stone-600">
                        <span>含：</span>
                        <span className="font-semibold text-stone-800">
                          {questionNumbers.join(", ")}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-stone-700">
                        {mastered}/{count} 已熟練
                      </span>
                    </div>

                    {/* Mini Progress Bar */}
                    <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${cat.color.bar} transition-all duration-300`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Active Indicator Arrow */}
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-xs">
                      <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Clear Filter Info Bar */}
          <div className="mt-3.5 pt-3 border-t border-stone-200/60 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-stone-700">目前檢視：</span>
              {selectedCategory === "all" ? (
                <span className="font-bold text-stone-900 bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                  全部 33 道實戰題
                </span>
              ) : (
                <span className="font-bold text-stone-900 bg-stone-200 px-2 py-0.5 rounded">
                  {categories.find((c) => c.id === selectedCategory)?.name} (
                  {categories.find((c) => c.id === selectedCategory)?.enName})
                </span>
              )}
            </div>

            {selectedCategory !== "all" && (
              <button
                onClick={() => onSelectCategory("all")}
                className="text-amber-700 hover:text-amber-900 font-bold hover:underline flex items-center space-x-1"
              >
                <span>顯示所有分類題目</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
