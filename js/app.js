// Array de objetos de productos
let productos = [
  {
    imagen: "img/img1.jpg",
    nombre: "Notebook Asus",
    codigo: "1",
    descripcion: "Descripción del producto 1",
    precio: 80000
  },
  {
    imagen: "img/img2.jpg",
    nombre: "Notebook Dell",
    codigo: "2",
    descripcion: "Descripción del producto 2",
    precio: 408000
  },
  {
    imagen: "img/img3.jpg",
    nombre: "Notebook HP",
    codigo: "3",
    descripcion: "Descripción del producto 3",
    precio: 365000
  },
  {
    imagen: "img/img4.jpg",
    nombre: "Notebook Acer",
    codigo: "4",
    descripcion: "Descripción del producto 4",
    precio: 650000
  },
  {
    imagen: "img/img5.jpg",
    nombre: "ChromeBook",
    codigo: "5",
    descripcion: "Descripción del producto 5",
    precio: 750000
  },
  {
    imagen: "img/img6.jpg",
    nombre: "Notebooks Gamer MSI",
    codigo: "6",
    descripcion: "Descripción del producto 6",
    precio: 500000
  },
  {
    imagen: "img/img7.jpg",
    nombre: "Notebook Lenovo",
    codigo: "7",
    descripcion: "Descripción del producto 7",
    precio: 350000
  },
  {
    imagen: "img/img8.jpg",
    nombre: "Notebook ZenBook",
    codigo: "8",
    descripcion: "Descripción del producto 8",
    precio: 1200000
  },
  {
    imagen: "img/img9.jpg",
    nombre: "Macbook Pro",
    codigo: "9",
    descripcion: "Descripción del producto 9",
    precio: 1700000
  },
  {
    imagen: "img/img10.jpg",
    nombre: "Macbook Air",
    codigo: "10",
    descripcion: "Descripción del producto 10",
    precio: 1250000
  }
];


// Obtenemos div y los productos
let listaProductos = document.getElementById("productos");

// recorre productos con forEach
productos.forEach(producto => {
  let div = document.createElement("div");
  div.className = "col-md-4 mb-3";
  let card = document.createElement("div");
  card.className = "card";
  let img = document.createElement("img");
  img.src = producto.imagen;
  img.className = "card-img-top";
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let nombre = document.createElement("h5");
  nombre.className = "card-title";
  nombre.innerText = producto.nombre;
  let codigo = document.createElement("p");
  codigo.className = "card-text";
  codigo.innerText = `Código: ${producto.codigo}`;
  let descripcion = document.createElement("p");
  descripcion.className = "card-text";
  descripcion.innerText = producto.descripcion;
  let precio = document.createElement("p");
  precio.className = "card-text";
  precio.innerText = `Precio: $${producto.precio}`;
  let cantidadLabel = document.createElement("label");
  cantidadLabel.className = "mr-2";
  cantidadLabel.innerText = "Cantidad:";
  let cantidadInput = document.createElement("input");
  cantidadInput.type = "number";
  cantidadInput.min = "1";
  cantidadInput.max = "10";
  cantidadInput.value = "1";
  cantidadInput.className = "form-control d-inline-block w-auto";
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input ml-2";
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      cantidadInput.disabled = false;
    } else {
      cantidadInput.disabled = true;
      cantidadInput.value = "1";
    }
  });
  //Enviamos información al div se puede realizar en el codigo de arriba tambien
  let cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";
  cardFooter.appendChild(cantidadLabel);
  cardFooter.appendChild(cantidadInput);
  cardFooter.appendChild(checkbox);
  cardBody.appendChild(nombre);
  cardBody.appendChild(codigo);
  cardBody.appendChild(descripcion);
  cardBody.appendChild(precio);
  card.appendChild(img);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  div.appendChild(card);
  listaProductos.appendChild(div);
});

    
    // botton agregar
    let agregarCompra = document.getElementById("agregar-compra");
    // obtenemos elementos de lista
    let listaCompra = document.getElementById("lista-compra");
    // resumen del totalizador o total
    let resumenTotalizador = document.getElementById("resumen-totalizador");
    // array vacio de producto
    let productosSeleccionados = [];
    
    //evento click
    agregarCompra.addEventListener("click", () => {
    // Recorrer la lista de productos y agrega
    for (let i = 0; i < listaProductos.children.length; i++) {
    let producto = productos[i];
    let cantidad = listaProductos.children[i].querySelector("input[type='number']").value;
    let seleccionado = listaProductos.children[i].querySelector("input[type='checkbox']").checked;
    if (seleccionado) {
    let productoSeleccionado = {
    nombre: producto.nombre,
    cantidad: cantidad,
    precio: producto.precio,
    total: producto.precio * cantidad
    };
    productosSeleccionados.push(productoSeleccionado);
    let li = document.createElement("li");
    let nombre = document.createElement("span");
    nombre.innerText = productoSeleccionado.nombre;
    let cantidadSpan = document.createElement("span");
    cantidadSpan.innerText = `x ${productoSeleccionado.cantidad}`;
    let totalSpan = document.createElement("span");
    totalSpan.innerText = `= $${productoSeleccionado.total}`;
    let eliminarButton = document.createElement("button");
    eliminarButton.innerText = "Eliminar";
    eliminarButton.addEventListener("click", () => {
    let indice = productosSeleccionados.indexOf(productoSeleccionado);
    productosSeleccionados.splice(indice, 1);
    li.remove();
    actualizarResumenTotalizador();
    });
    li.appendChild(nombre);
    li.appendChild(cantidadSpan);
    li.appendChild(totalSpan);
    li.appendChild(eliminarButton);
    listaCompra.appendChild(li);
    }
    }
    actualizarResumenTotalizador();
    });
    
    // Función para actualizar el resumen del totalizador
    function actualizarResumenTotalizador() {
    let subtotal = 0;
    let iva = 0;
    let total = 0;
    let despacho = 0;
    productosSeleccionados.forEach(producto => {
    subtotal += producto.total;
    });
    iva = subtotal * 0.19;
    total = subtotal + iva;
    if (total < 100000) {
    despacho = total * 0.05;
    }
    resumenTotalizador.innerHTML = `<p>Subtotal: $${subtotal}</p> <p>IVA: $${iva}</p> <p>Despacho: $${despacho}</p> <h3>Total: $${(total + despacho)}</h3>`;
    }
    
    