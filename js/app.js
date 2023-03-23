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
  // Función para buscar un producto por su código
  function buscarProductoPorCodigo(codigo) {
  return productos.find(producto => producto.codigo === codigo);
  }
  // Obtenemos div y los productos
  let listaProductos = document.getElementById("productos");

  // recorre productos con forEach
  productos.forEach(producto => {
    let div = document.createElement("div");
    div.classList = "col" ;
    let card = document.createElement("div");
    card.classList = "card ";
    let img = document.createElement("img");
    img.src = producto.imagen;
    img.classList = "card-img-top";
    let cardBody = document.createElement("div");
    cardBody.classList = "card-body";
    let nombre = document.createElement("h5");
    nombre.classList = "card-title";
    nombre.innerText = producto.nombre;
    let codigo = document.createElement("p");
    codigo.classList = "card-text";
    codigo.innerText = `Código: ${producto.codigo}`;
    let descripcion = document.createElement("p");
    descripcion.classList = "card-text";
    descripcion.innerText = producto.descripcion;
    let precio = document.createElement("p");
    precio.classList = "card-text";
    precio.innerText = `Precio: $${producto.precio}`;
    let cantidadLabel = document.createElement("label");
    cantidadLabel.classList = "mr-2";
    cantidadLabel.innerText = "Cantidad:";
    let cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.min = "1";
    cantidadInput.max = "10";
    cantidadInput.value = "1";
    cantidadInput.classList = "form-control d-inline-block w-auto";
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList = "form-check-input ml-2";
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        cantidadInput.disabled = false;
      } else {
        cantidadInput.disabled = true;
        cantidadInput.value = "1";
      }
    });
    let botonAgregar = document.createElement("button");
    botonAgregar.type = "button";
    botonAgregar.classList = "btn btn-primary";
    botonAgregar.innerText = "Agregar al carrito";
    botonAgregar.setAttribute("data-codigo", producto.codigo); // Agregar atributo data-codigo
    
    let cardFooter = document.createElement("div");
    cardFooter.classList = "card-footer";
    cardFooter.appendChild(cantidadLabel);
    cardFooter.appendChild(cantidadInput);
    cardFooter.appendChild(checkbox);
    cardFooter.appendChild(botonAgregar);
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
    window.addEventListener("load", () => {
      // Seleccionar todos los botones "Agregar al carrito"
      let botonesAgregar = document.querySelectorAll(".btn.btn-primary");
    
      // Agregar evento click a cada botón
      botonesAgregar.forEach((botonAgregar) => {
        botonAgregar.addEventListener("click", () => {
          let codigoProducto = botonAgregar.getAttribute("data-codigo");
          let producto = buscarProductoPorCodigo(codigoProducto);
          let cantidad = botonAgregar.parentElement.querySelector("input[type='number']").value;
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
          actualizarResumenTotalizador();
        });
      });
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
      // Obtenemos el botón "Limpiar carrito"
  let botonLimpiarCarrito = document.getElementById("limpiar-carrito");

  // Agregamos un evento al botón "Limpiar carrito"
  botonLimpiarCarrito.addEventListener("click", function() {
    // Eliminamos todos los productos seleccionados
    productosSeleccionados = [];

    // Eliminamos todas las filas de la lista de compra
    while (listaCompra.firstChild) {
      listaCompra.removeChild(listaCompra.firstChild);
    }

    // Actualizamos el resumen del totalizador
    actualizarResumenTotalizador();
  });
    resumenTotalizador.innerHTML = `
  <table class="table">
    <tbody>
      <tr>
        <td>Subtotal:</td>
        <td>$${subtotal}</td>
      </tr>
      <tr>
        <td>IVA:</td>
        <td>$${iva}</td>
      </tr>
      <tr>
        <td>Despacho:</td>
        <td>$${despacho}</td>
      </tr>
      <tr>
        <td><strong>Total:</strong></td>
        <td><strong>$${(total + despacho)}</strong></td>
      </tr>
    </tbody>
  </table>
`;

  }

    // Obtenemos el elemento de la tabla y el botón de pagar
  let tablaDetalles = document.getElementById("tabla-detalles");
  let botonPagar = document.getElementById("boton-pagar");
  
//Simula la boleta
  botonPagar.addEventListener("click", function() {
    let filasTabla = "";
    let productosAgrupados = {};
  
    // Agrupar los productos seleccionados por su nombre
    productosSeleccionados.forEach(function(producto) {
      if (!productosAgrupados[producto.nombre]) {
        productosAgrupados[producto.nombre] = {
          cantidad: 0,
          precio: producto.precio,
          iva: 0,
          total: 0
        };
      }
      productosAgrupados[producto.nombre].cantidad += parseInt(producto.cantidad);
      productosAgrupados[producto.nombre].iva = productosAgrupados[producto.nombre].precio * productosAgrupados[producto.nombre].cantidad * 0.19;
      productosAgrupados[producto.nombre].total = productosAgrupados[producto.nombre].precio * productosAgrupados[producto.nombre].cantidad + productosAgrupados[producto.nombre].iva;
    });
  
    // Crear una fila de tabla para cada grupo de productos
    for (let nombreProducto in productosAgrupados) {
      let producto = productosAgrupados[nombreProducto];
      filasTabla += `
        <tr>
          <td>${nombreProducto}</td>
          <td>${producto.cantidad}</td>
          <td>$${producto.precio}</td>
          <td>$${producto.iva}</td>
          <td>$${producto.total}</td>
        </tr>
      `;
    }
  
    // Calcular el impuesto total y el precio total de todos los productos
    let totalIVA = 0;
    let totalPrecio = 0;
    for (let nombreProducto in productosAgrupados) {
      totalIVA += productosAgrupados[nombreProducto].iva;
      totalPrecio += productosAgrupados[nombreProducto].total;
    }

    // Insertamos las filas
    tablaDetalles.innerHTML = `
      <table class="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>IVA</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${filasTabla}
        </tbody>
      </table>
    `;
  });

 
  