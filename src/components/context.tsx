import * as React from "react";

export interface ContextState {
  [key: string]: Declaration[];
}

interface Declaration {
  selector: string;
  meta: Meta;
  nodes: Node[];
  media?: string;
}

export interface Node {
  prop: string;
  value: string;
}

export interface Meta {
  module: string;
  id: string;
}

interface ContextValue {
  state: ContextState;
  dispatch: React.Dispatch<Actions>;
}

export enum ActionTypes {}

interface Actions {
  type: ActionTypes;
}

const initialState: ContextState = {} as ContextState;

const reducer: React.Reducer<ContextState, Actions> = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const Context = React.createContext<ContextValue>({} as ContextValue);

interface ContextProviderProps {
  data: ContextState;
}

export const ContextProvider: React.FunctionComponent<ContextProviderProps> = ({
  children,
  data,
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    ...data,
  });

  const value = {
    state,
    dispatch,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const ContextConsumer = Context.Consumer;
