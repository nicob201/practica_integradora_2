# Segunda Práctica Integradora

El presente repositorio contiene la segunda practica integradora sobre lo visto hasta el momento en el curso de Backend.

# Estructura del Repo

```bash
└───src
│   app.js
│   utils.js
│
├───config
│       database.js
│       passport.config.js
│
├───controllers
│       cartController.js
│       productController.js
│       userController.js
│
├───dao
│   └───models
│           cart.model.js
│           product.model.js
│           user.js
│
├───middleware
│       auth.js
│
├───public
│   ├───css
│   │       styles.css
│   │
│   └───js
│           carts.js
│           products.js
│
├───routes
│   │   cart.router.js
│   │   product.router.js
│   │   user.router.js
│   │   views.router.js
│   │
│   └───api
│           sessions.js
│
└───views
    │   carts.handlebars
    │   editProduct.handlebars
    │   login.handlebars
    │   newProduct.handlebars
    │   products.handlebars
    │   profile.handlebars
    │   register.handlebars
    │   restorePass.handlebars
    │
    └───layouts
            main.handlebars
```

## Instalación

1. Clona este repositorio.

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   ```

## Configuración

1. Configura la base de datos en `config/database.js` y `config/passport.config.js` segun el entorno y credenciales de MongoDB.

2. Configura el servidor en `app.js`.

## Inicio

`npm start`: Inicia el servidor en modo de producción

## Rutas Principales

`/api/sessions`: Maneja las sesiones de usuario (login, logout, register)

`/api/products`: Maneja las operaciones relacionadas con productos

`/api/carts`: Maneja las operaciones relacionadas con los carritos de compra

`/api/users`: Maneja las operaciones relacionadas con los usuarios

## Vistas

Las vistas están ubicadas en el directorio `/views` y estan renderizadas utilizando Handlebars

`login.handlebars`: Página de inicio de sesión

`register.handlebars`: Página de registro de usuario

`profile.handlebars`: Página de perfil de usuario

`products.handlebars`: Página que lista los productos

`carts.handlebars`: Página de carrito de compras

## Middleware

El middleware de autenticación esta ubicado en `middleware/auth.js`

## Models

Los modelos de MongoDB están definidos en `dao/models`

## Corriendo local la API

La ruta http://localhost:8080/products se ve asi:
![local-products](https://github.com/nicob201/practica_integradora_2/assets/88735420/8de2f50a-0131-43ff-8bd6-20f80880e980)

# Boton "New product"

Este boton carga un formulario para agregar un nuevo producto:
![form-new-product](https://github.com/nicob201/BACKEND-PROYECTO-FINAL/assets/88735420/0ba744b7-634d-41af-b709-efb42b27da59)

# Boton "edit" de cada producto:

Este boton carga un formulario con los datos precargados del producto que seleccionamos:
![formulario-precargado](https://github.com/nicob201/BACKEND-PROYECTO-FINAL/assets/88735420/ff83c723-b4ac-4df7-b50f-8dd40a0f4251)

# Carritos

Al entrar a la ruta http://localhost:8080/carts los carritos que hay creados renderizan asi:

![vista carritos](https://github.com/nicob201/BACKEND-PROYECTO-FINAL/assets/88735420/8f38ba44-d5b5-4f6c-aa21-caaa0d6fa2f9)

# Login

Al visitar el login de la api http://localhost:8080/login se renderiza lo siguiente:
![login-front](https://github.com/nicob201/practica_integradora_2/assets/88735420/211a4c0f-69b7-4b2f-a9fd-5275681c6b2e)

# Profile

El perfil del usuario logeado se ve en la siguiente ruta: http://localhost:8080/profile
![user-profile](https://github.com/nicob201/practica_integradora_2/assets/88735420/74b835b4-a91e-420c-bb5c-1aae3b187fe6)

# Pruebas desde Postman

Si se realiza un GET/ a la ruta http://localhost:8080/api/sessions/current Postman muestra la siguiente respone:
![postman-current-user](https://github.com/nicob201/practica_integradora_2/assets/88735420/42b856ca-2e7a-492a-9dc2-6cf8dfc5459c)
