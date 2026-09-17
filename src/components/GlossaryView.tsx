import React, { useState } from "react";
import { PACKAGING_TERMINOLOGY, COMPANY_INFO } from "../data/interviewData";
import { BookOpen, Search, Building2, Layers, CheckCircle, FlaskConical, ArrowRight } from "lucide-react";

interface GlossaryViewProps {
  onNavigateToStandards?: () => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onNavigateToStandards }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "測試標準", "瓦楞結構", "緩衝材料", "製程標準", "外商商務"];

  const filteredTerms = PACKAGING_TERMINOLOGY.filter((item) => {
    const matchCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.enTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.abbr && item.abbr.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* ASTM vs ISTA Dedicated Focus Banner */}
      <div className="bg-white border border-stone-200 text-stone-900 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              STANDARDS SPOTLIGHT
            </span>
            <span className="text-xs text-amber-800 font-bold">
              國際標準深度專題
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-stone-900">
            ASTM D4169 與 ISTA 1A / 2A / 3A 全維度核心差異對照
          </h3>
          <p className="text-xs text-stone-600 max-w-2xl">
            完整收錄震動型態（跳箱 vs 頂載隨機 PSD）、72hr 溫濕度調理、動態抗壓、真實失效工程除錯與 60 秒面試口述講稿。
          </p>
        </div>
        {onNavigateToStandards && (
          <button
            onClick={onNavigateToStandards}
            className="shrink-0 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-lg text-xs flex items-center space-x-2 transition-all shadow-xs"
          >
            <FlaskConical className="w-4 h-4" />
            <span>開啟標準對照表</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Company Background Card */}
      <div className="bg-white border border-stone-200 text-stone-900 rounded-xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Building2 className="w-4 h-4 text-amber-600" />
          <span>目標企業情報速查</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 mb-2">
          {COMPANY_INFO.name}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl mb-4">
          {COMPANY_INFO.founded}。{COMPANY_INFO.scale}。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs pt-3 border-t border-stone-100">
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <span className="text-amber-900 font-bold block mb-0.5">GSMA 亞洲營運中心</span>
            <span className="text-stone-700">{COMPANY_INFO.asiaFootprint}</span>
          </div>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <span className="text-amber-900 font-bold block mb-0.5">亞洲年採購總額</span>
            <span className="text-stone-700">{COMPANY_INFO.procurement}</span>
          </div>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <span className="text-amber-900 font-bold block mb-0.5">旗下指標性品牌矩陣</span>
            <span className="text-stone-700">{COMPANY_INFO.coreBrands.join("、")}</span>
          </div>
        </div>
      </div>

      {/* Glossary Search & Filter */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>包裝工程核心術語與外商指標速查</span>
            </h3>
            <p className="text-xs text-stone-500">
              在面試中自然帶出以下國際測試標準與工程指標，能瞬間建立專業權威感：
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋術語、英文或定義..."
              className="w-full text-xs pl-9 pr-3 py-2 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5 border-b border-stone-100 pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-amber-400 text-stone-950 font-bold"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {cat === "all" ? "全部術語" : cat}
            </button>
          ))}
        </div>

        {/* Terminology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((item) => (
            <div
              key={item.term}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-amber-400 transition-all space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-stone-900 text-sm">{item.term}</span>
                  {item.abbr && (
                    <span className="font-mono bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded text-[11px]">
                      {item.abbr}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                  {item.category}
                </span>
              </div>

              <div className="font-mono text-[11px] text-stone-500">{item.enTranslation}</div>

              <p className="text-stone-700 leading-relaxed pt-1 border-t border-stone-200/50">
                {item.definition}
              </p>

              <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/50 text-[11px] text-amber-950 leading-relaxed">
                <strong>Stanley Black & Decker 實務連結：</strong> {item.stanleyRelevance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
