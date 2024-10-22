import React from "react";

const FavoriteCount = ({ count }) => {
  return (
    <div className="favoriteCount-container">
      <div className="favoriteCount-box">
        <img
          className="favoriteCount-image"
          src="/assets/Icon (2).png"
          alt="좋아요 하트 모양"
        />
        <p className="favoriteCount">{count}</p>
      </div>
    </div>
  );
};

export default FavoriteCount;
