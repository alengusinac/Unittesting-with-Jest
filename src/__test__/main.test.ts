/**
 * @jest-environment jsdom
 */

import * as main from '../ts/main';
import * as functions from '../ts/functions';
import { Todo } from '../ts/models/Todo';

beforeEach(() => {
  document.body.innerHTML = '';
  jest.restoreAllMocks();
  process.env.sortReverse = 'false';
});

describe('test init', () => {
  test('should call clearTodos when #clearTodos is clicked', () => {
    // arrange
    document.body.innerHTML = `
    <button type="button" id="clearTodos">Rensa lista</button>
    `;
    const spyOnClearTodos = jest.spyOn(main, 'clearTodos').mockReturnValue();

    // act
    main.init();
    document.getElementById('clearTodos')?.click();

    // assert
    expect(spyOnClearTodos).toHaveBeenCalled();
  });

  test('should call createNewTodo and console.log on form submit', () => {
    // arrange
    document.body.innerHTML = `
    <form id="newTodoForm">
      <div>
        <input type="text" id="newTodoText" value="work" />
        <button>Skapa</button>
      </div>
    </form>
    `;
    const formContainer = document.getElementById(
      'newTodoForm'
    ) as HTMLFormElement;
    const spyOnCreateNewTodo = jest
      .spyOn(main, 'createNewTodo')
      .mockReturnValue();
    const spyOnConsoleLog = jest.spyOn(console, 'log').mockReturnValue();
    // const e = { preventDefault: () => {} };
    // const e = new SubmitEvent('submit');
    // jest.spyOn(e, 'preventDefault');

    // act
    main.init();
    document.querySelector('button')?.click();

    // assert
    expect(spyOnCreateNewTodo).toHaveBeenCalled();
    expect(spyOnConsoleLog).toHaveBeenCalled();
    // expect(e.preventDefault).toHaveBeenCalled();
  });

  test('should call createHtml and sortTodosByName when #sortTodos is clicked', () => {
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
    document.body.innerHTML = `
    <button type="button" id="sortTodos">Sortera (namn)</button>
    `;
    const spyOnSortTodosByName = jest
      .spyOn(functions, 'sortTodosByName')
      .mockReturnValue(todos);
    const spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();

    // act
    main.init();
    document.getElementById('sortTodos')?.click();
    document.getElementById('sortTodos')?.click();

    // assert
    expect(spyOnSortTodosByName).toHaveBeenCalled();
    expect(spyOnCreateHtml).toHaveBeenCalled();
  });
});

describe('test createNewTodo', () => {
  test('should create new todo', () => {
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
    const todoText = 'work project';
    const spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
    const spyOnDisplayError = jest
      .spyOn(main, 'displayError')
      .mockReturnValue();

    // act
    main.createNewTodo(todoText, todos);

    // assert
    expect(spyOnCreateHtml).toHaveBeenCalled();
    expect(spyOnDisplayError).not.toHaveBeenCalled();
  });

  test('should not create new todo', () => {
    // arrrange
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
    const todoText = 'wo';
    const spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
    const spyOnDisplayError = jest
      .spyOn(main, 'displayError')
      .mockReturnValue();

    // act
    main.createNewTodo(todoText, todos);

    // assert
    expect(spyOnCreateHtml).not.toHaveBeenCalled();
    expect(spyOnDisplayError).toHaveBeenCalled();
  });
});

describe('test createHtml', () => {
  test('should create li elements', () => {
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
    document.body.innerHTML = `
    <ul id="todos" class="todo"></ul>
    `;

    // act
    main.createHtml(todos);

    // assert
    const todosContainer = document.getElementById('todos');
    const result = `
    <li class="todo__text">workout</li>
    <li class="todo__text todo__text--done">school</li>
    `;
    expect(todosContainer?.innerHTML.trim).toBe(result.trim);
  });

  test('click on li should call toggleTodo', () => {
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
    document.body.innerHTML = `
    <ul id="todos" class="todo"></ul>
    `;
    const spyOnToggleTodo = jest.spyOn(main, 'toggleTodo').mockReturnValue();

    // act
    main.createHtml(todos);

    // assert
    document.querySelector('li')?.click();
    expect(spyOnToggleTodo).toHaveBeenCalled();
  });
});

describe('test toggleTodo', () => {
  test('should call for changeTodo and createHtml', () => {
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
    const todo = todos[0];
    const spyOnChangeTodo = jest
      .spyOn(functions, 'changeTodo')
      .mockReturnValue();
    const spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();

    // act
    main.toggleTodo(todo);

    // assert
    expect(spyOnChangeTodo).toHaveBeenCalled();
    expect(spyOnCreateHtml).toHaveBeenCalled();
  });
});

describe('test displayError', () => {
  test('should show error', () => {
    // arrange
    document.body.innerHTML = `
    <div id="error" class="error"></div>
    `;
    const error = 'Du måste ange minst tre bokstäver';
    const show = true;

    // act
    main.displayError(error, show);

    // assert
    const errorContainer = document.getElementById('error') as HTMLDivElement;
    expect(errorContainer?.innerHTML).toBe(error);
    expect(errorContainer?.classList).toContain('show');
  });

  test('should not show error', () => {
    // arrange
    document.body.innerHTML = `
    <div id="error" class="error"></div>
    `;
    const error = '';
    const show = false;

    // act
    main.displayError(error, show);

    // assert
    const errorContainer = document.getElementById('error') as HTMLDivElement;
    expect(errorContainer?.innerHTML).toBe(error);
    expect(errorContainer?.classList).not.toContain('show');
  });
});

describe('test clearTodos', () => {
  test('should call for removeAllTodos and createHtml', () => {
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
    const spyOnRemoveAllTodos = jest
      .spyOn(functions, 'removeAllTodos')
      .mockReturnValue();
    const spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();

    // act
    main.clearTodos(todos);

    // assert
    expect(spyOnRemoveAllTodos).toHaveBeenCalled();
    expect(spyOnCreateHtml).toHaveBeenCalled();
  });
});
