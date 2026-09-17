export interface StandardComparisonDimension {
  id: string;
  dimensionName: string;
  dimensionEn: string;
  importance: "關鍵指標" | "環境條件" | "機械應力" | "商業決策";
  astm: string;
  ista1a: string;
  ista2a: string;
  ista3a: string;
  stanleyNote: string;
}

export interface StandardProfile {
  id: "astm" | "ista1a" | "ista2a" | "ista3a";
  name: string;
  code: string;
  title: string;
  level: string;
  badgeColor: string;
  philosophy: string;
  coreStrengths: string[];
  limitations: string[];
  testSequence: { step: number; name: string; desc: string; parameters: string }[];
  sbdUseCases: string[];
  failureRisk: string;
  debugStrategy: string;
}

export interface FailureDebugItem {
  standard: "ISTA 1A" | "ISTA 2A" | "ISTA 3A" | "ASTM D4169";
  failureMode: string;
  failureEn: string;
  rootCause: string;
  engineeringFix: string;
  preventiveDesign: string;
}

export const STANDARDS_DIMENSIONS: StandardComparisonDimension[] = [
  {
    id: "philosophy",
    dimensionName: "標準定位與測試哲學",
    dimensionEn: "Core Positioning & Testing Philosophy",
    importance: "關鍵指標",
    astm: "共識型物流循環模擬 (Consensus Distribution Cycle)。由材料/物流專家制定，強調完整還原特定運輸路徑（DC 1~18）與三個嚴格保證等級 (Assurance Level I/II/III)。",
    ista1a: "非環境模擬完整性初篩 (Non-Simulation Integrity)。最基本入門標準，只檢驗包裝與產品是否具有基本牢固度，不模擬真實世界的危害。",
    ista2a: "部分環境模擬 (Partial Simulation)。跨入真實運輸的過渡門檻，在 1A 基礎上疊加「大氣溫濕度預調理」與動態堆疊，模擬長途倉儲海運受潮。",
    ista3a: "通用全真環境模擬 (General Simulation)。全面還原單件包裹配送系統（FedEx / UPS / 電商快遞）的高頻拋摔、自動分揀滑梯衝擊與動態頂載震動。",
    stanleyNote: "SBD 新產品打樣先以 1A 快速除錯；大貨海運整櫃外銷必過 2A；北美電商宅配或 Home Depot Direct 必過 3A 或 ISTA 6；重大投標指定 ASTM D4169。"
  },
  {
    id: "vibration",
    dimensionName: "震動測試型態與頻譜",
    dimensionEn: "Vibration Test Methodology & Profile",
    importance: "機械應力",
    astm: "隨機震動 (Random Vibration)。依據公路卡車、鐵路、空運真實 PSD (功率譜密度) 頻譜加載，可選加頂部配重模擬長途顛簸共振。",
    ista1a: "固定位移旋轉跳箱震動 (Rotary / Fixed Displacement)。1 英吋 (25.4mm) 峰對峰行程，固定頻率約 4.5Hz，試件離台需可插入 1.6mm 塞尺，通常累計 14,200 次跳動。",
    ista2a: "隨機震動 (Random Vibration) 或旋轉震動。現代實驗室多採用寬頻 PSD 隨機震動，真實激發包裝共振頻率。",
    ista3a: "多階段隨機震動 (Random Vibration with & without Top Load)。含頂部負載 (Top Load) 加壓震動，模擬貨車內部被上方重物壓迫時的劇烈彈跳與剪力。",
    stanleyNote: "固定位移 1A 容易讓內部卡扣浮起脫落；3A 的頂部負載震動最容易磨損五金表面高光塗裝，需用平滑內襯或保護膜包覆。"
  },
  {
    id: "conditioning",
    dimensionName: "大氣溫濕度預調理",
    dimensionEn: "Atmospheric Conditioning (Temp & Humidity)",
    importance: "環境條件",
    astm: "可選配嚴格 Schedule A 溫濕度循環。可指定熱帶潮濕 (38°C / 85% RH)、極寒冷凍 (-29°C)、沙漠乾燥 (60°C / 15% RH) 等多氣候曲線。",
    ista1a: "無強制溫濕度要求。僅需在實驗室常溫常濕 (23°C ± 1°C, 50% ± 2% RH) 放置平衡即可直接測試。",
    ista2a: "強制執行大氣預調理與 72 小時嚴苛環境循環。通常經過極限溫濕度烘烤或潮濕箱考驗後，立刻進行後續機械抗壓與落摔。",
    ista3a: "強制環境預調理 (Pre-conditioning & Conditioning)。依配送目標市場挑選專用溫濕度剖面（常溫、熱帶濕熱、冷凍），檢驗包材吸濕後之抗衝擊衰減。",
    stanleyNote: "亞洲跨太平洋海運航程需 3~5 週，貨櫃內濕度常破 85%，瓦楞紙 BCT 會暴降 40%~50%，2A/3A 的溫濕度考驗是防範海運軟箱塌陷的核心關鍵。"
  },
  {
    id: "drop",
    dimensionName: "跌落衝擊測試序列",
    dimensionEn: "Drop & Shock Testing Sequence",
    importance: "機械應力",
    astm: "依 Schedule A (Handling) 規範。依包裝件重量、尺寸與 Assurance Level 計算跌落高度，含手動搬運落摔與機械傾斜跌落。",
    ista1a: "固定 10 次指定跌落序列：1 最脆弱角 ➔ 3 條最短棱 ➔ 6 個面。落摔高度依產品重量分階（例：<10kg 為 760mm，10~19kg 為 610mm）。",
    ista2a: "10 次跌落（順序同 1A）。但必須在經歷嚴苛溫濕度循環與抗壓載荷後實施，考驗包裝材料老化受潮後的剩餘韌性。",
    ista3a: "嚴密 17 次複合衝擊序列：包含基本角稜面跌落、危險障礙物衝擊 (Hazard Impact 跌落於木塊上)、旋轉跌落 (Rotational Drop) 與橋式衝擊。",
    stanleyNote: "手工具金屬尖銳端在跌落時會產生點衝擊。3A 的危險障礙物衝擊最容易造成外箱局部穿刺，內部刀模需規劃局部抗穿刺防護墊片。"
  },
  {
    id: "compression",
    dimensionName: "堆疊與抗壓測試 (BCT)",
    dimensionEn: "Compression & Stacking Strength",
    importance: "機械應力",
    astm: "Schedule B (Warehouse Stacking) 或 Schedule C (Vehicle Stacking)。依時間、溫度、濕度加載精密計算之安全係數靜態或動態載荷。",
    ista1a: "無強制機台抗壓測試。僅可選配簡易靜態死重加載計算，無法真實評估長時動態壓潰。",
    ista2a: "強制機台動態抗壓測試 (Machine Compression Test) 或加壓堆疊測試，測定紙箱在極限疲勞下的實際抗壓下陷量。",
    ista3a: "震動時直接施加頂部動態載荷 (Top Load Vibration)。直接以等效載荷壓在箱頂進行隨機震動，動態考驗側壁邊壓強度 (ECT)。",
    stanleyNote: "堆疊塌箱最常發生在 2A。設計時需套用 McKee 公式並將安全裕度定在 4.5~5.0 倍，確保瓦楞楞向垂直受力一致。"
  },
  {
    id: "scenarios",
    dimensionName: "適用通路與物流情境",
    dimensionEn: "Target Distribution Channel & Logistics",
    importance: "商業決策",
    astm: "跨國複合聯運全供應鏈。適合大型零售合約、國防軍工、高精密度工具儀器，能由工程師依特定物流渠道自訂 Distribution Cycle。",
    ista1a: "出廠品質快篩與基礎驗證。適合工廠生產線日檢、早期結構打樣原型快速比對、棧板整裝完整度確認。",
    ista2a: "長途海運貨櫃與區域發貨中心 (B2B 整櫃/拼箱)。防範貨櫃內部跨氣候帶冷凝水（貨櫃雨 Container Rain）與多層棧板堆疊重壓。",
    ista3a: "電商直配與單件包裹快遞 (B2C / D2C)。防範 FedEx / UPS 分揀系統翻滾、投遞拋摔、自動輸送帶卡阻與小包裹壓迫。",
    stanleyNote: "SBD 的 DEWALT 或 CRAFTSMAN 電動工具走 Amazon 或官網宅配時必須走 3A；一般手工具整棧板外銷 Home Depot 門市則對標 2A/ASTM。"
  },
  {
    id: "cost_time",
    dimensionName: "實驗室測試成本與週期",
    dimensionEn: "Testing Cost & Turnaround Time",
    importance: "商業決策",
    astm: "週期約 5~7 天。費用中高，需設定具體 DC 循環與 Assurance Level，報告詳盡具法律與國際招標背書力。",
    ista1a: "週期約 0.5~1 天。費用最低、設備門檻低（傳統固定跳箱與落摔機即可），通常用於內部敏捷開發迭代。",
    ista2a: "週期約 4~6 天（溫濕度預調理需 72 小時）。費用中等，需恆溫恆濕環境箱與伺服壓力機。",
    ista3a: "週期約 5~8 天。費用最高，需高階多軸電動隨機震動台、配重夾具與全套危險物衝擊落摔台。",
    stanleyNote: "前期專案如果每個打樣都送 3A 會拖垮開發預算與交期。正確策略是『內部 1A 先過 ➔ 送第三方實驗室跑 2A 或 3A 認證』。"
  }
];

