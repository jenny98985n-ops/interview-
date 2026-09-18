export type QuestionCategory =
  | "all"
  | "structure"           // 結構設計與材質工藝
  | "testing"             // ISTA 測試與品質把關
  | "cost_logistics"      // 成本工程與打棧物流
  | "project_risk"        // 專案管理與交期風險
  | "collaboration"       // 跨部門協調與合作
  | "culture_motivation"  // 外商動機與文化跨度
  | "career_strategy"     // JD 擊破與薪資離職
  | "ai_workflow"         // AI 數位與渲染工作流
  | "ask_company"         // 逆向反問公司
  // 相容別名
  | "technical"
  | "motivation"
  | "exit_reason"
  | "jd_strategy"
  | "salary_negotiation"
  | "culture";

export interface StarFramework {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface FailureCaseItem {
  testType: string;
  phenomenon: string;
  cause: string;
  thinking: string;
  solution: string;
}

export interface QuestionTableSection {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface QuestionItem {
  id: string;
  number: string;
  title: string;
  category: QuestionCategory;
  categoryName: string;
  difficulty: "基礎概念" | "進階實戰" | "深水攻防";
  scenario: string;
  coreStrategy: string;
  star: StarFramework;
  expertAnswer: string;
  pitfalls: string[];
  keyTerms: string[];
  tags: string[];
  stanleyContext: string;
  targetAudience?: "hiring_manager" | "hr" | "department_head" | "peer";
  targetAudienceName?: string;
  recommendedTiming?: string;
  followUpPitch?: string;
  englishVersion?: string;
  englishPhrasing?: string;
  failureCases?: FailureCaseItem[];
  tableSections?: QuestionTableSection[];
  caseStudy?: string;
  spokenDraft?: string;
  notesRemark?: string;           // 備註 ※
  actualCase?: string;            // 實際案例 ※
  answerKeyPoint?: string;        // 小重點 / 專業知識暗藏
  operatingPrinciples?: string[]; // 操作原則
  memoryHook?: string;            // 30秒背誦口訣 / 記憶核心詞
  keyTakeaways?: string[];        // 列點核心記憶要點 (快速背誦)
}

export interface UserPracticeState {
  status: "unattempted" | "practicing" | "mastered";
  notes: string;
  selfScore?: number;
  lastPracticedAt?: string;
  practiceAnswers?: string[];
}

export interface AICritiqueResult {
  score: number;
  summary: string;
  technicalRating: string;
  communicationRating: string;
  strengths: string[];
  improvementPoints: string[];
  modelAnswerHighlight?: string;
  followUpQuestion?: string;
  simulated?: boolean;
}

export interface TerminologyItem {
  term: string;
  abbr?: string;
  enTranslation: string;
  category: "測試標準" | "瓦楞結構" | "緩衝材料" | "外商商務" | "製程標準";
  definition: string;
  stanleyRelevance: string;
}

export interface ExitScenarioResult {
  fullScript: string;
  opening: string;
  pivot: string;
  closing: string;
  redlineAvoided: Array<{
    riskyWord: string;
    safeReplacement: string;
  }>;
  interviewerPsychology: string;
  isAiEnhanced?: boolean;
}

export interface CustomReverseQuestion {
  id: string;
  title: string;
  difficulty: "簡單" | "中等" | "困難";
  targetAudience: "用人主管" | "人資 (HR)" | "處長/部門大主管" | "同儕/未來夥伴";
  whyAskThis: string;
  recommendedTiming: string;
  bestPhrasing: string;
  englishPhrasing?: string;
  followUpPitch?: string;
  pitfalls: string;
  createdAt: string;
  isCustom?: boolean;
  dimension?: "sustainability" | "digital_tools" | "collaboration" | "role_expectations" | string;
  dimensionLabel?: string;
  signalSent?: string;
}

export interface ReverseQuestionAnalysis {
  polishedChinese: string;
  professionalEnglish: string;
  psychologicalGoal: string;
  timingAdvice: string;
  followUpPitch: string;
  riskyPitfalls: string;
  suitabilityScore: number;
}

