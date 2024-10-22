import React from "react";

const TagList = ({ tags }) => {
  return (
    <div className="detailItem-tag-container">
      {tags.map((tag, productId) => (
        <div key={productId} className="detailItem-tag-box">
          #{tag}
        </div>
      ))}
    </div>
  );
};

export default TagList;
