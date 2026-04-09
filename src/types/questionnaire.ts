export type ProfileId =
  | 'aigle'
  | 'coq'
  | 'corbeau'
  | 'pioupiou'
  | 'poussin'
  | 'condor'
  | 'poussin_sans_facture'
  | 'maxi_poussin'
  | 'ergo'
  | 'no_match';

export interface QuestionOption {
  label: string;
  value: string;
  next: string | { result: ProfileId };
}

export interface QuestionNode {
  type: 'question';
  id: string;
  question: string;
  hint?: string;
  options: QuestionOption[];
}

export interface ResultNode {
  type: 'result';
  id: string;
  profile: ProfileId;
}

export type DecisionNode = QuestionNode | ResultNode;
export type DecisionTree = Record<string, DecisionNode>;

export interface Answer {
  nodeId: string;
  value: string;
}

export interface QuestionnaireState {
  currentNodeId: string;
  history: Answer[];
}

export interface ProfileDefinition {
  id: ProfileId;
  name: string;
  color: string;
  bgColor: string;
  isEligible: boolean;
}
