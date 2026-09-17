import React, { useState } from "react";
import {
  Calculator,
  Shield,
  Award,
  Sparkles,
  TrendingUp,
  Copy,
  Check,
  DollarSign,
  AlertCircle,
  Briefcase
} from "lucide-react";
import { TARGET_ROLE_INFO } from "../data/interviewData";

export const SalaryCalculator: React.FC = () => {
  const [targetGross, setTargetGross] = useState<number>(TARGET_ROLE_INFO.targetGrossMonthly);
  const [bonusMonths, setBonusMonths] = useState<number>(TARGET_ROLE_INFO.guaranteedMonths);
  const [copiedScript, setCopiedScript] = useState(false);

  // Dynamic calculations
  // Labor insurance bracket (Taiwan 2024/2026 standard ~1,191 for capped bracket 45,800)
  const laborDeduction = targetGross >= 45800 ? 1191 : Math.round(targetGross * 0.115 * 0.2);
  // Health insurance bracket (~990 for 63,800 bracket)
  const healthDeduction = targetGross >= 60000 ? 990 : Math.round(targetGross * 0.0517 * 0.3);

  const netMonthly = targetGross - laborDeduction - healthDeduction;
  const targetATC = targetGross * bonusMonths;
  const currentATC = TARGET_ROLE_INFO.currentTargetATC; // 728,000
  const jumpAmount = targetATC - currentATC;
  const jumpPercent = ((jumpAmount / currentATC) * 100).toFixed(1);

  const garminDiff = targetATC - TARGET_ROLE_INFO.garminAnchorATC;

  const scriptText = `「我目前的保底年薪大約是 73 萬（以最明確的保底 14 個月計算，不含未定績效）。去年我取得 Garmin 的正式 Offer 時，市場核定的本薪即是 6.5 萬（換算年薪約 91 萬）。

因為我非常看重 Stanley Black & Decker 的跨國舞台與發展性，所以我期望這次的目標月薪是 63,000 元，換算年薪總包（ATC）約落在 88 萬。

雖然對比現職保底約有 21% 的調幅，但這其實是務實地對齊我已獲市場驗證的客觀身價。帶著我目前正在推進的『無膠環保專利』以及金屬結構防護的跨產業即戰力，我相信這對雙方來說都是一個極具性價比的超值投資。」`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(scriptText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-stone-200 text-stone-900 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded tracking-wider uppercase">
                外商核薪專項戰略
              </span>
              <span className="text-xs text-stone-500 font-mono">
                Structural Packaging Engineer
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Stanley Black & Decker 薪資談判精算與攻防手冊
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              外商注重 <strong className="text-stone-900">Total Package (年薪總包 ATC)</strong> 與個人獨立貢獻度 (Individual Contributor)。
              以現職保底 14 個月（72.8 萬）為防守底線，搭配去年 <strong className="text-stone-900">Garmin 6.5 萬正式 Offer</strong> 作為護城河，強勢且合理地爭取 63,000 月薪與 +21.2% 調幅。
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl shrink-0 flex items-center space-x-4">
            <div className="p-3 bg-amber-100 border border-amber-200 rounded-lg text-amber-800">
              <DollarSign className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs text-stone-500 font-medium">目標稅後每個月「實拿薪資」</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-900 font-mono">
                ${netMonthly.toLocaleString()} <span className="text-xs font-normal text-stone-600">元 / 月</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                {netMonthly >= 60000 ? "✓ 成功跨過實拿 60,000 元安全門檻" : "⚠️ 低於 6 萬實拿預期"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Math & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Calculation Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-base font-bold text-stone-900 flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>「實拿 6 萬以上」未稅前精算模擬 (The Math)</span>
            </h3>
            <button
              onClick={() => {
                setTargetGross(63000);
                setBonusMonths(14);
              }}
              className="text-xs text-stone-500 hover:text-stone-900 underline"
            >
              重設為預設最佳化 (63K/14M)
            </button>
          </div>

          {/* Slider: Target Gross */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-semibold text-stone-700">目標未稅前月薪 (Gross Monthly)：</label>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-black text-stone-900 font-mono">
                  ${targetGross.toLocaleString()}
                </span>
                <span className="text-xs text-stone-500">元</span>
              </div>
            </div>
            <input
              type="range"
              min="52000"
              max="80000"
              step="1000"
              value={targetGross}
              onChange={(e) => setTargetGross(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>現職底薪 $52,000</span>
              <span className="font-bold text-amber-600">黃金錨定點 $63,000</span>
              <span>Garmin Offer $65,000</span>
              <span>$80,000</span>
            </div>
          </div>

          {/* Slider: Months */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-semibold text-stone-700">年薪計算法（保底月數）：</label>
              <span className="text-sm font-bold text-stone-900 font-mono">
                {bonusMonths} 個月 (保底)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[12, 14, 15].map((m) => (
                <button
                  key={m}
                  onClick={() => setBonusMonths(m)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                    bonusMonths === m
                      ? "bg-amber-400 text-stone-950 border-amber-400 font-bold"
                      : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {m} 個月 {m === 14 ? "(最穩固常規)" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Breakdown calculation table */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600 py-1 border-b border-stone-200/60">
              <span>目標未稅前月薪 (Gross)：</span>
              <span className="font-mono font-bold text-stone-800">${targetGross.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-600 py-1 border-b border-stone-200/60">
              <span>勞保自付額 (最高上限級距 45,800)：</span>
              <span className="font-mono text-red-600">-${laborDeduction.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-600 py-1 border-b border-stone-200/60">
              <span>健保自付額 (對應 63,800 級距)：</span>
              <span className="font-mono text-red-600">-${healthDeduction.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-900 font-bold py-2 text-sm bg-amber-50/60 px-2 rounded">
              <span>預估每月實拿淨薪資 (Net)：</span>
              <span className="font-mono text-amber-700 text-base font-black">
                ${netMonthly.toLocaleString()} 元
              </span>
            </div>
          </div>

          <div className="flex items-start space-x-2 text-xs text-stone-500 bg-blue-50/70 p-3 rounded-lg border border-blue-200/60">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p leading-relaxed>
              <strong>戰略精算總結：</strong> 開出 <strong>63,000 元</strong> 是最精準的黃金數字。扣除勞健保後實拿 <strong>60,819 元</strong>，既能安全越過心理上的「實拿 6 萬門檻」，又不會因為喊出 6.5 萬引發非必要的預算卡關。
            </p>
          </div>
        </div>

        {/* Right: Comparative Chart & Garmin Shield */}
        <div className="lg:col-span-5 space-y-4">
          {/* Compare Table */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>現職 vs. 史丹利目標年薪 (ATC) 對照表</span>
            </h3>

            <div className="space-y-3 text-xs">
              {/* Current */}
              <div className="p-3 rounded-lg bg-stone-100 border border-stone-200">
                <div className="text-stone-500 mb-1">【現職狀態 (久鼎金屬)】</div>
                <div className="flex justify-between items-baseline">
                  <span className="text-stone-700">月薪 $52,000 (保底 14 個月)</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">$728,000</span>
                </div>
                <div className="text-[11px] text-stone-400 mt-1">經得起 HR 查驗扣繳憑單的最穩固基準</div>
              </div>

              {/* Target */}
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-300">
                <div className="text-amber-900 font-bold mb-1">【Stanley Black & Decker 目標】</div>
                <div className="flex justify-between items-baseline">
                  <span className="text-amber-950 font-semibold">
                    月薪 ${targetGross.toLocaleString()} (保底 {bonusMonths} 個月)
                  </span>
                  <span className="font-mono font-black text-amber-700 text-base">
                    ${targetATC.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-amber-900 font-bold mt-1">
                  <span>調升總額：+${jumpAmount.toLocaleString()} 元</span>
                  <span className="bg-amber-200 px-2 py-0.5 rounded font-mono">
                    漲幅 +{jumpPercent}%
                  </span>
                </div>
              </div>

              {/* Garmin Anchor */}
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300">
                <div className="flex items-center justify-between text-emerald-900 font-bold mb-1">
                  <span>【最強護城河：去年 Garmin 正式 Offer】</span>
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-emerald-950">核定月薪 $65,000 (換算年薪約 91 萬)</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">$910,000</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-1 leading-normal">
                  63,000 對比 Garmin 是 <strong>折扣價 (-${Math.abs(garminDiff).toLocaleString()})</strong>！
                  這證明 +21% 不是獅子大開口，只是身價「校正回歸」，更展現了加入史丹利的誠意。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Four Pillars of Value (為何我值得 63,000？) */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-stone-900 mb-1 flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>外商核薪四大支柱 (The Four Pillars of Value)</span>
        </h3>
        <p className="text-xs text-stone-500 mb-4">
          當面試官或 HR 詢問「你為什麼覺得自己符合這個薪資期待？」時，以價值 (Value) 回應，而非開銷需求：
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1 */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-amber-400 transition-colors">
            <div className="flex items-center space-x-2 font-bold text-sm text-stone-900 mb-1.5">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-black">
                1
              </span>
              <span>支柱一：市場實證的真實身價與誠意 (The Market Anchor)</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              「去年我曾取得 <strong>Garmin 正式 Offer</strong>，當時市場核定本薪即為 <strong>65,000 元</strong>。但我非常看重 Stanley Black & Decker 的全球化舞台與此職位深耕機會，因此開出 63,000 這個務實且具誠意的數字，對公司來說是極具性價比的超值投資。」
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-amber-400 transition-colors">
            <div className="flex items-center space-x-2 font-bold text-sm text-stone-900 mb-1.5">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-black">
                2
              </span>
              <span>支柱二：具備實質產出的前端研發量能 (The Innovator)</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              「我不僅執行落摔測試，更具備結構創新的發明能力。在現職主導的<strong>『無膠環保包材』已正式通過公司內部專利審查</strong>，正在由事務所撰寫專利文件中。Stanley B&D 極其看重 ESG 與專利壁壘，我能直接把這種從 0 到 1 的研發量能帶進團隊。」
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-amber-400 transition-colors">
            <div className="flex items-center space-x-2 font-bold text-sm text-stone-900 mb-1.5">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-black">
                3
              </span>
              <span>支柱三：跨部門整合與主動發起能力 (The Proactive Leader)</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              「外商需要能獨立作業、甚至推動專案前進的 Self-starter。我習慣<strong>『主動發起』並跨部門溝通</strong>，例如主動建置無塑包裝資料庫賦能業務。無論跟產線、採購或海外主管，我都能有效整合資源，<strong>大幅降低主管的微觀管理成本</strong>。」
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-amber-400 transition-colors">
            <div className="flex items-center space-x-2 font-bold text-sm text-stone-900 mb-1.5">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-black">
                4
              </span>
              <span>支柱四：跨產業的金屬結構即戰力 (The Adaptability)</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              「從過去的消費性電子到自行車高重金屬零組件，我具備極強的材料與測試適應性。用 6.3 萬聘請我，買到的是一個<strong>『落地第一天就能直接扛專案』的成熟即戰力</strong>，完全省去了新人的摸索期與培訓成本。」
            </p>
          </div>
        </div>
      </div>

      {/* The Script: Word-for-Word Negotiation Script */}
      <div className="bg-stone-900 text-white rounded-xl border border-stone-800 p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              外商實戰話術逐字稿 (The Script)
            </h3>
          </div>
          <button
            id="copy-salary-script-btn"
            onClick={handleCopyScript}
            className="flex items-center space-x-1.5 bg-amber-400 text-stone-950 hover:bg-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
          >
            {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedScript ? "已複製至剪貼簿" : "複製話術逐字稿"}</span>
          </button>
        </div>

        <p className="text-xs text-stone-400 italic">
          請拿出沉穩自信、不卑不亢的態度，在被問及薪資期待時堅定道出：
        </p>

        <div className="bg-stone-800/90 p-5 rounded-xl text-xs sm:text-sm text-stone-100 leading-relaxed whitespace-pre-line border border-stone-700 font-sans shadow-inner">
          {scriptText}
        </div>
      </div>
    </div>
  );
};