export const STANDARDS_PROFILES: StandardProfile[] = [
  {
    id: "ista1a",
    name: "ISTA 1A",
    code: "ISTA Series 1",
    title: "非環境模擬完整性測試 (Integrity Test)",
    level: "入門篩檢階 (Screening)",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    philosophy: "ISTA 最歷史悠久的基礎試驗。設計初衷並非『模擬真實運輸』，而是作為一道『快速篩選過濾網』，檢視包裝系統（外箱+內襯+產品）在受到劇烈機械衝擊時是否會直接散架、破裂或卡扣爆開。",
    coreStrengths: [
      "測試週期極短（半天即可出初步結果），耗費成本最低",
      "設備要求單純（旋轉跳箱 + 自由落摔機），一般工廠品管實驗室即可自檢",
      "極適合結構包裝工程師在 SolidWorks 初版刀模打樣時，快速驗證自鎖卡扣與楞向剛性"
    ],
    limitations: [
      "無溫濕度環境考驗，完全無法預警海運受潮瓦楞箱軟化塌陷",
      "固定位移 1 英吋跳動過於粗暴簡化，無法呈現真實卡車路面寬頻隨機震動頻譜",
      "通過 1A 不代表在真實 FedEx / 海運中能零客訴，不可作為高風險專案的唯一保證"
    ],
    testSequence: [
      { step: 1, name: "常溫常濕平衡", desc: "在標準實驗室大氣條件下放置至少 24 小時", parameters: "23°C ± 1°C, 50% RH" },
      { step: 2, name: "固定位移震動", desc: "以 1 英吋行程旋轉跳動，達到 14,200 次振動循環", parameters: "約 4.5 Hz, 試件可穿過 1.6mm 塞尺" },
      { step: 3, name: "自由落摔衝擊", desc: "依規定重量執行 1 角、3 稜、6 面共 10 次指定落摔", parameters: "<10kg: 760mm; 10-19kg: 610mm" }
    ],
    sbdUseCases: [
      "五金手工具全新結構刀模初次打樣驗證",
      "工廠生產線每日出貨前之批次抽檢防呆",
      "低單價、不易碎、內銷短程配送之基本五金包裝"
    ],
    failureRisk: "旋轉跳動導致內部自鎖卡扣脫位，或金屬起子頭在第 1 角落摔時直接戳穿瓦楞底紙。",
    debugStrategy: "增加公母卡扣反扣深度（由 3mm 增至 5mm），加長瓦楞折白搭接面，並在尖銳端增加沖切緩衝受力翼片。"
  },
  {
    id: "ista2a",
    name: "ISTA 2A",
    code: "ISTA Series 2",
    title: "部分環境模擬性能測試 (Partial Simulation)",
    level: "進階海運階 (Ocean & Storage)",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    philosophy: "結合了 1 系列的篩選嚴格度與 3 系列的真實環境模擬。最大突破在於引入了『強制溫濕度極限調理』與『動態機台抗壓測試』，專為防範長途海運跨氣候帶運送中的材料強度衰退與堆疊壓潰。",
    coreStrengths: [
      "精確暴露瓦楞紙板受潮後的抗壓強度 (BCT) 衰減曲線",
      "動態下壓測試能真實檢驗堆疊在貨櫃底層最下排箱體的結構持久力",
      "兼具高信賴度與適中成本，是外商跨國採購與製造基地對標長途海運的首選標準"
    ],
    limitations: [
      "溫濕度調理需佔用 72 小時環境箱，測試週期拉長至 4~6 個工作天",
      "對單件包裹分揀摔落的模擬仍不如 3A 詳盡，不適合作為電商宅配唯一的驗收標竿"
    ],
    testSequence: [
      { step: 1, name: "大氣預調理", desc: "試驗前先於標準條件下調濕平衡", parameters: "23°C ± 1°C, 50% RH (6 小時)" },
      { step: 2, name: "極端大氣調理", desc: "依產品特性置入恆溫恆濕箱執行 72 小時極端環境考驗", parameters: "常用：38°C / 85% RH (熱帶濕熱) 或 60°C 高溫" },
      { step: 3, name: "動態機台抗壓", desc: "以抗壓試驗機施加持續載荷，檢驗受潮後的臨界屈服點", parameters: "依公式計算之抗壓負載 (BCT) 或加壓堆疊" },
      { step: 4, name: "震動試驗", desc: "可選擇隨機震動 PSD 或固定位移震動", parameters: "隨機震動時長約 30~60 分鐘" },
      { step: 5, name: "自由跌落", desc: "在受潮與受壓狀態下執行 10 次指定順序落摔", parameters: "高度依總重分階" }
    ],
    sbdUseCases: [
      "亞洲 GSMA 跨太平洋海運出口至北美或歐洲的整櫃/拼箱手工具",
      "需在港口倉庫或大型物流中心堆疊存放超過 3 個月之五金產品",
      "採用全紙化綠色包材、無膠卡扣，需驗證高溫高濕下雙面膠不脫膠、紙托不軟化"
    ],
    failureRisk: "在 38°C/85%RH 烘烤 72 小時後，瓦楞纖維軟化，機台抗壓下陷量超標，外箱四角垂直折線爆裂塌陷。",
    debugStrategy: "將外箱材質由單坑 B 楞升級為 BC 雙瓦楞；面紙改用防潮撥水牛皮紙；SolidWorks 內部折件強化垂直立柱，分擔 30% 以上的垂直抗壓載荷。"
  },
  {
    id: "ista3a",
    name: "ISTA 3A",
    code: "ISTA Series 3",
    title: "通用包裹配送全真模擬 (Parcel Simulation)",
    level: "頂級電商階 (E-commerce / Courier)",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    philosophy: "目前全球包裹快遞（FedEx / UPS / DHL / Amazon）公認最具挑戰性與真實度的黃金標準。全面模擬包裹在無棧板保護下，在高速自動分揀輸送帶、滾筒滑梯、快遞貨車彈跳以及人手粗暴拋投下的嚴酷環境。",
    coreStrengths: [
      "隨機震動結合『頂部動態載荷 (Top Load)』，完美還原車廂中上方被大包裹壓住彈跳的真實受力",
      "17 次衝擊序列包含危險障礙物衝擊 (Hazard Impact) 與旋轉落摔，極致考驗邊角防護",
      "通過 3A 幾乎等於拿到全球電商通路與快遞巨頭的免死金牌，退貨破損率通常可降至 0.1% 以下"
    ],
    limitations: [
      "設備門檻極高，必須具備大行程多軸隨機震動台與伺服控制頂載夾具",
      "測試標準極度嚴苛，過度設計 (Over-packaging) 的風險較高，需要工程師精準計算材料配比以兼顧成本"
    ],
    testSequence: [
      { step: 1, name: "溫濕度預調理", desc: "選定目標物流氣候帶進行大氣調節", parameters: "依溫濕度表執行標準調理" },
      { step: 2, name: "無頂載隨機震動", desc: "模擬空載車廂震動，測試內部零件共振", parameters: "約 60 分鐘隨機振動 PSD" },
      { step: 3, name: "帶頂載隨機震動", desc: "在包裝箱頂加載配重模擬上方壓物，同步隨機震動", parameters: "計算頂部動態載荷 (Top Load)" },
      { step: 4, name: "嚴格跌落序列 (17 次)", desc: "包含底面、長邊、短邊、棱角、旋轉跌落及危險物衝擊", parameters: "落摔高度依包裹重量分段 (最高達 910mm)" },
      { step: 5, name: "低壓減壓試驗 (空運選配)", desc: "模擬高空機艙低氣壓膨脹效應", parameters: "60 kPa 減壓維持 1 小時" }
    ],
    sbdUseCases: [
      "DEWALT、STANLEY 重型電動工具（起子機、電鋸、砂輪機）電商單件包裹直送 (D2C)",
      "含鋰電池組、精密無刷馬達之高單價工具套裝，防範分揀撞擊引發短路與外殼碎裂",
      "Amazon FBA 直發或 Home Depot 官網宅配之單件快遞包裝"
    ],
    failureRisk: "在頂載隨機震動中，重型馬達劇烈上下跳動磨穿內襯；或在危險物衝擊時，硬角直接撞穿彩盒視窗保護膠片。",
    debugStrategy: "採用一體成型瓦楞風琴折疊緩衝區 (Accordion Crumple Zone)，將尖銳金屬重心鎖定在箱體中心幾何軸，預留 15mm 變形吸能緩衝行程，表面覆蓋抗磨平滑膜。"
  },
  {
    id: "astm",
    name: "ASTM D4169",
    code: "ASTM Standard",
    title: "運輸包裝容器與系統性能測試標準",
    level: "共識權威階 (Consensus Standard)",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
    philosophy: "由美國材料試驗協會制定的全方位共識標準。不將包裝視為死板的固定流程，而是提供 18 種不同的分銷循環 (Distribution Cycles, DC 1 到 DC 18)，讓工程師根據產品真實物流網絡（如卡車整運、鐵路、空運、單件包裹）像搭積木一樣配置測試項目，並提供 3 種嚴謹度保證水準。",
    coreStrengths: [
      "高度模組化與客製化：涵蓋 DC-1 到 DC-18，能精準對應各種跨國海陸空複合物流情境",
      "提供三級保證水準 (Assurance Level I: 嚴苛軍規/高價值; Level II: 標準商業; Level III: 寬鬆經濟)，方便工程師根據產品價值做性價比決策",
      "國際公信力極高，是歐美大型企業、政府標案與法律責任歸屬上的權威仲裁標準"
    ],
    limitations: [
      "標準條文龐大複雜，工程師需對物流鏈有深厚理解才能正確選擇對應的 Schedule 與參數",
      "缺乏像 ISTA 那樣統一且具備品牌辨識度的認證標籤 (Transit Tested Mark)"
    ],
    testSequence: [
      { step: 1, name: "選擇分銷循環", desc: "從 DC-1 (棧板) 到 DC-18 中挑選對應物流情境 (如單件包裹選 DC-13)", parameters: "選定 DC-13 或 DC-3" },
      { step: 2, name: "設定保證水準", desc: "選定 Assurance Level I (嚴格), Level II (一般商業), Level III (寬鬆)", parameters: "標準工業多選 Level II" },
      { step: 3, name: "環境預調理 (Schedule A)", desc: "依設定之溫濕度曲線調濕", parameters: "依合約規格自訂" },
      { step: 4, name: "機械搬運與跌落 (Schedule A)", desc: "手動搬運自由跌落或危險跌落", parameters: "依高度與次數表執行" },
      { step: 5, name: "車廂/倉庫堆疊 (Schedule B/C)", desc: "靜態或動態抗壓下陷量測試", parameters: "精確代入安全係數" },
      { step: 6, name: "隨機震動 (Schedule D/E)", desc: "依公路卡車 (Truck) 或航空 (Air) PSD 頻譜震動", parameters: "通常 180 分鐘隨機震動" }
    ],
    sbdUseCases: [
      "重大跨國零售商合約招標 (如 The Home Depot, Lowe's 全美供應鏈統包審查)",
      "需同時評估公路長途運輸、鐵路調車衝擊與跨國海運的複合型專案",
      "高單價專業測量儀器、激光水平儀等極端怕震五金工具的可靠度定型"
    ],
    failureRisk: "在 Schedule D 公路震動長時間頻譜下，固定螺絲因微振動鬆脫，或塑料外殼產生疲勞微裂紋。",
    debugStrategy: "針對產品自振頻率（Natural Frequency）進行避頻設計，調校瓦楞結構阻尼係數，避免共振放大 G 值超過產品脆值 (Fragility)。"
  }
];

