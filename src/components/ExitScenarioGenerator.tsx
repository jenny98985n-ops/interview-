import React, { useState } from "react";
import { ExitScenarioResult } from "../types";
import {
  Sparkles,
  Zap,
  Copy,
  Check,
  Volume2,
  VolumeX,
  BookmarkPlus,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  TrendingUp,
  Award,
  RefreshCw,
  Loader2,
  CheckCircle2,
  Briefcase
} from "lucide-react";

interface ExitScenarioGeneratorProps {
  onSaveToNotes?: (notes: string) => void;
  currentNotes?: string;
  defaultKeywords?: string;
}

export const ExitScenarioGenerator: React.FC<ExitScenarioGeneratorProps> = ({
  onSaveToNotes,
  defaultKeywords = "接單狀況下滑、組織裁撤、轉型期",
}) => {
  const [keywords, setKeywords] = useState(defaultKeywords);
  const [focusAngle, setFocusAngle] = useState<"growth" | "technical" | "stability">("growth");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedToNotes, setSavedToNotes] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<ExitScenarioResult | null>(() => {
    // Initial high-standard generation
    return synthesizeScenario(defaultKeywords, "growth");
  });

  // Common quick-tag presets
  const presetTags = [
    "接單狀況下滑",
    "組織裁撤整併",
    "公司業務轉型期",
    "研發資源緊縮",
    "自行車產業庫存去化",
    "傳統代工毛利受限",
    "無膠專利推進受阻",
    "產線佈局重整"
  ];

  const handleToggleTag = (tag: string) => {
    if (keywords.includes(tag)) {
      const updated = keywords
        .split(/[、,，\s]+/)
        .filter((k) => k.trim() !== tag)
        .join("、");
      setKeywords(updated);
    } else {
      setKeywords(keywords.trim() ? `${keywords.trim()}、${tag}` : tag);
    }
  };

  // Local algorithmic synthesis (guarantees instantaneous response even offline)
  function synthesizeScenario(kwInput: string, angle: "growth" | "technical" | "stability"): ExitScenarioResult {
    const rawKw = kwInput.trim() || "大環境景氣調節、組織戰略重組";

    const opening =
      "「在現職久鼎金屬服務期間，我非常感謝主管與團隊給予的高度信任與發揮空間，讓我有機會主導關鍵的自行車全紙化無塑包裝專案，並累積了扎實的 SolidWorks 結構建模、ISTA 1A 國際落摔測試認證，以及主動推動跨部門無塑包裝資料庫的實戰經驗。」";

    let pivot = "";
    let closing = "";

    if (angle === "growth") {
      pivot = `「不過，觀察到近期受整體大環境與市場供需循環影響，公司因應『${rawKw}』等現況，內部正進行整體業務方向與資源配置的策略性轉型。這促使我跳脫短期舒適圈，積極檢視自己未來的長遠職涯路徑。我期盼能將我累積的重型金屬零件防護與全紙化結構研發戰力，全心投注在一個營運體質穩健、具備清晰全球市場藍圖的世界級舞台。」`;
      closing =
        "「Stanley Black & Decker 身為全球手工具龍頭，亞洲 GSMA 營運中心更有著極強的跨國供應鏈整合實力與深厚底蘊。這正是我渴望能長期穩定深耕、與團隊一同樹立綠色包裝標竿的理想平台，我也能在到職第一天就為團隊注入防護結構的即戰力。」";
    } else if (angle === "technical") {
      pivot = `「特別是在我近期主導推進『無膠環保包材結構專利』（已通過內部審查）、導入生成式 AI 渲染工作流，並深研歐盟 PPWR 包裝法規的過程中，我體會到包裝技術若要創造最大價值，必須依託在規模化、高複雜度的全球產品線。然而受到『${rawKw}』等戰略重心調整，現有專案較難支撐前瞻結構專利在全球市場的深度落地。」`;
      closing =
        "「史丹利百得以創新與 ESG 永續為核心DNA，擁有豐富的工具專利壁壘。我渴望加入一個高度重視包裝工程資產與自動化量產可行性的世界級團隊，直接將我的無膠專利研發與提速能力，化為史丹利實質降本與開拓歐美通路的競爭優勢。」";
    } else {
      pivot = `「近期因應產業鏈調節，公司在『${rawKw}』的背景下進行了業務重心的聚焦與架構調整。身為工程師，我非常理解企業在不同週期進行資源再平衡的必要性；但同時，這也成為我主動迎向下一個專業里程碑的契機。我希望將成熟的結構防震與模組化經驗，對齊到更具全球抗風險體質的領先企業。」`;
      closing =
        "「Stanley Black & Decker 擁有 170 多年跨越景氣週期的堅實韌性，並且在亞洲 GSMA 建立了完整的研發供應樞紐。我期望能運用我在金屬零件結構防護與跨部門賦能的專業，在此發揮穩健且持久的實質貢獻。」";
    }

    const fullScript = `${opening}\n\n${pivot}\n\n${closing}`;

    return {
      fullScript,
      opening,
      pivot,
      closing,
      redlineAvoided: [
        {
          riskyWord: `受限於「${rawKw}」想跳槽/逃跑`,
          safeReplacement: "客觀歸納為「大環境產業週期性調節下的組織戰略與資源重置」"
        },
        {
          riskyWord: "批評前東家接單不力或管理變動",
          safeReplacement: "轉化為「感謝前東家培育，主動對齊長期職涯發展拉力 (Pull Factor)」"
        },
        {
          riskyWord: "只談自身想找高薪/穩定",
          safeReplacement: "錨定在「史丹利百年品牌穩定性與自身專利結構即戰力貢獻」"
        }
      ],
      interviewerPsychology:
        "面試官評估重點：候選人展現了頂級外商極度看重的成熟度與忠誠素養——絕不道前東家長短、不傳遞辦公室流言，並在 20 秒內自然引導至追求卓越的『拉力思維 (Pull Factor)』，大幅提升錄取信心。",
      isAiEnhanced: false
    };
  }

  // Handle local instant generation
  const handleInstantGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const res = synthesizeScenario(keywords, focusAngle);
      setGeneratedResult(res);
      setIsLoading(false);
      setSavedToNotes(false);
    }, 200);
  };

  // Handle Gemini AI deep polish
  const handleAiGenerate = async () => {
    if (!keywords.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-exit-scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keywords: keywords.trim(),
          focusAngle,
          targetRole: "Structural Packaging Engineer (結構包裝工程師)"
        })
      });
      if (!res.ok) {
        throw new Error(`伺服器回應錯誤 (${res.status})`);
      }
      const data: ExitScenarioResult = await res.json();
      setGeneratedResult(data);
      setSavedToNotes(false);
    } catch (err) {
      console.warn("Falling back to local high-fidelity generator due to:", err);
      // Fallback seamlessly to local synthesis
      const fallback = synthesizeScenario(keywords, focusAngle);
      setGeneratedResult(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy full script
  const handleCopy = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult.fullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save to user practice notes
  const handleSaveToNotes = () => {
    if (!generatedResult || !onSaveToNotes) return;
    const noteText = `【離職原因客觀話術草稿 (情境關鍵詞: ${keywords})】\n\n${generatedResult.fullScript}\n\n【核心避雷重點】\n- 感謝前東家培育，不講八卦\n- 客觀歸因於大環境與戰略調整\n- 快速導向史丹利百年品牌與個人專利結構即戰力`;
    onSaveToNotes(noteText);
    setSavedToNotes(true);
    setTimeout(() => setSavedToNotes(false), 3000);
  };

  // TTS Read Aloud
  const handleToggleAudio = () => {
    if (!("speechSynthesis" in window) || !generatedResult) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(generatedResult.fullScript);
    utterance.lang = "zh-TW";
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      id="exit-scenario-generator-container"
      className="bg-white text-stone-900 rounded-2xl p-5 sm:p-7 border border-stone-200 shadow-sm"
    >
      {/* Header & Strategic Principles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="bg-amber-400 text-stone-950 font-black text-xs px-2.5 py-0.5 rounded tracking-wider uppercase">
              Scenario Generator
            </span>
            <span className="text-xs text-stone-600 font-mono font-medium flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>離職原因話術・智能情境生成器</span>
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
            將敏感公司狀況，轉化為展現大局觀與高 EQ 的求職拉力
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            輸入你目前面臨的真實公司關鍵詞（如接單縮減、組織裁撤、轉型期），自動生成符合外商高層標準的客觀、積極離職說明草稿。
          </p>
        </div>

        {/* Golden Rules Pills */}
        <div className="flex sm:flex-col gap-1.5 shrink-0 text-[11px] font-medium text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200">
          <div className="flex items-center space-x-1.5 text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
            <span>零八卦・不道前東家是非</span>
          </div>
          <div className="flex items-center space-x-1.5 text-sky-800">
            <TrendingUp className="w-3.5 h-3.5 shrink-0 text-sky-600" />
            <span>宏觀歸因產業供需循環</span>
          </div>
          <div className="flex items-center space-x-1.5 text-amber-800">
            <Award className="w-3.5 h-3.5 shrink-0 text-amber-600" />
            <span>20秒錨定史丹利百年舞台</span>
          </div>
        </div>
      </div>

      {/* Control Form */}
      <div className="space-y-4 mb-6">
        {/* Keyword Presets */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
            1. 點擊加入常見情境標籤（或於下方自由輸入）：
          </label>
          <div className="flex flex-wrap gap-1.5">
            {presetTags.map((tag) => {
              const isSelected = keywords.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleToggleTag(tag)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    isSelected
                      ? "bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-xs"
                      : "bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-100"
                  }`}
                >
                  {isSelected ? "✓ " : "+ "}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Input */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label
              htmlFor="scenario-keywords-input"
              className="text-xs font-semibold text-stone-700 flex items-center space-x-1.5"
            >
              <span>2. 當前公司狀況關鍵詞</span>
              <span className="text-[11px] text-stone-500 font-normal">
                (支援多詞輸入，以頓號或逗號分隔)
              </span>
            </label>
            {keywords && (
              <button
                type="button"
                onClick={() => setKeywords("")}
                className="text-[11px] text-stone-500 hover:text-stone-800 underline"
              >
                清空重寫
              </button>
            )}
          </div>
          <input
            id="scenario-keywords-input"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="例如：接單狀況下滑、組織裁撤、轉型期、自行車庫存去化緩慢..."
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:bg-white font-sans"
          />
        </div>

        {/* Focus Angle Switcher */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
            3. 選擇說服切入角度 (Focus Angle)：
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setFocusAngle("growth")}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                focusAngle === "growth"
                  ? "bg-amber-50 border-amber-400 text-amber-950 shadow-xs"
                  : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300"
              }`}
            >
              <div className="text-xs font-bold flex items-center space-x-1.5 text-stone-900 mb-1">
                <span>🌟 追求世界級穩健舞台</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-semibold px-1.5 py-0.5 rounded">推薦首選</span>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-600">
                強調追求百年外商體質、跨國供應鏈規模與長遠深耕的發揮舞台。
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFocusAngle("technical")}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                focusAngle === "technical"
                  ? "bg-amber-50 border-amber-400 text-amber-950 shadow-xs"
                  : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300"
              }`}
            >
              <div className="text-xs font-bold text-stone-900 mb-1">
                🔬 專利技術與法規落地
              </div>
              <p className="text-[11px] leading-relaxed text-stone-600">
                聚焦無膠專利研發、歐盟 PPWR 永續法規與生成式 AI 工作流深化。
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFocusAngle("stability")}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                focusAngle === "stability"
                  ? "bg-amber-50 border-amber-400 text-amber-950 shadow-xs"
                  : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300"
              }`}
            >
              <div className="text-xs font-bold text-stone-900 mb-1">
                🧭 組織戰略調整與主動適應
              </div>
              <p className="text-[11px] leading-relaxed text-stone-600">
                以成熟商業視角解讀企業資源重置，展現主動迎接職涯新里程的底氣。
              </p>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          <button
            id="instant-generate-btn"
            type="button"
            onClick={handleInstantGenerate}
            disabled={isLoading || !keywords.trim()}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span>⚡ 即時生成標準專業草稿</span>
          </button>

          <button
            id="ai-generate-btn"
            type="button"
            onClick={handleAiGenerate}
            disabled={isLoading || !keywords.trim()}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-amber-300 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-400" />
            )}
            <span>✨ AI 總監深度客製潤飾</span>
          </button>
        </div>
      </div>

      {/* Generated Result Output */}
      {generatedResult && (
        <div className="space-y-4 pt-4 border-t border-stone-200">
          {/* Result Header & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>客觀積極離職說明草稿 (逐字稿)</span>
              </span>
              {generatedResult.isAiEnhanced && (
                <span className="text-[10px] font-semibold bg-purple-100 text-purple-900 border border-purple-300 px-2 py-0.5 rounded-full">
                  Gemini 3.8 Flash 智慧客製潤飾
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1.5">
              {/* TTS Listen */}
              <button
                type="button"
                onClick={handleToggleAudio}
                className={`p-1.5 px-2.5 rounded-lg border text-xs flex items-center space-x-1 transition-colors ${
                  isPlayingAudio
                    ? "bg-amber-400 text-stone-950 border-amber-400 font-semibold"
                    : "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                }`}
                title="語音模擬朗讀"
              >
                {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? "停止朗讀" : "語音試聽"}</span>
              </button>

              {/* Copy Script */}
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 px-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-300 text-xs font-medium text-stone-800 flex items-center space-x-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "已複製" : "複製逐字稿"}</span>
              </button>

              {/* Save to Notes */}
              {onSaveToNotes && (
                <button
                  type="button"
                  onClick={handleSaveToNotes}
                  className="p-1.5 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900 flex items-center space-x-1 transition-colors"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-amber-700" />
                  <span>{savedToNotes ? "已存入筆記" : "存入自練筆記"}</span>
                </button>
              )}
            </div>
          </div>

          {/* 3-Beat Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Beat 1 */}
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-900 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center text-[10px] font-bold">
                    1
                  </span>
                  <span>Beat 1：感恩信任與實績肯定</span>
                </div>
                <p className="text-xs text-stone-800 leading-relaxed">
                  {generatedResult.opening}
                </p>
              </div>
              <div className="mt-2 text-[10px] text-stone-500 font-mono">
                約 15 秒 • 奠定忠誠與成熟基石
              </div>
            </div>

            {/* Beat 2 */}
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center text-[10px] font-bold">
                    2
                  </span>
                  <span>Beat 2：客觀戰略轉折 (拉力思維)</span>
                </div>
                <p className="text-xs text-stone-800 leading-relaxed">
                  {generatedResult.pivot}
                </p>
              </div>
              <div className="mt-2 text-[10px] text-stone-500 font-mono">
                約 20 秒 • 宏觀大局觀、絕不抱怨
              </div>
            </div>

            {/* Beat 3 */}
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-sky-900 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                  <span>Beat 3：史丹利價值對齊與即戰力</span>
                </div>
                <p className="text-xs text-stone-800 leading-relaxed">
                  {generatedResult.closing}
                </p>
              </div>
              <div className="mt-2 text-[10px] text-stone-500 font-mono">
                約 15 秒 • 鎖定錄取動機與專利貢獻
              </div>
            </div>
          </div>

          {/* Full Integrated Script Box - high contrast dark prompter card */}
          <div className="bg-stone-950 rounded-xl p-4 sm:p-5 border border-stone-800 relative">
            <div className="flex justify-between items-center text-[11px] text-stone-400 mb-2">
              <span className="font-semibold text-amber-400">完整應答口語逐字稿（語調建言：從容、沉著、面帶微笑）</span>
              <span className="font-mono text-stone-400">
                字數：{generatedResult.fullScript.length} 字 • 建議語速約 50 秒完成
              </span>
            </div>
            <div className="text-stone-100 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans select-all">
              {generatedResult.fullScript}
            </div>
          </div>

          {/* Redline Filter & Executive Psychology */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-1">
            {/* Redline vs Safe Phrasing */}
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-900 mb-2">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                <span>關鍵敏感字詞 vs 外商專業安全代換</span>
              </div>
              <div className="space-y-2">
                {generatedResult.redlineAvoided.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 bg-white p-2.5 rounded-lg border border-stone-200"
                  >
                    <div className="text-rose-800 flex items-center space-x-1 font-medium">
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200 font-bold">避免</span>
                      <span>{item.riskyWord}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 hidden sm:block shrink-0" />
                    <div className="text-emerald-800 flex items-center space-x-1 font-semibold">
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">替換為</span>
                      <span>{item.safeReplacement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hiring Manager Psychology */}
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-950 mb-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                  <span>外商用人主管與 HR 心理學反饋</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {generatedResult.interviewerPsychology}
                </p>
              </div>
              <div className="mt-3 text-[11px] text-amber-950 bg-amber-100/60 p-2.5 rounded-lg border border-amber-300">
                💡 <strong>金句心法：</strong>「離職原因不是向面試官告解過去的苦水，而是向面試官展示你走向未來的成熟大局觀。」
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
