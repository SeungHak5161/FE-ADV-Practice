import filtersView from "./filters.js";
const TEMPLATE = `<ul>
                    <li>
                      <a href="#/">All</a>
                    </li>
                    <li>
                      <a href="#/active">Active</a>
                    </li>
                    <li>
                      <a href="#/completed">Completed</a>
                    </li>
                  </ul>`;

let targetElement;
describe("filtersView", () => {
  beforeEach(() => {
    const targetWrapper = document.createElement("div");
    targetWrapper.innerHTML = TEMPLATE;
    targetElement = targetWrapper.childNodes[0];
  });

  // currentFilter: "All" | "Active" | Completed"
  it('should add class "selected" to a tag with the same text of currentFilter', () => {
    const newFilters = filtersView(
      targetElement,
      { currentFilter: "Active" },
      { changeFilter: jest.fn() }
    );
    const selected = newFilters.querySelector("li a.selected");
    expect(selected.textContent).toBe("Active");
  });

  it("should call changeFilter when 'Completed' anchor is clicked", () => {
    const changeFilter = jest.fn();
    const newCounter = filtersView(
      targetElement,
      {
        currentFilter: "Active",
      },
      {
        changeFilter,
      }
    );

    // "Completed" 링크를 선택합니다.
    const completedLink = newCounter.querySelector("li a[href='#/completed']");

    // 클릭 이벤트를 시뮬레이션합니다.
    completedLink.click();

    // changeFilter 함수가 "Completed"와 함께 호출되었는지 확인합니다.
    expect(changeFilter).toHaveBeenCalledWith("Completed");
  });
});