export const FAILURE_DEBUG_CASES: FailureDebugItem[] = [
  {
    standard: "ISTA 1A",
    failureMode: "固定位移震動跳動時，內襯自鎖卡扣鬆開彈起，產品散落箱內碰撞受損",
    failureEn: "Self-locking tabs disengaged during rotary bounce vibration",
    rootCause: "旋轉跳動產生連續垂直離地衝擊，單插耳卡扣缺乏逆向卡止結構，在縱向慣性力作用下逐步被震退脫位。",
    engineeringFix: "在 SolidWorks 中將平面卡扣改為『逆刺雙重自鎖倒鉤 (Double Reverse Locking Tab)』，並縮小折線沖切切縫，增加咬合阻尼感。",
    preventiveDesign: "卡扣處的紙板折彎公差控制在 ±0.3mm 內，並利用產品自身的重力壓制在自鎖翼片上方形成被動互鎖。"
  },
  {
    standard: "ISTA 2A",
    failureMode: "在 72 小時高溫高濕調理後，機台動態抗壓測試發生箱角折潰塌陷 (BCT 下滑 52%)",
    failureEn: "Box compression collapse after 72hr tropical conditioning (38°C/85% RH)",
    rootCause: "瓦楞紙板受潮吸水率超過 12%，植物纖維氫鍵減弱，邊壓強度 (ECT) 劇降，導致外箱四個垂直承重角喪失支撐剛性。",
    engineeringFix: "外箱改採高基重防潮牛皮面紙（加施表面防水劑），將楞型由單坑 B 楞提升為 BC 雙瓦楞；內襯折紙新增垂直三角支撐柱，分擔 35% 堆疊垂直載荷。",
    preventiveDesign: "在初期計算 McKee 抗壓公式時，環境衰減係數從一般的 2.5 提高至 4.5~5.0 倍，確保極限受潮下仍有安全裕度。"
  },
  {
    standard: "ISTA 3A",
    failureMode: "頂載隨機震動中，重型金屬工具高光烤漆面與瓦楞紙產生嚴重反覆摩擦白斑磨痕",
    failureEn: "Fretting wear and abrasion on metal coating under top-load random vibration",
    rootCause: "頂部載荷壓迫使彩盒頂蓋下陷，配合隨機寬頻震動時產生的微振幅滑移，紙板粗糙纖維如砂紙般反覆研磨產品漆面。",
    engineeringFix: "接觸面全面取消內面過水油（避免水油塗層微粉化），改用高密度平滑乾壓紙托或貼覆 PE 靜電保護膜；內襯幾何間隙由 ±1.5mm 收斂至 ±0.2mm 零晃動。",
    preventiveDesign: "在 SolidWorks 建模中設計階梯式阻尼限位槽，將工具的剛性金屬外殼與瓦楞面隔離，以軟性紙托接觸。"
  },
  {
    standard: "ASTM D4169",
    failureMode: "Schedule D (Truck Profile) 長時間公路隨機震動後，外箱提把孔受撕裂破裂",
    failureEn: "Handle hole tearing under Schedule D extended truck random vibration",
    rootCause: "長時間低頻大振幅晃動下，箱內重型工具重心偏向提把側，提把切口處應力高度集中，且沖切轉角處為直角缺乏圓角過渡。",
    engineeringFix: "提把沖切孔轉角處全部加入 R3.0mm 圓角消除應力集中；在提把背面內襯貼覆一片加強型高抗撕裂強化膠帶 (Reinforcing Tape) 或加厚雙層瓦楞折邊。",
    preventiveDesign: "規劃包裝整體幾何重心時，利用內襯配重將產品幾何重心精準配置在外箱幾何中心點，避免偏重偏載。"
  }
];

