import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getCommentsById, updateCommentsById } from "../api/api";
import "../css/CommentsList.css";
import Comment from "./Comment";

const CommentsList = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(100);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID

  useEffect(() => {
    const fetchCommentsById = async () => {
      try {
        setLoading(true);
        const result = await getCommentsById(productId, {
          limit: limit,
        });
        setComments(result.list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentsById();
  }, [productId, limit]);

  const handleDropdownToggle = (commentId) => {
    if (activeDropdown === commentId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(commentId);
    }
  };

  const handleEditClick = (comment) => {
    //수정하기 클릭 이벤트
    setEditingCommentId(comment.id); // 수정할 댓글 ID 설정
    setActiveDropdown(null); // 드롭다운 닫기
  };

  const handleEditCancel = () => {
    //수정 취소 이벤트
    setEditingCommentId(null);
  };

  const handleEditSave = async (commentId, editedContent) => {
    //수정 완료 이벤트
    try {
      await updateCommentsById(commentId, { content: editedContent });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedContent }
            : comment
        )
      );
      setEditingCommentId(null); // 수정 모드 종료
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (comments.length === 0) {
    return (
      <div className="no-question-box">
        <img
          className="no-question-image"
          src="/assets/Group 33739.png"
          alt="아직 문의가 없는 팬더 사진"
        />
        <p className="no-question-text">아직 문의가 없어요</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEditClick={handleEditClick}
            isEditing={editingCommentId === comment.id}
            onEditSave={handleEditSave}
            onEditCancel={handleEditCancel}
            activeDropdown={activeDropdown}
            onDropdownToggle={handleDropdownToggle}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
