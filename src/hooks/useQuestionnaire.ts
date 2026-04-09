import { useReducer } from 'react';
import { decisionTree } from '../data/decisionTree';
import type { DecisionNode, ProfileId, QuestionnaireState } from '../types/questionnaire';

const INITIAL_STATE: QuestionnaireState = {
  currentNodeId: 'root',
  history: [],
};

const ESTIMATED_MAX_STEPS = 7;

type Action =
  | { type: 'ANSWER'; nodeId: string; value: string; nextNodeId: string }
  | { type: 'GO_BACK' }
  | { type: 'RESET' };

function resolveNextNodeId(next: string | { result: ProfileId }): string {
  if (typeof next === 'string') return next;
  return `result_${next.result}`;
}

function reducer(state: QuestionnaireState, action: Action): QuestionnaireState {
  switch (action.type) {
    case 'ANSWER':
      return {
        currentNodeId: action.nextNodeId,
        history: [...state.history, { nodeId: action.nodeId, value: action.value }],
      };
    case 'GO_BACK': {
      if (state.history.length === 0) return state;
      const newHistory = state.history.slice(0, -1);
      const previousNodeId =
        newHistory.length === 0
          ? 'root'
          : (() => {
              const lastAnswer = newHistory[newHistory.length - 1];
              const node = decisionTree[lastAnswer.nodeId];
              if (node.type !== 'question') return 'root';
              const option = node.options.find((o) => o.value === lastAnswer.value);
              if (!option) return 'root';
              return resolveNextNodeId(option.next);
            })();
      return { currentNodeId: previousNodeId, history: newHistory };
    }
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export function useQuestionnaire() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const currentNode: DecisionNode = decisionTree[state.currentNodeId];

  const answer = (value: string) => {
    if (currentNode.type !== 'question') return;
    const option = currentNode.options.find((o) => o.value === value);
    if (!option) return;
    const nextNodeId = resolveNextNodeId(option.next);
    dispatch({ type: 'ANSWER', nodeId: state.currentNodeId, value, nextNodeId });
  };

  const goBack = () => dispatch({ type: 'GO_BACK' });
  const reset = () => dispatch({ type: 'RESET' });

  const stepNumber = state.history.length + 1;
  const progressPercent = Math.min(
    Math.round((state.history.length / ESTIMATED_MAX_STEPS) * 100),
    100
  );

  return {
    currentNode,
    canGoBack: state.history.length > 0,
    progressPercent,
    stepNumber,
    answer,
    goBack,
    reset,
  };
}
