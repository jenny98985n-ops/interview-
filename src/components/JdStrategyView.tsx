import React, { useState } from "react";
import { Target, CheckCircle, ShieldAlert, Sparkles, Copy, Check, FileCheck, ArrowRight } from "lucide-react";

export const JdStrategyView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const strategies = [
    {
      id: "pain-1",
      number: "痛點 01",
      name: "Innovate (創新研發) vs. 無膠環保包材專利",
      jdText: '“Design, innovate, and execute packaging solutions to protect products during transit and maximize cost/quality balance.”',
      strikePoint: "外商極度重視 ESG (環境社會治理) 與減碳指標。面試時，務必把『無膠環保包材』專利拿出來當主打星！強調這不僅是結構設計，更是能幫助公司達成永續目標、降低耗材成本的從 0 到 1 發明專利。",
      script: `「JD 中提到的 'Innovate'，正是我在現職投入最深的核心亮點。我不僅執行包裝落摔測試，更主導研發了『無膠環保包材結構』，目前已經正式通過公司內部專利審查，正由事務所撰寫專利文件中。

這項發明透過純幾何自鎖卡扣，完全取代了傳統封箱膠帶與塑料緩衝材，在承受重型金屬件 ISTA 落摔時依然具備極高穩定性。這能直接協助史丹利百得達成全球 ESG 減碳指標，並為產線省下上膠烘乾的時間與耗材成本。」`,
      keywords: ["Glue-free Patent (無膠專利)", "ESG Sustainability", "From 0 to 1 Innovation", "Geometric Interlocking"],
      danger: "切忌把『畫既有箱型』當作創新，外商要看的是能產生智慧財產壁壘或商業護城河的研發量能。"
    },
    {
      id: "pain-2",
      number: "痛點 02",
      name: "Self-starter (主動發起) vs. 顯示者特質與無塑資料庫",
      jdText: '“Self-motivated/self-starter with a positive attitude, capable of working independently and across global functional teams.”',
      strikePoint: "這完全是為具備『主動發起』特質的候選人量身打造！面試時多使用『我主動發現了什麼痛點』、『我主動發起了什麼專案』的句型，強調自己能大幅降低主管的微觀管理成本 (Micro-management)。",
      script: `「我在專案推動上的風格是『主動走在問題前面』。例如在現職，我主動發現業務同仁在回覆歐美客戶無塑包裝詢價時往往要等待 3 到 5 天，我沒有等待主管交辦，便主動跨部門發起『無塑包裝資料庫』，將複雜金屬件規格化為模組選型卡，讓業務在 10 分鐘內自主報價。

同時我也主動引進生成式 AI 渲染流程，將圖面等待時間縮短 70%。主管與我合作時非常省心，因為我是一個能自己發現摩擦點、整合跨部門資源並帶著解法來匯報的 Self-starter。」`,
      keywords: ["Proactive Initiative (主動發起)", "Database Enablement (資料庫賦能)", "Zero Micro-management (零微觀管理)", "Autonomous Ownership"],
      danger: "切忌回答『我配合度很高，主管交代什麼我就做什麼』，這會被認定為缺乏獨立思考的被動執行者。"
    },
    {
      id: "pain-3",
      number: "痛點 03",
      name: "Maximize Quality/Cost (成本與品質) vs. 結構智慧與量化控本",
      jdText: '“Develop packaging structures to maximize quality/cost, optimizing dimensions, pallet utilization, and material specs.”',
      strikePoint: "強調你對工程細節的掌控力。說明如何透過結構設計的受力優化、瓦楞楞向配置，不僅維持了包裝品質通過 ISTA 測試，還實質降低了多少比例的包材成本與貨櫃運費，拿出『具體數字』。",
      script: `「在包裝工程中，品質與成本不是零和博弈，而是靠結構智慧來創造雙贏。

在過往專案中，我透過 SolidWorks 進行落摔受力分析，導入風琴摺吸能角取代整面加厚瓦楞，將紙板整體基重降低一級，材料採購成本下降約 10%，卻順利通過 ISTA 1A 連續 10 次落摔測試。

同時，我重新計算了折疊模組幾何，將外箱邊長縮減 12mm，使標準 40 呎高櫃的棧板堆疊箱數（Pallet Utilization）提升了 15%，替公司在跨國長途海運中大幅省下材積運費。我習慣用供應鏈總成本 (TCO) 的視角，為公司精算每一分錢的價值。」`,
      keywords: ["TCO Optimization", "Pallet Utilization (+15%)", "Material Cost (-10%)", "McKee Formula", "Safety Margin"],
      danger: "避免只談『我用最便宜的材料』，五金工具最怕摔壞，必須先確保品質與 ISTA 通過，再來談材積省運費。"
    },
    {
      id: "pain-4",
      number: "痛點 04",
      name: "Strong English (英文溝通) vs. 全球團隊協同與面試準備",
      jdText: '“Strong English communication skills (written and verbal), able to interface effectively with US/Europe and Asian suppliers.”',
      strikePoint: "GSMA 是亞洲供應樞紐，極可能有外籍主管或英文關卡。準備好流利的『英文自我介紹』，並能以英語流利解釋『無膠環保專利與 ISTA 落摔結構』，掌握專業術語即能穩操勝券。",
      script: `“I regularly reference international packaging standards such as ISTA 1A and ASTM protocols in my engineering practice.

When collaborating with global stakeholders, I focus on clear, data-driven communication. For instance, in explaining our glue-free eco-friendly cushioning structure, I clearly articulate the physical mechanics—how the interlocking tabs resist shear forces during corner drops without any adhesive tape.

I am fully prepared to lead engineering sync meetings, document packaging specifications (Dieline and BCT requirements), and negotiate with Asian suppliers in fluent technical English.”`,
      keywords: ["Technical English", "ASTM / ISTA Protocols", "Specification Sheets", "Cross-regional Alignment"],
      danger: "切忌因英文不是母語就退縮，外商重視的是『把技術概念說清楚的準確度』，而非華麗的文學詞藻。"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-stone-900 border border-stone-800 text-white rounded-xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Target className="w-4 h-4" />
          <span>Stanley Black & Decker 職缺描述精準解析</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          針對 JD 的面試精準打擊策略 (JD 破解法)
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-3xl leading-relaxed">
          這份 JD 完美呼應了你的個人特質與現有籌碼。外商面試的本質是『需求與解方的對稱性』，在面試現場主動將對話錨定在以下四個核心痛點，精準打擊用人主管心坎：
        </p>
      </div>

      {/* 4 Strike Cards */}
      <div className="space-y-5">
        {strategies.map((strat) => (
          <div
            key={strat.id}
            id={`jd-card-${strat.id}`}
            className="bg-white rounded-xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-5 sm:p-6 border-b border-stone-100 bg-stone-50/70">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold bg-amber-400 text-stone-950 px-2 py-0.5 rounded">
                    {strat.number}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900">
                    {strat.name}
                  </h3>
                </div>
                <button
                  id={`copy-jd-btn-${strat.id}`}
                  onClick={() => handleCopy(strat.id, strat.script)}
                  className="text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1 rounded flex items-center space-x-1 transition-colors"
                >
                  {copiedId === strat.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>已複製話術</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>複製打擊話術</span>
                    </>
                  )}
                </button>
              </div>

              {/* Original JD Requirement */}
              <div className="text-xs font-mono text-stone-600 bg-stone-100 p-2.5 rounded border border-stone-200 italic">
                <span className="font-sans font-bold text-stone-700 not-italic mr-1">JD 官方需求：</span>
                {strat.jdText}
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Tactical Strike Point */}
              <div>
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center space-x-1.5 mb-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-600" />
                  <span>你的精準打擊點 (Strategic Edge)：</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-800 bg-amber-50/70 p-3.5 rounded-lg border border-amber-200/60 leading-relaxed font-medium">
                  {strat.strikePoint}
                </p>
              </div>

              {/* Word-for-word Script */}
              <div>
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wide flex items-center space-x-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>面試實戰打擊話術示範 (The Pitch)：</span>
                </h4>
                <div className="bg-stone-900 text-stone-100 p-4 rounded-xl text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans border border-stone-800">
                  {strat.script}
                </div>
              </div>

              {/* Keywords & Danger */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-100 text-xs">
                <div>
                  <span className="font-bold text-stone-600 block mb-1">關鍵工程術語 (建議置入)：</span>
                  <div className="flex flex-wrap gap-1.5">
                    {strat.keywords.map((kw) => (
                      <span key={kw} className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono text-[11px]">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50/60 p-2.5 rounded-lg border border-red-200/50">
                  <div className="flex items-center space-x-1 text-red-800 font-bold mb-0.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                    <span>面試地雷注意：</span>
                  </div>
                  <p className="text-stone-700 text-[11px] leading-relaxed">{strat.danger}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
