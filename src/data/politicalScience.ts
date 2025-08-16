import { STATUS, RULE } from './constants';

// Political Science B.A. Requirements
export const POLITICAL_SCIENCE_DATA = {
  key: "polisci",
  title: "Political Science B.A.",
  sections: [
    {
      key: "intro",
      title: "Introduction Course",
      description: "Must be taken in freshman or sophomore year.",
      rule: { type: RULE.ALL_OF },
      items: [
        { code: "POLISCI 1", title: "The Science of Politics", units: 5, status: STATUS.NOT }
      ]
    },
    {
      key: "methods",
      title: "Methods Course",
      description: "Select one of the following methods courses.",
      rule: { type: RULE.ONE_OF },
      items: [
        { code: "POLISCI 150A", title: "Data Science for Politics", units: 5, status: STATUS.NOT },
        { code: "STATS 60", title: "Introduction to Statistical Methods: Precalculus", units: 4, status: STATUS.NOT },
        { code: "STATS 101", title: "Data Science 101", units: 5, status: STATUS.NOT },
        { code: "ECON 102A", title: "Intro to Statistical Methods (Postcalculus) for Social Scientists", units: 5, status: STATUS.NOT },
        { code: "CS 106A", title: "Programming Methodology", units: 5, status: STATUS.NOT },
        { code: "CS 106B", title: "Programming Abstractions", units: 5, status: STATUS.NOT }
      ]
    },
    {
      key: "primary-track",
      title: "Primary Track (≥25 units)",
      description: "Choose one track (Data Science; Elections, Representation & Governance; International Relations; Justice & Law; Political Economy & Development).",
      rule: { type: RULE.UNITS_AT_LEAST, minUnits: 25 },
      editable: true,
      items: [
        { code: "TRACK-1", title: "Add primary-track course", units: 5, status: STATUS.NOT }
      ]
    },
    {
      key: "secondary-track",
      title: "Secondary Track (≥15 units)",
      description: "Choose a second track from the available options.",
      rule: { type: RULE.UNITS_AT_LEAST, minUnits: 15 },
      editable: true,
      items: [
        { code: "TRACK-2", title: "Add secondary-track course", units: 5, status: STATUS.NOT }
      ]
    },
    {
      key: "additional",
      title: "Additional Related Coursework (≥20 units)",
      description: "Additional Political Science coursework to reach the 70-unit minimum.",
      rule: { type: RULE.UNITS_AT_LEAST, minUnits: 20 },
      editable: true,
      items: [
        { code: "POLISCI-ADD-1", title: "Add related POLISCI course", units: 4, status: STATUS.NOT }
      ]
    },
    {
      key: "seminar",
      title: "Undergraduate Seminar (200- or 300-level)",
      description: "Take one 5-unit POLISCI 200- or 300-level undergraduate seminar.",
      rule: { type: RULE.AT_LEAST, count: 1 },
      editable: true,
      items: [
        { code: "POLISCI 2xx/3xx", title: "Designated undergraduate seminar", units: 5, status: STATUS.NOT }
      ]
    },
    {
      key: "wim",
      title: "Writing in the Major (WIM)",
      description: "Select one of the following WIM courses. Note: POLISCI 299A only fulfills the WIM requirement for students writing an Honors Thesis.",
      rule: { type: RULE.ONE_OF },
      items: [
        { code: "POLISCI 103", title: "Justice", units: 5, status: STATUS.NOT },
        { code: "POLISCI 110C", title: "America and the World Economy", units: 5, status: STATUS.NOT },
        { code: "POLISCI 110D", title: "War and Peace in American Foreign Policy", units: 5, status: STATUS.NOT },
        { code: "POLISCI 120C", title: "American Political Institutions in Uncertain Times", units: 5, status: STATUS.NOT },
        { code: "POLISCI 121", title: "Political Power in American Cities", units: 5, status: STATUS.NOT },
        { code: "POLISCI 148", title: "Chinese Politics", units: 5, status: STATUS.NOT },
        { code: "POLISCI 236S", title: "Ethical & Effective Philanthropy for Sustainable Development", units: 5, status: STATUS.NOT },
        { code: "POLISCI 299A", title: "Research Design (WIM only if writing Honors Thesis)", units: 5, status: STATUS.NOT }
      ]
    },
    {
      key: "capstone",
      title: "Capstone — one of",
      description: "Beginning AY 2024: complete either a Senior Honors Thesis or a designated POLISCI capstone seminar (200-level).",
      rule: { type: RULE.ONE_OF },
      items: [
        { code: "CAP-Seminar", title: "Capstone Seminar (designated 200-level)", units: 5, status: STATUS.NOT },
        { code: "CAP-Honors", title: "Senior Honors Thesis", units: 5, status: STATUS.NOT }
      ]
    }
  ]
};

