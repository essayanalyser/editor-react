import React, { useEffect, useState } from "react";
import "./../../stylesheets/statistics.css";
import SentenceLengthChart from "./components/SentenceLengthChart";
import BreakdownChart from "./components/BreakdownChart";
import Breakdown from "./components/Breakdown";
import Highlighter from "./components/Highlighter";

const Statistics = ({ authUser, data }) => {
  const calculateSentenceRhythm = (sentences) => {
    const rhythm = sentences.map((sentence) => {
      const wordsCount = sentence.split(/\s+/).length;
      if (wordsCount <= 5) return "S";
      if (wordsCount <= 18) return "M";
      return "L";
    });
    return rhythm.join(",");
  };

  const [isBreakdownVisible, setIsBreakdownVisible] = useState(
    data.map(() => false)
  );
  const [isGraphVisible, setIsGraphVisible] = useState(data.map(() => false));

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
      const words = sentence.split(" ");
      const wordCount = words.length;

      if (wordCount <= 5) {
        return "SHORT";
      } else if (wordCount <= 18) {
        return "MEDIUM";
      } else {
        return "LONG";
      }
    }

    input[index].sentences.forEach((sentence) => {
      const category = categorizeSentence(sentence.sentence);
      sentencedata.forEach((item) => {
        if (item.type === category) {
          item.count++;
        }
      });
    });
    return sentencedata;
  }

  function calculateWordCounts(input, index) {
    const breakdowndata = [];
    input[index].sentences.forEach((sentence, index) => {
      const words = sentence.sentence.split(" ").filter((word) => word !== ""); // Split sentence into words and remove empty strings
      breakdowndata.push({ id: index + 1, length: words.length });
    });
    return breakdowndata;
  }

  function transformInput(inputData) {
    const outputData = inputData.map((para, paraIndex) => {
      const id = `p${paraIndex + 1}`;
      const sentences = para.sentences.map((sentence, sentenceIndex) => ({
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

  useEffect(() => {
    if (authUser) {
      setAnalyseData(transformInput(data));
    }
  }, [data, authUser]);

  return (
    <div className="h-full w-1/2 bg-gray-50 border-l-[1px] border-gray-300 overflow-hidden px-3 py-6">
      <div className="w-full overflow-y-auto h-full">
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
                  <div className="visuals">
                    <SentenceLengthChart
                      data={categorizeSentences(analyseData, index)}
                    />
                    <BreakdownChart
                      data={calculateWordCounts(analyseData, index)}
                    />
                  </div>
                )}
              </div>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>Breakdown:</td>
                  <td>
                    {item.sentences
                      .map((sentence) => sentence.sentence.split(/\s+/).length)
                      .join(", ")}
                  </td>
                </tr>

                <tr>
                  <td>Rhythm:</td>
                  <td>
                    {calculateSentenceRhythm(
                      item.sentences.map((sentence) => sentence.sentence)
                    )}
                  </td>
                </tr>

                <tr>
                  <td>Statistics:</td>
                  <td>
                    <table className="statsbullets">
                      <tbody>
                        <tr>
                          <td>Short Sentences:</td>
                          <td>
                            <span className="short sentenceGroup">
                              {
                                item.sentences.filter(
                                  (sentence) =>
                                    sentence.sentence.split(/\s+/).length <= 5
                                ).length
                              }
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Medium Sentences:</td>
                          <td>
                            <span className="medium sentenceGroup">
                              {
                                item.sentences.filter(
                                  (sentence) =>
                                    sentence.sentence.split(/\s+/).length > 5 &&
                                    sentence.sentence.split(/\s+/).length <= 18
                                ).length
                              }
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Long Sentences:</td>
                          <td>
                            <span className="long sentenceGroup">
                              {
                                item.sentences.filter(
                                  (sentence) =>
                                    sentence.sentence.split(/\s+/).length > 18
                                ).length
                              }
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
