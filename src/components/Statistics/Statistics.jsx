import React, { useState } from "react";
import { input, breakdowndata, sentencedata } from "./dummydata";
import "./../../stylesheets/statistics.css";
import SentenceLengthChart from "./components/SentenceLengthChart";
import BreakdownChart from "./components/BreakdownChart";
import Breakdown from "./components/Breakdown";
import Highlighter from "./components/Highlighter";

const Statistics = () => {
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
    input.map(() => false)
  );
  const [isGraphVisible, setIsGraphVisible] = useState(
    input.map(() => false)
  );

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

  return (
    <div className="statistics">
      <div className="header">Analysis</div>
      <div className="stats">
        {input.map((item, index) => (
          <div className="paragraphStats" key={item.id}>
            <div className="paragraphHeader">
              <div className="paragraphTitle">
                Paragraph {index + 1}
              </div>
              <div className="paragraphLength">
                {item.sentences.length} sentences
              </div>
            </div>
            <Highlighter item={item} />
            <div className="accordion">
            <div className="accordionHeader" onClick={() => toggleBreakdownVisibility(index)}>
              <span>Breakdown</span>
              <div>
                {isBreakdownVisible[index] ? (
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
            {isBreakdownVisible[index] && (
              <Breakdown item={item} isBreakdownVisible={isBreakdownVisible[index]} />
            )}
            </div>
            </div>
            <div className="accordion">
            <div className="accordionHeader" onClick={() => toggleGraphVisibility(index)}>
              <span>Visuals  ✨</span>
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
              <SentenceLengthChart data={sentencedata} />
              <BreakdownChart data={breakdowndata} />
              </div>
            )}
            </div>
            </div>
            <table>
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
                  </table>
                </td>
              </tr>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
