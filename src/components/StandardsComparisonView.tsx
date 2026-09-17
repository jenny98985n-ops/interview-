import React, { useState } from "react";
import {
  STANDARDS_DIMENSIONS,
  STANDARDS_PROFILES,
  FAILURE_DEBUG_CASES,
  INTERVIEW_SCRIPT_ASTM_ISTA,
  DROP_TEST_BENCHMARKS,
  VIBRATION_TEST_BENCHMARKS,
  MODULE_COMPARISON_BENCHMARKS,
  CORE_PHILOSOPHY_COMPARISON,
  REPRESENTATIVE_STANDARDS_COMPARISON,
  StandardProfile
} from "../data/standardsComparisonData";
import {
  FlaskConical,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  FileText,
  Workflow,
  Sparkles,
  Box,
  Compass,
  SlidersHorizontal,
  ChevronRight,
  Zap,
  Activity,
  Gauge,
  Quote
} from "lucide-react";

export const StandardsComparisonView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"matrix" | "benchmarks" | "deepdive" | "debugging" | "interview">("matrix");
  const [selectedStandardId, setSelectedStandardId] = useState<"ista1a" | "ista2a" | "ista3a" | "astm">("ista1a");
  const [selectedDimensionFilter, setSelectedDimensionFilter] = useState<string>("all");
  const [copiedZh, setCopiedZh] = useState(false);
  const [copiedEn, setCopiedEn] = useState(false);

  const handleCopy = (text: string, type: "zh" | "en") => {
    navigator.clipboard.writeText(text);
    if (type === "zh") {
      setCopiedZh(true);
      setTimeout(() => setCopiedZh(false), 2000);
    } else {
      setCopiedEn(true);
      setTimeout(() => setCopiedEn(false), 2000);
    }
  };

  const selectedProfile = STANDARDS_PROFILES.find((p) => p.id === selectedStandardId) || STANDARDS_PROFILES[0];

  const filteredDimensions = STANDARDS_DIMENSIONS.filter((dim) => {
    if (selectedDimensionFilter === "all") return true;
    return dim.importance === selectedDimensionFilter;
  });

  return (
    <div className="space-y-6">
      {/* Hero Header Banner */}
      <div className="bg-stone-900 border border-stone-800 text-white rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-stone-950 text-xs font-black px-2 py-0.5 rounded uppercase tracking-wider">
                PACKAGING TEST STANDARDS
              </span>
              <span className="text-xs text-amber-300 font-medium">
                國際運輸包裝測試標準全維度解構
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
              ASTM 與 ISTA 1A / 2A / 3A 核心差異精析
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
              從「非模擬篩選 (1A)」➔「部分環境模擬 (2A)」➔「單件包裹全真模擬 (3A)」，再到「共識型分銷循環 (ASTM D4169)」，全面掌握外商包裝工程師的核心試驗邏輯、出貨通路選型與測試失敗除錯對策。
            </p>
          </div>

          {/* Quick Jump Buttons for Subtabs */}
          <div className="flex flex-wrap gap-2 pt-2 lg:pt-0">
            <button
              id="subtab-matrix"
              onClick={() => setActiveSubTab("matrix")}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition-all ${
                activeSubTab === "matrix"
                  ? "bg-amber-400 text-stone-950 shadow-sm"
                  : "bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>全維度對比矩陣</span>
            </button>
            <button
              id="subtab-benchmarks"
              onClick={() => setActiveSubTab("benchmarks")}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition-all ${
                activeSubTab === "benchmarks"
                  ? "bg-amber-400 text-stone-950 shadow-sm"
                  : "bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>落下與震動基準數據 (圖資)</span>
            </button>
            <button
              id="subtab-deepdive"
              onClick={() => setActiveSubTab("deepdive")}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition-all ${
                activeSubTab === "deepdive"
                  ? "bg-amber-400 text-stone-950 shadow-sm"
                  : "bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700"
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>四強深度剖析</span>
            </button>
            <button
              id="subtab-debugging"
              onClick={() => setActiveSubTab("debugging")}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition-all ${
                activeSubTab === "debugging"
                  ? "bg-amber-400 text-stone-950 shadow-sm"
                  : "bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>測試失效與結構除錯</span>
            </button>
            <button
              id="subtab-interview"
              onClick={() => setActiveSubTab("interview")}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition-all ${
                activeSubTab === "interview"
                  ? "bg-amber-400 text-stone-950 shadow-sm"
                  : "bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>面試高分口述話術</span>
            </button>
          </div>
        </div>

        {/* 4 Standards Evolution Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-4 border-t border-stone-800">
          <div
            onClick={() => {
              setSelectedStandardId("ista1a");
              setActiveSubTab("deepdive");
            }}
            className="cursor-pointer bg-stone-800/80 hover:bg-stone-800 p-3.5 rounded-xl border border-blue-500/30 transition-all hover:border-blue-400 group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-blue-300 text-base">ISTA 1A</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 border border-blue-700/50 font-medium">
                基礎初篩階
              </span>
            </div>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              固定位移 1" 旋轉跳箱 + 10 次指定面稜角落摔。檢驗包裝有無崩解，無溫濕度要求。
            </p>
            <div className="text-xs text-amber-400 mt-2.5 flex items-center gap-1 group-hover:underline font-medium">
              <span>查看步驟與除錯</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedStandardId("ista2a");
              setActiveSubTab("deepdive");
            }}
            className="cursor-pointer bg-stone-800/80 hover:bg-stone-800 p-3.5 rounded-xl border border-emerald-500/30 transition-all hover:border-emerald-400 group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-emerald-300 text-base">ISTA 2A</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 font-medium">
                海運受潮階
              </span>
            </div>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              疊加 72hr 極端溫濕度循環 + 動態機台抗壓堆疊。專門防範跨洋海運瓦楞受潮塌箱。
            </p>
            <div className="text-xs text-amber-400 mt-2.5 flex items-center gap-1 group-hover:underline font-medium">
              <span>查看步驟與除錯</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedStandardId("ista3a");
              setActiveSubTab("deepdive");
            }}
            className="cursor-pointer bg-stone-800/80 hover:bg-stone-800 p-3.5 rounded-xl border border-amber-500/30 transition-all hover:border-amber-400 group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-amber-300 text-base">ISTA 3A</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-900/60 text-amber-200 border border-amber-700/50 font-medium">
                頂級電商階
              </span>
            </div>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              頂部負載隨機震動 + 17 次複合落摔與障礙物衝擊。模擬 FedEx/UPS 單件快遞自動分揀。
            </p>
            <div className="text-xs text-amber-400 mt-2.5 flex items-center gap-1 group-hover:underline font-medium">
              <span>查看步驟與除錯</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedStandardId("astm");
              setActiveSubTab("deepdive");
            }}
            className="cursor-pointer bg-stone-800/80 hover:bg-stone-800 p-3.5 rounded-xl border border-purple-500/30 transition-all hover:border-purple-400 group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-purple-300 text-base">ASTM D4169</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-700/50 font-medium">
                共識循環階
              </span>
            </div>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              18 種分銷循環 (DC 1~18) + 三級保證水準 (Level I/II/III)。跨國大客戶採購權威標準。
            </p>
            <div className="text-xs text-amber-400 mt-2.5 flex items-center gap-1 group-hover:underline font-medium">
              <span>查看步驟與除錯</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: 全維度對比矩陣 (Side-by-side Matrix) */}
      {activeSubTab === "matrix" && (
        <div className="space-y-6">
          {/* 1. 核心邏輯與哲學對比 + 2. 代表性標準比較 (ISTA 3A vs. ASTM D4169) */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-6">
            {/* Section 1 */}
            <div>
              <div className="flex items-center space-x-2.5 mb-3">
                <span className="bg-amber-400 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                  Core Framework
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  1. 核心邏輯與哲學對比
                </h3>
              </div>

              {/* High Contrast Table */}
              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-stone-100 text-stone-900 border-b border-stone-200 font-bold">
                      <th className="py-3.5 px-4 w-32 sm:w-44 bg-stone-200/60 font-bold text-xs sm:text-sm">比較維度</th>
                      <th className="py-3.5 px-4 w-1/2 border-l border-stone-200 text-amber-950 bg-amber-50/70 font-bold text-xs sm:text-sm">
                        ISTA (國際安全運輸協會)
                      </th>
                      <th className="py-3.5 px-4 w-1/2 border-l border-stone-200 text-purple-950 bg-purple-50/70 font-bold text-xs sm:text-sm">
                        ASTM (美國材料和試驗協會)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-800">
                    {CORE_PHILOSOPHY_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-stone-950 bg-stone-50/70 align-top text-xs sm:text-sm">
                          {row.dimension}
                        </td>
                        <td className="py-3.5 px-4 border-l border-stone-200 leading-relaxed align-top text-xs sm:text-sm text-stone-800">
                          {row.ista}
                        </td>
                        <td className="py-3.5 px-4 border-l border-stone-200 leading-relaxed align-top text-xs sm:text-sm text-stone-800">
                          {row.astm}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2 */}
            <div className="pt-5 border-t border-stone-200 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  {REPRESENTATIVE_STANDARDS_COMPARISON.sectionTitle}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {REPRESENTATIVE_STANDARDS_COMPARISON.intro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* ASTM D4169 */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3 hover:border-stone-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base sm:text-lg text-stone-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                      <span>{REPRESENTATIVE_STANDARDS_COMPARISON.astm.name}</span>
                    </h4>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">
                      {REPRESENTATIVE_STANDARDS_COMPARISON.astm.badge}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    {REPRESENTATIVE_STANDARDS_COMPARISON.astm.desc}
                  </p>
                </div>

                {/* ISTA 3A */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3 hover:border-stone-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base sm:text-lg text-stone-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span>{REPRESENTATIVE_STANDARDS_COMPARISON.ista.name}</span>
                    </h4>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                      {REPRESENTATIVE_STANDARDS_COMPARISON.ista.badge}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    {REPRESENTATIVE_STANDARDS_COMPARISON.ista.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Dimensional Parameter Matrix */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>3. ASTM vs. ISTA 1A / 2A / 3A 全維度核心差異對照表</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  橫跨震動型態、溫濕度環境調理、跌落衝擊、堆疊抗壓與 SBD 實務選型邏輯
                </p>
              </div>

              {/* Filter pills */}
              <div className="flex items-center space-x-1.5 flex-wrap">
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  篩選：
                </span>
                {["all", "關鍵指標", "機械應力", "環境條件", "商業決策"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedDimensionFilter(filter)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                      selectedDimensionFilter === filter
                        ? "bg-amber-400 text-stone-950 font-bold"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {filter === "all" ? "全部維度" : filter}
                  </button>
                ))}
              </div>
            </div>

          {/* Responsive Desktop Table / Mobile Cards */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[780px]">
              <thead>
                <tr className="border-b-2 border-stone-200 bg-stone-50 text-stone-800">
                  <th className="py-3 px-3.5 font-bold w-36 text-xs sm:text-sm">評估維度</th>
                  <th className="py-3 px-3.5 font-bold w-52 text-stone-900 border-l border-stone-100 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>ISTA 1A (完整性初篩)</span>
                    </div>
                  </th>
                  <th className="py-3 px-3.5 font-bold w-56 text-stone-900 border-l border-stone-100 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>ISTA 2A (部分環境模擬)</span>
                    </div>
                  </th>
                  <th className="py-3 px-3.5 font-bold w-60 text-stone-900 border-l border-stone-100 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>ISTA 3A (包裹全真模擬)</span>
                    </div>
                  </th>
                  <th className="py-3 px-3.5 font-bold w-60 text-stone-900 border-l border-stone-100 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span>ASTM D4169 (分銷循環標準)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredDimensions.map((dim) => (
                  <tr key={dim.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-3.5 align-top font-semibold text-stone-900 border-r border-stone-100 bg-stone-50/40">
                      <div className="text-xs sm:text-sm font-bold">{dim.dimensionName}</div>
                      <div className="text-xs text-stone-500 font-mono mt-0.5">
                        {dim.dimensionEn}
                      </div>
                      <span className="inline-block mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                        {dim.importance}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 align-top text-stone-800 border-r border-stone-100 leading-relaxed text-xs sm:text-sm">
                      {dim.ista1a}
                    </td>
                    <td className="py-3.5 px-3.5 align-top text-stone-800 border-r border-stone-100 leading-relaxed text-xs sm:text-sm">
                      {dim.ista2a}
                    </td>
                    <td className="py-3.5 px-3.5 align-top text-stone-900 border-r border-stone-100 leading-relaxed font-medium text-xs sm:text-sm">
                      {dim.ista3a}
                    </td>
                    <td className="py-3.5 px-3.5 align-top text-stone-800 leading-relaxed text-xs sm:text-sm">
                      {dim.astm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SBD Practical Engineering Selection Guide */}
          <div className="bg-white border border-stone-200 border-l-4 border-l-amber-500 p-5 sm:p-6 rounded-r-xl shadow-xs text-sm sm:text-base text-stone-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
              <div className="font-bold flex items-center space-x-2 text-sm sm:text-base text-stone-950">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Stanley Black & Decker 結構包裝工程師實務選型方針：</span>
              </div>
              <button
                onClick={() => setActiveSubTab("benchmarks")}
                className="self-start sm:self-auto px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-lg text-xs flex items-center space-x-1.5 transition-all shadow-xs"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>查看實驗室實測數據 (Micom / ITM)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="leading-relaxed text-stone-800 space-y-1">
              • <strong className="text-stone-950">初期打樣快篩</strong>：使用 <strong>ISTA 1A</strong>，以最低成本與時間驗證自鎖卡扣強度與幾何公差。<br />
              • <strong className="text-stone-950">亞洲 GSMA 跨太平洋海運</strong>：必須通過 <strong>ISTA 2A</strong>，特別把關 72 小時極限高溫高濕後瓦楞箱抗壓下陷量（安全係數建議 ≥ 4.5）。<br />
              • <strong className="text-stone-950">電動工具與電商直發 (Amazon / Home Depot Online)</strong>：必須通過 <strong>ISTA 3A</strong> 或 ISTA 6-Amazon，嚴格防範頂載隨機震動導致的馬達金屬件漆面磨損與外箱破角。<br />
              • <strong className="text-stone-950">全美大型通路投標審查 (The Home Depot, Lowe's)</strong>：依客戶規格提供 <strong>ASTM D4169 (DC-13 / Level II)</strong> 權威數據。
            </p>
          </div>
        </div>
        </div>
      )}

      {/* SUBTAB 1.5: 實驗室實測基準數據 (Lab Benchmark Data - Updated from Images) */}
      {activeSubTab === "benchmarks" && (
        <div className="space-y-6">
          {/* Top Info Banner */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-amber-400 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                    LAB BENCHMARK DATA
                  </span>
                  <span className="text-xs sm:text-sm text-stone-500 font-medium">
                    來源出處：Micom Laboratories、ITM-LAB、Scribd 權威實測數據彙整
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-1.5">
                  ISTA 1A / 2A / 3A 落下衝擊與隨機震動基準數據精確比對
                </h3>
              </div>
            </div>

            {/* ISTA Packaging Standards Module Comparison Table (From Image 2) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>ISTA 包裝測試標準對比 (模組化總覽)</span>
                </span>
                <span className="text-xs text-stone-500 font-medium">標準檢驗模組對照</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px] border border-stone-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-stone-50 text-stone-800 border-b border-stone-200 font-bold">
                      <th className="py-3 px-3.5 w-32">測試模組</th>
                      <th className="py-3 px-3.5 w-48 text-stone-900 border-l border-stone-200">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          <span>ISTA 1A (基礎過濾)</span>
                        </div>
                      </th>
                      <th className="py-3 px-3.5 w-52 text-stone-900 border-l border-stone-200">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>ISTA 2A (部分環境)</span>
                        </div>
                      </th>
                      <th className="py-3 px-3.5 w-60 text-stone-900 border-l border-stone-200">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          <span>ISTA 3A (全面模擬)</span>
                        </div>
                      </th>
                      <th className="py-3 px-3.5 text-stone-700 border-l border-stone-200">當前標準要求細節</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr className="hover:bg-stone-50/70">
                      <td className="py-3.5 px-3.5 font-bold text-stone-900 bg-stone-50/40">
                        跌落 (Drop)
                      </td>
                      <td className="py-3.5 px-3.5 text-stone-800 font-medium border-l border-stone-100 leading-relaxed">
                        ▶ 基本衝擊：固定高度跌落 10 次
                      </td>
                      <td className="py-3.5 px-3.5 text-stone-800 border-l border-stone-100 leading-relaxed">
                        溫濕度預處理 + 重力調配跌落
                      </td>
                      <td className="py-3.5 px-3.5 text-stone-900 font-medium border-l border-stone-100 leading-relaxed">
                        隨機自由跌落 + 邊角傾倒 + 面衝擊
                      </td>
                      <td className="py-3.5 px-3.5 text-stone-700 border-l border-stone-100 leading-relaxed">
                        強制項目 (基礎強度)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 1: 落下測試 (Drop Test) 基準數據 (From Image 1) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-bold text-stone-900">
                  1. 落下測試 (Drop Test) 基準數據
                </span>
                <span className="text-xs bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full border border-stone-200 font-mono">
                  Micom Laboratories
                </span>
                <span className="text-xs bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full border border-stone-200 font-mono">
                  ITM-LAB
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              落下高度會依據包裹的「<strong>總重量</strong>」遞減。對於 10 公斤以下的輕型電子產品，ISTA 1A 與 2A 採用較為單純的固定高度測試；而 3A 則模擬真實搬運，會在一組序列中交替使用不同高度。
            </p>

            {/* Drop Benchmark Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[680px] border border-stone-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-800 font-bold">
                    <th className="py-3 px-3.5 w-36">包裝總重量</th>
                    <th className="py-3 px-3.5 text-stone-900 border-l border-stone-200 w-48">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span>ISTA 1A (基礎)</span>
                      </div>
                    </th>
                    <th className="py-3 px-3.5 text-stone-900 border-l border-stone-200 w-48">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>ISTA 2A (進階)</span>
                      </div>
                    </th>
                    <th className="py-3 px-3.5 text-stone-900 border-l border-stone-200">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>ISTA 3A (高度模擬 - 標準包裝件)</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr className="hover:bg-stone-50/70">
                    <td className="py-3.5 px-3.5 font-bold text-stone-900 bg-stone-50/30">0 - 10 公斤</td>
                    <td className="py-3.5 px-3.5 text-stone-800 font-mono border-l border-stone-100">760 mm</td>
                    <td className="py-3.5 px-3.5 text-stone-800 font-mono border-l border-stone-100">970 mm</td>
                    <td className="py-3.5 px-3.5 text-stone-900 border-l border-stone-100 font-medium">
                      大多數落下為 <span className="font-bold text-stone-900 font-mono">460 mm</span>
                      <span className="block text-xs text-stone-600 mt-1">
                        (特定面會進行 <span className="font-bold text-rose-700 font-mono">910 mm</span> 的極端落下)
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50/70">
                    <td className="py-3.5 px-3.5 font-bold text-stone-900 bg-stone-50/30">10 - 19 公斤</td>
                    <td className="py-3.5 px-3.5 text-stone-800 font-mono border-l border-stone-100">610 mm</td>
                    <td className="py-3.5 px-3.5 text-stone-800 font-mono border-l border-stone-100">810 mm</td>
                    <td className="py-3.5 px-3.5 text-stone-800 border-l border-stone-100">
                      同上，依序列調整。
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50/70 bg-stone-50/50">
                    <td className="py-3.5 px-3.5 font-bold text-stone-900">總跌落次數</td>
                    <td className="py-3.5 px-3.5 font-semibold text-stone-900 border-l border-stone-100">
                      10 次 <span className="text-xs font-normal text-stone-600">(1角, 3稜, 6面)</span>
                    </td>
                    <td className="py-3.5 px-3.5 font-semibold text-stone-900 border-l border-stone-100">
                      10 次
                    </td>
                    <td className="py-3.5 px-3.5 font-bold text-stone-950 border-l border-stone-100">
                      17 次 <span className="text-xs font-normal text-stone-600">(分為震動前與震動後兩階段)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Structural Design Insight Callout (From Image 1) */}
            <div className="border-l-4 border-stone-800 bg-stone-50/80 border border-stone-200 p-5 rounded-r-xl space-y-1.5">
              <div className="font-bold text-stone-900 flex items-center space-x-1.5 text-sm sm:text-base">
                <Quote className="w-4 h-4 text-stone-600" />
                <span>結構設計洞察 (Structural Design Insight)：</span>
              </div>
              <p className="text-stone-800 text-sm sm:text-base leading-relaxed italic pl-1">
                「雖然 1A/2A 的單次要求高度較高（<strong>760~970 mm</strong>），但 3A 高達 <strong>17 次</strong> 的反覆衝擊（<strong>460 mm</strong>）更容易導致瓦楞紙箱的『<strong>疲勞破損</strong>』。緩衝材（如 EPE 或紙塑）的設計不能只看單次最大抗衝擊，還需評估多次形變後的恢復率。」
              </p>
            </div>
          </div>

          {/* Section 2: 震動測試 (Vibration Test) 基準數據 (From Image 1) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-bold text-stone-900">
                  2. 震動測試 (Vibration Test) 基準數據
                </span>
                <span className="text-xs bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full border border-stone-200 font-mono">
                  Scribd
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              震動測試是導致內部卡榫斷裂或表面磨損的主因。1A 使用固定位移，而 3A 則採用高頻率的「<strong>隨機震動</strong>」，完全還原貨車與飛機的引擎及路面顛簸。
            </p>

            {/* Vibration Benchmark Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[680px] border border-stone-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-800 font-bold">
                    <th className="py-3 px-3.5 w-40">震動參數</th>
                    <th className="py-3 px-3.5 text-stone-900 border-l border-stone-200 w-52">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span>ISTA 1A</span>
                      </div>
                    </th>
                    <th className="py-3 px-3.5 text-stone-900 border-l border-stone-200">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>ISTA 3A (包含 2A 的隨機震動選項)</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr className="hover:bg-stone-50/70">
                    <td className="py-3.5 px-3.5 font-bold text-stone-900 bg-stone-50/30">震動模式</td>
                    <td className="py-3.5 px-3.5 text-stone-800 border-l border-stone-100">
                      固定位移 (Fixed Displacement)
                    </td>
                    <td className="py-3.5 px-3.5 text-stone-900 border-l border-stone-100 font-semibold">
                      隨機震動 (Random Vibration)
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50/70">
                    <td className="py-3.5 px-3.5 font-bold text-stone-900 bg-stone-50/30">位移幅度</td>
                    <td className="py-3.5 px-3.5 text-stone-800 border-l border-stone-100 font-mono">
                      25.4 mm (1 英寸) 峰對峰值
                    </td>
                    <td className="py-3.5 px-3.5 text-stone-800 border-l border-stone-100">
                      依據 PSD 功率譜密度曲線調整
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50/70">
                    <td className="py-3.5 px-3.5 font-bold text-stone-900 bg-stone-50/30">頻率範圍</td>
                    <td className="py-3.5 px-3.5 text-stone-800 border-l border-stone-100 font-mono">
                      約 2 ~ 5 Hz (低頻)
                    </td>
                    <td className="py-3.5 px-3.5 text-stone-900 border-l border-stone-100 font-mono font-semibold">
                      1 ~ 200 Hz (廣頻)
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50/70">
                    <td className="py-3.5 px-3.5 font-bold text-stone-900 bg-stone-50/30">震動強度</td>
                    <td className="py-3.5 px-3.5 text-stone-800 border-l border-stone-100 font-mono">
                      總計 14,200 次震動衝擊
                    </td>
                    <td className="py-3.5 px-3.5 text-stone-900 border-l border-stone-100 space-y-1">
                      <div>陸運配置：<span className="font-mono font-bold text-stone-900">0.53 Grms</span></div>
                      <div>空運配置：<span className="font-mono font-bold text-stone-900">1.05 Grms</span></div>
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50/70 bg-stone-50/50">
                    <td className="py-3.5 px-3.5 font-bold text-stone-900">頂部載荷</td>
                    <td className="py-3.5 px-3.5 text-stone-600 border-l border-stone-100">
                      無
                    </td>
                    <td className="py-3.5 px-3.5 font-bold text-stone-950 border-l border-stone-100">
                      有 <span className="text-xs font-normal text-stone-600">(模擬震動時上方疊加其他貨物)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Stanley Black & Decker Packaging Engineering Application Note */}
            <div className="bg-white border border-stone-200 border-l-4 border-l-amber-500 p-5 sm:p-6 rounded-xl shadow-xs text-sm sm:text-base text-stone-800 space-y-2.5">
              <div className="font-bold flex items-center space-x-2 text-base text-stone-950">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Stanley Black & Decker 實務面試關鍵亮點：</span>
              </div>
              <p className="leading-relaxed text-stone-800">
                若面試官問：<strong className="text-stone-950">「1A 跌落高度是 760mm，2A 甚至高達 970mm，而 3A 只有 460mm，這是不是代表 1A/2A 的跌落測試比 3A 更難通過？」</strong><br />
                <strong className="text-stone-950">滿分答法：</strong>「這正是典型的經驗陷阱！1A 與 2A 雖然單次高度高（760~970mm），但只摔 10 次；而 3A 高達 <strong>17 次</strong> 複合反覆衝擊（分為震動前、震動後兩階段），並包含特定面的 <strong>910mm 極端落下</strong>。五金重件在 17 次反覆衝擊下，瓦楞紙板受剪力與壓潰會產生<strong>疲勞累積效應</strong>，使內襯卡榫斷裂或紙托粉化；加上 3A 是帶有<strong>頂載 (Top Load)</strong> 的 <strong>1~200 Hz 廣頻隨機震動（陸運 0.53 Grms / 空運 1.05 Grms）</strong>，因此 3A 的綜合破壞力與真實物流嚴苛度遠高於 1A！」
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: 四強深度剖析 (Deep-Dive Cards) */}
      {activeSubTab === "deepdive" && (
        <div className="space-y-5">
          {/* Selector Tabs for 4 Standards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {STANDARDS_PROFILES.map((profile) => (
              <button
                key={profile.id}
                onClick={() => setSelectedStandardId(profile.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedStandardId === profile.id
                    ? "bg-white border-amber-400 shadow-sm ring-2 ring-amber-400/30"
                    : "bg-stone-50 border-stone-200 hover:bg-white text-stone-600"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm sm:text-base text-stone-900">{profile.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${profile.badgeColor}`}>
                    {profile.level.split(" ")[0]}
                  </span>
                </div>
                <div className="text-xs text-stone-500 line-clamp-1 font-medium">{profile.title}</div>
              </button>
            ))}
          </div>

          {/* Detailed Profile Container */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs sm:text-sm font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    {selectedProfile.code}
                  </span>
                  <span className={`text-xs sm:text-sm px-2.5 py-0.5 rounded-full font-semibold border ${selectedProfile.badgeColor}`}>
                    {selectedProfile.level}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1.5">
                  {selectedProfile.name} — {selectedProfile.title}
                </h3>
              </div>
            </div>

            {/* Philosophy Box */}
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 text-sm sm:text-base text-stone-800 leading-relaxed space-y-1.5">
              <span className="font-bold text-stone-950 block text-sm sm:text-base">核心測試哲學 (Core Philosophy)：</span>
              <p>{selectedProfile.philosophy}</p>
            </div>

            {/* Strengths & Limitations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 text-sm sm:text-base space-y-2.5">
                <div className="font-bold text-emerald-950 flex items-center space-x-2 text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>核心工程優勢 (Key Strengths)</span>
                </div>
                <ul className="space-y-2 text-stone-800">
                  {selectedProfile.coreStrengths.map((str, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50 rounded-xl p-5 border border-rose-200 text-sm sm:text-base space-y-2.5">
                <div className="font-bold text-rose-950 flex items-center space-x-2 text-base">
                  <AlertTriangle className="w-5 h-5 text-rose-700" />
                  <span>盲點與局限性 (Limitations)</span>
                </div>
                <ul className="space-y-2 text-stone-800">
                  {selectedProfile.limitations.map((lim, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-rose-700 font-bold">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step by step Test Sequence */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Workflow className="w-4 h-4 text-amber-500" />
                <span>標準測試作業流程 (Test Sequence & Parameters)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {selectedProfile.testSequence.map((seq) => (
                  <div key={seq.step} className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-800 bg-amber-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                        {seq.step}
                      </span>
                      <span className="font-mono text-xs text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {seq.parameters}
                      </span>
                    </div>
                    <div className="font-bold text-stone-900 text-sm">{seq.name}</div>
                    <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">{seq.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SBD Use Cases & Debugging */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 text-sm sm:text-base space-y-2.5">
                <span className="font-bold text-amber-950 flex items-center space-x-2 text-base">
                  <Box className="w-5 h-5 text-amber-600" />
                  <span>Stanley Black & Decker 適用情境</span>
                </span>
                <ul className="space-y-1.5 text-stone-800">
                  {selectedProfile.sbdUseCases.map((uc, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 text-sm sm:text-base space-y-2.5">
                <span className="font-bold text-stone-900 flex items-center space-x-2 text-base">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  <span>常見測試失效風險與結構解法</span>
                </span>
                <div className="text-rose-800 text-xs sm:text-sm leading-relaxed">
                  <strong>失效現象：</strong> {selectedProfile.failureRisk}
                </div>
                <div className="text-stone-800 text-xs sm:text-sm leading-relaxed">
                  <strong>結構對策：</strong> {selectedProfile.debugStrategy}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: 常見測試失效與結構除錯 (Failure Modes & Fixes) */}
      {activeSubTab === "debugging" && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>ASTM 與 ISTA 測試失效實例除錯手冊 (Engineering Debugging)</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              外商面試的核心考點：「測試失敗時，工程師如何從材料特性、結構幾何與製程公差切入快速排除問題？」
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAILURE_DEBUG_CASES.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl border border-stone-200 bg-stone-50/40 hover:bg-white hover:border-amber-400 transition-all space-y-3.5 text-xs sm:text-sm"
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded text-xs">
                    {item.standard}
                  </span>
                  <span className="text-stone-500 text-xs font-medium">Failure Case #{idx + 1}</span>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 text-base">{item.failureMode}</h4>
                  <div className="text-xs text-stone-500 font-mono mt-0.5">{item.failureEn}</div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className="bg-rose-50 p-3.5 rounded-lg border border-rose-200 text-rose-950 leading-relaxed text-sm">
                    <strong className="text-rose-950 font-bold block mb-1">根因分析 (Root Cause)：</strong>
                    <p className="text-stone-800">{item.rootCause}</p>
                  </div>

                  <div className="bg-emerald-50 p-3.5 rounded-lg border border-emerald-200 text-emerald-950 leading-relaxed text-sm">
                    <strong className="text-emerald-950 font-bold block mb-1">工程改善對策 (Engineering Fix)：</strong>
                    <p className="text-stone-800">{item.engineeringFix}</p>
                  </div>

                  <div className="bg-amber-50 p-3.5 rounded-lg border border-amber-200 text-amber-950 leading-relaxed text-sm">
                    <strong className="text-amber-950 font-bold block mb-1">防呆預防設計 (Preventive SOP)：</strong>
                    <p className="text-stone-800">{item.preventiveDesign}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: 面試高分口述話術 (Interview Pitch) */}
      {activeSubTab === "interview" && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>面試必背：ASTM 與 ISTA 差異高分答題範本 (中英雙語對照)</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                在 60~90 秒內精準展現標準層級理解、SBD 通路選型經驗與具體除錯案例
              </p>
            </div>
          </div>

          {/* Chinese Pitch Card */}
          <div className="bg-stone-50/80 rounded-xl p-5 sm:p-6 border border-stone-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="bg-stone-900 text-amber-400 font-bold px-2.5 py-0.5 rounded text-xs">
                  中文口述擬答 (60 秒 STAR 模板)
                </span>
                <span className="text-xs sm:text-sm text-stone-500 font-medium">結構化應對技術深問</span>
              </div>
              <button
                onClick={() => handleCopy(INTERVIEW_SCRIPT_ASTM_ISTA.speechScriptZh, "zh")}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-semibold text-stone-700 hover:border-amber-400 transition-colors shadow-xs"
              >
                {copiedZh ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">已複製中文稿</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-500" />
                    <span>複製中文腳本</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200 text-sm sm:text-base text-stone-800 leading-relaxed whitespace-pre-line font-sans shadow-xs">
              {INTERVIEW_SCRIPT_ASTM_ISTA.speechScriptZh}
            </div>
          </div>

          {/* English Pitch Card */}
          <div className="bg-stone-900 text-white rounded-xl p-5 sm:p-6 border border-stone-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="bg-amber-400 text-stone-950 font-bold px-2.5 py-0.5 rounded text-xs uppercase tracking-wider">
                  English Spoken Pitch
                </span>
                <span className="text-xs sm:text-sm text-stone-400">Fluently address foreign packaging directors</span>
              </div>
              <button
                onClick={() => handleCopy(INTERVIEW_SCRIPT_ASTM_ISTA.speechScriptEn, "en")}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-xs font-semibold text-stone-300 hover:text-white hover:border-amber-400 transition-colors"
              >
                {copiedEn ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied English</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-400" />
                    <span>Copy English Pitch</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 text-sm sm:text-base text-stone-200 leading-relaxed whitespace-pre-line font-sans">
              {INTERVIEW_SCRIPT_ASTM_ISTA.speechScriptEn}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
