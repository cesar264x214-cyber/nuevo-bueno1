
const SUPABASE_URL = "https://wftfnwdlwjdrhytnmtcd.supabase.co";

const SUPABASE_KEY = "sb_publishable_cD0TQD5uTV2DcpEGOYEndQ_j4fHpzAr";

const cliente = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

let videojuegos = [];

const tabla = document.getElementById("listaVideojuegos");
const mensaje = document.getElementById("mensaje");
const buscador = document.getElementById("buscar");

async function mostrarVideojuegos() {

    const { data, error } = await cliente
        .from("videojuegos")
        .select("*")
        .order("id");

    if (error) {
        mensaje.textContent = "Error al cargar: " + error.message;
        return;
    }

    videojuegos = data;

    filtrarVideojuegos();
}

function mostrarTabla(lista) {

    tabla.innerHTML = "";

    if (lista.length === 0) {
        mensaje.textContent = "No se encontraron videojuegos.";
        return;
    }

    lista.forEach(function(videojuego) {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${videojuego.id}</td>
            <td>${videojuego.nombre}</td>
            <td>${videojuego.plataforma}</td>
            <td>${videojuego.genero}</td>
            <td>${videojuego.anio_lanzamiento}</td>
            <td>$${videojuego.precio}</td>
        `;

        tabla.appendChild(fila);
    });

    mensaje.textContent = "Se encontraron " + lista.length + " videojuegos.";
}

function filtrarVideojuegos() {

    const texto = buscador.value.toLowerCase();

    const resultados = videojuegos.filter(function(videojuego) {

        return String(videojuego.nombre || "").toLowerCase().includes(texto) ||
               String(videojuego.titulo || "").toLowerCase().includes(texto);

    });

    mostrarTabla(resultados);
}

buscador.addEventListener("input", filtrarVideojuegos);

mostrarVideojuegos();
