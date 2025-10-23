/* eslint-env browser */
"use strict";


document.addEventListener("DOMContentLoaded", () => {
  // ----- Starter Data -----
  const employees = [
    ["Sally Smith", "Quality Assurance", "3423"],
    ["Mark Martin", "VP Sales", "3346"],
    ["John Johnson", "Marketing", "3232"],
    ["Priya Patel", "Developer", "3559"],
    ["Lucas Gomez", "Support", "3117"],
  ];

  // ----- DOM Refs -----
  const form       = document.getElementById("empForm");
  const body       = document.getElementById("empBody");
  const count      = document.getElementById("empCount");
  const nameInput  = document.getElementById("name");
  const titleInput = document.getElementById("title");
  const extInput   = document.getElementById("ext");
  const nameError  = document.getElementById("nameError");
  const titleError = document.getElementById("titleError");
  const extError   = document.getElementById("extError");

  // Guard against missing IDs (helps when HTML had typos)
  if (!form || !body || !count || !nameInput || !titleInput || !extInput) {
    console.error(
      "One or more required elements not found. " +
      "Check IDs: empForm, empBody, empCount, name, title, ext"
    );
    return;
  }

  // ----- Render Table & Count -----
  function render() {
    body.innerHTML = "";
    employees.forEach((emp, idx) => {
      const tr = document.createElement("tr");

      // Name, Title, Extension cells
      for (let i = 0; i < 3; i++) {
        const td = document.createElement("td");
        td.textContent = emp[i];
        tr.appendChild(td);
      }

      // Action cell with Delete button
      const tdAction = document.createElement("td");
      const del = document.createElement("button");
      del.className = "btn-sm";
      del.type = "button";
      del.textContent = "Delete";
      del.addEventListener("click", () => {
        employees.splice(idx, 1);
        render();
      });
      tdAction.appendChild(del);
      tr.appendChild(tdAction);

      body.appendChild(tr);
    });

    count.textContent = `Showing ${employees.length} Employees`;
  }

 
  function validate() {
    // clear old errors
    if (nameError)  nameError.textContent  = "";
    if (titleError) titleError.textContent = "";
    if (extError)   extError.textContent   = "";

    const name  = nameInput.value.trim();
    const title = titleInput.value.trim();
    const ext   = extInput.value.trim();

    let ok = true;

    if (!name)  { if (nameError)  nameError.textContent  = "Required"; ok = false; }
    if (!title) { if (titleError) titleError.textContent = "Required"; ok = false; }

    if (!ext) {
      if (extError) extError.textContent = "Required";
      ok = false;
    } else if (!/^\d+$/.test(ext)) {
      // numeric-only extension (as per typical screenshots)
      if (extError) extError.textContent = "Numbers only";
      ok = false;
    }

    return ok ? { name, title, ext } : null;
  }


  function addEmployee() {
    const vals = validate();
    if (!vals) return;

    employees.push([vals.name, vals.title, vals.ext]);

    // reset inputs
    nameInput.value = "";
    titleInput.value = "";
    extInput.value = "";

    render();
    nameInput.focus();
  }

  // ----- Handlers -----
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addEmployee();
  });

  // ----- Init -----
  render();
});
