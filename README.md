# Airport Missing Things (AMT)

<div align="center">
 <a href="https://ibb.co/Zm93B4Z"><img src="https://i.ibb.co/YZg6cnr/Airport-Missing-Things.png" alt="Airport-Missing-Things" border="0"></a>
</div>

## Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características](#características)
- [Funcionalidad](#funcionalidad)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Desarrolladores Contribuyentes](#desarrolladores-contribuyentes)
>[!important]
>**Live Preview:** [Netlify.app](https://meek-naiad-b597cb.netlify.app/)


### Descripción del Proyecto

Airport Missing Things (AMT) es una aplicación web diseñada para abordar la problemática común de la pérdida o extravío de objetos personales en los aeropuertos. Facilita la comunicación entre los usuarios para agilizar la devolución de pertenencias extraviadas.

### Características

- Registro de usuarios con experiencia previa en viajes a aeropuertos.
- Interfaz intuitiva para reportar objetos perdidos o encontrados.
- Búsqueda avanzada con filtros por país y descripción.
- Geolocalización de objetos perdidos/encontrados en aeropuertos.
- Sistema de mensajería para coordinar la devolución de objetos.

### Funcionalidad

#### Interfaz de Usuarios No Registrados

Los usuarios pueden registrarse utilizando un correo electrónico previamente almacenado en la base de datos simulada del aeropuerto. Los campos del formulario se completan automáticamente con los datos correspondientes.

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

### Diseño Responsive

<div align="center">
<a href="https://ibb.co/DWNzrst"><img src="https://i.ibb.co/1Q37zhL/Screenshot-from-2024-03-20-12-22-06.png" alt="Screenshot-from-2024-03-20-12-22-06" border="0"></a>
</div>
 
</div>
<div align="center">
<a href="https://ibb.co/4JGX4SZ"><img src="https://i.ibb.co/52ySsjW/Screenshot-from-2024-03-20-10-47-20.png" alt="Screenshot-from-2024-03-20-10-47-20" border="0"></a>
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

##### Gestion de Formularios

- Formik

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

##### Frameworks React de producción

- Vite

### Desarrolladores Contribuyentes

### Tecnologías Utilizadas

- JavaScript
- React
- TypeScript
- React-Router
- Material UI
- Axios
- Formik
- Redux Toolkit
- Google Map React
- Vite

### Instalación

1. Clona el repositorio: `git clone https://github.com/tuusuario/nombre-del-repositorio.git`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `npm start`

### Uso

1. Regístrate utilizando un correo electrónico válido.
2. Explora la plataforma y reporta objetos perdidos o encontrados.
3. Utiliza el buscador para encontrar objetos específicos.
4. Comunícate con otros usuarios para coordinar la devolución de objetos.


### Desarrolladores Contribuyentes

- **Desarrollado por:** Leandro Oviedo, Junior, Front-End Developer. [Perfil de LinkedIn](https://www.linkedin.com/in/leandro-oviedo-418b3b2a4/)
- **Code-Review a cargo de:** Fernando A. González, Software Lead Engineer. [Perfil de LinkedIn](https://www.linkedin.com/in/fernando-a-gonzalez/)

