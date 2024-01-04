import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import nextId from "react-id-generator";
import { addTodo } from "../../../redux/modules/todos.js";

const Form = () => {
  // const id = nextId();
  const [todo, setTodo] = useState({
    id: 1,
    title: "리액트",
    body: "리액트를 배워봅시다",
    isDone: false,
  });
  // 제목 input state 추가
  const [title, setTitle] = useState("");
  // 내용 input state 추가
  const [body, setBody] = useState("");
  // global state 추가
  const todos = useSelector((state) => {
    // console.log("state값 확인해보기=>", state);
    return state.todos.todos;
  });
  // useDispatch 사용
  const dispatch = useDispatch();
  // title input value state 변경 감지
  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
    // console.log("title 변경 감지=>", event.target.value);
  };
  // body input value state 변경 감지
  const onBodyChangeHandler = (event) => {
    setBody(event.target.value);
    // console.log("body 변경 감지 =>", event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (todo.title.trim() === "" || todo.body.trim() === "")
      setTodo({
        id: 1,
        title: "",
        body: "",
        isDone: false,
      });
  };

  // 추가하기 onClick 추가 버튼 핸들러 생성
  const addTodoList = () => {
    const newTodo = {
      id: todos.length + 1,
      title,
      body,
      isDone: false,
    };
    // 추가 버튼 클릭시 dispatch 사용해 action creator 실행하며 인자값 payload로 상수 newTodo전달
    dispatch(addTodo(newTodo));
    // 추가하기 동작후 input value들 초기화
    setTitle("");
    setBody("");
  };

  return (
    <StAddForm onSubmit={onSubmitHandler}>
      <StInputGroup>
        <StFormLabel>제목</StFormLabel>
        <StAddInput
          type="text"
          name="title"
          onChange={onTitleChangeHandler}
          value={title}
        />
        <StFormLabel>내용</StFormLabel>
        <StAddInput
          type="text"
          name="body"
          onChange={onBodyChangeHandler}
          value={body}
        />
      </StInputGroup>
      <StAddButton onClick={addTodoList}>추가하기</StAddButton>
    </StAddForm>
  );
};

export default Form;

const StInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StFormLabel = styled.label`
  font-size: 16px;
  font-weight: 700;
`;

const StAddForm = styled.form`
  background-color: #eee;
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  gap: 20px;
`;

const StAddInput = styled.input`
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
`;

const StAddButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;
