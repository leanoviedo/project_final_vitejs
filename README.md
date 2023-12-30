<div align="center">
  <a href='https://postimages.org/' target='_blank'><img src='https://i.postimg.cc/xTJTKx9V/Airport-Missing-Things.png' border='0' alt='Airport-Missing-Things' Width=750px height=550px /></a>
</div>

## Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características](#características)
- [Funcionalidad](#funcionalidad)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Desarrolladores Contribuyentes](#desarrolladores-contribuyentes)

### Descripción del Proyecto

Este proyecto se ha creado con fines educativos y prácticos, con el propósito de aplicar y poner en práctica mis conocimientos y habilidades en tecnologías, así como de ejercitar la capacidad autodidacta requerida para el desarrollo de aplicaciones web. Con la finalización de este proyecto, culmina la mentoría, consolidando la adquisición y aplicación de los fundamentos necesarios para el desarrollo exitoso de este tipo de aplicaciones.

### Características

La función principal de Airport Missing Things (AMT) es abordar la necesidad de los usuarios de aeropuertos frente a un problema común: la pérdida o extravío de objetos personales en estas instalaciones. Esta plataforma facilita la comunicación entre los usuarios para agilizar la devolución de pertenencias extraviadas.

<div align="center">
  <a href="https://ibb.co/VHcbVqh"><img src="https://i.ibb.co/hXJrsmn/Screenshot-from-2023-12-27-23-04-48.png" alt="Screenshot-from-2023-12-27-23-04-48" border="0"></a>
</div>

### Funcionalidad

#### Interfaz de Usuarios No Registrados

Se ha habilitado una pantalla específica para el registro de usuarios. Solo podrán registrarse aquellos que hayan tenido experiencia previa en viajes a aeropuertos y cuyos datos estén almacenados en las bases de datos del aeropuerto. Para este propósito, hemos simulado la base de datos utilizando la API de Random Users y almacenando los datos en una estructura tipo Redux. Cuando el usuario seleccione un correo electrónico registrado, el resto de los campos se completarán automáticamente. Únicamente se requerirá que el usuario agregue una contraseña de su elección en el formulario.

![Interfaz de Usuarios No Registrados](https://i.postimg.cc/tJjpgkBm/Screenshot-from-2023-12-27-23-05-06.png)

#### Interfaz

Tras registrarse y acceder, los usuarios verán las siguientes secciones:

<div align="center">
  <a href="https://ibb.co/4KBZ43C"><img src="https://i.ibb.co/mbQChgd/Screenshot-from-2023-12-28-11-16-55.png" alt="Screenshot-from-2023-12-28-11-16-55" border="0"></a>
</div>

Aquí, los usuarios pueden cargar datos para reportar un objeto perdido o encontrado.

##### Buscador

El buscador permite filtrar la búsqueda por país y/o descripción. Al hacer clic en la tarjeta, se muestran más detalles del usuario que realizó el reporte.

<div align="center">
  <a href="https://ibb.co/x1hxw8Z"><img src="https://i.ibb.co/pf2YNrq/Screenshot-from-2023-12-28-11-33-00.png" alt="Screenshot-from-2023-12-28-11-33-00" border="0"></a>
</div>

A través de Google Map React, se permite la geolocalización del aeropuerto donde se encontró o perdió el objeto.

<div align="center">
  <a href="https://ibb.co/zFk3fTZ"><img src="https://i.ibb.co/1MSC2tT/Screenshot-from-2023-12-28-11-52-13.png" alt="Screenshot-from-2023-12-28-11-52-13" border="0"></a>
</div>

### Lista de Reportes

Esta sección muestra un listado de objetos reportados y reclamados, divididos en dos secciones.

<div align="center">
  <a href="https://ibb.co/XpM25BY"><img src="https://i.ibb.co/3WQrFXR/Screenshot-from-2023-12-28-12-06-11.png" alt="Screenshot-from-2023-12-28-12-06-11" border="0"></a> 
</div>

Al hacer clic en la tarjeta, el usuario puede acceder al chat para comunicarse con otro usuario y actualizar el estado del objeto. Si se envía o recibe el objeto, se cierra la comunicación entre ambos usuarios.

<div align="center">
  <a href="https://ibb.co/yBzgnGK"><img src="https://i.ibb.co/YT5f7YJ/Screenshot-from-2023-12-28-12-16-37.png" alt="Screenshot-from-2023-12-28-12-16-37" border="0"></a>
</div>

<div align="center">
  <a href="https://ibb.co/P5Vwh1S"><img src="https://i.ibb.co/zStGRPk/Screenshot-from-2023-12-28-12-16-46.png" alt="Screenshot-from-2023-12-28-12-16-46" border="0"></a>
</div>

### Tecnologías Utilizadas

Las tecnologías utilizadas para el desarrollo de esta web app fueron:

##### Lenguaje de Programación Base

- JavaScript
- Framework de JavaScript: React

##### Tipado de Datos

- TypeScript

##### Enrutamiento de Componentes

- React-Router

##### Estilos

- Material UI

##### Solicitudes HTTP a API

- Axios

##### API utilizadas

- Airlabs
- RANDOM USER GENERATOR

##### Pruebas de API del lado del cliente

- Postman

##### Manejo y Control del Estado

- Redux Toolkit

##### Mapas

- Google Map React

##### Gestión de Versiones

- Git

### Desarrolladores Contribuyentes

##### Desarrollado por:

Leandro Oviedo, Junior, Front-End Developer.
[Perfil de LinkedIn](https://www.linkedin.com/in/leandro-oviedo-418b3b2a4/)

##### Code-Review a cargo de:

Fernando A. González, Software Lead Engineer.
[Perfil de LinkedIn](https://www.linkedin.com/in/
