let mealsData = document.getElementById("mealsData");
////////////////////                open and close icon                   //////////////////////// 

$(".open-close-icon").click(function () {
    if ($(".side-nav").css("left") == "0px") {
        closeNavMenu()
    } else {
        openNavMenu()
    }
})
function openNavMenu() {
    $(".side-nav").animate({ left: 0 }, 500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $("li").eq(i).animate({ top: 0 }, (i + 5) * 90)
    }
}
function closeNavMenu() {
    let boxWidth = $(".side-nav .nav-menu").outerWidth()
    $(".side-nav").animate({ left: -boxWidth }, 500)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $("li").animate({ top: 300 }, 500)
}
closeNavMenu()

let colorBoxes = $(".color-box");
$(colorBoxes).eq(0).css('background-color', "tomato")
$(colorBoxes).eq(1).css('background-color', "cyan")
$(colorBoxes).eq(2).css('background-color', "greenyellow")
$(colorBoxes).eq(3).css('background-color', "gold")
colorBoxes.click(function(eventInfo){
    let bgColor = $(eventInfo.target).css('background-color')
    $("li,i,h2,h3,h6,p,.meal-layer").css('color', bgColor)
})
////////////////////          open and close icon end           ////////////////////////// 


////////////////////               Meals in homepage            //////////////////////////
$(document).ready(function () {
    searchByName("").then(function () {
        $(".loading-screen").fadeOut(1000)
    })
})
////////////////////             Meals in hamepage              ////////////////////////// 



////////////////////                  Categories               ////////////////////////// 

async function getCategories() {
    closeNavMenu()
    $(".loading-screen").fadeIn(400)
    mealsData.innerHTML = ""
    search.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayAllCategories(response.categories)
    $(".loading-screen").fadeOut(400)
}

function displayAllCategories(categories) {
    let cartoona = "";

    for (let i = 0; i < categories.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getFilteredMeals('${categories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cp">
                    <img class="w-100" src="${categories[i].strCategoryThumb}" alt="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${categories[i].strCategory}</h3>
                        <p>${categories[i].strCategoryDescription}</p>
                    </div>
                </div>
        </div>
        `
    }
    mealsData.innerHTML = cartoona
}

async function getFilteredMeals(category) {
    closeNavMenu()
    $(".loading-screen").fadeIn(400)
    mealsData.innerHTML = ""
    search.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(400)

}

function displayMeals(meals) {
    let cartoona = "";

    for (let i = 0; i < meals.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${meals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-5 py cursor-pointer">
                    <img class="w-100" src="${meals[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    mealsData.innerHTML = cartoona
}



////////////////////                Categories end                  ////////////////////////// 

////////////////////                     Search                     ////////////////////////// 

let searchInput = document.getElementById("search");

function showSearchStructure() {
    search.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByfirstL(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    mealsData.innerHTML = ""
}

async function searchByName(x) {
    closeNavMenu()
    mealsData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
    response = await response.json()
    displayMeals(response.meals)
}

async function searchByfirstL(x) {
    closeSideNav()
    mealsData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${x}`)
    response = await response.json()
    displayMeals(response.meals)
}

////////////////////                    Search end                     //////////////////////////

////////////////////                       Area                       ////////////////////////// 

async function getArea() {
    closeNavMenu()
    $(".loading-screen").fadeIn(400)
    mealsData.innerHTML = ""
    search.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()

    displayArea(respone.meals.slice(0, 20))
    $(".loading-screen").fadeOut(400)

}


function displayArea(areas) {
    let cartoona = "";

    for (let i = 0; i < areas.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealsByArea('${areas[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${areas[i].strArea}</h3>
                </div>
        </div>
        `
    }

    mealsData.innerHTML = cartoona
}

async function getMealsByArea(area) {
    closeNavMenu()
    $(".loading-screen").fadeIn(400)
    mealsData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals)
    $(".loading-screen").fadeOut(400)

}

////////////////////                 Area end                    ////////////////////////// 

////////////////////                  Ingredients                  ////////////////////////// 

async function getIngredients() {
    closeNavMenu()
    $(".loading-screen").fadeIn(400)
    mealsData.innerHTML = ""
    search.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()

    displayIngredients(respone.meals.slice(0, 20))
    $(".loading-screen").fadeOut(400)

}


function displayIngredients(ings) {
    let cartoona = "";

    for (let i = 0; i < ings.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${ings[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ings[i].strIngredient}</h3>
                        <p>${ings[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }

    mealsData.innerHTML = cartoona
}

async function getIngredientsMeals(ingredients) {
    closeNavMenu()
    $(".loading-screen").fadeIn(400)
    mealsData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(400)

}

////////////////////              Ingredients end                  ////////////////////////// 

                        //////////////display meal details//////////////

async function getMealDetails(mealID) {
    closeNavMenu()
    mealsData.innerHTML = ""
    search.innerHTML = "";
    $(".loading-screen").fadeIn(400)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    // $(".loading-screen").fadeIn(200)
    $(".loading-screen").fadeOut(400)
}
function displayMealDetails(meal) {
    mealsData.innerHTML = "";

    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients +=
`<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let cartoona = `
        <div>
        <a href=""><i class="closeDets fa-x"></i></a>
        </div>
    <div class="col-md-4">
                <img class="w-75 rounded-3" src="${meal.strMealThumb}"
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
            </div>`

    mealsData.innerHTML = cartoona
}

$(".closeDets").click(function () {
    openNavMenu();
    Contacts()
})

                    //////////////display meal details//////////////

////////////////////              Contacts                  ////////////////////////// 

let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;
let submitBtn;

function Contacts() {
    mealsData.innerHTML = `<div class="contact vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
    <h1>Contact Us</h1>
        <div class="row g-2">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
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
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInput = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInput = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInput = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInput = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInput = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInput = true
    })
}

function inputsValidation() {
    if (nameInput) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInput) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInput) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInput) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInput) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInput) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    let regex = /^[a-zA-Z ]+$/;
    return (regex.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    let regex = /@[;a-z]{5,12}(\.com)$/
    return (regex.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return (regex.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    return (regex.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return (regex.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    let repassword = document.getElementById("repasswordInput").value
    let mainpassword = document.getElementById("passwordInput").value
    return repassword == mainpassword
}