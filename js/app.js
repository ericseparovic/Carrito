const listCourses = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#cursos-carrito");
const btnVaciar = document.querySelector('#vaciar-carrito')

let courses = [];

listCourses.addEventListener("click", addCourse);
carrito.addEventListener("click", deleteCourse);
btnVaciar.addEventListener("click", deleteAllCourses)

// Get course data
function getData(e) {
  const card = e.target.parentElement.parentElement;
  const info_card = card.querySelector(".info-card");

  const course = {};

  course.title = info_card.querySelector("h4").textContent;
  course.cost = info_card.querySelector(".precio span").textContent;
  course.img = card.querySelector(".imagen-curso").src;
  course.id = info_card.querySelector(".agregar-carrito").dataset.id;

  return course;
}

// Function to add items to cart
function addCourse(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const course = getData(e);
    let id = course.id;

    be = courses.some((course) => course.id == id);

    if (be) {
      alert("Curso ya agregado al carrito");
    } else {
      courses = [...courses, course];
    }
  }
  addCourseHTML();
}

// Insert to dom courses added to HTML
function addCourseHTML() {
  carrito.innerHTML = "";

  courses.forEach((course) => {
    const tr = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const title = document.createTextNode(course.title);

    const tdImg = document.createElement("td");
    const img = document.createElement("img");
    img.setAttribute('src', course.img)
    img.setAttribute('width', '170')

    const tdCost = document.createElement("td");
    const cost = document.createTextNode(course.cost);

    const tdBtn = document.createElement("td");
    const button = document.createElement("button");
    const textBtn = document.createTextNode("x");
    button.appendChild(textBtn);
    button.setAttribute("id", course.id);
    button.setAttribute("class", "delete");

    tdImg.appendChild(img);
    tdTitle.appendChild(title);
    tdCost.appendChild(cost);
    tdBtn.appendChild(button);

    carrito.appendChild(tdImg);
    carrito.appendChild(tdTitle);
    carrito.appendChild(tdCost);
    carrito.appendChild(tdBtn);

    tr.appendChild(tdImg);
    tr.appendChild(tdTitle);
    tr.appendChild(tdCost);
    tr.appendChild(tdBtn);

    carrito.appendChild(tr);
  });
}

//Function to remove the course from the cart
function deleteCourse(e) {

  const id = e.target.id
  if(e.target.classList.contains('delete')){    
    courses = courses.filter((course) => {
      if(course.id !== id){
        return course
      }
    })

    addCourseHTML()
  }
}

function deleteAllCourses(){
  courses = []
  addCourseHTML()


}
