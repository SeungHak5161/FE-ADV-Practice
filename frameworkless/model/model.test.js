import model from "./model";

describe("mvc", () => {
  const state = { todos: [], currentFilter: "All" };

  it("should be return empty object", () => {
    const Model = model();
    expect(Model.getState()).toEqual(state);
  });

  it("should be add an item", () => {
    const Model = model();
    Model.addItem("first");
    expect(Model.getState().todos).toEqual([
      { text: "first", completed: false },
    ]);
  });

  test("should not add an item when a falsy text is provided", () => {
    const Model = model();

    Model.addItem("");
    Model.addItem(undefined);
    Model.addItem(0);
    Model.addItem();
    Model.addItem(false);

    const { todos } = Model.getState();

    expect(todos.length).toBe(0);
  });

  test("should update an item", () => {
    const Model = model({
      todos: [
        {
          text: "dummy",
          completed: false,
        },
      ],
    });

    Model.updateItem(0, "new-dummy");

    const { todos } = Model.getState();

    expect(todos[0].text).toBe("new-dummy");
  });

  test("should not update an item when an invalid index is provided", () => {
    const Model = model({
      todos: [
        {
          text: "dummy",
          completed: false,
        },
      ],
    });

    Model.updateItem(1, "new-dummy");

    const { todos } = Model.getState();

    expect(todos[0].text).toBe("dummy");
  });
});
