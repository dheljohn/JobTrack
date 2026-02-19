const title = document.querySelector("#title");
const company = document.querySelector("#company");
const userLocation = document.querySelector("#location");
const stat = document.querySelector("#status");
const id = document.querySelector("#id");

const btn = document.querySelector("#btn");
const output = document.querySelector(".output");
const save = localStorage.setItem;

function showForm() {
  const form = document.querySelector(".form");
  form.style.display = "block";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  document.body.style.zIndex = "1000";
}

function deleteJob(id) {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs = jobs.filter((job) => job.id !== id);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  const noData = document.querySelector(".noData");
  if (!localStorage.getItem("jobs") || localStorage.getItem("jobs") === "[]") {
    noData.style.display = "block";
  }
  console.log(jobs);
}

function updateStatus(id, newStatus) {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const dropdownVal = document.querySelector("#status-update");

  jobs = jobs.map((job) => {
    if (job.id === id) {
      return { ...job, status: newStatus };
    }
    return job;
  });

  localStorage.setItem("jobs", JSON.stringify(jobs));
  updateQuickStats();
}

function updateQuickStats() {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let total = jobs.length;
  let interviewCount = jobs.filter((j) => j.status === "Interview").length;
  let finalInterviewCount = jobs.filter(
    (j) => j.status === "Final_interview",
  ).length;
  let appliedCount = jobs.filter((j) => j.status === "Applied").length;
  let offerCount = jobs.filter((j) => j.status === "Offer").length;
  let rejectedCount = jobs.filter((j) => j.status === "Rejected").length;

  let totalInterviewCount = interviewCount + finalInterviewCount;

  document.querySelector("#application-count").textContent = total;
  document.querySelector("#applied-count").textContent = appliedCount;
  document.querySelector("#initial-interview-count").textContent =
    totalInterviewCount;
  document.querySelector("#offer-count").textContent = offerCount;
  document.querySelector("#rejected-count").textContent = rejectedCount;
}

function sortJobs(sort) {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  if (sort === "newest") {
    jobs.sort((a, b) => b.id - a.id);
  } else if (sort === "oldest") {
    jobs.sort((a, b) => a.id - b.id);
  } else if (sort === "company") {
    jobs.sort((a, b) => a.company.localeCompare(b.company));
  } else if (sort === "location") {
    jobs.sort((a, b) => a.location.localeCompare(b.location));
  } else if (sort === "status") {
    jobs.sort((a, b) => a.status.localeCompare(b.status));
  }

  localStorage.setItem("jobs", JSON.stringify(jobs));
  renderJobs();
}

document.addEventListener("DOMContentLoaded", () => {
  renderJobs();
});

function renderJobs() {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const container = document.querySelector(".output");

  if (!jobs || jobs.length === 0) {
    container.innerHTML = `
        <div class="noDataMsg">
          <img src="assets/nothingHere.webp" alt="No jobs added yet" id="img" />
          <h2>No Jobs Added Yet</h2>
          <p>Use the form on the left to add your job applications.</p>
        </div>`;
    updateQuickStats();
    return;
  }
  // let statusUpdate = document.querySelector("#status-update");

  container.innerHTML = "";
  jobs.forEach((j) => {
    container.innerHTML += `
      <div class="job-card">
      <button class="menu-btn">⋮</button>

        <h3>${j.title}</h3>
        <p>${j.company}</p>
        <p>${j.location}</p>
        <p id="status-holder">Status: </p> 
        
        <div class="status-update">
          <select onchange="updateStatus(${j.id}, this.value)" >
            <option value="Applied" ${j.status === "Applied" ? "selected" : ""}>Applied</option>
            
            <option value="Assessment" ${j.status === "Assessment" ? "selected" : ""}>Assessment</option>
            <option value="Interview" ${j.status === "Interview" ? "selected" : ""}>Initial Interview</option>
            <option value="Final_interview" ${j.status === "Final_interview" ? "selected" : ""}>Final Interview</option>
            <option value="Offer" ${j.status === "Offer" ? "selected" : ""}>Offer</option>
            <option value="Rejected" ${j.status === "Rejected" ? "selected" : ""}>Rejected</option>
          </select>
        </div>

        <div class="menu">
        
        <button class="delete" onclick="deleteJob(${j.id})">Delete</button>
      </div>
      </div>
    `;
  });

  // console.log(jobs.map((j) => j.title));
  updateQuickStats();
}

document.addEventListener("click", (e) => {
  document.querySelectorAll(".menu").forEach((m) => m.classList.remove("show"));
  // DELETE ALL BUTTON FUNCTIONALITY
  if (e.target && e.target.id == "delete-all-btn") {
    let confirmation = confirm("Are you sure you want to delete all jobs?");
    if (confirmation) {
      const container = document.querySelector(".output");
      container.innerHTML = "";
      localStorage.clear();
      console.log("All jobs deleted!");
      renderJobs();
    } else {
      return;
    }
  }

  // ADD JOB BUTTON FUNCTIONALITY
  if (e.target && e.target.id == "btn") {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const container = document.querySelector(".output");

    if (!title.value || !company.value || !userLocation.value || !stat.value) {
      alert("Please fill in all fields");
      console.log("Failed!");
      return;
    } else {
      jobs.push({
        id: Date.now(),
        title: title.value,
        company: company.value,
        location: userLocation.value,
        status: stat.value,
      });

      localStorage.setItem("jobs", JSON.stringify(jobs));

      title.value = "";
      company.value = "";
      userLocation.value = "";
      stat.value = "";

      renderJobs();
    }
    // console.log("Success!");
  }

  // TEST BUTTON FUNCTIONALITY
  if (e.target && e.target.id == "test") {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const container = document.querySelector(".output");

    title.value = "Software Engineer";
    company.value = "Google";
    userLocation.value = "Mountain View, CA";
    stat.value = "Applied";
    console.log("TESTING VALUES ADDED!");

    jobs.push({
      id: Date.now(),
      title: title.value,
      company: company.value,
      location: userLocation.value,
      status: stat.value,
    });
    localStorage.setItem("jobs", JSON.stringify(jobs));
    renderJobs();
  }

  // TOGGLE MENU FUNCTIONALITY
  if (e.target && e.target.classList.contains("menu-btn")) {
    const card = e.target.closest(".job-card");
    card.querySelector(".menu").classList.toggle("show");
  }

  if (e.target && e.target.classList.contains("delete")) {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    const container = document.querySelector(".output");
    const card = e.target.closest(".job-card");
    const index = Array.from(container.children).indexOf(card);

    card.remove();
    renderJobs();
  }

  if (e.target && e.target.classList.contains("edit")) {
    const card = e.target.closest(".job-card");
  }
});
