import React, { useState } from "react";
import { FormatDateAgo } from "../util/FormatDate";

const Comment = ({
  key,
  comment,
  onEditClick,
  isEditing,
  onEditSave,
  onEditCancel,
  activeDropdown,
  onDropdownToggle,
}) => {
  const [editedContent, setEditedContent] = useState(comment.content); // 수정할 내용
  return (
    <li key={comment.id} className="comments-list">
      <div className="comments-content-box">
        {/* 수정하려는 id 와 해당 id가 같으면 UI 나타내기 */}
        {isEditing && (
          <div className="update-input-box">
            <textarea
              className="update-input"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="edit-button-box">
              <button className="cancel-button" onClick={onEditCancel}>
                취소
              </button>
              <button
                className="edit-button"
                onClick={() => onEditSave(comment.id, editedContent)}
              >
                수정 완료
              </button>
            </div>
          </div>
        )}
        {/* 수정하려는 id 와 해당 id가 다르면 UI 나타내기 */}
        {!isEditing && (
          <>
            <p>{comment.content}</p>
            <img
              className="dropdown-image"
              src="/assets/Group 33735.png"
              alt="수정/삭제 버튼 드롭다운"
              onClick={() => onDropdownToggle(comment.id)}
            />
          </>
        )}
        {activeDropdown === comment.id && (
          <div className="dropdown-menu">
            <button
              className="dropdown-text"
              onClick={() => onEditClick(comment)}
            >
              수정하기
            </button>
            <button className="dropdown-text">삭제하기</button>
          </div>
        )}
      </div>
      <div className="comments-writer-box">
        <img
          className="writer-profile"
          src="/assets/size=large.png"
          alt="사용자 프로필 이미지"
        />
        <div>
          <h3 className="writer-nickname">{comment.writer.nickname}</h3>
          <p className="write-time">{FormatDateAgo(comment.updatedAt)}</p>
        </div>
      </div>
    </li>
  );
};

export default Comment;
