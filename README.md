# ChatApp
Chat web en tiempo real, utilizando HTML/CSS/JS/Bootstrap 5 en frontend, y Node.js en el backend con express sockets.

## Requisitos para servidor:
- Npm (6.14.4), node (10.19.0) instalados

## Uso:
- En `ChatApp/` ejecutar el comando `npm run start` o `npm run dev`
- En un navegador web, dirigirse a : `127.0.0.1:5000` (localhost, puerto 5000)

### Modificar puerto:
- Dirigirse al archivo `/src/index.js`, línea 12:
```javascript
// settings:
app.set("port", process.env.PORT || 5000);
```
Modificar el puerto, por el número de puerto a elección!
