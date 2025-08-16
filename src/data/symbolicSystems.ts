import { STATUS, RULE } from "./constants";
import { SYMSYS_CONCENTRATIONS_DATA } from "./symbolicSystemsConcentrations";

// Symbolic Systems Core Requirements
export const SYMBOLIC_SYSTEMS_DATA = {
  key: "symsys",
  title: "Symbolic Systems (Core Requirements)",
  sections: [
    {
      key: "gateway",
      title: "Gateway Course",
      description:
        "Take ONE of the following courses. Must be completed before major declaration can be approved.",
      rule: { type: RULE.ONE_OF },
      items: [
        {
          code: "SYMSYS 1",
          title: "Minds and Machines",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "CS 24",
          title: "Minds & Machines (alt)",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "LINGUIST 35",
          title: "Minds & Machines (alt)",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "PHIL 99",
          title: "Minds & Machines (alt)",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "PSYCH 35",
          title: "Minds & Machines (alt)",
          units: 4,
          status: STATUS.NOT,
        },
      ],
    },
    {
      key: "calc-la",
      title: "Calculus & Linear Algebra (≥14 units total)",
      description:
        "Take at least 14 units total from the courses below. You MUST take at least ONE course from the Multivariate/Linear Algebra group.",
      rule: {
        type: RULE.UNITS_AT_LEAST,
        minUnits: 14,
        alsoRequireKeysTakenOneOf: ["multivar"],
      },
      groups: [
        {
          key: "singlevar",
          title: "Single Variable Calculus (take any combination)",
          items: [
            {
              code: "MATH 19",
              title: "Calculus",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "MATH 20",
              title: "Calculus",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "MATH 21",
              title: "Calculus",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "AP-6U",
              title: "AP/Exam Credit (6u replaces 19+20)",
              units: 6,
              status: STATUS.NOT,
            },
            {
              code: "AP-10U",
              title: "AP/Exam Credit (10u replaces 19+20+21)",
              units: 10,
              status: STATUS.NOT,
            },
          ],
        },
        {
          key: "multivar",
          title: "Multivariate Calculus and Linear Algebra (take at least ONE)",
          items: [
            {
              code: "MATH 51",
              title:
                "Linear Algebra, Multivariable Calculus, and Modern Applications",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "CME 100",
              title: "Vector Calculus for Engineers (ENGR 154)",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "MATH 52",
              title: "Integral Calculus of Several Variables",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "MATH 53",
              title:
                "Differential Equations with Linear Algebra, Fourier Methods, and Modern Applications",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "MATH 61CM",
              title: "Modern Mathematics: Continuous Methods",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "MATH 61DM",
              title: "Modern Mathematics: Discrete Methods",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "MATH 62CM",
              title: "Modern Mathematics: Continuous Methods",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "MATH 62DM",
              title: "Modern Mathematics: Discrete Methods",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "MATH 63CM",
              title: "Modern Mathematics: Continuous Methods",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "CME 102",
              title:
                "Ordinary Differential Equations for Engineers (ENGR 155A)",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "CME 104",
              title:
                "Linear Algebra and Partial Differential Equations for Engineers (ENGR 155B)",
              units: 5,
              status: STATUS.NOT,
            },
          ],
        },
      ],
    },
    {
      key: "philosophy",
      title: "Philosophy",
      description:
        "Philosophy courses covering mind, language, and formal methods.",
      subsections: [
        {
          key: "intro-phil",
          title: "Introductory Philosophy Course",
          description:
            "Take ONE of the following: an introductory Philosophy course (3+ units) or a Thinking Matters course taught by Philosophy faculty.",
          rule: { type: RULE.ONE_OF },
          items: [
            {
              code: "PHIL Intro",
              title:
                "Any course of 3 units or more listed with a PHIL course number (except PHIL 99/SYMSYS 1)",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "THINK 69",
              title: "Emotion",
              units: 4,
              status: STATUS.NOT,
            },
          ],
        },
        {
          key: "mind-meaning",
          title: "Mind, Matter, and Meaning",
          description: "Take ALL of the following required course.",
          rule: { type: RULE.ALL_OF },
          items: [
            {
              code: "PHIL 80",
              title: "Mind, Matter, and Meaning",
              units: 4,
              status: STATUS.NOT,
            },
          ],
        },
        {
          key: "advanced-phil",
          title: "Advanced Philosophy Course",
          description:
            "Take ONE of the following advanced Philosophy courses that list PHIL 80 as a prerequisite.",
          rule: { type: RULE.ONE_OF },
          items: [
            {
              code: "PHIL 86",
              title: "How to Make a Moral Agent (CS 186)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 107B",
              title: "Plato's Later Metaphysics and Epistemology",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 132",
              title: "Phenomenology: Merleau-Ponty (PHIL 232)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 160",
              title: "What are Laws of Nature? (PHIL 260)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 164",
              title:
                "Scientific Realism, Perspectivism, and Antirealism (PHIL 264)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 167D",
              title: "Philosophy of Neuroscience (PHIL 267D, SYMSYS 206A)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 173B",
              title: "Metaethics",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 175",
              title: "Philosophy of Law",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 180",
              title: "Metaphysics (PHIL 280)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 181",
              title: "Philosophy of Language (PHIL 281)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 181A",
              title: "Philosophy of Language (PHIL 281A)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 182H",
              title: "Truth (PHIL 282H)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 184",
              title: "Formal and Informal Epistemology (PHIL 284)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 184B",
              title: "Formal Epistemology",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 184D",
              title: "Collective Epistemology and Shared Inquiry",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 185J",
              title: "The Philosophy and Science of Perception (SYMSYS 205)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 186",
              title: "Philosophy of Mind (PHIL 286)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 187",
              title: "Philosophy of Action (PHIL 287)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 188A",
              title: "Explanation (PHIL 288A)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 188B",
              title:
                "Advanced Undergrad Seminar: Striving and the Nature of Belief",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 189",
              title: "Reduction and Grounding (PHIL 289)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "SYMSYS 207",
              title: "Conceptual Issues in Cognitive Science",
              units: 4,
              status: STATUS.NOT,
            },
          ],
        },
      ],
    },
    {
      key: "formal-methods",
      title: "Formal Methods",
      description: "Courses covering logic, proof, and formal reasoning.",
      subsections: [
        {
          key: "logic",
          title: "Logic",
          description:
            "Take ONE of the following courses in mathematical logic.",
          rule: { type: RULE.ONE_OF },
          items: [
            {
              code: "PHIL 150",
              title: "Mathematical Logic (PHIL 250)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 151",
              title:
                "Metalogic (PHIL 251) [prerequisite: PHIL 150 or instructor permission]",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "CS 157",
              title: "Computational Logic",
              units: 4,
              status: STATUS.NOT,
            },
          ],
        },
        {
          key: "proof-methods",
          title: "Proof Methods",
          description:
            "Take ALL of the following courses covering proof techniques and mathematical reasoning.",
          rule: { type: RULE.ALL_OF },
          items: [
            {
              code: "PHIL 49",
              title: "Survey of Formal Methods",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "MATH 56",
              title: "Proofs and Modern Mathematics",
              units: 3,
              status: STATUS.NOT,
            },
          ],
        },
        {
          key: "theory-comp",
          title: "Theory of Computation",
          description:
            "Take ONE of the following courses covering theoretical computer science concepts.",
          rule: { type: RULE.ONE_OF },
          items: [
            {
              code: "CS 103",
              title:
                "Mathematical Foundations of Computing [corequisite: CS 106B or X]",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "CS 154",
              title:
                "Introduction to Automata and Complexity Theory [prerequisite: CS103 or significant proof-writing experience]",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PHIL 152",
              title:
                "Computability and Logic (PHIL 252) [prerequisite: PHIL 151]",
              units: 4,
              status: STATUS.NOT,
            },
          ],
        },
      ],
    },
    {
      key: "probability",
      title: "Probability Theory and Statistics",
      description:
        "Take ONE of the following courses that covers probability theory and is grounded in multivariable calculus.",
      rule: { type: RULE.ONE_OF },
      items: [
        {
          code: "CS 109",
          title: "Introduction to Probability for Computer Scientists",
          units: 5,
          status: STATUS.NOT,
        },
        {
          code: "STATS 116",
          title: "Theory of Probability",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "STATS 110",
          title: "Statistical Methods in Engineering and the Physical Sciences",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "MS&E 120",
          title: "Probabilistic Analysis",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "MS&E 220",
          title: "Probabilistic Analysis",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "EE 178",
          title: "Probabilistic Systems Analysis (same as EE 278A)",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "CME 106",
          title:
            "Introduction to Probability and Statistics for Engineers (ENGR 155C)",
          units: 5,
          status: STATUS.NOT,
        },
        {
          code: "MATH 151",
          title: "Introduction to Probability Theory",
          units: 3,
          status: STATUS.NOT,
        },
        {
          code: "MATH 63DM",
          title: "Modern Mathematics: Discrete Methods",
          units: 5,
          status: STATUS.NOT,
        },
      ],
    },
    {
      key: "computation",
      title: "Computation",
      description: "Programming and computer science fundamentals.",
      subsections: [
        {
          key: "intro-programming",
          title: "Introduction to Programming",
          description: "Take ALL of the following required course.",
          rule: { type: RULE.ALL_OF },
          items: [
            {
              code: "CS 106A",
              title: "Programming Methodology",
              units: 5,
              status: STATUS.NOT,
            },
          ],
        },
        {
          key: "data-structures",
          title: "Data Structures",
          description:
            "Take ONE of the following advanced programming courses with data structures.",
          rule: { type: RULE.ONE_OF },
          items: [
            {
              code: "CS 106B",
              title: "Programming Abstractions",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "CS 106X",
              title: "Programming Abstractions (Accelerated)",
              units: 5,
              status: STATUS.NOT,
            },
          ],
        },
        {
          key: "post106b",
          title: "Post-CS 106B Methods Course",
          description:
            "Take ONE of the following post-CS 106B courses covering computational methods with substantial programming.",
          rule: { type: RULE.ONE_OF },
          items: [
            {
              code: "CS 107",
              title: "Computer Organization and Systems",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "CS 107E",
              title: "Computer Systems from the Ground Up",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "CS 129",
              title: "Applied Machine Learning",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "CS 147L",
              title: "Cross-platform Mobile App Development",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "CS 221",
              title: "Artificial Intelligence: Principles and Techniques",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "CS 229",
              title: "Machine Learning (STATS 229)",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "CS 229S",
              title: "Systems for Machine Learning",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "CS 230",
              title: "Deep Learning",
              units: 3,
              status: STATUS.NOT,
            },
          ],
        },
      ],
    },
    {
      key: "cognition-neuro",
      title: "Cognition, Language, and Neuroscience",
      description:
        "Courses covering human cognition, language, and brain function.",
      subsections: [
        {
          key: "intro-psych",
          title: "Introduction to Psychology",
          description: "Basic psychology course.",
          rule: { type: RULE.ALL_OF },
          items: [
            {
              code: "PSYCH 1",
              title: "Introduction to Psychology",
              units: 5,
              status: STATUS.NOT,
            },
          ],
        },
        {
          key: "intro-area",
          title: "Introductory Area Course",
          description:
            "A course covering a disciplinary division or subdivision, in cognition, language, and neuroscience.",
          rule: { type: RULE.ONE_OF },
          items: [
            {
              code: "BIO 150",
              title: "Human Behavioral Biology (HUMBIO 160)",
              units: 5,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 105",
              title: "Phonetics (LINGUIST 205A)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 130A",
              title: "Introduction to Semantics and Pragmatics (LINGUIST 230A)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 130B",
              title: "Introduction to Lexical Semantics",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 145",
              title:
                "Introduction to Psycholinguistics (LINGUIST 245A, PSYCH 140)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 150",
              title: "Language and Society",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "PSYCH 30",
              title: "Introduction to Perception",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "PSYCH 45",
              title: "Introduction to Learning and Memory",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "PSYCH 50",
              title: "Introduction to Cognitive Neuroscience",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "PSYCH 60",
              title: "Introduction to Developmental Psychology",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "PSYCH 70",
              title:
                "Self and Society: Introduction to Social Psychology (SOC 2)",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "PSYCH 75",
              title: "Introduction to Cultural Psychology",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "PSYCH 141",
              title: "Cognitive Development",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "PSYCH 154",
              title: "Judgment and Decision-Making",
              units: 3,
              status: STATUS.NOT,
            },
          ],
        },
        {
          key: "ling-theory",
          title: "Linguistic Theory",
          description:
            "A course applying formal methods to language and communication.",
          rule: { type: RULE.ONE_OF },
          items: [
            {
              code: "LINGUIST 110",
              title: "Introduction to Phonology",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 116A",
              title: "Introduction to Word Formation",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 121A",
              title: "The Syntax of English",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 121B",
              title: "Crosslinguistic Syntax",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 130A",
              title: "Introduction to Semantics and Pragmatics (LINGUIST 230A)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 130B",
              title: "Introduction to Lexical Semantics",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 134A",
              title:
                "The Structure of Discourse: Theory and Applications (LINGUIST 234)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 145",
              title:
                "Introduction to Psycholinguistics (LINGUIST 245A, PSYCH 140)",
              units: 4,
              status: STATUS.NOT,
            },
            {
              code: "LINGUIST 160",
              title: "Historical Linguistics",
              units: 4,
              status: STATUS.NOT,
            },
          ],
        },
      ],
    },
    {
      key: "cross-area",
      title: "Cross-Area Requirement",
      description:
        "A non-introductory course, which has as a prerequisite at least one Core course (or equivalent), and which combines methods and subject matter from at least two Breadth areas in the Core.",
      rule: { type: RULE.AT_LEAST, count: 1 },
      items: [
        {
          code: "CS 147",
          title: "Introduction to Human-Computer Interaction Design",
          units: 3,
          status: STATUS.NOT,
        },
        {
          code: "CS 229",
          title: "Machine Learning (STATS 229)",
          units: 3,
          status: STATUS.NOT,
        },
        {
          code: "LINGUIST 130A",
          title: "Introduction to Semantics and Pragmatics (LINGUIST 230A)",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "LINGUIST 180",
          title: "From Languages to Information (CS 124, LINGUIST 280)",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "PHIL 152",
          title: "Computability and Logic (PHIL 152)",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "PHIL 154",
          title: "Modal Logic (PHIL 254)",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "PHIL 167D",
          title: "Philosophy of Neuroscience",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "PHIL 181",
          title: "Philosophy of Language (PHIL 281)",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "PHIL 181A",
          title: "Philosophy of Language (PHIL 281A)",
          units: 4,
          status: STATUS.NOT,
        },
        {
          code: "PSYCH 204",
          title: "Computation and Cognition: the Probabilistic Approach",
          units: 3,
          status: STATUS.NOT,
        },
        {
          code: "PSYCH 209",
          title: "Neural Network Models of Cognition",
          units: 3,
          status: STATUS.NOT,
        },
      ],
    },
    {
      key: "advanced-seminar",
      title: "Advanced Small Seminar Requirement*",
      description:
        "An approved course which builds on the Core Preparations and Breadth Requirements, enrolls no more than 20 students, and is an interactive, discussion-based seminar. *May be double-counted for an applicable Concentration requirement, but not for a Core requirement.",
      rule: { type: RULE.AT_LEAST, count: 1 },
      items: [
        {
          code: "Approved Course",
          title: "An approved course meeting the criteria above",
          units: 3,
          status: STATUS.NOT,
        },
      ],
    },
    {
      key: "concentration-selection",
      title: "Concentration Selection",
      description:
        "Choose ONE concentration from the options below. You must complete all requirements for your selected concentration.",
      rule: { type: RULE.ONE_OF },
      items: [
        {
          code: "concentration",
          title: "Select your concentration",
          units: 0,
          status: "",
        },
      ],
    },
    {
      key: "capstone",
      title: "Capstone",
      description:
        "An experiential requirement consisting of the following components, planned in consultation with, and approved by, a student's Concentration Adviser (3 or more units each). To obtain approval for your Capstone plan, please submit the Capstone Approval Form. Note, this form must be submitted in addition to your Symsys Course Plan. Additionally, your Capstone plan is subject to final approval by the Symbolic Systems Program office. The Capstone Approval form must be approved by end of first week of Winter Quarter, Junior Year (or the 8th quarter of undergraduate enrollment).",
      subsections: [
        {
          key: "practicum",
          title: "Practicum (choose one)",
          description: "Choose one of the following practicum options:",
          rule: { type: RULE.ONE_OF },
          items: [
            {
              code: "SYMSYS 190",
              title:
                "Senior Honors Tutorial (taken under a student's Honors Adviser)",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "SYMSYS 195-series OR CS 177",
              title:
                "A course with a SYMSYS listing in the 195-series OR CS 177: Human-Centered Project Management (approved advanced project course integrating across breadth areas)",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "SYMSYS 196 OR Department-based",
              title:
                "Supervised research with a faculty member on an approved Symbolic Systems–related project, taken as SYMSYS 196: Independent Study, OR one of the following department-based courses: (COMM 199: Individual Work; CS 197: Computer Science Research; CS 199: Independent Work; EDUC 190: Directed Research in Education; LINGUIST 199: Independent Study; MATH 360: Advanced Reading and Research; MUSIC 220D: Research in Computer-Generated Music; NBIO 199: Undergraduate Research; PHIL 196: Tutorial (Senior Year); PHIL 197: Individual Work, Undergraduate; PSYCH 195: Special Laboratory Projects; PSYCH 199: Individually Supervised Practicum; STATS 199: Independent Study)",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "SYMSYS 192",
              title:
                "Symbolic Systems in Practice (must be taken in conjunction with an approved internship or service project)",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "Teaching Practicum",
              title:
                "One of the following, taken in conjunction with section leading in a SymSys Core course: (SYMSYS 197: Practicum in Teaching SYMSYS 1; PSYCH 182: Practicum in Teaching PSYCH 1; CS 198: Teaching Computer Science)",
              units: 3,
              status: STATUS.NOT,
            },
          ],
        },
        {
          key: "integrative",
          title: "Integrative Requirement (choose one, after Junior Year)",
          description:
            "Choose one of the following integrative options (must be completed after Junior Year):",
          rule: { type: RULE.ONE_OF },
          items: [
            {
              code: "SYMSYS 190 (continuation)",
              title:
                "SYMSYS 190: Senior Honors Tutorial (continuation of the course taken for the Practicum requirement)",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "SYMSYS 195-series OR CS 177",
              title:
                "A course with a SYMSYS listing in the 195-series OR CS 177: Human-Centered Project Management (approved advanced project course integrating across breadth areas)",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "SYMSYS 196 OR Department-based",
              title:
                "Supervised research with a faculty member on an approved Symbolic Systems–related project, taken as SYMSYS 196: Independent Study, OR one of the following department-based courses: (COMM 199: Individual Work; CS 197: Computer Science Research; CS 199: Independent Work; EDUC 190: Directed Research in Education; LINGUIST 199: Independent Study; MATH 360: Advanced Reading and Research; MUSIC 220D: Research in Computer-Generated Music; NBIO 199: Undergraduate Research; PHIL 196: Tutorial (Senior Year); PHIL 197: Individual Work, Undergraduate; PSYCH 195: Special Laboratory Projects; PSYCH 199: Individually Supervised Practicum; STATS 199: Independent Study)",
              units: 3,
              status: STATUS.NOT,
            },
            {
              code: "CSIC",
              title:
                "An approved Concentration-Specific Integrative Course (CSIC) taken within a Concentration (integrates the themes of the Concentration with Core requirements outside that area)",
              units: 3,
              status: STATUS.NOT,
            },
          ],
        },
        {
          key: "presentation",
          title: "Presentation Requirement (check-off only, not a course)",
          description:
            "Complete one of the following presentation requirements (this is not a course requirement, just a check-off):",
          rule: { type: RULE.ONE_OF },
          items: [
            {
              code: "Autumn Poster Fair",
              title:
                "Symbolic Systems Autumn Poster Fair (for Summer interns and Capstone Projects)",
              units: 0,
              status: STATUS.NOT,
            },
            {
              code: "Spring Graduation Fair",
              title:
                "Symbolic Systems Spring Graduation Fair (for Capstone and Master's Projects)",
              units: 0,
              status: STATUS.NOT,
            },
            {
              code: "Senior Honors Forum",
              title:
                "Symbolic Systems Senior Honors Forum (end of Spring Quarter)",
              units: 0,
              status: STATUS.NOT,
            },
          ],
        },
      ],
    },
  ],
};
