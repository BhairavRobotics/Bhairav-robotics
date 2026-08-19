import { createContext, useContext, useState, useEffect } from "react";

const TemplateContext = createContext();

export const TEMPLATES = {
  main: { id: "main", name: "Main Template", description: "Current design" },
  t1: { id: "t1", name: "Template 1", description: "Military defence redesign" },
};

export const TemplateProvider = ({ children }) => {
  const [activeTemplate, setActiveTemplate] = useState(() => {
    return localStorage.getItem("br_template") || "main";
  });

  useEffect(() => {
    localStorage.setItem("br_template", activeTemplate);
  }, [activeTemplate]);

  return (
    <TemplateContext.Provider value={{ activeTemplate, setActiveTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => useContext(TemplateContext);
