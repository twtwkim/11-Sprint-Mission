import React from "react";
import { FormatDate } from "../util/FormatDate";

const UserInfo = ({ ownerNickname, createdAt }) => {
  return (
    <div className="user-box">
      <img
        className="user-profile"
        src="/assets/size=large.png"
        alt="사용자 프로필 이미지"
      />
      <div>
        <p className="user-nickname">{ownerNickname}</p>
        <p className="created-time">{FormatDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default UserInfo;