export const INTERVIEW_SCRIPT_ASTM_ISTA = {
  titleZh: "面試官必考題：請深度解析 ASTM 與 ISTA 1A、2A、3A 測試標準的核心差異？在 Stanley Black & Decker 會如何選用？",
  titleEn: "Mastering Packaging Standards: ASTM vs. ISTA 1A, 2A, and 3A - Interview Pitch & SBD Strategy",
  speechScriptZh: `「面試官您好，ASTM 與 ISTA 是包裝工程領域最關鍵的兩大體系，而 ISTA 1A、2A、3A 更是從『基礎強度篩選』逐步演進到『嚴苛全真模擬』的經典梯度。我將它們的核心差異與實務選型歸納為三個維度：

第一，測試哲學與嚴苛度的梯度差異：
1. ISTA 1A 是『非環境模擬的完整性初篩』：它只用固定位移 1 吋的旋轉跳箱與 10 次指定落摔，檢驗結構本身會不會直接解體，沒有溫濕度要求，週期最快，適合初版 SolidWorks 刀模打樣驗證與產線每日防呆。
2. ISTA 2A 是『部分環境模擬』：它跨入了真實海運的起點，核心是增加了 72 小時極限溫濕度調理（如 38°C/85%RH）與機台動態抗壓，專門防範跨太平洋長途海運中瓦楞箱受潮軟化塌陷（箱潰）。
3. ISTA 3A 則是『通用包裹全真模擬』：專門針對現代電商小包裹與快遞（FedEx/UPS/Amazon）。它採用多階段隨機震動，並在震動時施加頂部負載（Top Load），還包含危險物衝擊與 17 次複合落摔，真實還原自動分揀機滑梯與貨車壓迫的嚴酷場景。
4. ASTM D4169 則是『共識型物流循環標準』：它由跨領域專家制定，提供 DC-1 到 DC-18 的物流循環模組，並分為 Level I、II、III 三種保證水準，適合跨國多式聯運（陸、海、空）客製化模擬與大客戶合約招標。

第二，在 Stanley Black & Decker (SBD) 的實務選型策略：
• 手工具打樣與內銷基本品：以 ISTA 1A 快速除錯，在 24 小時內迭代自鎖卡扣與楞向剛性。
• 亞洲 GSMA 出口至北美與歐洲的整櫃/拼箱手工具：必過 ISTA 2A，嚴格把關高溫高濕下瓦楞 BCT 抗壓下陷量，安全係數設定在 4.5 倍以上。
• DEWALT、STANLEY 重型電動工具的電商與單件直配 (D2C)：必過 ISTA 3A 或 ISTA 6-Amazon，防範馬達在頂載隨機震動中磨損漆面，或跌落時造成外殼碎裂。
• 全美大型零售合約（如 The Home Depot、Lowe's）：依客戶要求提供 ASTM D4169 DC-13 檢驗報告。

第三，我的除錯實戰經驗：
在過去全紙化與金屬零件專案中，我曾針對 2A 溫濕度後堆疊下陷，透過調整面紙耐破基重、升級 BC 雙瓦楞與垂直立柱補強成功過關；針對 3A 頂載震動磨痕，則透過無膠自鎖限位槽消除晃動間隙、改用平滑紙托取代過水油，在不增加單件成本的前提下全數通過認證。這套標準化選型與除錯邏輯，能讓我到職後立刻為團隊把關全球品質與成本。」`,
  speechScriptEn: `“When comparing ASTM and the ISTA Series—specifically 1A, 2A, and 3A—the fundamental distinction lies in testing philosophy, environmental conditioning, and real-world hazard fidelity.

1. ISTA 1A is a 'Non-Simulation Integrity Test'. It uses fixed-displacement rotary vibration (1-inch peak-to-peak bounce at ~4.5 Hz) and a standard 10-drop sequence. It does not simulate actual road profiles and has no atmospheric conditioning. Its primary purpose is rapid structural screening during initial SolidWorks prototype iterations and factory QA.

2. ISTA 2A represents 'Partial Simulation'. It bridges basic screening and full simulation by introducing mandatory atmospheric conditioning (such as 72 hours at 38°C / 85% RH) and machine compression testing. This specifically targets the risk of corrugated box softening and collapse caused by humidity during long-haul trans-Pacific ocean freight.

3. ISTA 3A is 'General Simulation' for the parcel delivery environment (e.g., FedEx, UPS, Amazon). It utilizes broad-band random vibration with a dynamic top load (simulating packages bouncing under heavy freight above), coupled with a rigorous 17-impact drop sequence including hazard drops. It is the ultimate benchmark for power tools sold via e-commerce and retail parcel channels.

4. ASTM D4169 is a 'Consensus Distribution Cycle Standard'. It allows packaging engineers to tailor sequences across 18 distinct distribution cycles (DC 1 to DC 18) with three assurance levels (Level I, II, III). It is highly respected for enterprise contracts and multi-modal freight audits (e.g., The Home Depot and Lowe's global tenders).

At Stanley Black & Decker, my deployment strategy is systematic:
• Rapid Prototype Screening: ISTA 1A for fast, cost-effective structure validation.
• GSMA Ocean Freight Shipments: ISTA 2A to ensure corrugated safety margins (Safety Factor ≥ 4.5) against humidity.
• Power Tools & E-Commerce Direct Shipments: ISTA 3A to eliminate fretting wear and drop impact risks on heavy brushless motors and battery packs.
• Key Account Contracts: ASTM D4169 compliance for global retail supply chain audits.

With my hands-on troubleshooting experience in structural paperboard, flute orientation optimization, and G-force attenuation, I can immediately safeguard product reliability while optimizing Total Cost of Ownership (TCO).”`
};

