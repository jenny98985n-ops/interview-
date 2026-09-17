import React from "react";
import { ShieldCheck, Award, Calculator, BookOpen, Mic, Target, Layers, MessageSquareQuote, FlaskConical } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  masteredCount: number;
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  masteredCount,
  totalQuestions,
}) => {
  const tabs = [
    { id: "questions", label: "面試實戰題庫", icon: BookOpen, count: totalQuestions },
    { id: "standards", label: "ASTM / ISTA 差異對照", icon: FlaskConical, badge: "1A/2A/3A" },
    { id: "ask-company", label: "詢問公司的問題", icon: MessageSquareQuote, badge: "反向提問" },
    { id: "mock", label: "模擬面試演練", icon: Mic, badge: "AI點評" },
    { id: "salary", label: "薪資談判精算", icon: Calculator, badge: "63K實拿" },
    { id: "jd", label: "JD 痛點精準破解", icon: Target, badge: "四大攻防" },
    { id: "self-intro", label: "1分鐘自介中英對照", icon: Award },
    { id: "glossary", label: "包裝工程術語庫", icon: Layers },
  ];

  return (
    <header className="bg-stone-900 text-stone-100 border-b border-stone-800 sticky top-0 z-40 shadow-md">
      {/* Top Banner with Brand Identity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b border-stone-800 gap-4">
          <div className="flex items-center space-x-3">
            {/* Stanley Heritage Yellow Tag */}
            <div className="h-10 w-2.5 bg-amber-400 rounded-full" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-amber-400 text-stone-950 text-xs font-black tracking-wider px-2 py-0.5 rounded uppercase">
                  Stanley Black & Decker
                </span>
                <span className="text-xs text-stone-400 font-mono tracking-wide">
                  GSMA 亞洲供應管理中心
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                Packaging Design Expert Interview Bank
              </h1>
              <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
                Structural Packaging Engineer (結構包裝工程師) 核心面試題庫、STAR 解題思維與高情商攻防手冊
              </p>
            </div>
          </div>

          {/* Quick Mastery Progress Metric */}
          <div className="flex items-center space-x-4 bg-stone-800/80 px-4 py-2.5 rounded-lg border border-stone-700/60 self-start md:self-auto">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-right">
              <div className="text-xs text-stone-400">複習熟練進度</div>
              <div className="text-sm font-bold text-white flex items-center space-x-1.5">
                <span>{masteredCount}</span>
                <span className="text-stone-500 font-normal">/</span>
                <span className="text-stone-400 font-normal">{totalQuestions} 題熟練</span>
                <span className="text-xs text-amber-400 font-mono ml-1">
                  ({Math.round((masteredCount / (totalQuestions || 1)) * 100)}%)
                </span>
              </div>
            </div>
            <div className="w-16 bg-stone-700 h-2 rounded-full overflow-hidden hidden sm:block">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(masteredCount / (totalQuestions || 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? "bg-amber-400 text-stone-950 font-bold shadow-sm"
                    : "text-stone-300 hover:text-white hover:bg-stone-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-stone-950" : "text-amber-400"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? "bg-stone-900 text-amber-300"
                        : "bg-stone-800 text-amber-400 border border-amber-400/30"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && (
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-stone-900/20 text-stone-950" : "bg-stone-800 text-stone-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
