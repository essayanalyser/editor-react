// const input = [
//   {
//     id: "p1",
//     sentences: [
//       {
//         id: "p1s1",
//         sentence:
//             "To the advertisers' delight, people nowadays follow the news like they have a Current Events Quiz to ace at breakfast; while, at the same time, doing nothing with the information they consume.",
//       },
//       {
//         id: "p1s2",
//         sentence:
//           "But following the news is a lost race because they are never-ending.",
//       },
//       {
//         id: "p1s3",
//         sentence:
//           "A better strategy is to consume ideas that will overcome the passing of time, ideas that will make you run for your notepad or note-taking app to register an epiphany.",
//       },
//       {
//         id: "p1s4",
//         sentence:
//           "Instead of being passive recipients of news we need to become active players in our content diets.",
//       },
//       {
//         id: "p1s5",
//         sentence:
//           "Reach for timeless, useful information and news that are relevant for decision-making instead of allowing getting thrown whatever the latest political fight is.",
//       },
//       {
//         id: "p1s6",
//         sentence:
//           "Search in specialty websites or industry publications rather than in the go-to news tv channel.",
//       },
//       {
//         id: "p1s7",
//         sentence:
//           "You can also stay up-to-date with what’s important to you through newsletters.",
//       },
//       {
//         id: "p1s8",
//         sentence:
//           "There are plenty of possibilities, don’t go with the standard one.",
//       },
//       {
//         id: "p1s9",
//         sentence: "Information is freedom.",
//       },
//       {
//         id: "p1s10",
//         sentence: "Choose your sources wisely.",
//       },
//     ],
//     },
//      {
//     id: "p2",
//     sentences: [
//       {
//         id: "p2s1",
//         sentence:
//             "To the advertisers' delight, people nowadays follow the news like they have a Current Events Quiz to ace at breakfast; while, at the same time, doing nothing with the information they consume.",
//       },
//       {
//         id: "p2s2",
//         sentence:
//           "But following the news is a lost race because they are never-ending.",
//       },
//       {
//         id: "p2s3",
//         sentence:
//           "A better strategy is to consume ideas that will overcome the passing of time, ideas that will make you run for your notepad or note-taking app to register an epiphany.",
//       },
//       {
//         id: "p2s4",
//         sentence:
//           "Instead of being passive recipients of news we need to become active players in our content diets.",
//       },
//       {
//         id: "p2s5",
//         sentence:
//           "Reach for timeless, useful information and news that are relevant for decision-making instead of allowing getting thrown whatever the latest political fight is.",
//       },
//       {
//         id: "p2s6",
//         sentence:
//           "Search in specialty websites or industry publications rather than in the go-to news tv channel.",
//       },
//       {
//         id: "p2s7",
//         sentence:
//           "You can also stay up-to-date with what’s important to you through newsletters.",
//       },
//       {
//         id: "p2s8",
//         sentence:
//           "There are plenty of possibilities, don’t go with the standard one.",
//       },
//       {
//         id: "p2s9",
//         sentence: "Information is freedom.",
//       },
//       {
//         id: "p2s10",
//         sentence: "Choose your sources wisely.",
//       },
//     ],
//   },
// ];

import gotData from "../Editor/Editor.jsx"

const input = [ gotData ];

const sentencedata = [
  {
    type: 'SHORT',
    count: 2,
  },
  {
    type: 'MEDIUM',
    count: 5,
  },
  {
    type: 'LONG',
    count: 3,
  },
];

const breakdowndata = [
    {
      id: 1,
      length: 32,
    },
    {
      id: 2,
      length: 12,
    },
    {
      id: 3,
      length: 30,
    },
    {
      id: 4,
      length: 17,
    },
    {
      id: 5,
      length: 23,
    },
    {
      id: 6,
      length: 15,
    },
    {
      id: 7,
      length: 12,
    },
    {
      id: 8,
      length: 11,
    },
    {
      id: 9,
      length: 3,
    },
    {
      id: 10,
      length: 4
    }
  ]

export { input, sentencedata, breakdowndata };
