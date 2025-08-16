import { useEffect, useMemo, useRef, useState } from "react";
import { STORAGE_KEY, STATUS, STATUS_META, RULE } from "./data/constants";
import { sumUnitsTaken, countTaken } from "./utils/helpers";
import { INITIAL_DATA } from "./data/initialData";

// Type definitions
interface CourseItem {
  code: string;
  title: string;
  units: number;
  status: string;
}

interface CourseGroup {
  key: string;
  title: string;
  items: CourseItem[];
}

interface CourseSection {
  key: string;
  title: string;
  description?: string;
  rule?: {
    type: string;
    count?: number;
    minUnits?: number;
    alsoRequireKeysTakenOneOf?: string[];
  };
  items?: CourseItem[];
  groups?: CourseGroup[];
  subsections?: CourseSection[];
  editable?: boolean;
}

interface Major {
  key: string;
  title: string;
  sections: CourseSection[];
}

interface AppData {
  owner: string;
  majors: Major[];
}

// Concentration options for Political Science
const CONCENTRATION_OPTIONS = [
  { value: "data-science", label: "Data Science" },
  {
    value: "elections-governance",
    label: "Elections, Representation & Governance",
  },
  { value: "international-relations", label: "International Relations" },
  { value: "justice-law", label: "Justice & Law" },
  { value: "political-economy", label: "Political Economy & Development" },
];

// Concentration options for Symbolic Systems
const SYMSYS_CONCENTRATION_OPTIONS = [
  { value: "human-centered-ai", label: "Human Centered AI" },
  { value: "human-computer-interaction", label: "Human Computer Interaction" },
  { value: "artificial-intelligence", label: "Artificial Intelligence" },
  { value: "computer-music", label: "Computer Music" },
  {
    value: "computational-social-science",
    label: "Computational Social Science",
  },
  { value: "computational-foundations", label: "Computational Foundations" },
];

