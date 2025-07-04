'use client';

import { createContext, useContext, useState } from 'react';

type EvaluationMode = 'create' | 'edit';

type EvaluationContextType = {
  isOpen: boolean;
  mode: EvaluationMode;
  shouldRefresh: boolean;
  evalOpen: () => void;
  close: () => void;
  setCreate: () => void;
  setEdit: () => void;
  triggerEvalDropdownRefresh: () => void;
};

const EvaluationContext = createContext<EvaluationContextType | undefined>(
  undefined
);

export const EvaluationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [mode, setMode] = useState<EvaluationMode>('create');

  const evalOpen = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const setCreate = () => setMode('create');
  const setEdit = () => setMode('edit');
  const triggerEvalDropdownRefresh = () => setShouldRefresh((prev) => !prev);

  return (
    <EvaluationContext.Provider
      value={{
        isOpen,
        mode,
        shouldRefresh,
        evalOpen,
        close,
        setCreate,
        setEdit,
        triggerEvalDropdownRefresh,
      }}
    >
      {children}
    </EvaluationContext.Provider>
  );
};

export const useEvaluationContext = () => {
  const context = useContext(EvaluationContext);
  if (!context)
    throw new Error('useEvaluation must be used within EvaluationProvider');
  return context;
};
