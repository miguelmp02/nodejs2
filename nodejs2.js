const http = require('http');
const fs = require('fs');

// Lee el diccionario de palabras desde un archivo (asegúrate de tener un archivo con una palabra por línea).
const dictionary = fs.readFileSync('dictionary.txt', 'utf8').split('\n');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Obtiene el número de palabras (X) desde la query de la URL.
    const query = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const numberOfWords = parseInt(query.get('x')) || 4; // Si no se proporciona x, se usa 4 como valor predeterminado.

    // Genera una contraseña aleatoria seleccionando X palabras del diccionario.
    const password = generatePassword(numberOfWords);

    // Envía la contraseña al cliente como respuesta.
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Contraseña aleatoria: ${password}`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página no encontrada');
  }
});

function generatePassword(numberOfWords) {
  const passwordWords = [];
  for (let i = 0; i < numberOfWords; i++) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    passwordWords.push(dictionary[randomIndex]);
  }
  return passwordWords.join(' '); // Convierte las palabras en una sola cadena separada por espacios.
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
