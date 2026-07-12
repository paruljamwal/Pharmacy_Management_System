import { getHighlightedParts } from '../../utils/text';
import './HighlightText.css';

function HighlightText({ text, query }) {
  const parts = getHighlightedParts(text, query);

  return (
    <span className="highlight-text">
      {parts.map((part, index) =>
        part.match ? (
          <mark key={`${part.text}-${index}`} className="highlight-text__match">
            {part.text}
          </mark>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </span>
  );
}

export default HighlightText;
