(() => {
  const consoleRoot = document.querySelector(".tag-console");
  const signalCard = document.querySelector(".signal-card");
  if (!consoleRoot || !signalCard) return;

  const families = [
    { name: "Enterprise Workflow", all: 47, ai: 25 },
    { name: "Ads, Marketing & Growth", all: 39, ai: 15 },
    { name: "Fintech & Payments", all: 31, ai: 7 },
    { name: "Security & Trust", all: 30, ai: 6 },
    { name: "Platform & API", all: 27, ai: 15 },
    { name: "Data & Analytics", all: 24, ai: 10 },
    { name: "Internal Business Systems", all: 22, ai: 2 },
    { name: "Developer Tools", all: 21, ai: 8 },
    { name: "Cloud Infrastructure", all: 17, ai: 3 },
    { name: "Health & Clinical", all: 17, ai: 3 },
    { name: "Consumer Experience", all: 14, ai: 3 },
    { name: "Hardware & Mobility", all: 13, ai: 2 },
    { name: "Marketplace & Commerce", all: 10, ai: 2 },
    { name: "Undisclosed / Other", all: 8, ai: 0 },
    { name: "Collaboration & Productivity", all: 7, ai: 1 },
  ];

  const lensButtons = [...consoleRoot.querySelectorAll(".segmented button")];
  const tagButtons = [...consoleRoot.querySelectorAll(".tag-cloud button")];
  const clearButton = consoleRoot.querySelector(".console-title button");
  const sliceNumber = signalCard.querySelector(".slice-number");
  const sliceLabel = signalCard.querySelector(".slice-label");
  const shareValue = signalCard.querySelector(".slice-share b");
  const shareLabel = signalCard.querySelector(".slice-share span");
  const selectedList = signalCard.querySelector(".selected-list");
  let aiOnly = true;

  function render() {
    const denominator = aiOnly ? 102 : 327;
    let total = 0;
    const selected = [];

    tagButtons.forEach((button, index) => {
      const value = aiOnly ? families[index].ai : families[index].all;
      button.querySelector("b").textContent = String(value);
      if (button.classList.contains("selected")) {
        total += value;
        selected.push(families[index].name);
      }
    });

    lensButtons.forEach((button, index) => {
      button.classList.toggle("active", aiOnly ? index === 1 : index === 0);
    });
    sliceNumber.textContent = String(total);
    sliceLabel.textContent = `${aiOnly ? "AI PM" : "ALL PM"} OPENINGS`;
    shareValue.textContent = `${((total / denominator) * 100).toFixed(1)}%`;
    shareLabel.textContent = `of the observed ${aiOnly ? "AI PM" : "PM"} market`;
    selectedList.replaceChildren(
      ...selected.map((name) => {
        const tag = document.createElement("span");
        tag.textContent = `× ${name}`;
        return tag;
      }),
    );
  }

  lensButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      aiOnly = index === 1;
      render();
    });
  });

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.classList.toggle("selected");
      button.setAttribute("aria-pressed", String(selected));
      render();
    });
  });

  clearButton?.addEventListener("click", () => {
    tagButtons.forEach((button) => {
      button.classList.remove("selected");
      button.setAttribute("aria-pressed", "false");
    });
    render();
  });

  render();
})();
