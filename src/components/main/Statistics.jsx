import React, { useEffect, useState } from "react";
import SentenceLengthChart from "./SentenceLengthChart";
import Breakdown from "./Breakdown";
import Highlighter from "./Highlighter";
import BreakdownLineChart from "./BreakdownLineChart";
import Empty from "../../assets/presentation.gif";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Statistics = ({ data, prevData }) => {
  const calculateSentenceRhythm = (sentence) => {
    const wordsCount = sentence.split(/\s+/).length;
    if (wordsCount <= 5) return "S";
    if (wordsCount <= 18) return "M";
    return "L";
  };

  const [isBreakdownVisible, setIsBreakdownVisible] = useState(
    data?.map(() => false)
  );

  const [isGraphVisible, setIsGraphVisible] = useState(data?.map(() => false));

  const toggleBreakdownVisibility = (index) => {
    const updatedVisibility = [...isBreakdownVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setIsBreakdownVisible(updatedVisibility);
  };
  const toggleGraphVisibility = (index) => {
    const updatedVisibility = [...isGraphVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setIsGraphVisible(updatedVisibility);
  };

  // Functions to categorize sentences and calculate word counts
  function categorizeSentences(input, index) {
    const sentencedata = [
      {
        type: "SHORT",
        count: 0,
      },
      {
        type: "MEDIUM",
        count: 0,
      },
      {
        type: "LONG",
        count: 0,
      },
    ];

    function categorizeSentence(sentence) {
      const words = sentence?.split(" ");
      const wordCount = words?.length;

      if (wordCount <= 5) {
        return "SHORT";
      } else if (wordCount <= 18) {
        return "MEDIUM";
      } else {
        return "LONG";
      }
    }

    input[index]?.sentences?.forEach((sentence) => {
      const category = categorizeSentence(sentence?.sentence);
      sentencedata?.forEach((item) => {
        if (item?.type === category) {
          item.count++;
        }
      });
    });
    return sentencedata;
  }
  function calculateWordCounts(input, index) {
    const breakdowndata = [];
    input[index]?.sentences?.forEach((sentence, index) => {
      const words = sentence?.sentence
        ?.split(" ")
        .filter((word) => word !== ""); // Split sentence into words and remove empty strings
      breakdowndata.push({ id: index + 1, length: words?.length });
    });
    return breakdowndata;
  }

  // Function to transform input data
  function transformInput(inputData) {
    const outputData = inputData?.map((para, paraIndex) => {
      const id = `p${paraIndex + 1}`;
      const sentences = para.sentences
        .filter((sentence) => {
          return (
            sentence.content !== "" &&
            sentence.content !== "." &&
            sentence.content !== " "
          );
        })
        .map((sentence, sentenceIndex) => ({
          id: `${id}s${sentenceIndex + 1}`,
          sentence: sentence.content,
        }));
      return {
        id,
        sentences,
      };
    });

    return outputData;
  }

  const [analyseData, setAnalyseData] = useState([]);
  const [prevAnalyseData, setPrevAnalyseData] = useState([]);

  useEffect(() => {
    setAnalyseData(transformInput(data));
    setPrevAnalyseData(transformInput(prevData));
  }, [data, prevData]);

  return (
    <div
      id="statistics-wrapper"
      className="bg-gray-50 animate-fade-down h-full w-full animate-duration-[0.5s] rounded-lg border-[1px] border-gray-300 overflow-hidden px-3 py-6"
    >
      {data?.length === 0 ? (
        <div className="h-full bg-white rounded-lg shadow-md shadow-gray-300 w-full flex flex-col gap-2 justify-center items-center">
          <img src={Empty} alt="empty" className="w-10 h-10 " />
          <div>
            Select <span className="text-[#0084FF] italic">version</span> to
            analyze
          </div>
        </div>
      ) : (
        <div className="w-full overflow-y-auto h-full hideScroll">
          {analyseData?.map((item, index) => (
            <div className="flex flex-col w-full gap-2" key={item.id}>
              <div className="flex flex-col w-full px-2 items-start justify-center">
                <div className="text-[#0084FF] font-bold text-lg">
                  Paragraph {index + 1}
                </div>
                <div className="text-xs text-gray-500">
                  {item.sentences.length} sentences
                </div>
              </div>
              <Highlighter item={item} />
              <div className="bg-white border-2 border-gray-300 border-opacity-40 cursor-pointer rounded-md px-3 py-2 overflow-hidden">
                <div
                  className="text-sm flex justify-between font-semibold items-center text-[#0084FF]"
                  onClick={() => toggleBreakdownVisibility(index)}
                >
                  <span>Breakdown</span>
                  <div>
                    {isBreakdownVisible[index] ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-chevron-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  {isBreakdownVisible[index] && (
                    <Breakdown
                      item={item}
                      isBreakdownVisible={isBreakdownVisible[index]}
                    />
                  )}
                </div>
              </div>
              <div className="bg-white border-2 border-gray-300 border-opacity-40 cursor-pointer rounded-md px-3 py-2 overflow-hidden">
                <div
                  className="text-sm flex justify-between font-semibold items-center text-[#0084FF]"
                  onClick={() => toggleGraphVisibility(index)}
                >
                  <span>Visuals ✨</span>
                  <div>
                    {isGraphVisible[index] ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        fill="currentColor"
                        className="bi bi-chevron-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  {isGraphVisible[index] && (
                    <div className="w-full animate-fade animate-duration-[0.5s] h-full flex gap-2 justify-center items-center">
                      <SentenceLengthChart
                        data={categorizeSentences(analyseData, index)}
                        prevData={categorizeSentences(prevAnalyseData, index)}
                      />
                      <BreakdownLineChart
                        data={calculateWordCounts(analyseData, index)}
                        prevData={calculateWordCounts(prevAnalyseData, index)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full text-left">
                <div className="border-b flex py-4 px-6">
                  <div className="w-full px-1 flex items-center gap-2">
                    <div className="w-32 uppercase text-sm text-grey-dark">
                      Breakdown:
                    </div>
                    <div className="text-sm w-64 break-words">
                      {item.sentences
                        .map((sentence, index) => {
                          const length = sentence.sentence.split(/\s+/).length;
                          let classname;
                          if (length <= 5) {
                            classname =
                              "bg-gradient-to-b from-[#a3ff6a] to-[#649b64]";
                          } else if (length <= 18) {
                            classname =
                              "bg-gradient-to-b from-[#f2d374] to-[#efac48]";
                          } else {
                            classname =
                              "bg-gradient-to-b from-[#ff6868] to-[#9A2617]";
                          }
                          return (
                            <span
                              key={index}
                              className={`bg-clip-text text-transparent font-semibold ${classname} uppercase`}
                            >
                              {length}
                            </span>
                          );
                        })
                        .reduce((prev, curr, i) => {
                          return i === 0 ? [curr] : [...prev, ", ", curr];
                        }, [])}
                    </div>
                  </div>
                  <div
                    className="h-full w-fit p-1 items-center text-gray-400 flex justify-center"
                    data-tooltip-id="breakdown-tooltip"
                    data-tooltip-content="Breakdown is the sequence of word count of the sentences in this paragraph"
                    data-tooltip-place="top"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-info-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                    <Tooltip
                      id="breakdown-tooltip"
                      style={{
                        width: "300px",
                        fontSize: "14px",
                        wordBreak: "break-word",
                        textAlign: "justify",
                      }}
                    />
                  </div>
                </div>

                <div className="border-b flex py-4 px-6">
                  <div className="w-full px-1 flex items-center gap-2">
                    <div className="w-32 uppercase text-sm text-grey-dark">
                      Rhythm:
                    </div>
                    <div className="w-64 text-sm break-words">
                      {item.sentences
                        .map((sentence, index) => {
                          const d = calculateSentenceRhythm(sentence.sentence);
                          let classname;
                          if (d === "S") {
                            classname =
                              "bg-gradient-to-b from-[#a3ff6a] to-[#649b64]";
                          } else if (d === "M") {
                            classname =
                              "bg-gradient-to-b from-[#f2d374] to-[#efac48]";
                          } else {
                            classname =
                              "bg-gradient-to-b from-[#ff6868] to-[#9A2617]";
                          }
                          return (
                            <span
                              key={index}
                              className={`bg-clip-text text-transparent font-semibold ${classname} uppercase`}
                            >
                              {d}
                            </span>
                          );
                        })
                        .reduce((prev, curr, i) => {
                          return i === 0 ? [curr] : [...prev, ", ", curr];
                        }, [])}
                    </div>
                  </div>
                  <div
                    className="h-full w-fit p-1 items-center text-gray-400 flex justify-center"
                    data-tooltip-id="rhythm-tooltip"
                    data-tooltip-content="
                    Rhythm is the sequence of sentence type in this paragraph.
                    "
                    data-tooltip-place="top"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-info-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                    <Tooltip
                      id="rhythm-tooltip"
                      style={{
                        width: "300px",
                        fontSize: "14px",
                        wordBreak: "break-word",
                        textAlign: "justify",
                      }}
                    />
                  </div>
                </div>
                <div className="border-b flex items-center py-4 px-6 bg-grey-lightest">
                  <div className="w-full px-1 flex items-center">
                    <div className="w-32 uppercase text-sm text-grey-dark">
                      Statistics:
                    </div>
                    <div className="text-sm w-64">
                      <div className="border-b flex py-2 px-4 items-center">
                        <div className="font-bold bg-gradient-to-b from-[#a3ff6a] to-[#649b64] bg-clip-text text-transparent uppercase text-xs text-grey-dark">
                          Short Sentences:
                        </div>
                        <div className="bg-[#a3ff6a] text-[#1A5D1A] p-1 w-7 h-7 flex items-center justify-center rounded-full ml-auto">
                          {
                            item.sentences.filter(
                              (sentence) =>
                                sentence.sentence.split(/\s+/).length <= 5
                            ).length
                          }
                        </div>
                      </div>
                      <div className="border-b flex py-2 px-4 items-center">
                        <div className="font-bold bg-gradient-to-b from-[#f2d374] to-[#efac48] bg-clip-text text-transparent uppercase text-xs text-grey-dark">
                          Medium Sentences:
                        </div>
                        <div className="bg-[#f2d374] text-[#DE8601] p-1 w-7 h-7 flex items-center justify-center rounded-full ml-auto">
                          {
                            item.sentences.filter(
                              (sentence) =>
                                sentence.sentence.split(/\s+/).length > 5 &&
                                sentence.sentence.split(/\s+/).length <= 18
                            ).length
                          }
                        </div>
                      </div>
                      <div className="border-b flex py-2 px-4 items-center">
                        <div className="font-bold bg-gradient-to-b from-[#ff6868] to-[#9A2617] bg-clip-text text-transparent uppercase text-xs text-grey-dark">
                          Long Sentences:
                        </div>
                        <div className="bg-[#ff6868] text-[#9A2617] p-1 w-7 h-7 flex items-center justify-center rounded-full ml-auto">
                          {
                            item.sentences.filter(
                              (sentence) =>
                                sentence.sentence.split(/\s+/).length > 18
                            ).length
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-full w-fit p-1 items-center text-gray-400 flex justify-center"
                    data-tooltip-id="statistics-tooltip"
                    data-tooltip-content="
                    Statistics is the count of Short (1-5 words), Medium (5-18 words) and Long (>18 words) sentences in this paragraph.
                    "
                    data-tooltip-place="top"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-info-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                    <Tooltip
                      id="statistics-tooltip"
                      style={{
                        width: "300px",
                        fontSize: "14px",
                        wordBreak: "break-word",
                        textAlign: "justify",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Statistics;
