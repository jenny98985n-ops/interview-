import React, { useState } from "react";
import {
  GraduationCap,
  Award,
  Box,
  Layers,
  Sparkles,
  Target,
  Rocket,
  Compass,
  Scale,
  Users,
  Flame,
  CheckCircle2,
  Briefcase,
  Check,
  Building2,
  Cpu,
  FileSpreadsheet,
  Gamepad2,
  ChefHat,
  Trophy,
  Factory,
  Globe2,
  HeartHandshake,
  UserCheck
} from "lucide-react";

type ProfileTab = "background" | "experience" | "career_goals" | "design_beliefs";

export const AmandaProfilePortfolio: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<ProfileTab>("background");

  const tabList = [
    {
      id: "background" as ProfileTab,
      label: "設計背景與專業",
      en: "Background & Expertise",
      icon: GraduationCap,
    },
    {
      id: "experience" as ProfileTab,
      label: "開發實務經驗",
      en: "Development Experience",
      icon: Briefcase,
    },
    {
      id: "career_goals" as ProfileTab,
      label: "職涯規劃目標",
      en: "Career Goals",
      icon: Target,
    },
    {
      id: "design_beliefs" as ProfileTab,
      label: "核心設計理念",
      en: "Design Beliefs",
      icon: Compass,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-7 border border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-widest mb-1.5">
            <span className="w-6 h-0.5 bg-amber-400 inline-block" />
            <span>PROFILE & PORTFOLIO SPECIFICATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>設計美學</span>
            <span className="text-amber-400 text-xl font-light">×</span>
            <span>量產實務</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
            國立臺灣科技大學工設背景、6 年產品與包裝實務經歷、25 件國際音訊包裝提案、HyperX 電競耳機量產驗證與金點設計獎得獎落地。
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-stone-800/80 px-3.5 py-2 rounded-xl border border-stone-700/80 text-xs text-stone-300">
          <Award className="w-4 h-4 text-amber-400" />
          <span>結構包裝工程師 — Amanda Lai 候選人手冊</span>
        </div>
      </div>

      {/* Main Split Grid (Sidebar Tabs on Left, Content Cards on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation & Profile Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200/90 p-3 sm:p-4 shadow-xs space-y-2">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-3 pt-2 pb-1">
              — PROFILE CATEGORIES —
            </div>

            {tabList.map((tab) => {
              const isSelected = activeSubTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between group ${
                    isSelected
                      ? "bg-[#8c7355] text-white shadow-md font-medium"
                      : "bg-white hover:bg-stone-50 text-stone-700 border border-stone-200/70"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-stone-100 text-stone-600 group-hover:bg-stone-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isSelected ? "text-white" : "text-stone-900"}`}>
                        {tab.label}
                      </div>
                      <div className={`text-[11px] ${isSelected ? "text-stone-200" : "text-stone-400 font-mono"}`}>
                        {tab.en}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-200 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Amanda Lai Avatar / Identity Card */}
          <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 rounded-2xl p-5 text-white shadow-sm border border-stone-800 relative overflow-hidden">
            {/* Subtle decorative background ring */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-amber-500/10 pointer-events-none blur-xl" />
            
            <div className="relative z-10 flex items-center space-x-4">
              {/* Stylized Monochrome Avatar representation */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-stone-700/80 border-2 border-stone-600 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-800 opacity-60" />
                <span className="text-xl font-black text-amber-300 tracking-wider">AL</span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Amanda Lai</h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">Structural Packaging Engineer</p>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-stone-300">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>臺科大工設碩畢 • 6 年量產經驗</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-700/60 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-stone-800/60 p-2 rounded-lg border border-stone-700/40">
                <div className="text-amber-400 font-bold font-mono text-sm">25+ 件</div>
                <div className="text-stone-400 text-[10px]">音訊包裝提案</div>
              </div>
              <div className="bg-stone-800/60 p-2 rounded-lg border border-stone-700/40">
                <div className="text-emerald-400 font-bold font-mono text-sm">~10%</div>
                <div className="text-stone-400 text-[10px]">RFQ 包材節省</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Panel (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* TAB 1: 設計背景與專業 */}
          {activeSubTab === "background" && (
            <div className="space-y-5">
              {/* Card 1: 設計背景 × 設計流程開發經驗 */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-5">
                <div className="flex items-start space-x-3.5 pb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                      設計背景 × 設計流程開發經驗
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#967d5b] font-semibold mt-0.5">
                      DESIGN BACKGROUND & FULL DEVELOPMENT EXPERIENCE
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm leading-relaxed">
                  <p className="text-stone-900 font-medium">
                    畢業於 <span className="font-bold underline decoration-amber-500/50 decoration-2">國立臺灣科技大學 工業設計系</span>，擁有 <span className="font-bold">6 年產品與包裝設計實務經驗</span>，熟悉從外觀設計、結構開發到量產製程的完整開發流程。
                  </p>
                  <p className="text-xs sm:text-[13px] text-stone-500 font-normal leading-relaxed">
                    I graduated from <span className="font-semibold text-stone-700">National Taiwan University of Science and Technology</span> with a degree in <span className="font-semibold text-stone-700">Industrial Design</span>. With 6 years of experience in product and packaging design, I'm familiar with the full development process—from early concept and structure planning to mass production.
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-4 space-y-2 text-sm leading-relaxed">
                  <p className="text-stone-900 font-medium">
                    擅長品牌前期市場調研與定位分析，能根據產品需求進行 2D／3D 設計規劃，執行草模驗證、建模與工程圖繪製，並具備「<span className="font-bold text-stone-950">依照預算與成本條件調整設計策略的靈活應變能力</span>」。
                  </p>
                  <p className="text-xs sm:text-[13px] text-stone-500 font-normal leading-relaxed">
                    I focus on brand research, positioning, and translating product needs into design solutions through 2D/3D design, prototyping, 3D modeling, and engineering drawings. I <span className="font-semibold text-stone-700">adapt design strategies based on cost and budget</span>.
                  </p>
                </div>
              </div>

              {/* Card 2: 包裝設計專業深化 */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-4">
                <div className="flex items-start space-x-3.5 pb-1">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                      包裝設計專業深化
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#967d5b] font-semibold mt-0.5">
                      PACKAGING DESIGN EXPERTISE
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm leading-relaxed">
                  <p className="text-stone-900 font-medium">
                    現任職於久鼎金屬實業股份有限公司，負責車載具及相關零件的包裝設計與開發，持續強化「<span className="font-bold text-stone-950">環保包裝結構設計、跨部門專案執行能力及開發實務經驗</span>」。
                  </p>
                  <div className="space-y-1 text-xs sm:text-[13px] text-stone-500 font-normal leading-relaxed">
                    <p>
                      Currently, I work at Merry Electronics Co., Ltd., designing packaging for international electronics brands, including TWS earbuds, gaming headsets, and soundbars.
                    </p>
                    <p>
                      I focus on <span className="font-semibold text-stone-700">sustainable packaging, cross-functional teamwork, and aligning design with manufacturing</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 開發實務經驗 */}
          {activeSubTab === "experience" && (
            <div className="space-y-5">
              {/* Card 1: 包裝設計領域 */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-6">
                <div className="flex items-start space-x-3.5 border-b border-stone-100 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                      包裝設計領域
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#967d5b] font-semibold mt-0.5">
                      PACKAGING DESIGN MASTERY
                    </p>
                  </div>
                </div>

                <div className="space-y-5 divide-y divide-stone-100">
                  {/* Item 1 */}
                  <div className="pt-2 first:pt-0 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <h4 className="text-sm font-bold text-stone-900">
                        國際品牌 TWS／HDT／Soundbar 包裝設計提案 (共25件)
                      </h4>
                    </div>
                    <div className="text-[11px] font-mono text-[#967d5b] uppercase font-semibold pl-6">
                      PACKAGING PROPOSALS FOR INTERNATIONAL BRANDS (25 PROJECTS)
                    </div>
                    <div className="pl-6 space-y-1.5 text-xs sm:text-sm">
                      <p className="text-stone-800 leading-relaxed">
                        根據產品定位提出多元價位（低／中／高）包裝設計方案，滿足不同市場需求與品牌策略，<span className="font-bold text-stone-950">接案達成率 40%</span>。
                      </p>
                      <p className="text-stone-800 leading-relaxed">
                        在消費性電子產品 RFQ 階段，主導包裝結構設計、2D 工程圖繪製與初步成本分析，成功協助研發單位達成約 <span className="font-bold text-stone-950">10% 的包材成本節省</span>。
                      </p>
                      <div className="text-xs text-stone-500 pt-1 space-y-1 leading-relaxed">
                        <p>
                          Formulated packaging proposals for Tier-1 international brand audio products (TWS, Headsets, Soundbars). Engineered segmented packaging architecture across multiple price tiers, achieving a <span className="font-semibold text-stone-700">40% project acquisition success rate</span>.
                        </p>
                        <p>
                          Spearheaded structural packaging engineering, 2D drafting, and preliminary cost analysis during the RFQ stage, delivering an <span className="font-semibold text-stone-700">approx. 10% packaging material cost reduction</span> for the engineering division.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <h4 className="text-sm font-bold text-stone-900">
                        建立包裝設計資料庫以及市調資料表 (共6件)
                      </h4>
                    </div>
                    <div className="text-[11px] font-mono text-[#967d5b] uppercase font-semibold pl-6">
                      PACKAGING DESIGN DATABASE & MARKET RESEARCH (6 DATASETS)
                    </div>
                    <div className="pl-6 space-y-1.5 text-xs sm:text-sm">
                      <p className="text-stone-800 leading-relaxed">
                        彙整 TWS、HDT、Soundbar 紙卡內襯結構規格，形成模組化資料庫，改善專案提案效率，精準聚焦市場需求。
                      </p>
                      <p className="text-xs text-stone-500 pt-1 leading-relaxed">
                        Standardized and modularized paper insert structures across TWS, headsets, and soundbars into a comprehensive design database, significantly boosting proposal turnaround speed and pinpoint market calibration.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <h4 className="text-sm font-bold text-stone-900">
                        參與 HDT 電競耳機開發專案 (共2件)
                      </h4>
                    </div>
                    <div className="text-[11px] font-mono text-[#967d5b] uppercase font-semibold pl-6">
                      GAMING HEADSET DEVELOPMENT PROJECTS (2 MODELS)
                    </div>
                    <div className="pl-6 space-y-1.5 text-xs sm:text-sm">
                      <p className="text-stone-800 leading-relaxed">
                        實際參與兩款 HyperX 電競耳機機型開發，累積從結構設計、打樣修正到量產導入的完整開發經驗。
                      </p>
                      <p className="text-xs text-stone-500 pt-1 leading-relaxed">
                        Actively co-developed two HyperX flagship gaming headsets, acquiring comprehensive hands-on mastery spanning structural modeling, prototype validation, and volume production rollout.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: 產品設計與跨部門協作 */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-6">
                <div className="flex items-start space-x-3.5 border-b border-stone-100 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                      產品設計與跨部門協作
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#967d5b] font-semibold mt-0.5">
                      PRODUCT DESIGN & CROSS-FUNCTIONAL SYNERGY
                    </p>
                  </div>
                </div>

                <div className="space-y-5 divide-y divide-stone-100">
                  {/* Item 1 */}
                  <div className="pt-2 first:pt-0 space-y-2">
                    <div className="flex items-center space-x-2">
                      <ChefHat className="w-4 h-4 text-amber-700 shrink-0" />
                      <h4 className="text-sm font-bold text-stone-900">主導廚電產品開發</h4>
                    </div>
                    <div className="pl-6 space-y-1 text-xs sm:text-sm">
                      <p className="text-stone-800 leading-relaxed">
                        主導易清系列檯面爐（G2522AG、G2623AG）與近吸式油煙機（R7610、R7650）完整開發流程。
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Led full-cycle development of easy-clean gas cooktops (G2522AG, G2623AG) and incline range hoods (R7610, R7650).
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
                      <h4 className="text-sm font-bold text-stone-900">獲獎與產品落地</h4>
                    </div>
                    <div className="pl-6 space-y-1 text-xs sm:text-sm">
                      <p className="text-stone-800 leading-relaxed">
                        親自承辦金點設計競賽提案並獲得 2 件入選（R3750B、P0233／235）；協助外觀與結構開發並導入量產流程，成功落地產品。
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Won Golden Pin Design Award selections for 2 projects (R3750B, P0233/235); coordinated industrial styling and engineering to ensure successful commercialization.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Factory className="w-4 h-4 text-stone-600 shrink-0" />
                      <h4 className="text-sm font-bold text-stone-900">供應商協作能力</h4>
                    </div>
                    <div className="pl-6 space-y-1 text-xs sm:text-sm">
                      <p className="text-stone-800 leading-relaxed">
                        能與供應商與工廠密切協作，確保設計順利導入量產並維持品質穩定。
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Collaborated seamlessly with tooling suppliers and assembly lines, guaranteeing flawless tooling handover and robust quality consistency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 職涯規劃目標 */}
          {activeSubTab === "career_goals" && (
            <div className="space-y-5">
              {/* Card 1: 短期目標 */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-5">
                <div className="flex items-start space-x-3.5 border-b border-stone-100 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                      短期目標
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#967d5b] font-semibold mt-0.5">
                      SHORT-TERM STRATEGIC GOALS
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Goal 1 */}
                  <div className="flex items-start space-x-3">
                    <span className="text-base">🌱</span>
                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 leading-relaxed">
                        深入 ESG 永續議題，探索各類紙材、布料等 CMF 特性與加工技術，建立應用知識庫，並與供應商合作開發環保材質。
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Deep-dive into ESG sustainability, exploring CMF characteristics and processing techniques of paper and fabrics to build knowledge bases and co-develop eco-friendly materials with suppliers.
                      </p>
                    </div>
                  </div>

                  {/* Goal 2 */}
                  <div className="flex items-start space-x-3 pt-2 border-t border-stone-50">
                    <span className="text-base">📦</span>
                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 leading-relaxed">
                        強化紙材結構設計能力，目標能提出具創新性的設計專利。
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Elevate paper structural engineering, targeting the filing and grant of innovative structural design patents.
                      </p>
                    </div>
                  </div>

                  {/* Goal 3 */}
                  <div className="flex items-start space-x-3 pt-2 border-t border-stone-50">
                    <span className="text-base">🧮</span>
                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 leading-relaxed">
                        培養紙材成本評估能力，根據需求提出兼顧保護性與成本效益的結構優化方案。
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Cultivate rigorous packaging cost evaluation to formulate optimized structural designs that seamlessly balance superior protection with high cost-efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: 中長期目標 */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-5">
                <div className="flex items-start space-x-3.5 border-b border-stone-100 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                      中長期目標
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#967d5b] font-semibold mt-0.5">
                      MID- TO LONG-TERM VISION
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Goal 1 */}
                  <div className="flex items-start space-x-3">
                    <span className="text-base">🌐</span>
                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 leading-relaxed">
                        累積跨國與跨部門合作經驗，強化英文聽說讀寫的能力以應對全球化的工作需求。
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Amplify multinational and cross-departmental collaboration, continually advancing professional English fluency to thrive in global organizations.
                      </p>
                    </div>
                  </div>

                  {/* Goal 2 */}
                  <div className="flex items-start space-x-3 pt-2 border-t border-stone-50">
                    <span className="text-base">🛠️</span>
                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 leading-relaxed">
                        持續提升設計落地與製程協作能力，累積更多實戰開發經驗。
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Continually advance design realization and manufacturing execution, deepening hands-on hardware development expertise.
                      </p>
                    </div>
                  </div>

                  {/* Goal 3 */}
                  <div className="flex items-start space-x-3 pt-2 border-t border-stone-50">
                    <span className="text-base">📈</span>
                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 leading-relaxed">
                        建立包裝設計與市場趨勢的連結敏感度，結合行銷視角強化整合能力，朝向具策略思維的設計開發整合型人才邁進。
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Bridge packaging innovation with commercial market trends and marketing insights, advancing into an integrative design strategist with high business impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 核心設計理念 (2x2 Grid) */}
          {activeSubTab === "design_beliefs" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Card 1: 兼具感性與理性 */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">兼具感性與理性</h3>
                    <p className="text-[11px] font-mono text-[#967d5b] uppercase font-semibold mt-0.5">
                      BALANCE EMOTION & LOGIC
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                    設計不僅是創造視覺與情感價值，更必須考量製程可行性、技術限制、成本控制與品質穩定性。
                  </p>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed pt-2 border-t border-stone-100">
                  Design must deliver emotional resonance while strictly honoring manufacturing feasibility, cost parameters, and production stability.
                </p>
              </div>

              {/* Card 2: 服務於產品與使用者 */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">服務於產品與使用者</h3>
                    <p className="text-[11px] font-mono text-[#967d5b] uppercase font-semibold mt-0.5">
                      FORM FOLLOWS FUNCTION
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                    我重視產品本質，關注設計如何實際提升使用者的便利性與品牌價值，讓設計發揮功能性與影響力。
                  </p>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed pt-2 border-t border-stone-100">
                  Rooted in product essence, ensuring design genuinely enhances user convenience and delivers enduring brand value and tangible impact.
                </p>
              </div>

              {/* Card 3: 重視跨部門協作效率 */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">重視跨部門協作效率</h3>
                    <p className="text-[11px] font-mono text-[#967d5b] uppercase font-semibold mt-0.5">
                      TEAMWORK & SYNERGY
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                    良好的設計來自良好的協作，我樂於與不同角色協同合作，透過積極溝通整合各方需求與資源。
                  </p>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed pt-2 border-t border-stone-100">
                  Superior designs originate from seamless collaboration, uniting diverse stakeholders through proactive communication and resource integration.
                </p>
              </div>

              {/* Card 4: 保持熱情與學習動能 */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">保持熱情與學習動能</h3>
                    <p className="text-[11px] font-mono text-[#967d5b] uppercase font-semibold mt-0.5">
                      STAY CURIOUS & DRIVEN
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                    對我而言，設計不只是工作，更是一種持續探索的過程。我始終懷抱熱情與好奇心，樂於在團隊中貢獻專業，一同創造實質價值。
                  </p>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed pt-2 border-t border-stone-100">
                  Design is an ongoing journey of exploration; maintaining continuous curiosity and passion to co-create measurable, real-world value.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
