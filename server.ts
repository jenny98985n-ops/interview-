import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      service: "Stanley B&D Packaging Interview Simulator"
    });
  });

  // AI Critique and Follow-up Generator
  app.post("/api/ai-critique", async (req, res) => {
    try {
      const { questionTitle, questionCategory, targetRole, candidateAnswer, starContext } = req.body;

      if (!candidateAnswer || candidateAnswer.trim().length < 5) {
        return res.status(400).json({ error: "請提供更具體的回答內容以進行專家評析。" });
      }

      const ai = getAI();
      if (!ai) {
        // Return structured rule-based feedback if no API key is provided
        return res.json({
          simulated: true,
          score: 88,
          summary: "已透過結構包裝專家規則庫進行評析（若設定 GEMINI_API_KEY 可取得即時生成式深層點評）。",
          technicalRating: "良好",
          communicationRating: "優秀",
          strengths: [
            "回答方向精準對齊五金手工具的重型防護需求與 ISTA 標準邏輯。",
            "展現了結構工程師主動解決問題的思維，避免空泛宣稱。"
          ],
          improvementPoints: [
            "建議可進一步補充具體的量化指標（如 G值降低百分比、落摔高度或打樣次數）。",
            "在結尾主動點出該解法如何兼顧產線折裝效率與整體海運材積。"
          ],
          followUpQuestion: "「如果這套結構移轉到東南亞外包紙器廠量產，在不同濕度環境下的壓痕線與切口公差，你會如何訂定檢驗標準？」"
        });
      }

      const prompt = `你現在是全球五金手工具龍頭「史丹利百得 (Stanley Black & Decker) 亞洲區供應管理營運中心 (GSMA)」的資深包裝工程主管 (Packaging Engineering Director)。
正在面試應徵【${targetRole || "Structural Packaging Engineer 結構包裝工程師"}】的候選人。

當前面試題目：
【${questionTitle}】
題目面向：${questionCategory}
STAR 背景提示：${JSON.stringify(starContext || {})}

候選人目前的口語或書面回答：
"""
${candidateAnswer}
"""

請以資深外商包裝總監的專業、嚴謹且具啟發性的角度進行客觀評析。輸出嚴格的 JSON 格式（不要使用 markdown 程式碼區塊外包裝，直接輸出純 JSON 字串）：
{
  "score": 數字(1-100),
  "summary": "一句話總評（精準專業、點出最大亮點與關鍵不足）",
  "technicalRating": "優異 / 良好 / 待加強",
  "communicationRating": "優異 / 良好 / 待加強",
  "strengths": ["優勢點1", "優勢點2"],
  "improvementPoints": ["建議加強點1（如工程量化數據、材質極限、避雷點）", "建議加強點2"],
  "modelAnswerHighlight": "一句專家級潤飾金句，教他如何說得更有外商主管青睞的質感",
  "followUpQuestion": "針對他的回答，你會在現場拋出的深度追問（深水區技術或商業平衡挑戰）"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.4
        }
      });

      const responseText = response.text?.trim() || "{}";
      try {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } catch (parseErr) {
        return res.json({
          score: 85,
          summary: "回答結構完整，具備工程邏輯。",
          technicalRating: "良好",
          communicationRating: "良好",
          strengths: ["展現真實專案經歷與 STAR 結構意識。"],
          improvementPoints: ["可進一步加入量化數據指標。"],
          followUpQuestion: "「針對高溫高濕海運條件，這套方案如何設定安全係數？」",
          raw: responseText
        });
      }
    } catch (err: any) {
      console.warn("AI critique error, returning structured fallback:", err?.message || err);
      return res.json({
        score: 86,
        summary: "回答結構完整，展現扎實的工程邏輯與 STAR 架構意識。",
        technicalRating: "良好",
        communicationRating: "優異",
        strengths: [
          "具備明確的專案情境與動態因應思維",
          "展現對測試規範與跨部門協同的理解度"
        ],
        improvementPoints: [
          "建議進一步補充具體量化數據（如材料厚度、節省趴數或跌落測試次數）",
          "可適度連結 Stanley Black & Decker 在永續與高標準品質上的核心關切"
        ],
        modelAnswerHighlight: "「我們透過前期建立的模組化資料庫與結構預判，在維持防護水準的前提下，將包材成本降低約 10%。」",
        followUpQuestion: "「如果量產上線後在跨洋長途運輸中遇到濕度驟變，你會如何安排抽樣驗證？」",
        isAiEnhanced: false
      });
    }
  });

  // Exit Scenario Generator (客觀、積極的離職原因情境生成器)
  app.post("/api/generate-exit-scenario", async (req, res) => {
    try {
      const { keywords, focusAngle, targetRole } = req.body;

      if (!keywords || !keywords.trim()) {
        return res.status(400).json({ error: "請輸入或選擇當前公司的狀況關鍵詞" });
      }

      const ai = getAI();
      const role = targetRole || "Structural Packaging Engineer (結構包裝工程師)";

      if (!ai) {
        // High quality rule-based fallback response
        const kw = keywords.trim();
        let opening = "「在現職服務期間，我由衷感謝團隊與主管給予我的空間與信任，讓我有機會主導關鍵的無塑包裝與幾何自鎖結構研發，累積了實打實的 ISTA 1A 落摔測試與跨部門資料庫賦能經驗。」";
        let pivot = `「不過，觀察到近期產業與大環境處於需求調節階段，公司內部因應${kw}等現況，正進行整體戰略方向與組織資源的重新配置。這促使我跳脫短期思維，認真梳理自己未來 5 到 10 年的專業定位。我希望將自身在包裝結構與減碳專利上的研發即戰力，投入在體質健全、具備全球供應鏈規模且願長期深耕的頂尖企業。」`;
        let closing = "「史丹利七和在五金工具領域擁有 170 多年的深厚底蘊，亞洲 GSMA 營運中心更有著極強的全球協同動能。對我而言，這不僅能徹底發揮我在重型金屬件防震與全紙化專利上的能量，更能與具備長遠格局的世界級團隊一同為永續標準樹立標竿。」";

        if (focusAngle === "technical") {
          pivot = `「隨著我近期推進『無膠環保包材專利』以及深入研究歐盟 PPWR 環保包裝法規，我發現技術若要在市場發揮最大價值，必須依託在世界級的產品矩陣上。受到現況如${kw}等戰略重心的轉移，現有資源較難支撐前瞻包裝專利在全球市場的規模化推進。」`;
          closing = "「史丹利百得對創新與專利壁壘高度重視，我期望能在這個具備全球出貨量能的舞台上，將我的結構專利研發與 AI 渲染提速工作流，化為公司實質降本與開拓歐美市場的武器。」";
        }

        const fullScript = `${opening}\n\n${pivot}\n\n${closing}`;

        return res.json({
          fullScript,
          opening,
          pivot,
          closing,
          redlineAvoided: [
            {
              riskyWord: `受限於「${kw}」想跳槽/逃跑`,
              safeReplacement: "客觀歸納為「大環境產業週期性調節下的組織戰略與資源重置」"
            },
            {
              riskyWord: "批評前東家接單不力或決策問題",
              safeReplacement: "轉化為「感謝前東家培育，主動對齊長期職涯發展拉力 (Pull Factor)」"
            },
            {
              riskyWord: "只談自身想找好待遇",
              safeReplacement: "錨定在「史丹利百年品牌穩定性與自身專利結構即戰力貢獻」"
            }
          ],
          interviewerPsychology: "面試官能強烈感受到你的成熟度、感恩心與大局觀：不傳播八卦流言、不抱怨前東家，並在 20 秒內展現出清晰的職涯追求與對史丹利七和的強烈認同。",
          isAiEnhanced: false
        });
      }

      const angleDesc =
        focusAngle === "technical"
          ? "側重於『包裝技術升級、無膠專利研發與歐盟PPWR法規實踐，渴望世界級產品舞台』"
          : focusAngle === "stability"
          ? "側重於『組織轉型期下的主動職涯調整，追求體質穩健、具備清晰市場藍圖的百年外商舞台』"
          : "側重於『從逃避風險轉化為追求世界級舞台的成長拉力，強調全球供應鏈格局與個人即戰力』";

      const prompt = `你現在是外商頂尖人資長 (CHRO) 兼職涯談判教練，正在指導一位具備工設與包裝結構背景、擁有『無膠專利審查通過』與『ISTA 1A 落摔測試實戰』的工程師。
他正在面試五金工具龍頭【史丹利百得 (Stanley Black & Decker) 亞洲供應營運中心 GSMA】的【${role}】職位。

【使用者輸入之當前公司狀況關鍵詞】：
"${keywords}"

【選擇之轉化切入角度】：
${angleDesc}

【外商高層面試必守黃金三原則】：
1. 嚴格禁止任何八卦流言（如「聽說要倒了、沒單了、在裁員、大家都在傳」），轉化為成熟客觀的商業與產業語言（如「產業週期性庫存調節」、「組織業務戰略配置重組」）。
2. 絕對不批評前東家的高層、同仁或決策，以感恩其信任與成果作為基底。
3. 必須在 20-30 秒內由客觀環境自然轉化為「追求史丹利百得的拉力 (Pull Factor)」，著墨史丹利七和的穩健性、全球供應鏈與自己能帶來的無膠專利/金屬防護即戰力。

請輸出嚴格的純 JSON 格式（不要包含 markdown 代码块）：
{
  "fullScript": "完整、沉穩、自信、客觀且具備職業品格的面試口語逐字稿（約 180-260 字，分為開頭、轉折、收尾三個自然段落）",
  "opening": "第一段：感恩信任與既有實績（肯定在現職累積的結構與測試戰力）",
  "pivot": "第二段：客觀戰略轉折（如何將使用者關鍵詞客觀轉化為大環境與個人職涯升級的契機）",
  "closing": "第三段：史丹利百得價值對齊（說明為何史丹利是最佳舞台，且自己能如何貢獻價值）",
  "redlineAvoided": [
    {
      "riskyWord": "候選人心中可能想講的敏感/風險字眼（如：接單很慘/部門快被砍了）",
      "safeReplacement": "教導候選人的外商高階安全專業用詞（如：因應市場景氣循環所進行之業務線聚焦調整）"
    },
    {
      "riskyWord": "另一項容易踩雷的被動思維",
      "safeReplacement": "對應的高情商客觀代換話術"
    }
  ],
  "interviewerPsychology": "解析這套說明會在用人主管與 HR 心中建立的高級心理印記（為何能讓人留下成熟穩健的好印象）"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3
        }
      });

      const responseText = response.text?.trim() || "{}";
      try {
        const parsed = JSON.parse(responseText);
        return res.json({
          ...parsed,
          isAiEnhanced: true
        });
      } catch (parseErr) {
        console.error("Parse JSON error from Gemini:", parseErr);
        // Return fallback
        return res.json({
          fullScript: "「在現職期間，我非常感謝主管與團隊給予的發揮空間，讓我有機會主導全紙化無塑包裝結構，並累積了穩定的 ISTA 測試與資料庫建置實績。\n\n近期觀察到因應產業大環境的供需循環，公司正進行業務與資源配置的策略性轉型。這促使我重新審視長遠的專業願景，希望能將研發能量投入到更具規模、全球視野與市場抗風險能力的平台。\n\n史丹利百得在工具領域引領全球，其亞洲 GSMA 營運中心具備頂尖供應鏈與永續承諾。這正是我渴望深耕的世界級舞台，我也能以通過審查的無膠專利研發思維，為史丹利即刻創造價值。」",
          opening: "感謝前東家信任與累積的工程實績",
          pivot: "以產業供需循環與戰略轉型客觀說明轉職動機",
          closing: "對齊史丹利全球舞台與個人即戰力貢獻",
          redlineAvoided: [
            {
              riskyWord: "接單狀況下滑 / 組織裁撤",
              safeReplacement: "產業大環境供需循環與公司策略性資源重組"
            }
          ],
          interviewerPsychology: "展現高成熟度的大局觀，將不確定性轉化為對長期職涯的專注與承諾。",
          isAiEnhanced: false
        });
      }
    } catch (err: any) {
      console.warn("Generate exit scenario API error (providing expert script fallback):", err?.message || err);
      return res.json({
        fullScript: "「在現職期間，我非常感謝主管與團隊給予的發揮空間，讓我有機會主導車載具與國際音訊包裝結構開發，並累積了穩定的 ISTA 測試與模組化資料庫建置實績。\n\n近期觀察到因應產業大環境的市場景氣與供需循環，公司正進行業務線聚焦與策略性資源配置調整。這促使我重新審視長遠的專業願景，希望能將在結構包裝、成本節省（RFQ約10%節省）與專利研發的實務量能，投入到更具規模、全球視野與市場抗風險能力的國際級世界舞台。\n\n史丹利百得在五金手工具領域引領全球，其亞洲 GSMA 營運中心具備頂尖供應鏈與永續承諾。這正是我渴望深耕的理想平台，我也能以 6 年量產經驗與兼具成本效益的結構思維，為史丹利即刻創造價值。」",
        opening: "感謝前東家信任與累積的工程實績",
        pivot: "以產業供需循環與策略性資源配置客觀說明轉職動機",
        closing: "對齊史丹利全球舞台與個人即戰力貢獻",
        redlineAvoided: [
          {
            riskyWord: "訂單下滑 / 部門縮編 / 組織不穩",
            safeReplacement: "產業大環境供需循環與公司策略性業務聚焦"
          },
          {
            riskyWord: "薪水太少 / 想換環境",
            safeReplacement: "尋求全球化供應鏈舞台與更具抗風險韌性的世界級企業"
          }
        ],
        interviewerPsychology: "展現高成熟度的大局觀，將不確定性轉化為對長期職涯的專注與承諾。",
        isAiEnhanced: false
      });
    }
  });

  // Polish reverse interview question endpoint
  app.post("/api/polish-reverse-question", async (req, res) => {
    try {
      const { rawQuestion, targetAudience } = req.body;
      if (!rawQuestion || rawQuestion.trim().length < 2) {
        return res.status(400).json({ error: "請輸入提問內容" });
      }

      const ai = getAI();
      if (!ai) {
        // High quality heuristic fallback
        return res.json({
          polishedChinese: `「想請教${targetAudience || "主管"}，就${rawQuestion.trim()}這一點而言，史丹利七和在亞洲 GSMA 團隊目前的整體戰略規劃或實際運作標準大約是如何呢？」`,
          professionalEnglish: `Could you provide some insight regarding ${rawQuestion.trim()} from the perspective of Stanley Black & Decker's GSMA engineering operations?`,
          psychologicalGoal: "展現主動思考與對跨國外商體系的探索欲，證明候選人關心實質落地與團隊協作。",
          timingAdvice: targetAudience === "人資 (HR)" ? "建議在 HR 輪次談論制度時發問。" : "建議在用人主管面試尾聲反向提問時提出。",
          followUpPitch: "「非常感謝主管的說明，這與我一貫重視細節與工程落地的做事風格非常契合，若有幸加入，我能迅速將這套理念融入專案中。」",
          riskyPitfalls: "避免語氣過於銳利或質疑公司現狀，保持客觀求教與共創雙贏的態度。",
          suitabilityScore: 90,
          isAiEnhanced: false
        });
      }

      const prompt = `你現在是全球五金手工具龍頭「史丹利百得 (Stanley Black & Decker) 亞洲供應管理中心 (GSMA)」的資深面試導師與資深處長。
求職者正在應徵【Structural Packaging Engineer 結構包裝工程師】。
在面試尾聲反向提問時，求職者想向【${targetAudience || "用人主管"}】詢問以下原始問題：
「${rawQuestion}」

請針對跨國百年外商企業文化（注重 Professionalism, ESG 減塑永續, ISTA 落摔品質, 跨時區協調, Self-starter 獨立當責特質），將此提問優化為「能展現大局觀、專業度與高情商」的完美外商提問組合。

請嚴格回傳符合以下 JSON 格式的內容：
{
  "polishedChinese": "優雅、專業、得體的外商中文發問話術（含前言鋪陳與具體探詢角度）",
  "professionalEnglish": "精準、流暢且道地的外商高階工程英文版問法",
  "psychologicalGoal": "解析這個問法能在面試官心中建立何種正面心理印記（為什麼這樣問大加分）",
  "timingAdvice": "具體的最佳提問時機與場合建議（例如第一輪主管尾聲、或HR關卡）",
  "followUpPitch": "主管回答後，候選人如何順勢接話進行二次自我推薦的接球金句",
  "riskyPitfalls": "針對這個主題絕對要避免踩雷的錯誤問法或語氣",
  "suitabilityScore": 92
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3
        }
      });

      const responseText = response.text?.trim() || "{}";
      try {
        const parsed = JSON.parse(responseText);
        return res.json({
          ...parsed,
          isAiEnhanced: true
        });
      } catch (parseErr) {
        console.error("Parse JSON error from Gemini in reverse question:", parseErr);
        return res.json({
          polishedChinese: `「想請教${targetAudience || "主管"}，關於${rawQuestion.trim()}，貴公司在亞洲 GSMA 團隊目前的核心考量與推進標準是如何運作的呢？」`,
          professionalEnglish: `Could you share your perspective on ${rawQuestion.trim()} within the context of GSMA packaging operations?`,
          psychologicalGoal: "展現主動思考與對團隊戰略的投入度。",
          timingAdvice: "面試尾聲主管開放反向提問時提出。",
          followUpPitch: "「聽起來非常具備前瞻性，這正好與我擅長的結構除錯與專利研發思維契合。」",
          riskyPitfalls: "保持積極客觀，避免顯得尖銳或過度打探機密。",
          suitabilityScore: 88,
          isAiEnhanced: false
        });
      }
    } catch (err: any) {
      console.warn("Polish reverse question error (returning structured fallback):", err?.message || err);
      const { rawQuestion, targetAudience } = req.body || {};
      const q = (rawQuestion || "團隊協作與工程標準").trim();
      return res.json({
        polishedChinese: `「想請教${targetAudience || "主管"}，關於${q}這一點，貴公司在亞洲 GSMA 團隊目前的核心考量與推進標準是如何運作的呢？」`,
        professionalEnglish: `Could you share your perspective on ${q} within the context of GSMA packaging operations?`,
        psychologicalGoal: "展現主動思考與對團隊戰略的投入度，證明具備全局觀。",
        timingAdvice: "面試尾聲主管開放反向提問時提出。",
        followUpPitch: "「聽起來非常具備前瞻性，這正好與我擅長的結構除錯與專利研發思維契合。」",
        riskyPitfalls: "保持積極客觀，避免顯得尖銳或過度打探機密。",
        suitabilityScore: 88,
        isAiEnhanced: false
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
