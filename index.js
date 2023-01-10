function encriptar(palabra) {
  // Definir las llaves de encriptación
  const llaves = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  // Convertir la palabra en una array de caracteres
  const caracteres = palabra.split("");

  // Recorrer cada caracter de la palabra y reemplazarlo con la llave correspondiente
  const resultado = caracteres
    .map((caracter) => llaves[caracter] || caracter)
    .join("");

  // Devolver la palabra encriptada
  return resultado;
}

function desencriptar(palabraEncriptada) {
  // Definir las llaves de encriptación
  const llaves = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };

  // Recorrer el objeto de llaves y buscar cada "llave" en la palabra encriptada
  let resultado = palabraEncriptada;
  Object.keys(llaves).forEach((llave) => {
    while (resultado.replace(llave, llaves[llave]) != resultado) {
      resultado = resultado.replace(llave, llaves[llave]);
    }
  });

  
  return resultado;
}

function procesarMensaje(funcion) {
  // Obtener referencias a los elementos
  const voidContainer = document.querySelector(".voidContainer");
  const introMessage = document.querySelector("#introMessage");
  const outroMessage = document.querySelector("#outroMessage");
  const outroContainer = document.querySelector("#outroContainer");
  const valueIntro = introMessage.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  // Procesar el mensaje
  if (introMessage.value) {
    voidContainer.style.display = "none";
    outroMessage.value = funcion(valueIntro);
    outroContainer.style.display = "block";
    return;
  }
  voidContainer.style.display = "block";
  outroMessage.value = funcion(valueIntro);
  outroContainer.style.display = "none";
}

// Asignar eventos a los botones
document.querySelector(".btnEncriptar").addEventListener("click", () => {
  procesarMensaje(encriptar);
});
document.querySelector(".btnCopiar").addEventListener("click", async () => {
  await navigator.clipboard.writeText(
    document.querySelector("#outroMessage").value
  );
});
document.querySelector(".btnDesencriptar").addEventListener("click", () => {
  procesarMensaje(desencriptar);
});

document.querySelector("#introMessage").addEventListener('input', (event) => {
    // Solo permitir minúsculas y sin acentos
    const valor = event.target.value.toLowerCase().replace(/[^a-z]/g, '');
    event.target.value = valor;
  });
