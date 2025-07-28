const creditMax = 240;
let totalCredits = 0;
const progressEl = document.getElementById("creditProgress");
const mallaEl = document.getElementById("malla");
const resetBtn = document.getElementById("reset");

const malla = [
  {
    año: 1,
    semestres: [
      {
        nombre: "Primer Semestre",
        asignaturas: [
          { nombre: "Fundamentos de Matemáticas", codigo: "G4012101", creditos: 6 },
          { nombre: "Álgebra", codigo: "G4012102", creditos: 6 },
          { nombre: "Matemática Discreta", codigo: "G4012103", creditos: 6 },
          { nombre: "Sistemas Digitales", codigo: "G4012104", creditos: 6 },
          { nombre: "Programación I", codigo: "G4012105", creditos: 6 },
        ]
      },
      {
        nombre: "Segundo Semestre",
        asignaturas: [
          { nombre: "Fundamentos Tecnológicos y Físicos de la Informática", codigo: "G4012106", creditos: 6 },
          { nombre: "Estadística", codigo: "G4012107", creditos: 6 },
          { nombre: "Fundamentos de Computadores", codigo: "G4012108", creditos: 6 },
          { nombre: "Programación II", codigo: "G4012109", creditos: 6 },
          { nombre: "Cálculo y Análisis Numérico", codigo: "G4012121", creditos: 6 },
        ]
      }
    ]
  },
  {
    año: 2,
    semestres: [
      {
        nombre: "Primer Semestre",
        asignaturas: [
          { nombre: "Bases de Datos I", codigo: "G4012221", creditos: 6 },
          { nombre: "Algoritmos y Estructuras de Datos", codigo: "G4012222", creditos: 6 },
          { nombre: "Sistemas Operativos I", codigo: "G4012223", creditos: 6 },
          { nombre: "Redes", codigo: "G4012224", creditos: 6 },
          { nombre: "Programación Orientada a Objetos", codigo: "G4012225", creditos: 6 },
        ]
      },
      {
        nombre: "Segundo Semestre",
        asignaturas: [
          { nombre: "Gestión Financiera de Empresas", codigo: "G4012201", creditos: 6 },
          { nombre: "Bases de Datos II", codigo: "G4012226", creditos: 4.5 },
          { nombre: "Sistemas Operativos II", codigo: "G4012227", creditos: 4.5 },
          { nombre: "Arquitectura de Computadores", codigo: "G4012228", creditos: 4.5 },
          { nombre: "Computación Gráfica", codigo: "G4012229", creditos: 4.5 },
          { nombre: "Diseño de Software", codigo: "G4012230", creditos: 6 },
        ]
      }
    ]
  },
  {
    año: 3,
    semestres: [
      {
        nombre: "Primer Semestre",
        asignaturas: [
          { nombre: "Teoría de Autómatas y Lenguajes Formales", codigo: "G4012321", creditos: 6 },
          { nombre: "Administración de Sistemas y Redes", codigo: "G4012322", creditos: 6 },
          { nombre: "Computación Distribuida", codigo: "G4012326", creditos: 6 },
          { nombre: "Inteligencia Artificial", codigo: "G4012328", creditos: 6 },
        ]
      },
      {
        nombre: "Segundo Semestre",
        asignaturas: [
          { nombre: "Desarrollo de Aplicaciones Web", codigo: "G4012323", creditos: 6 },
          { nombre: "Gestión de Proyectos Informáticos", codigo: "G4012324", creditos: 4.5 },
          { nombre: "Compiladores e Intérpretes", codigo: "G4012327", creditos: 4.5 },
          { nombre: "Seguridad de la Información", codigo: "G4012329", creditos: 4.5 },
          { nombre: "Ciberseguridad", codigo: "G4012330", creditos: 4.5 },
        ]
      }
    ]
  },
  {
    año: 4,
    semestres: [
      {
        nombre: "Primer Semestre",
        asignaturas: [
          { nombre: "Interacción Persona-Ordenador", codigo: "G4012421", creditos: 6 },
          { nombre: "Ingeniería de Computadores", codigo: "G4012422", creditos: 6 },
          { nombre: "Trabajo Fin de Grado", codigo: "G4012423", creditos: 12 },
          { nombre: "Prácticas Externas", codigo: "G4012424", creditos: 9 },
        ]
      },
      {
        nombre: "Optativas",
        asignaturas: [
          { nombre: "Fundamentos de Sistemas Paralelos", codigo: "G4012441", creditos: 4.5 },
          { nombre: "Visualización Avanzada", codigo: "G4012442", creditos: 4.5 },
          { nombre: "Calidad de los Sistemas de Información", codigo: "G4012443", creditos: 4.5 },
          { nombre: "Almacenes y Minería de Datos", codigo: "G4012444", creditos: 4.5 },
          { nombre: "Conocimiento y Razonamiento Automático", codigo: "G4012445", creditos: 4.5 },
          { nombre: "Sistemas Inteligentes", codigo: "G4012446", creditos: 4.5 },
          { nombre: "Diseño y Administración de Redes", codigo: "G4012447", creditos: 4.5 },
          { nombre: "Ingeniería de Servicios", codigo: "G4012448", creditos: 4.5 },
          { nombre: "Computación en la Nube", codigo: "G4012449", creditos: 4.5 },
          { nombre: "Computación Ubicua", codigo: "G4012451", creditos: 4.5 },
          { nombre: "Programación de Arquitecturas Emergentes", codigo: "G4012452", creditos: 4.5 },
          { nombre: "Gestión de Información no estructurada", codigo: "G4012453", creditos: 4.5 },
          { nombre: "Modelos y Técnicas de Optimización", codigo: "G4012454", creditos: 4.5 },
          { nombre: "Aprendizaje Automático", codigo: "G4012455", creditos: 4.5 },
        ]
      }
    ]
  }
];

