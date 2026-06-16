import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

type WellnessLog = {
  id: number;
  date: string;
  mood: string;
  sleepHours: number;
  stressLevel: number;
  painLevel: number;
  symptoms: string[];
  cyclePhase: string;
};

type WellnessContextType = {
  logs: WellnessLog[];

  addLog: (
    log: WellnessLog
  ) => void;

  deleteLog: (
    id: number
  ) => void;

  updateLog: (
    log: WellnessLog
  ) => void;
};

const WellnessContext =
  createContext<
    WellnessContextType | undefined
  >(undefined);

export const WellnessProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [logs, setLogs] =
    useState<WellnessLog[]>(() => {
      const savedLogs =
        localStorage.getItem(
          "wellnessLogs"
        );

      return savedLogs
        ? JSON.parse(savedLogs)
        : [];
    });

  // Save automatically
  useEffect(() => {
    localStorage.setItem(
      "wellnessLogs",
      JSON.stringify(logs)
    );
  }, [logs]);

  // One entry per day logic
  const addLog = (
    log: WellnessLog
  ) => {
    setLogs((prev) => {
      const existingLog =
        prev.find(
          (item) =>
            item.date === log.date
        );

      // Update same day entry
      if (existingLog) {
        return prev.map((item) =>
          item.date === log.date
            ? {
                ...item,
                mood: log.mood,
                sleepHours:
                  log.sleepHours,
                stressLevel:
                  log.stressLevel,
                painLevel:
                  log.painLevel,
                symptoms:
                  log.symptoms,
                cyclePhase:
                  log.cyclePhase,
              }
            : item
        );
      }

      // Add new entry
      return [...prev, log];
    });
  };

  const deleteLog = (
    id: number
  ) => {
    setLogs((prev) =>
      prev.filter(
        (log) => log.id !== id
      )
    );
  };

  const updateLog = (
    updatedLog: WellnessLog
  ) => {
    setLogs((prev) =>
      prev.map((log) =>
        log.id === updatedLog.id
          ? updatedLog
          : log
      )
    );
  };

  return (
    <WellnessContext.Provider
      value={{
        logs,
        addLog,
        deleteLog,
        updateLog,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness =
  () => {
    const context =
      useContext(
        WellnessContext
      );

    if (!context) {
      throw new Error(
        "useWellness must be used inside WellnessProvider"
      );
    }

    return context;
  };