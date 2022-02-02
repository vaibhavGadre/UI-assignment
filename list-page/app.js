var form = document.getElementById("myForm");
var list = document.getElementById("list");
var ddn = document.getElementById("dropdown");

const filterList = {
  1: "Most Followers",
  2: "Fewest Followers",
  3: "Most Repositories",
  4: "Fewest Repositories",
};

var baseUrl = "https://api.github.com/search/users?";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  list.innerHTML = "";
  ddn.innerHTML = "";

  const search = document.getElementById("search").value;
  const users = await listUsers(search);

  ddn.innerHTML += `<h4>Total users: ${users.total_count}</h4>`;

  ddn.innerHTML += `
   <div class="col-md-3 mb-4">
    <select id="filter" class="custom-select" onChange="getSelectedValue('${search}')">
      <option selected>Sort the list by:</option>
      <option value="1">Most Followers</option>
      <option value="2">Fewest Followers</option>
      <option value="3">Most Repositories</option>
      <option value="4">Fewest Repositories</option>
    </select>
   </div>`;
});

async function listUsers(search, opts = "") {
  const searchUrl = `${baseUrl}q=${search}${opts}&type=users`;
  let users = await fetch(searchUrl);
  users = await users.json();
  // console.log(users);
  list.textContent = "";
  for (let user of users.items) {
    list.appendChild(createListItem(user));
  }
  return users;
}

function createListItem(user) {
  const li = document.createElement("a");
  li.className = "list-group-item list-group-item-action";
  li.textContent = user.login;
  li.href = user.html_url;
  li.target = "_blank";
  return li;
}

function getSelectedValue(search) {
  const selected = document.getElementById("filter").value;
  //   alert(filterList[selected]);
  //   var list = document.getElementById("list");
  let opts = "";
  if (filterList[selected] === "Most Followers") {
    opts = "&sort=followers&order=desc";
  } else if (filterList[selected] === "Fewest Followers") {
    opts = "&sort=followers&order=asc";
  } else if (filterList[selected] === "Most Repositories") {
    opts = "&sort=repositories&order=desc";
  } else if (filterList[selected] === "Fewest Repositories") {
    opts = "&sort=repositories&order=asc";
  }

  listUsers(search, opts);
}
