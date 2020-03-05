import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Keywords = ({ title, clbk, defaultTags, dataSaved }) => {
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);

  useEffect(()=>{
    setTags(defaultTags)
  }, [defaultTags])

  const removeTag = i => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
    clbk(newTags);
  };

  const addTag = (tag) => {
    const newTags = [...tags, tag];
    setTags(newTags);
    clbk(newTags);
  }

  const handleClick = e => {
    const val = inputRef.current.value;
    e.preventDefault();
    if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
      return;
    }
    addTag(val.toLowerCase())
    inputRef.current.value = "";
  };

  const inputKeyDown = e => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
        e.preventDefault();
        if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
          return;
        }
        addTag(val.toLowerCase())
        e.target.value = "";
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };

  return (
      <div className="tags">

            {!dataSaved && (
            <span className="input-btn">
                <input
                type="text"
                ref={inputRef}
                onKeyDown={inputKeyDown}
                id={title}
                name={title}
                />
                <button
                type="button"
                onClick={handleClick}
                className="btn-add"
                >
                <FontAwesomeIcon icon={faPlus} />
                </button>
            </span>
            )}

            <div className="tags-container">
            <ul className="ul-tags">
                {tags.map((tag, i) => (
                <li className={title} key={tag}>
                    {tag}
                    {!dataSaved && (
                      <button
                      type="button"
                      onClick={() => {
                          removeTag(i);
                      }}
                      >
                      +
                      </button>
                    )}
                </li>
                ))}
            </ul>
            </div>
        </div>

  );
};

export default Keywords;
