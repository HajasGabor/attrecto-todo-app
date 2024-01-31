import React, { useEffect, useCallback, useRef } from "react";
import "./TodosModal.css";
import TodoApp from "./TodoApp";

const TodosModal = ({ setModalOpen, userId, userName }) => {
  const modalRef = useRef();

  const handleOutsideClick = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    },
    [setModalOpen]
  );

  useEffect(() => {
    const handleDocumentClick = (e) => {
      handleOutsideClick(e);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className="modalContainer" ref={modalRef}>
      <div className="modalContent">
        {userId && <TodoApp userId={userId} userName={userName} />}
        <div className="modalFooter">
          <div className="closeBtn">
            <button onClick={() => setModalOpen(false)}>X</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosModal;
