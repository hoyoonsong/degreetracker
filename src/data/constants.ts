// Status constants for course tracking
export const STATUS = {
  NOT: "not",
  PLANNED: "planned",
  CURRENTLY_TAKING: "currently_taking",
  TAKEN: "taken",
  RETAKE: "retake",
} as const;

// Rule types for requirements
export const RULE = {
  ALL_OF: "allOf",
  ONE_OF: "oneOf",
  AT_LEAST: "atLeast",
  UNITS_AT_LEAST: "unitsAtLeast",
} as const;

// Status metadata for UI display
export const STATUS_META = {
  [STATUS.NOT]: { label: "Not Taken", color: "bg-gray-200 text-gray-800" },
  [STATUS.PLANNED]: { label: "Planned", color: "bg-blue-600 text-white" },
  [STATUS.CURRENTLY_TAKING]: {
    label: "Currently Taking",
    color: "bg-purple-600 text-white",
  },
  [STATUS.TAKEN]: { label: "Taken", color: "bg-green-600 text-white" },
  [STATUS.RETAKE]: { label: "Retake", color: "bg-yellow-400 text-black" },
} as const;

// Storage key for localStorage
export const STORAGE_KEY = "degree-tracker-data";
