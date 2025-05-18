// * ==========================> global variables <======================= *
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");

// * ==========================> side navbar <======================= *
$(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css({ overflow: "visible" });
  });
});

function openSideNav() {
  $(".side-nav-menu").animate({ left: 0 }, 500);

  $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x");

  $(".links li").each(function (index) {
    $(this)
      .delay((index + 5) * 20)
      .animate({ top: 0 });
  });
}

function closeSideNav() {
  const boxWidth = $(".side-nav-menu .nav-tab").outerWidth();

  $(".side-nav-menu").animate({ left: -boxWidth }, 500);

  $(".open-close-icon").removeClass("fa-x").addClass("fa-align-justify");

  $(".links li").each(function (index) {
    $(this)
      .delay(index * 20)
      .animate({ top: 300 });
  });
}

$(".open-close-icon").on("click", function () {
  if ($(".side-nav-menu").css("left") === "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});
// * ==========================> display meals <======================= *

function displayMeals(arr) {
  let mealBox = "";

  for (let i = 0; i < arr.length; i++) {
    mealBox += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="meals-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = mealBox;
}
// * ==========================> category <======================= *

async function getCategories() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  searchContainer.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(300);
}
// * ==========================> category <======================= *

function displayCategories(arr) {
  const mealBox = arr
    .map(
      (category) => `
        <div class="col-md-3">
            <div onclick="getCategoryMeals('${
              category.strCategory
            }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${category.strCategoryThumb}" alt="${category.strCategory}">
                <div class="meals-layer position-absolute text-center text-black p-2">
                    <h3>${category.strCategory}</h3>
                    <p>${category.strCategoryDescription
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")}</p>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  rowData.innerHTML = mealBox;
}
// * ==========================> area <======================= *

async function getArea() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();

  displayArea(respone.meals);
  $(".inner-loading-screen").fadeOut(300);
}
// * ==========================> area <======================= *

function displayArea(arr) {
  const mealBox = arr
    .map(
      (area) => `
        <div class="col-md-3">
            <div onclick="getAreaMeals('${area.strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${area.strArea}</h3>
            </div>
        </div>
    `
    )
    .join("");

  rowData.innerHTML = mealBox;
}
// * ==========================> ingredients <======================= *

async function getIngredients() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayIngredients(respone.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
// * ==========================> ingredients <======================= *

function displayIngredients(arr) {
  const mealBox = arr
    .map(
      (ingredient) => `
        <div class="col-md-3">
            <div onclick="getIngredientsMeals('${
              ingredient.strIngredient
            }')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredient.strIngredient}</h3>
                <p>${
                  ingredient.strDescription
                    ? ingredient.strDescription
                        .split(" ")
                        .slice(0, 20)
                        .join(" ")
                    : ""
                }</p>
            </div>
        </div>
    `
    )
    .join("");

  rowData.innerHTML = mealBox;
}
// * ==========================> category <======================= *

async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
// * ==========================> area <======================= *

async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
// * ==========================> ingredients <======================= *
async function getIngredientsMeals(ingredients) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
// * ==========================> details of meals <======================= *
async function getMealDetails(mealID) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  searchContainer.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}

function displayMealDetails(meal) {
  searchContainer.innerHTML = "";

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let mealBox = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  rowData.innerHTML = mealBox;
}
// * ==========================> searching <======================= *
function showSearchInputs() {
  searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white search"  type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white search"  type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  rowData.innerHTML = "";
}

async function searchByName(Letter) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${Letter}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}

async function searchByFLetter(Letter) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  Letter == "" ? (Letter = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${Letter}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}


let submitBtn;

let nameInputFocused = false;
let emailInputFocused = false;
let phoneInputFocused = false;
let ageInputFocused = false;
let passwordInputFocused = false;
let repasswordInputFocused = false;


// * ==========================> contacts <======================= *

function showContacts() {
  searchContainer.innerHTML = "";

  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.com
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Please enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
  submitBtn = document.getElementById("submitBtn");

  function submission() {
    submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", function () {
      Swal.fire({
        title: "Your request has been send successfully ✅✅",
        showClass: {
          popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
        },
        hideClass: {
          popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
        },
      });
    });
  }
  submission();

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputFocused = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputFocused = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputFocused = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputFocused = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputFocused = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputFocused = true;
  });
}
// * ==========================> validation <======================= *
function inputsValidation() {
  if (nameInputFocused) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputFocused) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputFocused) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputFocused) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputFocused) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputFocused) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
// * ==========================> regex <======================= *
function nameValidation() {
  const nameRegex = /^[A-Za-z\s\-.']+$/;
  const nameInput = document.getElementById("nameInput").value.trim();
  return nameRegex.test(nameInput);
}

function emailValidation() {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailInput = document.getElementById("emailInput").value;
  return emailRegex.test(emailInput);
}

function phoneValidation() {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  const phone = document.getElementById("phoneInput").value.trim();
  return phoneRegex.test(phone);
}

function ageValidation() {
  const ageRegex = /^(0?[1-9]|[1-9][0-9]|1[01][0-9]|200)$/;
  const age = document.getElementById("ageInput").value.trim();
  return ageRegex.test(age);
}
function passwordValidation() {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  const password = document.getElementById("passwordInput").value;
  return passwordRegex.test(password);
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ===
    document.getElementById("passwordInput").value
  );
}