export const DROP_TEST_BENCHMARKS = {
  title: "落下測試 (Drop Test) 基準數據",
  source: "Micom Laboratories / ITM-LAB",
  description: "落下高度會依據包裹的「總重量」遞減。對於 10 公斤以下的輕型電子產品，ISTA 1A 與 2A 採用較為單純的固定高度測試；而 3A 則模擬真實搬運，會在一組序列中交替使用不同高度。",
  rows: [
    {
      weightRange: "0 - 10 公斤",
      ista1a: "760 mm",
      ista2a: "970 mm",
      ista3a: "大多數落下為 460 mm (特定面會進行 910 mm 的極端落下)"
    },
    {
      weightRange: "10 - 19 公斤",
      ista1a: "610 mm",
      ista2a: "810 mm",
      ista3a: "同上，依序列調整。"
    },
    {
      weightRange: "總跌落次數",
      ista1a: "10 次 (1角, 3稜, 6面)",
      ista2a: "10 次",
      ista3a: "17 次 (分為震動前與震動後兩階段)"
    }
  ],
  structuralInsight: "結構設計洞察：雖然 1A/2A 的單次要求高度較高（760~970 mm），但 3A 高達 17 次的反覆衝擊（460 mm）更容易導致瓦楞紙箱的『疲勞破損』。緩衝材（如 EPE 或紙塑）的設計不能只看單次最大抗衝擊，還需評估多次形變後的恢復率。"
};