function guardarEstado() {
  localStorage.setItem("estadoMalla", JSON.stringify(estado));
}

function cargarEstado() {
  return JSON.parse(localStorage.getItem("estadoMalla")) || {};
}

let estado = cargarEstado();

function actualizarProgreso() {
  const suma = Object.values(estado).filter(Boolean).reduce((acc, item) => acc + item.creditos, 0);
  totalCredits = suma;
  const porcentaje = Math.min((suma / creditMax) * 100, 100);
  progressEl.style.width = `${porcentaje}%`;
  progressEl.textContent = `${suma} / ${creditMax} créditos`;
}

function renderizar() {
  mallaEl.innerHTML = "";
  for (let year of malla) {
    const completadoPrevio = year.año === 1 || malla[year.año - 2].semestres.every(sem =>
      sem.asignaturas.every(asig => estado[asig.codigo])
    );
    const yearDiv = document.createElement("div");
    yearDiv.className = "year";
    yearDiv.innerHTML = `<h2>${year.año}º Año</h2>`;

    for (let semestre of year.semestres) {
      const semDiv = document.createElement("div");
      semDiv.className = "semester";
      semDiv.innerHTML = `<h3>${semestre.nombre}</h3>`;

      for (let asignatura of semestre.asignaturas) {
        const div = document.createElement("div");
        div.className = "subject";
        div.textContent = `${asignatura.nombre} (${asignatura.creditos} cr)`;
        div.dataset.codigo = asignatura.codigo;

        if (estado[asignatura.codigo]) div.classList.add("completed");

        if (completadoPrevio) {
          div.onclick = () => {
            if (estado[asignatura.codigo]) {
              delete estado[asignatura.codigo];
            } else {
              estado[asignatura.codigo] = asignatura;
            }
            guardarEstado();
            renderizar();
            actualizarProgreso();
          };
        } else {
          div.style.opacity = 0.5;
          div.title = "Completa el año anterior para activar esta asignatura";
        }

        semDiv.appendChild(div);
      }
      yearDiv.appendChild(semDiv);
    }
    mallaEl.appendChild(yearDiv);
  }
}

resetBtn.onclick = () => {
  if (confirm("¿Estás seguro de que deseas reiniciar la malla?")) {
    estado = {};
    guardarEstado();
    renderizar();
    actualizarProgreso();
  }
};

renderizar();
actualizarProgreso();
