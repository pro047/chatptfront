import { useEffect, useState } from 'react';
import { Item } from '../types/types';

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<Item[]>([]);
  const [nextId, setNextid] = useState(1);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todosList');

    if (storedTodos) setTodoList(JSON.parse(storedTodos));
    const id = parseInt(localStorage.getItem('NextId') || '1', 10);
    setTodoList([{ id, text: '', done: false, confirm: false }]);
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    console.log('nextId', localStorage.getItem('NextID'));
    localStorage.setItem('NextId', nextId.toString());
  }, [nextId]);

  const onAddTodoList = () => {
    const lastItem = todoList[todoList.length - 1];
    if (lastItem && lastItem.text.trim() === '') {
      alert('할 일을 입력해주세요!');
      return;
    }
    const todoListObj = {
      id: nextId,
      text: '',
      done: false,
      confirm: false,
    };
    const newTodoList = [...todoList, todoListObj];
    setTodoList(newTodoList);
    setNextid(nextId + 1);
  };

  const onDeleteTodoList = (removeInputId: number) => {
    const deletedTodoList = todoList.filter(
      (item: Item) => item.id !== removeInputId
    );
    setTodoList(deletedTodoList);
    localStorage.setItem('todoList', JSON.stringify(deletedTodoList));
  };

  const onUpdateTodoList = (updatedInputId: number, newText: string) => {
    const updatedTodoList = todoList.map((item: Item) =>
      item.id === updatedInputId ? { ...item, text: newText } : item
    );
    setTodoList(updatedTodoList);
  };

  const onToggelDone = (toggleId: number) => {
    const updatedTodoList = todoList.map((item: Item) =>
      item.id === toggleId ? { ...item, done: !item.done } : item
    );
    setTodoList(updatedTodoList);
  };

  const onClickInputConfirm = (inputId: number) => {
    const confirmList = todoList.map((item: Item) =>
      item.id === inputId ? { ...item, confirm: true } : item
    );
    setTodoList(confirmList);
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };

  return {
    todoList,
    onAddTodoList,
    onUpdateTodoList,
    onDeleteTodoList,
    onToggelDone,
    onClickInputConfirm,
  };
};