export const VIBRATION_TEST_BENCHMARKS = {
  title: "震動測試 (Vibration Test) 基準數據",
  source: "Scribd / Packaging Testing Engineering",
  description: "震動測試是導致內部卡榫斷裂或表面磨損的主因。1A 使用固定位移，而 3A 則採用高頻率的「隨機震動」，完全還原貨車與飛機的引擎及路面顛簸。",
  rows: [
    {
      param: "震動模式",
      ista1a: "固定位移 (Fixed Displacement)",
      ista3a: "隨機震動 (Random Vibration)"
    },
    {
      param: "位移幅度",
      ista1a: "25.4 mm (1 英寸) 峰對峰值",
      ista3a: "依據 PSD 功率譜密度曲線調整"
    },
    {
      param: "頻率範圍",
      ista1a: "約 2 ~ 5 Hz (低頻)",
      ista3a: "1 ~ 200 Hz (廣頻)"
    },
    {
      param: "震動強度",
      ista1a: "總計 14,200 次震動衝擊",
      ista3a: "陸運配置：0.53 Grms\n空運配置：1.05 Grms"
    },
    {
      param: "頂部載荷",
      ista1a: "無",
      ista3a: "有 (模擬震動時上方疊加其他貨物)"
    }
  ]
};

export const MODULE_COMPARISON_BENCHMARKS = [
  {
    module: "跌落 (Drop)",
    ista1a: "▶ 基本衝擊：固定高度跌落 10 次",
    ista2a: "溫濕度預處理 + 重力調配跌落",
    ista3a: "隨機自由跌落 + 邊角傾倒 + 面衝擊",
    requirementDetail: "強制項目 (基礎強度)"
  }
];