// Main App component
function App() {
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [activeMajor, setActiveMajor] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.majors) {
          setData(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved data:", e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Get concentration selection values for Political Science
  const getConcentrationSelection = () => {
    const polisciMajor = data.majors.find((m) => m.key === "polisci");
    if (!polisciMajor) return { primary: "", secondary: "" };

    const concentrationSection = polisciMajor.sections.find(
      (s) => s.key === "concentration-selection"
    );
    if (!concentrationSection || !concentrationSection.items)
      return { primary: "", secondary: "" };

    const primaryItem = concentrationSection.items.find(
      (item) => item.code === "Primary Concentration"
    );
    const secondaryItem = concentrationSection.items.find(
      (item) => item.code === "Secondary Concentration"
    );

    return {
      primary: primaryItem?.status || "",
      secondary: secondaryItem?.status || "",
    };
  };

  // Get concentration selection value for Symbolic Systems
  const getSymSysConcentrationSelection = () => {
    const symsysMajor = data.majors.find((m) => m.key === "symsys");
    if (!symsysMajor) return "";

    const concentrationSection = symsysMajor.sections.find(
      (s) => s.key === "concentration-selection"
    );
    if (!concentrationSection || !concentrationSection.items) return "";

    const concentrationItem = concentrationSection.items.find(
      (item) => item.code === "concentration"
    );

    return concentrationItem?.status || "";
  };

  // Get courses for a specific concentration
  const getConcentrationCourses = (concentrationKey: string) => {
    const polisciMajor = data.majors.find((m) => m.key === "polisci");
    if (!polisciMajor) return [];

    const concentrationSection = polisciMajor.sections.find(
      (s) => s.key === `${concentrationKey}-concentration`
    );
    return concentrationSection?.items || [];
  };

  // Get courses for a specific SymSys concentration
  const getSymSysConcentrationCourses = (concentrationKey: string) => {
    const symsysMajor = data.majors.find((m) => m.key === "symsys");
    if (!symsysMajor) return [];

    const concentrationSection = symsysMajor.sections.find(
      (s) => s.key === `${concentrationKey}-concentration`
    );
    return concentrationSection?.items || [];
  };

  // Calculate concentration progress
  const calculateConcentrationProgress = (
    concentrationKey: string,
    minUnits: number
  ) => {
    const courses = getConcentrationCourses(concentrationKey);
    const taken = sumUnitsTaken(courses);
    return Math.min((taken / minUnits) * 100, 100);
  };

  // Calculate SymSys concentration progress
  const calculateSymSysConcentrationProgress = (concentrationKey: string) => {
    const courses = getSymSysConcentrationCourses(concentrationKey);
    const total = courses.length;
    if (total === 0) return 0;

    const completed = courses.filter(
      (course) =>
        course.status === STATUS.TAKEN ||
        course.status === STATUS.CURRENTLY_TAKING
    ).length;

    return Math.min((completed / total) * 100, 100);
  };

  // Import JSON file
  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === "string") {
          const obj = JSON.parse(result);
          if (!obj || !obj.majors) throw new Error("Invalid file");
          setData(obj);
        }
      } catch (err) {
        alert(
          "Could not load file: " +
            (err instanceof Error ? err.message : "Unknown error")
        );
      }
    };
    reader.readAsText(file);
  };

  // Export JSON file
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const dt = new Date();
    const ts = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dt.getDate()).padStart(2, "0")}`;
    a.download = `degree-tracker-${ts}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Clear all data
  const clearAll = () => {
    if (confirm("Are you sure you want to reset all progress?")) {
      setData(INITIAL_DATA);
    }
  };

  // Calculate section progress
  const sectionProgress = (section: CourseSection): number => {
    // Special handling for concentration selection section
    if (section.key === "concentration-selection") {
      const major = data.majors[activeMajor];
      if (major.key === "polisci") {
        // Political Science: two concentrations
        const { primary, secondary } = getConcentrationSelection();
        if (!primary || !secondary) return 0;

        const primaryProgress = calculateConcentrationProgress(primary, 25);
        const secondaryProgress = calculateConcentrationProgress(secondary, 15);

        return (primaryProgress + secondaryProgress) / 2;
      } else if (major.key === "symsys") {
        // Symbolic Systems: one concentration
        const selectedConcentration = getSymSysConcentrationSelection();
        if (!selectedConcentration) return 0;

        return calculateSymSysConcentrationProgress(selectedConcentration);
      }
      return 0;
    }

    // If section has subsections, calculate progress based on subsections
    if (section.subsections) {
      const totalSubsections = section.subsections.length;
      if (totalSubsections === 0) return 0;

      const totalProgress = section.subsections.reduce(
        (acc: number, subsection: CourseSection) => {
          return acc + sectionProgress(subsection);
        },
        0
      );

      return totalProgress / totalSubsections;
    }

    if (sectionSatisfied(section)) return 100;

    if (section.groups) {
      if (section.rule?.type === RULE.UNITS_AT_LEAST) {
        const total = section.rule.minUnits || 0;
        const taken = sumUnitsTaken(
          section.groups.flatMap((g: CourseGroup) => g.items || [])
        );
        // Only count taken and currently taking courses toward progress
        return Math.min((taken / total) * 100, 100);
      }
      return 0;
    }

    if (section.rule?.type === RULE.UNITS_AT_LEAST) {
      const total = section.rule.minUnits || 0;
      const taken = sumUnitsTaken(section.items || []);
      // Only count taken and currently taking courses toward progress
      return Math.min((taken / total) * 100, 100);
    }

    if (section.rule?.type === RULE.AT_LEAST) {
      const total = section.rule.count || 0;
      const taken = countTaken(section.items || []);
      // Only count taken and currently taking courses toward progress
      return Math.min((taken / total) * 100, 100);
    }

    return 0;
  };

  // Check if a section is satisfied
  const sectionSatisfied = (section: CourseSection): boolean => {
    // Special handling for concentration selection section
    if (section.key === "concentration-selection") {
      const major = data.majors[activeMajor];
      if (major.key === "polisci") {
        // Political Science: two concentrations
        const { primary, secondary } = getConcentrationSelection();
        if (!primary || !secondary) return false;

        const primarySatisfied =
          sumUnitsTaken(getConcentrationCourses(primary)) >= 25;
        const secondarySatisfied =
          sumUnitsTaken(getConcentrationCourses(secondary)) >= 15;

        return primarySatisfied && secondarySatisfied;
      } else if (major.key === "symsys") {
        // Symbolic Systems: one concentration
        const selectedConcentration = getSymSysConcentrationSelection();
        if (!selectedConcentration) return false;

        const concentrationCourses = getSymSysConcentrationCourses(
          selectedConcentration
        );
        return concentrationCourses.every(
          (course) =>
            course.status === STATUS.TAKEN ||
            course.status === STATUS.CURRENTLY_TAKING
        );
      }
      return false;
    }

    // If section has subsections, check if all subsections are satisfied
    if (section.subsections) {
      return section.subsections.every((subsection: CourseSection) =>
        sectionSatisfied(subsection)
      );
    }

    if (section.groups) {
      if (section.rule?.type === RULE.UNITS_AT_LEAST) {
        const total = section.rule.minUnits || 0;
        const taken = sumUnitsTaken(
          section.groups.flatMap((g: CourseGroup) => g.items || [])
        );
        // For satisfaction, we need at least the minimum units taken (planned doesn't count for completion)
        if (taken < total) return false;

        // Check if we need specific groups taken
        if (section.rule.alsoRequireKeysTakenOneOf) {
          const requiredGroups = section.rule.alsoRequireKeysTakenOneOf;
          const hasRequiredGroup = requiredGroups.some((key: string) => {
            const group = section.groups?.find(
              (g: CourseGroup) => g.key === key
            );
            return (
              group &&
              group.items?.some(
                (it: CourseItem) =>
                  it.status === STATUS.TAKEN ||
                  it.status === STATUS.CURRENTLY_TAKING
              )
            );
          });
          if (!hasRequiredGroup) return false;
        }

        return true;
      }
      return false;
    }

    if (section.rule?.type === RULE.ALL_OF) {
      return (section.items || []).every(
        (item: CourseItem) =>
          item.status === STATUS.TAKEN ||
          item.status === STATUS.CURRENTLY_TAKING
      );
    }

    if (section.rule?.type === RULE.ONE_OF) {
      return (section.items || []).some(
        (item: CourseItem) =>
          item.status === STATUS.TAKEN ||
          item.status === STATUS.CURRENTLY_TAKING
      );
    }

    if (section.rule?.type === RULE.AT_LEAST) {
      const required = section.rule.count || 0;
      const taken = countTaken(section.items || []);
      return taken >= required;
    }

    if (section.rule?.type === RULE.UNITS_AT_LEAST) {
      const total = section.rule.minUnits || 0;
      const taken = sumUnitsTaken(section.items || []);
      return taken >= total;
    }

    return false;
  };

  // Calculate major progress
  const majorProgress = (major: Major): number => {
    const totalSections = major.sections.length;
    if (totalSections === 0) return 0;

    const totalProgress = major.sections.reduce(
      (acc: number, section: CourseSection) => {
        return acc + sectionProgress(section);
      },
      0
    );

    return totalProgress / totalSections;
  };

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const totalMajors = data.majors.length;
    if (totalMajors === 0) return 0;

    const totalProgress = data.majors.reduce((acc: number, major: Major) => {
      return acc + majorProgress(major);
    }, 0);

    return totalProgress / totalMajors;
  }, [data]);

  // Update concentration selection
  const updateConcentrationSelection = (
    type: "primary" | "secondary",
    value: string
  ) => {
    setData((prevData: AppData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const polisciMajor = newData.majors.find(
        (m: Major) => m.key === "polisci"
      );
      if (!polisciMajor) return prevData;

      const concentrationSection = polisciMajor.sections.find(
        (s: CourseSection) => s.key === "concentration-selection"
      );
      if (!concentrationSection || !concentrationSection.items) return prevData;

      const item = concentrationSection.items.find(
        (item: CourseItem) =>
          item.code ===
          (type === "primary"
            ? "Primary Concentration"
            : "Secondary Concentration")
      );

      if (item) {
        item.status = value;
      }

      return newData;
    });
  };

  // Update item status - simplified and more robust
  const updateItemStatus = (path: string, newStatus: string) => {
    setData((prevData: AppData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const pathParts = path.split(".");
      let current: any = newData;

      // Navigate to the parent object
      for (let i = 0; i < pathParts.length - 2; i++) {
        const part = pathParts[i];
        if (part === "items" || part === "groups" || part === "subsections") {
          const index = parseInt(pathParts[i + 1]);
          if (current && current[part] && current[part][index] !== undefined) {
            current = current[part][index];
          } else {
            console.error(
              "Invalid path:",
              path,
              "at part:",
              part,
              "index:",
              index
            );
            return prevData; // Return unchanged data if path is invalid
          }
          i++; // Skip the next part since we handled it
        } else {
          if (current && current[part] !== undefined) {
            current = current[part];
          } else {
            console.error("Invalid path:", path, "at part:", part);
            return prevData; // Return unchanged data if path is invalid
          }
        }
      }

      // Get the last two parts: the array name and the index
      const arrayName = pathParts[pathParts.length - 2];
      const itemIndex = parseInt(pathParts[pathParts.length - 1]);

      // Update the status safely
      if (current && current[arrayName] && current[arrayName][itemIndex]) {
        current[arrayName][itemIndex].status = newStatus;
      } else {
        console.error("Could not update status for path:", path);
        return prevData;
      }

      return newData;
    });
  };

  // Add new course to editable sections
  const addCourse = (
    majorIndex: number,
    sectionIndex: number,
    courseCode: string,
    courseTitle: string,
    courseUnits: number
  ) => {
    if (!courseCode || !courseTitle || !courseUnits) return;

    setData((prevData: AppData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const section = newData.majors[majorIndex].sections[sectionIndex];

      if (section.editable) {
        const newCourse: CourseItem = {
          code: courseCode,
          title: courseTitle,
          units: courseUnits,
          status: STATUS.NOT,
        };

        if (!section.items) section.items = [];
        section.items.push(newCourse);
      }

      return newData;
    });
  };

  // Remove course from editable sections
  const removeCourse = (
    majorIndex: number,
    sectionIndex: number,
    courseIndex: number
  ) => {
    setData((prevData: AppData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const section = newData.majors[majorIndex].sections[sectionIndex];

      if (section.editable && section.items) {
        section.items.splice(courseIndex, 1);
      }

      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {data.owner}'s Degree Tracker
              </h1>
              <p className="text-sm text-gray-600">
                Symbolic Systems + Political Science — Stanford University
              </p>
            </div>

            {/* Overall Progress Bar */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">
                  Overall Progress
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {Math.round(overallProgress)}%
                </div>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Major Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          {data.majors.map((major, index) => (
            <button
              key={major.key}
              onClick={() => setActiveMajor(index)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeMajor === index
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {major.title}
            </button>
          ))}
        </div>

        {/* Major Content */}
        {data.majors.map((major, majorIndex) => (
          <div
            key={major.key}
            className={activeMajor === majorIndex ? "block" : "hidden"}
          >
            {/* Major Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {major.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Track your progress through the major requirements
                  </p>
                </div>

                {/* Major Progress */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">
                      Major Progress
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {Math.round(majorProgress(major))}%
                    </div>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${majorProgress(major)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {major.sections.map((section, sectionIndex) => {
                // Hide concentration sections unless they're selected
                if (section.key.endsWith("-concentration")) {
                  const major = data.majors[majorIndex];
                  if (major.key === "polisci") {
                    // Political Science: hide all concentration sections
                    return null;
                  } else if (major.key === "symsys") {
                    const selectedConcentration =
                      getSymSysConcentrationSelection();
                    if (
                      section.key !== `${selectedConcentration}-concentration`
                    ) {
                      return null; // Hide unselected concentrations
                    }
                  }
                }

                return (
                  <div
                    key={section.key}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {section.title}
                        </h3>
                        {section.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {section.description}
                          </p>
                        )}
                      </div>

                      {/* Section Progress */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-700">
                            Progress
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            {Math.round(sectionProgress(section))}%
                          </div>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-300 ${
                              sectionSatisfied(section)
                                ? "bg-green-600"
                                : "bg-blue-600"
                            }`}
                            style={{ width: `${sectionProgress(section)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className="space-y-4">
                      {/* Groups (for complex sections like Calculus & Linear Algebra) */}
                      {section.groups && (
                        <div className="space-y-4">
                          {section.groups.map((group, groupIndex) => (
                            <div
                              key={group.key}
                              className="ml-4 border-l-2 border-gray-200 pl-4"
                            >
                              <div className="text-sm font-medium text-gray-700 mb-2">
                                {group.title}
                              </div>
                              <div className="space-y-2">
                                {group.items.map((item, itemIndex) => (
                                  <div
                                    key={item.code}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                  >
                                    <div className="flex-1">
                                      <div className="font-medium text-gray-900">
                                        {item.code}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        {item.title}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {item.units} units
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <select
                                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                          STATUS_META[
                                            item.status as keyof typeof STATUS_META
                                          ]?.color ||
                                          "bg-gray-200 text-gray-800"
                                        }`}
                                        value={item.status}
                                        onChange={(e) =>
                                          updateItemStatus(
                                            `majors.${majorIndex}.sections.${sectionIndex}.groups.${groupIndex}.items.${itemIndex}`,
                                            e.target.value
                                          )
                                        }
                                      >
                                        {Object.entries(STATUS_META).map(
                                          ([key, value]) => (
                                            <option key={key} value={key}>
                                              {value.label}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Regular Items */}
                      {section.items && !section.groups && (
                        <div className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <div
                              key={item.code}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">
                                  {item.code}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {item.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {item.units} units
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {/* Special handling for concentration selection */}
                                {section.key === "concentration-selection" ? (
                                  (() => {
                                    const major = data.majors[majorIndex];
                                    if (major.key === "polisci") {
                                      // Political Science: two concentrations
                                      return (
                                        <select
                                          className="px-3 py-1 rounded text-sm font-medium transition-colors bg-blue-600 text-white"
                                          value={item.status}
                                          onChange={(e) => {
                                            const type =
                                              item.code ===
                                              "Primary Concentration"
                                                ? "primary"
                                                : "secondary";
                                            updateConcentrationSelection(
                                              type,
                                              e.target.value
                                            );
                                          }}
                                        >
                                          <option value="">
                                            Select concentration...
                                          </option>
                                          {CONCENTRATION_OPTIONS.map(
                                            (option) => (
                                              <option
                                                key={option.value}
                                                value={option.value}
                                              >
                                                {option.label}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      );
                                    } else if (major.key === "symsys") {
                                      // Symbolic Systems: one concentration
                                      return (
                                        <select
                                          className="px-3 py-1 rounded text-sm font-medium transition-colors bg-purple-600 text-white"
                                          value={item.status}
                                          onChange={(e) => {
                                            // Update the concentration selection for SymSys
                                            setData((prevData: AppData) => {
                                              const newData = JSON.parse(
                                                JSON.stringify(prevData)
                                              );
                                              const symsysMajor =
                                                newData.majors.find(
                                                  (m: Major) =>
                                                    m.key === "symsys"
                                                );
                                              if (!symsysMajor) return prevData;

                                              const concentrationSection =
                                                symsysMajor.sections.find(
                                                  (s: CourseSection) =>
                                                    s.key ===
                                                    "concentration-selection"
                                                );
                                              if (
                                                !concentrationSection ||
                                                !concentrationSection.items
                                              )
                                                return prevData;

                                              // Update the concentration selection
                                              const concentrationItem =
                                                concentrationSection.items.find(
                                                  (
                                                    concentrationItem: CourseItem
                                                  ) =>
                                                    concentrationItem.code ===
                                                    "concentration"
                                                );
                                              if (concentrationItem) {
                                                concentrationItem.status =
                                                  e.target.value;
                                              }

                                              return newData;
                                            });
                                          }}
                                        >
                                          <option value="">
                                            Select concentration...
                                          </option>
                                          {SYMSYS_CONCENTRATION_OPTIONS.map(
                                            (option) => (
                                              <option
                                                key={option.value}
                                                value={option.value}
                                              >
                                                {option.label}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      );
                                    }
                                    return null;
                                  })()
                                ) : (
                                  <select
                                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                      STATUS_META[
                                        item.status as keyof typeof STATUS_META
                                      ]?.color || "bg-gray-200 text-gray-800"
                                    }`}
                                    value={item.status}
                                    onChange={(e) =>
                                      updateItemStatus(
                                        `majors.${majorIndex}.sections.${sectionIndex}.items.${itemIndex}`,
                                        e.target.value
                                      )
                                    }
                                  >
                                    {Object.entries(STATUS_META).map(
                                      ([key, value]) => (
                                        <option key={key} value={key}>
                                          {value.label}
                                        </option>
                                      )
                                    )}
                                  </select>
                                )}

                                {/* Remove button for editable sections */}
                                {section.editable && (
                                  <button
                                    onClick={() =>
                                      removeCourse(
                                        majorIndex,
                                        sectionIndex,
                                        itemIndex
                                      )
                                    }
                                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}

                          {/* Show selected concentration courses */}
                          {section.key === "concentration-selection" && (
                            <div className="mt-6 space-y-4">
                              {(() => {
                                const major = data.majors[majorIndex];
                                if (major.key === "polisci") {
                                  // Political Science: show primary and secondary concentrations
                                  const { primary, secondary } =
                                    getConcentrationSelection();
                                  return (
                                    <>
                                      {/* Primary Concentration Courses */}
                                      {primary && (
                                        <div className="border-l-4 border-blue-500 pl-4">
                                          <h4 className="font-semibold text-blue-700 mb-3">
                                            {
                                              CONCENTRATION_OPTIONS.find(
                                                (opt) => opt.value === primary
                                              )?.label
                                            }{" "}
                                            (Primary - ≥25 units)
                                          </h4>
                                          <div className="space-y-2">
                                            {getConcentrationCourses(
                                              primary
                                            ).map((course, courseIndex) => (
                                              <div
                                                key={course.code}
                                                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                                              >
                                                <div className="flex-1">
                                                  <div className="font-medium text-gray-900">
                                                    {course.code}
                                                  </div>
                                                  <div className="text-sm text-gray-600">
                                                    {course.title}
                                                  </div>
                                                  <div className="text-xs text-gray-500">
                                                    {course.units} units
                                                  </div>
                                                </div>
                                                <select
                                                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                                    STATUS_META[
                                                      course.status as keyof typeof STATUS_META
                                                    ]?.color ||
                                                    "bg-gray-200 text-gray-800"
                                                  }`}
                                                  value={course.status}
                                                  onChange={(e) => {
                                                    // Find the actual path to update this course
                                                    const polisciMajorIndex =
                                                      data.majors.findIndex(
                                                        (m) =>
                                                          m.key === "polisci"
                                                      );
                                                    const concentrationSectionIndex =
                                                      data.majors[
                                                        polisciMajorIndex
                                                      ].sections.findIndex(
                                                        (s) =>
                                                          s.key ===
                                                          `${primary}-concentration`
                                                      );
                                                    updateItemStatus(
                                                      `majors.${polisciMajorIndex}.sections.${concentrationSectionIndex}.items.${courseIndex}`,
                                                      e.target.value
                                                    );
                                                  }}
                                                >
                                                  {Object.entries(
                                                    STATUS_META
                                                  ).map(([key, value]) => (
                                                    <option
                                                      key={key}
                                                      value={key}
                                                    >
                                                      {value.label}
                                                    </option>
                                                  ))}
                                                </select>
                                              </div>
                                            ))}
                                          </div>
                                          <div className="mt-3 text-sm text-blue-600">
                                            Progress:{" "}
                                            {Math.round(
                                              calculateConcentrationProgress(
                                                primary,
                                                25
                                              )
                                            )}
                                            % (
                                            {sumUnitsTaken(
                                              getConcentrationCourses(primary)
                                            )}
                                            /25 units)
                                          </div>
                                        </div>
                                      )}

                                      {/* Secondary Concentration Courses */}
                                      {secondary && (
                                        <div className="border-l-4 border-green-500 pl-4">
                                          <h4 className="font-semibold text-green-700 mb-3">
                                            {
                                              CONCENTRATION_OPTIONS.find(
                                                (opt) => opt.value === secondary
                                              )?.label
                                            }{" "}
                                            (Secondary - ≥15 units)
                                          </h4>
                                          <div className="space-y-2">
                                            {getConcentrationCourses(
                                              secondary
                                            ).map((course, courseIndex) => (
                                              <div
                                                key={course.code}
                                                className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                                              >
                                                <div className="flex-1">
                                                  <div className="font-medium text-gray-900">
                                                    {course.code}
                                                  </div>
                                                  <div className="text-sm text-gray-600">
                                                    {course.title}
                                                  </div>
                                                  <div className="text-xs text-gray-500">
                                                    {course.units} units
                                                  </div>
                                                </div>
                                                <select
                                                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                                    STATUS_META[
                                                      course.status as keyof typeof STATUS_META
                                                    ]?.color ||
                                                    "bg-gray-200 text-gray-800"
                                                  }`}
                                                  value={course.status}
                                                  onChange={(e) => {
                                                    // Find the actual path to update this course
                                                    const polisciMajorIndex =
                                                      data.majors.findIndex(
                                                        (m) =>
                                                          m.key === "polisci"
                                                      );
                                                    const concentrationSectionIndex =
                                                      data.majors[
                                                        polisciMajorIndex
                                                      ].sections.findIndex(
                                                        (s) =>
                                                          s.key ===
                                                          `${secondary}-concentration`
                                                      );
                                                    updateItemStatus(
                                                      `majors.${polisciMajorIndex}.sections.${concentrationSectionIndex}.items.${courseIndex}`,
                                                      e.target.value
                                                    );
                                                  }}
                                                >
                                                  {Object.entries(
                                                    STATUS_META
                                                  ).map(([key, value]) => (
                                                    <option
                                                      key={key}
                                                      value={key}
                                                    >
                                                      {value.label}
                                                    </option>
                                                  ))}
                                                </select>
                                              </div>
                                            ))}
                                          </div>
                                          <div className="mt-3 text-sm text-green-600">
                                            Progress:{" "}
                                            {Math.round(
                                              calculateConcentrationProgress(
                                                secondary,
                                                15
                                              )
                                            )}
                                            % (
                                            {sumUnitsTaken(
                                              getConcentrationCourses(secondary)
                                            )}
                                            /15 units)
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  );
                                } else if (major.key === "symsys") {
                                  // Symbolic Systems: show selected concentration
                                  const selectedConcentration =
                                    getSymSysConcentrationSelection();
                                  if (!selectedConcentration) return null;

                                  return (
                                    <div className="border-l-4 border-purple-500 pl-4">
                                      <h4 className="font-semibold text-purple-700 mb-3">
                                        {
                                          SYMSYS_CONCENTRATION_OPTIONS.find(
                                            (opt) =>
                                              opt.value ===
                                              selectedConcentration
                                          )?.label
                                        }{" "}
                                        Concentration
                                      </h4>
                                      <div className="space-y-2">
                                        {getSymSysConcentrationCourses(
                                          selectedConcentration
                                        ).map((course, courseIndex) => (
                                          <div
                                            key={course.code}
                                            className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
                                          >
                                            <div className="flex-1">
                                              <div className="font-medium text-gray-900">
                                                {course.code}
                                              </div>
                                              <div className="text-sm text-gray-600">
                                                {course.title}
                                              </div>
                                              <div className="text-xs text-gray-500">
                                                {course.units} units
                                              </div>
                                            </div>
                                            <select
                                              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                                STATUS_META[
                                                  course.status as keyof typeof STATUS_META
                                                ]?.color ||
                                                "bg-gray-200 text-gray-800"
                                              }`}
                                              value={course.status}
                                              onChange={(e) => {
                                                // Find the actual path to update this course
                                                const symsysMajorIndex =
                                                  data.majors.findIndex(
                                                    (m) => m.key === "symsys"
                                                  );
                                                const concentrationSectionIndex =
                                                  data.majors[
                                                    symsysMajorIndex
                                                  ].sections.findIndex(
                                                    (s) =>
                                                      s.key ===
                                                      `${selectedConcentration}-concentration`
                                                  );
                                                updateItemStatus(
                                                  `majors.${symsysMajorIndex}.sections.${concentrationSectionIndex}.items.${courseIndex}`,
                                                  e.target.value
                                                );
                                              }}
                                            >
                                              {Object.entries(STATUS_META).map(
                                                ([key, value]) => (
                                                  <option key={key} value={key}>
                                                    {value.label}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="mt-3 text-sm text-purple-600">
                                        Progress:{" "}
                                        {Math.round(
                                          calculateSymSysConcentrationProgress(
                                            selectedConcentration
                                          )
                                        )}
                                        %
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              })()}
                            </div>
                          )}

                          {/* Add course form for editable sections */}
                          {section.editable && (
                            <div className="border-t pt-4">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Course code (e.g., POLISCI 150)"
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      const target =
                                        e.target as HTMLInputElement;
                                      const code = target.value;
                                      const titleInput = target.parentElement
                                        ?.nextElementSibling as HTMLInputElement;
                                      const unitsInput =
                                        titleInput?.nextElementSibling as HTMLInputElement;
                                      if (
                                        code &&
                                        titleInput?.value &&
                                        unitsInput?.value
                                      ) {
                                        addCourse(
                                          majorIndex,
                                          sectionIndex,
                                          code,
                                          titleInput.value,
                                          parseInt(unitsInput.value)
                                        );
                                        target.value = "";
                                        titleInput.value = "";
                                        unitsInput.value = "";
                                      }
                                    }
                                  }}
                                />
                                <input
                                  type="text"
                                  placeholder="Course title"
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                                />
                                <input
                                  type="number"
                                  placeholder="Units"
                                  className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Subsections (for complex sections like Capstone) */}
                      {section.subsections && (
                        <div className="space-y-4">
                          {section.subsections.map(
                            (subsection, subsectionIndex) => (
                              <div
                                key={subsection.key}
                                className="ml-4 border-l-2 border-gray-200 pl-4"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900">
                                      {subsection.title}
                                    </div>
                                    {subsection.description && (
                                      <div className="text-sm text-gray-600 mt-1">
                                        {subsection.description}
                                      </div>
                                    )}
                                  </div>

                                  {/* Subsection Progress */}
                                  <div className="flex items-center gap-3">
                                    <div className="text-right">
                                      <div className="text-sm font-medium text-gray-700">
                                        Progress
                                      </div>
                                      <div className="text-lg font-bold text-blue-600">
                                        {Math.round(
                                          sectionProgress(subsection)
                                        )}
                                        %
                                      </div>
                                    </div>
                                    <div className="w-24 bg-gray-200 rounded-full h-3">
                                      <div
                                        className={`h-3 rounded-full transition-all duration-300 ${
                                          sectionSatisfied(subsection)
                                            ? "bg-green-600"
                                            : "bg-blue-600"
                                        }`}
                                        style={{
                                          width: `${sectionProgress(
                                            subsection
                                          )}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>

                                {/* Subsection Items */}
                                {subsection.items && (
                                  <div className="space-y-2">
                                    {subsection.items.map((item, itemIndex) => (
                                      <div
                                        key={item.code}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                      >
                                        <div className="flex-1">
                                          <div className="font-medium text-gray-900">
                                            {item.code}
                                          </div>
                                          <div className="text-sm text-gray-600">
                                            {item.title}
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            {item.units} units
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <select
                                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                              STATUS_META[
                                                item.status as keyof typeof STATUS_META
                                              ]?.color ||
                                              "bg-gray-200 text-gray-800"
                                            }`}
                                            value={item.status}
                                            onChange={(e) =>
                                              updateItemStatus(
                                                `majors.${majorIndex}.sections.${sectionIndex}.subsections.${subsectionIndex}.items.${itemIndex}`,
                                                e.target.value
                                              )
                                            }
                                          >
                                            {Object.entries(STATUS_META).map(
                                              ([key, value]) => (
                                                <option key={key} value={key}>
                                                  {value.label}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <button
          onClick={() => fileRef.current?.click()}
          className="btn-secondary shadow-lg"
        >
          Import
        </button>
        <button onClick={exportJson} className="btn-primary shadow-lg">
          Export
        </button>
        <button
          onClick={clearAll}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
        >
          Reset
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) importJson(file);
        }}
        className="hidden"
      />
    </div>
  );
}

export default App;
