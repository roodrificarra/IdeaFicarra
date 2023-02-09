const stockProductos = [
  {
    id: 1,
    nombre: "RTX 2060 MSI",
    cantidad: 1,
    desc: "Placa de video con 6GB de VRAM, ideal para juegos de ultima generación con RTX en gráficos medios/altos",
    precio: 150000,
    img: "img/serie2000/2060-msi.jpg",
  },
  {
    id: 2,
    nombre: "RTX 2070 Gigabyte",
    cantidad: 1,
    desc: "Placa de video con 6GB de VRAM, ideal para juegos de ultima generación con RTX en gráficos medios/altos",
    precio: 165000,
    img: "img/serie2000/2070-gigabyte.webp",
  },
  {
    id: 3,
    nombre: "RTX 2080 Gigabyte",
    cantidad: 1,
    desc: "Placa de video con 6GB de VRAM, ideal para juegos de ultima generación con RTX en gráficos altos/ultra",
    precio: 180000,
    img: "img/serie2000/2080-gigabyte.webp",
  },
  {
    id: 4,
    nombre: "RTX 3060 ZOTAC",
    cantidad: 1,
    desc: "Placa de video con 6GB de VRAM, ideal para juegos de ultima generación con RTX en gráficos ultra a 1080p",
    precio: 220000,
    img: "img/serie3000/3060-zotac.png",
  },
  {
    id: 5,
    nombre: "RTX 3070 Ti ZOTAC",
    cantidad: 1,
    desc: "Placa de video con 8GB de VRAM, ideal para juegos de ultima generación con RTX en gráficos ultra a 1080 o 2k.",
    precio: 270000,
    img: "img/serie3000/3070ti-zotac.jpg",
  },
  {
    id: 6,
    nombre: "RTX 3080 XLR8",
    cantidad: 1,
    desc: "Placa de video con 12GB de VRAM, ideal para juegos de ultima generación con RTX en gráficos ultra a 2k y 4k",
    precio: 300000,
    img: "img/serie3000/3080-xlr8.jpg",
  },
  {
    id: 7,
    nombre: "RTX 3090 EVGA",
    cantidad: 1,
    desc: "Placa de video con 12GB de VRAM, ideal para juegos de ultima generación con RTX en gráficos ultra a 4k",
    precio: 380000,
    img: "img/serie3000/3090-evea.jpg",
  },
  {
    id: 8,
    nombre: "RTX 4070Ti ZOTAC",
    cantidad: 1,
    desc: "Placa de video con 12GB de VRAM, ideal para juegos de ultima generación con RTX en gráficos ultra a 4k y 8k",
    precio: 790000,
    img: "img/serie4000/4070ti-zotac.jpg",
  },
  {
    id: 9,
    nombre: "RTX 4080 GAINWARD",
    cantidad: 1,
    desc: "Placa de video con 12GB de VRAM, ideal para juegos de ultima generación con RTX en gráficos ultra a  8k",
    precio: 820000,
    img: "img/serie4000/4080-gainward.jpg",
  },
  {
    id: 10,
    nombre: "RTX 4090",
    cantidad: 1,
    desc: "Placa de video con 24 GB de VRAM, ideal para juegos de ultima generación con RTX en gráficos ultra a 8k",
    precio: 1000000,
    img: "img/serie4000/4090-zotac.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector("#procesar-pago");

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if (formulario) {
  formulario.addEventListener("submit", enviarCompra);
}

if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some((prod) => prod.id === id);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === id) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === id);
    carrito.push(item);
  }
  mostrarCarrito();
};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e) {
  e.preventDefault();
  const cliente = document.querySelector("#cliente").value;
  const email = document.querySelector("#correo").value;

  if (email === "" || cliente == "") {
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    const btn = document.getElementById("button");

    // document.getElementById('procesar-pago')
    //  .addEventListener('submit', function(event) {
    //    event.preventDefault();

    btn.value = "Enviando...";

    const serviceID = "default_service";
    const templateID = "template_qxwi0jn";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Finalizar compra";
        alert("Correo enviado!");
      },
      (err) => {
        btn.value = "Finalizar compra";
        alert(JSON.stringify(err));
      }
    );

    const spinner = document.querySelector("#spinner");
    spinner.classList.add("d-flex");
    spinner.classList.remove("d-none");

    setTimeout(() => {
      spinner.classList.remove("d-flex");
      spinner.classList.add("d-none");
      formulario.reset();

      const alertExito = document.createElement("p");
      alertExito.classList.add(
        "alert",
        "alerta",
        "d-block",
        "text-center",
        "col-12",
        "mt-2",
        "alert-success"
      );
      alertExito.textContent = "Compra realizada correctamente";
      formulario.appendChild(alertExito);

      setTimeout(() => {
        alertExito.remove();
      }, 3000);
    }, 3000);
  }
  localStorage.clear();
}