export interface PhilosophyComparisonRow {
  dimension: string;
  ista: string;
  astm: string;
}

export const CORE_PHILOSOPHY_COMPARISON: PhilosophyComparisonRow[] = [
  {
    dimension: "組織焦點",
    ista: "專注於「運輸包裝」。以保護產品在物流中不破損為唯一目標。",
    astm: "廣泛的材料與工程標準。包裝測試只是其龐大標準庫（如 ASTM D4169）的一部分。"
  },
  {
    dimension: "測試邏輯",
    ista: "套裝化 (Prescriptive)。例如選擇 3A，就必須嚴格照著既定順序（溫濕度 ➔ 震動 ➔ 落下）全部做完，參數固定。",
    astm: "模組化、高度客製 (Performance-based)。允許工程師根據實際物流狀況，自由挑選測試模組並自定義參數。"
  },
  {
    dimension: "認證與標章",
    ista: "測試通過後，可申請使用 ISTA 認證標章 (Transit Tested Mark) 印在外箱上，具備極高的商業識別度。",
    astm: "無專屬的包裝通過標章。主要作為工程設計驗證與合規報告使用。"
  }
];

export const REPRESENTATIVE_STANDARDS_COMPARISON = {
  sectionTitle: "2. 代表性標準比較：ISTA 3A vs. ASTM D4169",
  intro: "在實務上，最常被拿來比較的是 ISTA 3A（一般模擬試驗）與 ASTM D4169（運輸包裝性能測試標準實踐）。",
  astm: {
    name: "ASTM D4169 的特色：",
    badge: "模組化循環",
    desc: "它提供了一個龐大的「保證等級 (Assurance Level I, II, III)」與「分配週期 (Distribution Cycle, 共有18種)」。作為結構工程師，你可以依據產品是走海運、鐵路還是空運，自由拼湊需要的測試環境。如果你知道某個航線的震動頻率特別特殊，ASTM 允許你微調參數來極限測試緩衝材。"
  },
  ista: {
    name: "ISTA 3A 的特色：",
    badge: "情境套裝化",
    desc: "它已經幫你把電商、快遞等常見情境「打包」好了。不需要工程師自己去猜測參數，只要產品重量與尺寸確定，標準就寫得清清楚楚。這對於需要快速獲得大廠（如 Amazon, 沃爾瑪）認可的供應商來說，效率最高。"
  }
};

