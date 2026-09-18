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
    "歐盟PPWR法規實踐",
    "空隙率限制50%",
    "DfR可回收評級A-C",
    "附屬材料MSDS膠水管控",
    "PFAS禁令與DoC檔案",
    "Maureen內部引薦",
    "聽Maureen說很開朗開心",
    "史丹利四大軟硬體拉力",
    "ArtiosCAD與割樣機快速驗證",
    "當初久鼎適應期專案忙",
    "美律留停陪家人",
    "美律回任追問",
    "暫不考慮回任",
    "生活工作平衡良好",
    "接單狀況下滑",
    "組織裁撤",
    "轉型期",
    "組織裁撤整併",
    "公司業務轉型期",
    "研發資源緊縮",
    "自行車產業庫存去化",
    "無膠專利推進受阻"
  ];

  // Quick preset template combinations
  const presetTemplates = [
    {
      label: "⭐ 歐盟 PPWR 法規合規實踐 (空隙率≤50%、DfR A-C評級、MSDS膠水管控、DoC)",
      value: "歐盟PPWR法規實踐、空隙率限制50%、DfR可回收評級A-C、附屬材料MSDS膠水管控、PFAS禁令與DoC檔案"
    },
    {
      label: "⭐ 離開久鼎與 Maureen 引薦 (為何想離開？之前為何沒投？四大軟硬體拉力)",
      value: "離開久鼎交流、聽Maureen說很開朗開心滿滿開心、外商文化品牌專注AI接受度、ArtiosCAD與割樣機快速驗證、當初久鼎適應期專案忙如今圓滿落地"
    },
    {
      label: "⭐ 美律留停回任追問 (父親病逝留停陪家人、生活工作平衡好不考慮回任)",
      value: "美律留停後陪家人、生活工作平衡良好、暫不考慮回任、渴望史丹利全新挑戰"
    },
    {
      label: "經典組合 (接單下滑 + 組織裁撤 + 轉型期)",
      value: "接單狀況下滑、組織裁撤、轉型期"
    },
    {
      label: "市場景氣型 (接單下滑 + 轉型期)",
      value: "接單狀況下滑、公司業務轉型期"
    },
    {
      label: "組織重整型 (組織裁撤 + 資源重置)",
      value: "組織裁撤整併、研發資源緊縮"
    },
    {
      label: "產業週期型 (庫存去化 + 毛利受限)",
      value: "自行車產業庫存去化、傳統代工毛利受限"
    }
  ];

  const handleToggleTag = (tag: string) => {
    if (keywords.includes(tag)) {
      const updated = keywords
        .split(/[、,，\s]+/)
        .filter((k) => k.trim() !== tag && k.trim().length > 0)
        .join("、");
      setKeywords(updated);
    } else {
      setKeywords(keywords.trim() ? `${keywords.trim()}、${tag}` : tag);
    }
  };

  // Local algorithmic synthesis (guarantees instantaneous response even offline)
  function synthesizeScenario(kwInput: string, angle: "growth" | "technical" | "stability"): ExitScenarioResult {
    const rawKw = kwInput.trim() || "接單狀況下滑、組織裁撤、轉型期";

    // Detect specific business operational contexts
    const hasMaureenReferral = /maureen|引薦|推薦|久鼎|割樣機|artios|開朗|滿滿開心|四大拉力/i.test(rawKw);
    const hasMerryRehire = /美律|回任|回去|留停|陪家人|父親|爸爸|生病/i.test(rawKw);
    const hasPPWR = /ppwr|歐盟|空隙率|dfr|pfas|可回收評級|void\s*space/i.test(rawKw);
    const hasOrderDecline = /接單|訂單|下滑|萎縮|不佳|減少/i.test(rawKw);
    const hasRestructure = /裁撤|裁員|整併|精簡|人事|縮編/i.test(rawKw);
    const hasTransition = /轉型|方向|策略|重心|調整/i.test(rawKw);
    const hasInventory = /庫存|自行車|去化/i.test(rawKw);
    const hasBudget = /資源|預算|研發|緊縮/i.test(rawKw);

    if (hasMaureenReferral) {
      const opening =
        "「在久鼎金屬服務期間，我非常感謝主管與團隊給予的高度信任與發揮空間，讓我有機會主導關鍵的自行車全紙化無塑包裝專案，並累積了扎實的 SolidWorks 結構建模、ISTA 1A 國際落摔測試認證，以及主動推動跨部門無塑包裝資料庫的實戰經驗。今天前來面試，我主要還是抱持著『非常開放的態度前來交流看看』。」";

      const pivot =
        "「而促成我想來深入了解史丹利的關鍵契機，是前同事 Maureen：自從她加入史丹利後，每次聽她聊起在史丹利的工作與團隊，我都看得出來她是『滿滿的開心』，而且整個人『變得很開朗、充滿活力』！這種由內而外散發的快樂與正向回饋非常有感染力，讓我不禁對史丹利的企業環境充滿嚮往。\n\n而在深入了解後，史丹利的四大軟硬體優點更成為吸引我的強大拉力：\n【軟體三大拉力】：\n1. 開放自主的外商企業文化；\n2. 品牌商專注於包裝結構細節與開盒體驗；\n3. 公司對生成式 AI 工具輔助渲染的高接受度與支持。\n【硬體關鍵殺手鐧】：\n4. 史丹利擁有 ArtiosCAD 能同步串聯 2D 刀模與 3D 摺疊動態做虛擬驗證，並搭配現場割樣機，當天就能割樣、親手組裝驗證結構與受力，及時修正公差並大幅縮短開發時程，這是包裝結構工程師夢寐以求的極致研發環境！」";

      const closing =
        "「至於面試官若問：『之前怎麼 Maureen 沒有推薦妳來投履歷，這次怎麼會想來？』我的回答非常坦誠且展現了對工作的當責：\n當初剛進久鼎時，Maureen 確實有提過史丹利有開缺；但那時候我還處於團隊與技術的適應期，且手上有關鍵專案正在衝刺，基於對專案的責任感，我必須先把手頭上的事情做好、站穩腳步，所以當時沒有想那麼多。\n如今我在久鼎的專案已經圓滿落地，又看到 Maureen 在史丹利始終那麼開朗開心，加上得知史丹利有專業割樣機可以快速驗證設計，在時機成熟的現在，我決定這次一定要來和各位主管好好聊聊！」";

      const fullScript = `${opening}\n\n${pivot}\n\n${closing}`;

      const redlineAvoided = [
        {
          riskyWord: "抱怨久鼎設備簡陋、沒有割樣機只能手剪",
          safeReplacement: "聚焦於史丹利 ArtiosCAD 2D/3D 串聯與割樣機快速驗證的強烈工程拉力，展現專業求知欲"
        },
        {
          riskyWord: "表現得像是早就想跳槽、只是在等機會",
          safeReplacement: "點出當初剛進久鼎在適應期且專案忙碌，基於對專案的強烈責任感必須先做好眼前工作，展現極高職業道德"
        },
        {
          riskyWord: "只講外商名氣或福利好",
          safeReplacement: "引述 Maureen 滿滿開朗開心的真實感染力，並以四大軟硬體拉力（外商文化/品牌專注/AI/割樣機）形成技術共鳴"
        }
      ];

      return {
        fullScript,
        opening,
        pivot,
        closing,
        redlineAvoided,
        interviewerPsychology:
          "面試官心理拆解：主管問『為何離開現職久鼎？之前 Maureen 怎麼沒推薦妳，這次怎麼會想來？』重點在於：① 檢驗候選人的穩定度與職業道德（當初適應期且專案忙碌，堅持做好手頭任務才轉職，證明候選人是當責不浮躁的優秀人才）；② 內部同仁 Maureen 的正面口碑（『滿滿的開心、變得很開朗』）比任何廣告都具說服力；③ 對 ArtiosCAD 2D/3D 虛實串聯與割樣機快速驗證的熱情，證明候選人是真正熱愛結構設計、講求驗證閉環的硬核工程師！",
        isAiEnhanced: false
      };
    }

    if (hasMerryRehire) {
      const opening =
        "「當初離開美律主要是因為家庭遭逢變故：那時候因為父親生病，我向公司申請了 3 個月的留職停薪全力照顧；後來父親不幸過世，處理完後事之後，我決定好好陪伴家人，也讓自己在高壓的生活後能好好沉澱休息一段時間。\n\n後來之所以沒有回到美律復職，是因為當時公司專案節奏非常緊湊，比較沒有辦法繼續等待我延長留停；但我衡量當時狀態，還是希望能把這段時間完整留給家人與自己休養，因此在與主管良好溝通並互相理解的情況下，我選擇了主動離職。我非常感恩美律主管與團隊給予的體諒與扎實培訓。」";

      const pivot =
        "「如果面試官問起：『如果美律問你要不要回去，你會回去嗎？』我的回答非常明確篤定：『我完全沒有考慮回去。』\n\n主要原因在於：第一，目前的家庭狀況已經非常健康穩固，而且經過這段時間的調適，我的生活跟工作取得了非常好的平衡，身心節奏良好、精力充沛，隨時能全心投入全新挑戰；第二，對我而言，在美律的階段性學習已經告一段落，比起回到過去熟悉的舒適圈或走回頭路，我更渴望接受全新的挑戰。」";

      const closing =
        "「我希望能跳脫消費電子既有框架，跨足到像 Stanley Black & Decker 這樣具備全球百年品牌底蘊、重型五金工具規模、以及高度重視綠色永續包裝的世界級外商舞台。五金手工具在重型結構防震、全紙化減塑、大版開數利用率與跨國供應鏈整合上的工程深度，正是我渴望長期深耕的方向。我希望能把過去累積的結構創新與量產落地戰力，在史丹利百得創造新的工程價值，而不是走回頭路。」";

      const fullScript = `${opening}\n\n${pivot}\n\n${closing}`;

      const redlineAvoided = [
        {
          riskyWord: "猶豫不決說「如果主管找我或待遇好可能會考慮回去」",
          safeReplacement: "第一秒明確堅定表達「完全沒有考慮回去」，消除主管對跳槽風險與回任的疑慮"
        },
        {
          riskyWord: "過度描述照顧家人的悲傷或疲累，引發主管對出勤穩定性的疑慮",
          safeReplacement: "正面證實「家庭變故已圓滿走過，目前生活與工作平衡極佳、身心節奏非常好，精力充沛隨時全力投入」"
        },
        {
          riskyWord: "抱怨美律不給延長留停才賭氣離職",
          safeReplacement: "說明美律專案緊湊無法繼續等候留停，彼此充分溝通理解下平和離職，展現高度成熟度與感恩心態"
        }
      ];

      return {
        fullScript,
        opening,
        pivot,
        closing,
        redlineAvoided,
        interviewerPsychology:
          "外商用人主管與 HR 核心評估：主管問『若美律問你要不要回去，你會回去嗎？』通常有三大心理考量：① 測試跳槽穩定度與回任風險（會不會做沒多久又回老東家？）；② 確認家庭生活與身心狀態（留停照顧家人的狀況是否已穩定？是否能全心投入高強度專案？）；③ 驗證對史丹利的專一性（是否真心想投入手工具包裝，而非暫時落腳）。本回答完美做到了『明確表明完全不考慮回任』＋『說明生病留停陪家人、理解公司無法等待後和平離職』＋『證實生活工作平衡極佳、節奏良好精力充沛』＋『展現對史丹利重型五金全新舞台的強烈拉力』，徹底消除主管疑慮並強化錄取信任度！",
        isAiEnhanced: false
      };
    }

    if (hasPPWR) {
      const opening =
        "「在現職久鼎金屬服務期間，我非常感謝主管與團隊給予的高度信任與發揮空間，讓我有機會主導關鍵的自行車全紙化無塑包裝專案，並深研歐盟新版 PPWR 包裝與包裝廢棄物法規，不僅累積了 SolidWorks 3D 結構建模、ISTA 1A 國際落摔測試與無膠專利研發實戰，更建置了跨部門無塑包裝資料庫。」";

      const pivot =
        "「在深入推進歐盟 PPWR 合規實務的過程中，我深刻體會到新法規對結構工程師提出的嚴苛量化標準：從運輸與電商包裝空隙率強制不得超過 50%、非剛性緩衝材全數視同空隙，到 2030 年可回收性 DfR 必須衝上 Grade A 至 C（≥80% 准入門檻），並嚴格管控附屬材料 MSDS 水溶性散漿膠水、無碳黑 NIR 光學分揀油墨與 PFAS 禁令。這些法規指標若要真正產生規模化效益，必須依託在出貨量龐大、具備全球供應鏈規模且高度重視專利壁壘的國際品牌商舞台。然而在傳統代工或區域製造體系中，較難全面支撐歐盟最高標準的綠色結構深耕。」";

      const closing =
        "「Stanley Black & Decker 作為全球五金工具龍頭，歐洲市場更是集團核心戰略版圖，GSMA 亞洲營運中心更具備強大的研發樞紐動能。我期望能直接將我在 3D CAD 最小化空隙率計算、紙板幾何懸浮吸能、Mono-material 單一材質化，以及 DoC 5 年技術檔案建立上的實戰即戰力，投入在史丹利百得的全球工具產品矩陣中，協助團隊在 2030 PPWR 浪潮中搶先樹立世界級綠色合規標竿！」";

      const fullScript = `${opening}\n\n${pivot}\n\n${closing}`;

      const redlineAvoided = [
        {
          riskyWord: "批評前東家不重視歐盟法規、不想花錢開模",
          safeReplacement: "轉化為「渴望依託全球百億級出貨量能，發揮 PPWR 極限結構優化與 DfR Grade A 的規模化價值」"
        },
        {
          riskyWord: "以為塞滿氣泡布或紙絲就能混過防摔測試",
          safeReplacement: "專業指出「PPWR 明訂非剛性緩衝材視同空隙，必須在 3D CAD 精算體積並靠幾何自鎖結構吸能」"
        },
        {
          riskyWord: "只談泛泛的環保口號卻提不出具體合規門檻",
          safeReplacement: "精準引用「空隙率 ≤50%、DfR Grade C ≥80% 准入門檻、MSDS 水溶性膠水與 5 年 DoC 技術檔案」展現大師級專業度！"
        }
      ];

      return {
        fullScript,
        opening,
        pivot,
        closing,
        redlineAvoided,
        interviewerPsychology:
          "外商用人主管與高層審核痛點：面試官最怕只會空談『環保愛地球』口號的候選人。這套回答展現了深水級的國際法規實戰力——精準掌握歐盟 PPWR 空隙率計算（非剛性填充材全算空隙）、DfR Grade A-C 回收評級、MSDS 水溶性散漿膠水與 5 年 DoC 技術檔案。用人主管能一眼看出候選人具備跨國品牌商的全球合規大局觀，能為史丹利百得防範鉅額歐盟退運與罰則風險！",
        isAiEnhanced: false
      };
    }

    const opening =
      "「在現職久鼎金屬服務期間，我非常感謝主管與團隊給予的高度信任與發揮空間，讓我有機會主導關鍵的自行車全紙化無塑包裝專案，並累積了扎實的 SolidWorks 結構建模、ISTA 1A 國際落摔測試認證，以及主動推動跨部門無塑包裝資料庫的實戰經驗。」";

    let pivotContextDescription = "";
    if (hasOrderDecline && hasRestructure && hasTransition) {
      pivotContextDescription = "面對終端市場景氣循環與接單狀況下滑，公司在轉型期中正推動組織裁撤整併與資源再聚焦";
    } else if (hasOrderDecline && hasTransition) {
      pivotContextDescription = "因應大環境市場需求調節與接單狀況下滑，公司正處於業務戰略轉型期";
    } else if (hasRestructure) {
      pivotContextDescription = "因應企業中長期營運戰略調整，內部正進行組織架構裁撤整併與資源精簡";
    } else if (hasInventory) {
      pivotContextDescription = "伴隨全球自行車產業進入後疫情庫存去化週期，公司進行產能調節與產品線梳理";
    } else {
      pivotContextDescription = `因應大環境產業供需循環與『${rawKw}』等客觀現況，公司內部正進行整體業務方向與戰略資源配置的再平衡`;
    }

    let pivot = "";
    let closing = "";

    if (angle === "growth") {
      pivot = `「不過，觀察到近期受整體大環境與市場供需循環影響，${pivotContextDescription}。身為第一線研發工程師，我非常理解企業在不同發展階段進行資源重置的必要性；但這也促使我跳脫短期舒適圈，積極檢視自己長遠的職涯路徑。我期盼能將累積的重型金屬零件防護與全紙化結構研發戰力，全心投注在一個營運體質穩健、具備清晰全球市場藍圖的世界級舞台。」`;
      closing =
        "「Stanley Black & Decker 身為全球手工具龍頭，亞洲 GSMA 營運中心更有著極強的跨國供應鏈整合實力與深厚底蘊。這正是我渴望能長期穩定深耕、與團隊一同樹立綠色包裝標竿的理想平台，我也能在到職第一天就為團隊注入防護結構與專利研發的即戰力。」";
    } else if (angle === "technical") {
      pivot = `「特別是在我近期主導推進『無膠環保包材結構專利』（已通過內部審查）、導入生成式 AI 渲染工作流，並深研歐盟 PPWR 包裝法規的過程中，我體會到前瞻包裝技術若要創造規模化效益，必須依託在龐大、高複雜度的全球產品矩陣。然而受到${pivotContextDescription}，現有專案資源難以支撐前瞻結構專利在海外市場的深度落地。」`;
      closing =
        "「史丹利百得以創新與 ESG 永續為核心 DNA，擁有豐富的工具專利壁壘。我渴望加入一個高度重視包裝工程資產與自動化量產可行性的世界級團隊，直接將我的無膠專利研發與提速能力，化為史丹利實質降本與開拓歐美通路的競爭優勢。」";
    } else {
      pivot = `「近期因應產業鏈調節，${pivotContextDescription}。身為工程師，我始終以成熟的商業視角看待組織調整；但同時，這也成為我主動迎向下一個專業里程碑的契機。我希望將成熟的結構防震、瓦楞紙托複合搭配與模組化經驗，對齊到更具全球抗風險體質與永續動能的領先企業。」`;
      closing =
        "「Stanley Black & Decker 擁有 170 多年跨越景氣週期的堅實韌性，並且在亞洲 GSMA 建立了完整的研發供應樞紐。我期望能運用我在金屬零件結構防護與跨部門賦能的專業，在此發揮穩健且持久的實質貢獻。」";
    }

    const fullScript = `${opening}\n\n${pivot}\n\n${closing}`;

    // Dynamic redline avoidance table according to the specific user input keywords
    const redlineAvoided: Array<{ riskyWord: string; safeReplacement: string }> = [];

    if (hasOrderDecline) {
      redlineAvoided.push({
        riskyWord: "批評前東家「接單狀況下滑、沒單做了、業績很慘」",
        safeReplacement: "客觀代換為「大環境終端市場供需循環下的業務節奏與產能調節」"
      });
    }

    if (hasRestructure) {
      redlineAvoided.push({
        riskyWord: "被動說「我們部門被組織裁撤了/公司在裁員」",
        safeReplacement: "轉化為「企業因應新階段戰略進行之組織架構整併與資源再聚焦」"
      });
    }

    if (hasTransition) {
      redlineAvoided.push({
        riskyWord: "抱怨「公司在轉型期內部很混亂、方向不明」",
        safeReplacement: "成熟歸因「理解企業在轉型升級過程中的階段性資源重置，促使自己主動尋求更寬廣的全球舞台」"
      });
    }

    if (hasInventory) {
      redlineAvoided.push({
        riskyWord: "消極提到「自行車庫存賣不掉、產業很低迷」",
        safeReplacement: "專業闡述「整體產業進入庫存去化週期，促使自己將通用結構防護專長對齊至更多元抗風險的五金工具領域」"
      });
    }

    if (hasBudget) {
      redlineAvoided.push({
        riskyWord: "抱怨「公司研發沒預算、縮編資源」",
        safeReplacement: "正面引導「現階段專案資源聚焦於短期目標，而自己渴望在具備規模化出貨量能的世界級舞台深耕」"
      });
    }

    // Default fallbacks if none matched
    if (redlineAvoided.length === 0) {
      redlineAvoided.push(
        {
          riskyWord: `受限於「${rawKw}」想逃跑或找安穩避風港`,
          safeReplacement: "客觀歸納為「大環境產業週期性調節下的組織戰略與資源重置」"
        },
        {
          riskyWord: "批評前東家接單不力或高層管理變動",
          safeReplacement: "轉化為「感謝前東家培育，主動對齊長期職涯發展拉力 (Pull Factor)」"
        },
        {
          riskyWord: "只談自身想找好待遇或高薪",
          safeReplacement: "錨定在「史丹利百年品牌穩定性與自身專利結構即戰力貢獻」"
        }
      );
    }

    return {
      fullScript,
      opening,
      pivot,
      closing,
      redlineAvoided,
      interviewerPsychology:
        "外商用人主管與 HR 核心評估：候選人展現了頂級外商極度看重的成熟商業格局（Business Acumen）與感恩忠誠素養——不道前東家是非、不傳遞辦公室八卦，將公司的「接單狀況下滑、組織裁撤、轉型期」客觀歸因於大環境循環，並在 20 秒內自然引導至追求卓越的『職涯拉力思維 (Pull Factor)』，大幅強化主管的信任度與錄取意願。",
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
      <div className="space-y-5 mb-6">
        {/* Main Section: Company Operational Status Keywords Input Box */}
        <div className="bg-stone-50/80 border border-stone-200 rounded-xl p-4 sm:p-5 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <label
              htmlFor="scenario-keywords-input"
              className="text-xs sm:text-sm font-bold text-stone-900 flex items-center space-x-1.5"
            >
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>輸入公司營運狀況關鍵詞（如：接單狀況下滑、組織裁撤、轉型期）</span>
            </label>
            <div className="flex items-center space-x-2 text-[11px] text-stone-500">
              <span>按 Enter 鍵可快速生成</span>
              {keywords && (
                <button
                  type="button"
                  onClick={() => setKeywords("")}
                  className="text-stone-500 hover:text-stone-800 underline ml-1"
                >
                  清空
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setKeywords("接單狀況下滑、組織裁撤、轉型期");
                  const res = synthesizeScenario("接單狀況下滑、組織裁撤、轉型期", focusAngle);
                  setGeneratedResult(res);
                }}
                className="text-amber-700 hover:text-amber-900 underline font-medium"
              >
                重設為經典範例
              </button>
            </div>
          </div>

          {/* Primary Text Input */}
          <div className="relative">
            <input
              id="scenario-keywords-input"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && keywords.trim()) {
                  handleInstantGenerate();
                }
              }}
              placeholder="請輸入公司營運狀況關鍵詞（例如：接單狀況下滑、組織裁撤、轉型期、自行車庫存去化...）"
              className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:border-amber-400 font-sans shadow-xs"
            />
          </div>

          {/* Quick preset template recommendations */}
          <div className="pt-0.5">
            <div className="text-[11px] font-semibold text-stone-600 mb-1.5 flex items-center space-x-1">
              <span>⚡ 一鍵套用常見營運情境組合：</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {presetTemplates.map((tpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setKeywords(tpl.value);
                    const res = synthesizeScenario(tpl.value, focusAngle);
                    setGeneratedResult(res);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                    keywords === tpl.value
                      ? "bg-amber-100 text-amber-900 border-amber-300 font-semibold"
                      : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-stone-300"
                  }`}
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Keyword quick-tag chips */}
          <div className="pt-1 border-t border-stone-200/80">
            <div className="text-[11px] font-semibold text-stone-600 mb-1.5 flex items-center space-x-1">
              <span>🏷️ 點擊快速疊加/移除單一關鍵詞標籤：</span>
            </div>
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
                        : "bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-100"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Focus Angle Switcher */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
            選擇說服切入角度 (Focus Angle)：
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                setFocusAngle("growth");
                const res = synthesizeScenario(keywords, "growth");
                setGeneratedResult(res);
              }}
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
              onClick={() => {
                setFocusAngle("technical");
                const res = synthesizeScenario(keywords, "technical");
                setGeneratedResult(res);
              }}
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
              onClick={() => {
                setFocusAngle("stability");
                const res = synthesizeScenario(keywords, "stability");
                setGeneratedResult(res);
              }}
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
        <div className="flex flex-wrap gap-2.5 pt-1">
          <button
            id="instant-generate-btn"
            type="button"
            onClick={handleInstantGenerate}
            disabled={isLoading || !keywords.trim()}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>⚡ 依此營運關鍵詞生成客觀積極說明草稿</span>
          </button>

          <button
            id="ai-generate-btn"
            type="button"
            onClick={handleAiGenerate}
            disabled={isLoading || !keywords.trim()}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-amber-300 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
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
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>客觀積極離職說明草稿 (逐字稿)</span>
              </span>
              <span className="text-[11px] font-medium bg-amber-50 text-amber-950 border border-amber-300/80 px-2.5 py-0.5 rounded-md flex items-center space-x-1">
                <Briefcase className="w-3 h-3 text-amber-600" />
                <span>已轉化營運狀況：「{keywords || "接單狀況下滑、組織裁撤、轉型期"}」</span>
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
