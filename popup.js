document.getElementById("showGrayList").addEventListener("click", () => {
    browser.storage.local.get("graylist", (result) => {
      const graylist = result.graylist || [];
      const grayListElement = document.getElementById("grayList");
      grayListElement.innerHTML = "";
  
      graylist.forEach((url) => {
        const listItem = document.createElement("li");
        listItem.textContent = url;
        grayListElement.appendChild(listItem);
      });
    });
  });
  