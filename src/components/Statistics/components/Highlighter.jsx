import React from 'react'
import "../../../stylesheets/statistics.css"
const Highlighter = ({ item }) => {
  const getHighlightColor = (length) => {
    if (length <= 5) return '#ACE986';
    if (length <= 18) return '#FFEA79';
    return '#FFB3B3';
  };
  const getTextColor = (length) => {
    if (length <= 5) return '#1A5D1A';
    if (length <= 18) return '#DE8601';
    return '#9A2617';
  };
  return (
    <div className='highlighter'>
    {item.sentences.map((sentence) => (
        <span
        key={sentence.id}
        className='smallText'
        style={{ backgroundColor: getHighlightColor(sentence.sentence.split(/\s+/).length),color: getTextColor(sentence.sentence.split(/\s+/).length),fontWeight:600,letterSpacing: '0.025em' }}
        >
            {" "}{sentence.sentence}
        </span>
    ))}
    </div>
  )
}

export default Highlighter