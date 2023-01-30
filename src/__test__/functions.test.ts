import {
  addTodo,
  changeTodo,
  removeAllTodos,
  sortTodosByName,
} from '../ts/functions';
import { Todo } from '../ts/models/Todo';

describe('test addTodo', () => {
  test('should add todo', () => {
    // arrange
    let todos: Todo[] = [
      {
        text: 'workout',
        done: false,
      },
      {
        text: 'school',
        done: true,
      },
    ];
    const todoText = 'eat dinner';
    const todosLength = todos.length;

    // act
    const returnValue = addTodo(todoText, todos);

    // assert
    expect(todos.length).toBe(todosLength + 1);
    expect(todos[todos.length - 1].text).toBe(todoText);
    expect(returnValue).toStrictEqual({ success: true, error: '' });
  });

  test('should not add todo', () => {
    // arrange
    let todos: Todo[] = [
      {
        text: 'workout',
        done: false,
      },
      {
        text: 'school',
        done: true,
      },
    ];
    const todoText = 'ea';
    const todosLength = todos.length;

    // act
    const returnValue = addTodo(todoText, todos);

    // assert
    expect(todos.length).toBe(todosLength);
    expect(returnValue).toStrictEqual({
      success: false,
      error: 'Du måste ange minst tre bokstäver',
    });
  });
});

test('change todo to done/false', () => {
  // arrange
  let todos: Todo[] = [
    {
      text: 'workout',
      done: false,
    },
    {
      text: 'school',
      done: true,
    },
  ];
  const todo1 = todos[0];
  const todo2 = todos[1];

  // act
  changeTodo(todo1);
  changeTodo(todo2);

  // assert
  expect(todo1.done).toBe(true);
  expect(todo2.done).toBe(false);
});

test("should remove all todo's from array", () => {
  // arrange
  let todos: Todo[] = [
    {
      text: 'workout',
      done: false,
    },
    {
      text: 'school',
      done: true,
    },
  ];

  // act
  removeAllTodos(todos);

  // assert
  expect(todos.length).toBe(0);
});

describe('test sortTodosByName', () => {
  test('sort todos alphabetically and return sorted array', () => {
    // arrange
    let todos: Todo[] = [
      {
        text: 'workout',
        done: false,
      },
      {
        text: 'alert',
        done: true,
      },
      {
        text: 'school',
        done: true,
      },
    ];

    // act
    const result = sortTodosByName(todos);

    // assert
    expect(result[0].text).toBe('alert');
    expect(result[1].text).toBe('school');
    expect(result[2].text).toBe('workout');
  });
});
