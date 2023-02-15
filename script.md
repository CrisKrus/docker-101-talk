# Docker 101

Guion para la presentación, todo está en https://www.cristiansuarez.dev/tags/docker

## Docker

Preguntar que esperan de la charla.

## Presentación

Mostrar las redes sociales que tengo y el QR para ver como de receptivos están a hacer tomar acción.
Agradecer a los organizadores.

## ¿Que es Docker?

Docker es la forma de tener una misma configuración de un proyecto independientemente de la máquina o el sistema en el que te encuentres, siempre que tenga Docker instalado. Facilitando así los despliegues y desarrollos de aplicaciones.

Además de esto con Docker podrás trabajar y jugar con distintas herramientas y tecnologías sin llenar de paquetes que no te interesan en tu máquina.

Quiero dejar claro que Docker no es una máquina virtual, aunque de primeras puede parecerse bastante cuando veamos como funciona realmente comprobaremos que no se parece en nada. De primeras puedes pensarlo de esta forma, te hará más fácil entender el resto de conceptos, pero quiero dejar claro que **no es una máquina virtual**

Como podemos ver en la imagen siguiente una máquina virtual necesita tener un sistema operativo desde cero sobre el de nuestra máquina *host*. Y luego, encima de este nuevo sistema tendremos las librerías necesarias y las aplicaciones que queremos probar.

En cambio, Docker comparte el mismo núcleo del sistema y aislar las librerías que queremos usar dentro del contenedor. Es decir, en el fondo, Docker se está ejecutando en tu máquina, no en un sistema nuevo, pero aislar todos estos procesos y paquetes en una zona privada a la que nadie puede acceder (contenedor). Explicaré en otro post con más detalle.

## Conceptos

Antes de empezar necesitamos tener una serie de conceptos claros que nombraremos bastante a menudo. Estos son **imagen**, **contenedor** y **volumen**. Estas palabras las usaremos con frecuencia, ya que son la base de Docker.

### Imagen

Una **imagen** es una configuración para un contenedor, podemos hacer el símil cuando creamos una clase para instanciar un objeto en programación. Creamos un molde con cierta configuración y funciones en su interior que podemos instanciar (crear) tantas veces como queramos en varios objetos y siempre será de la misma forma.

Una imagen de Docker sería nuestra clase en programación. Para configurar esta imagen como si de un fichero de programación se tratase Docker dispone de los **Dockerfile**, los cuales explicaremos más adelante. En ellos pondremos todos los datos que necesitamos para que funcione correctamente como las variables de entorno, comandos que ejecuta, etc.

### Contenedor

Siguiendo con el símil anterior de la clase de programación y el objeto, un **contenedor** sería una instancia de la clase que hemos creado. Es decir, creamos una instancia que tiene toda la configuración que y funciones que le hemos indicado. Podremos crear tantas como queramos.

Con esta clase ya definida da igual en que parte de nuestra aplicación la usemos siempre partirá de la misma base. De forma que siempre podremos trabajar con ella partiendo del mismo punto.

Podemos crear tantos contenedores como nos sea necesario gestionándolos a nuestro gusto. Con esto quiero decir que un contenedor lo podemos crear, eliminar, parar, volver a arrancarlo, conectarnos a él, dejarlo en segundo plano, exponer los puertos que nos interesen, etc. Iremos viendo como hacer cuando llegue el momento.

### Volumen

Además, cada contenedor tiene asociado con él un **volumen**. Los volúmenes son donde cada contenedor guarda la información que tiene en su interior como si de un "disco duro" propio se tratase.

Estos volúmenes se encuentran en nuestro sistema y no dejan de ser carpetas que podemos ver. Este punto es importante tenerlo claro porque puede parecer "magia" cómo y dónde guarda la información los contenedores, ya que no está a simple vista en el sistema y solo la vemos dentro del propio contenedor.

Y digo que es importante tenerlo en cuenta porque es normal en algún momento hacerse la pregunta: ¿Se pierde la información cuando apago el contenedor?

La respuesta corta es no, la información no se pierde, como he dicho está en nuestro sistema en algún punto. La respuesta larga es que si paramos un contenedor la siguiente vez que lo arranquemos seguirá con todos los mismos datos en su interior tal cual lo habíamos dejado.

Dado que como cada una de estas tres partes (imagen, contenedor, volumen) son **independientes** entre sí, una vez eliminamos un contenedor el volumen sigue existiendo en nuestro sistema, durante un tiempo.

## ¿Como funciona Docker?

nos basta con abrir nuestra terminal y ejecutar este comando `docker run -it ubuntu`. Cuando se ejecute esta instrucción estaremos dentro de una terminal nativa de ubuntu y tendremos una máquina linux lista para trabajar desde la consola sin problemas.

Dentro de esta consola podremos ejecutar comandos como `apt update` `apt install wget` o lo que queramos. Todo lo que hagamos se mantendrá dentro de nuestro contenedor. Cuando queramos salir tendremos que ejecutar `exit` y volveremos a estar en nuestra máquina *host*.

Y te preguntarás <<*¿cómo es todo esto posible? ¿Cómo puedo tan rápidamente trabajar con una máquina linux sin miedos a contaminar mi máquina local?*>> Todo esto es posible gracias a los *[namespaces](https://en.wikipedia.org/wiki/Linux_namespaces)* y los *[cgroups](https://en.wikipedia.org/wiki/Cgroups)*. Con estas dos tecnologías podemos lograr que los contenedores consuman tantos recursos como nosotros le digamos (*[cgroups](https://en.wikipedia.org/wiki/Cgroups)*) y vean tanto como les correspondan (*[namespaces](https://en.wikipedia.org/wiki/Linux_namespaces)*).

Estas tecnologías no son para nada nuevas han existido en los sistemas *unix* desde hace años. En el caso de los *[namespaces](https://en.wikipedia.org/wiki/Linux_namespaces)* desde el 2002 y los *[cgroups](https://en.wikipedia.org/wiki/Cgroups)* en el año 2007 fue su primera versión estable. Con esto quiero decir, que es una tecnología estable de la cual podemos confiar el correcto funcionamiento, no es la última moda que han sacado y están en su primera versión prematura.

### Comprobar que no es una máquina virtual

Para ver que realmente estos procesos que ejecutamos dentro de nuestro contenedor están en nuestra máquina *host* podemos hacer un `sleep` en nuestro Docker de Ubuntu y, comprobar como se está ejecutando en nuestra máquina local. Para ello iniciamos en un terminal un contenedor de Ubuntu y dentro de él ejecutas `sleep` de 30 segundos, esto congelará la terminal durante 30 segundos.

```cmd
docker run -it --rm ubuntu
sleep 30

```

Mientras este `sleep` siga en funcionamiento, en otra terminal en nuestro equipo donde hemos arrancado el contenedor hacemos lo siguiente `ps -ejH` y buscamos entre toda la salida que obtenemos el proceso del contenedor que debe de estar como proceso hijo de docker. El resultado debe ser algo similar a lo siguiente.

```cmd
ps -ejH

# [...]
 3358  3358  3358 ?        00:00:09   dockerd
 3793  3793  3793 ?        00:00:14     docker-containe
 9967  9967  3793 ?        00:00:00       docker-containe
 9991  9991  9991 pts/0    00:00:00         bash
10776 10776  9991 pts/0    00:00:00           sleep
# [...]

```

Como hemos podido ver los comandos del contenedor están siendo ejecutados en nuestra máquina pero con la ayuda de los *[namespaces](https://en.wikipedia.org/wiki/Linux_namespaces)* docker no nos da visión de los mismos y desde dentro del contenedor no podemos ver nada de lo que ocurre en la máquina host.

## Empezar a trabajar

### Instalación

Para comenzar basta con instalar Docker en nuestra máquina. Dependiendo de nuestro sistema operativo tendremos que seguir unos pasos u otros. La [documentación oficial de Docker](https://docs.docker.com/install/#supported-platforms) es muy buena y nos hará de guía en este proceso.

El caso de Windows es un poco especial, tienes que tener en cuenta que no puedes al mismo tiempo usar las máquinas virtuales y Docker porque da problemas con el Hyper-V. No estoy al día con este tema, uso Ubuntu, pero he escuchado hablar mucho sobre este problema a mis compañeros. Existen otra casuística dónde Docker no puede acceder al disco duro de la máquina y tienes que ir a la configuración de *Docker Desktop* para compartir el disco duro de la máquina.

## Dockerfile

## Organización en capas

Como veremos más adelante en nuestros *Dockerfile* cuando configuramos nuestra imagen ejecutamos ciertos comandos y cada comando `RUN`, `COPY` o `ADD` es considerado una capa. Con cada nueva instrucción de este conjunto mencionado tenemos una nueva capa que se pone sobre la anterior. Cuando nosotros creamos una imagen basada en `Node`, por ejemplo, esta imagen que creamos está basada en la capa de node que viene de [DockerHub](https://hub.docker.com/) de node. Y, sobre de ella, nosotros decidimos que más ponerle. Como puede ser nuestros ficheros fuentes, instalar nuestras dependencias, etc.

Lo bueno de que funcione de esta forma es que la primera vez que creamos la imagen tardará un poco en instalar todas las dependencias de nuestro proyecto y ejecutar todos los comandos que le hemos indicado. Pero, una vez esto por primera vez, Docker guarda en caché las capas y automáticamente comprobará que si la capa que vamos a crear es la misma que ya teníamos antes y la estamos creando sobre la misma que estaba antes el resultado será el mismo de siempre. Y Docker usará la misma que tiene guardada ahorrando tiempo en la creación de la nueva imagen.

## Imagen 1

Como vimos en [como crear mi primer contenedor](https://criskrus.com/2021/02/cómo-crear-mi-primer-contenedor/) podemos partir de una imagen creada de la siguiente forma.

```docker
# Dockerfile
FROM node

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD node index.js
```

El problema que presenta esta primera versión es que dado el funcionamiento en capas con el que trabaja Docker esta imagen cada vez que hagamos un cambio en el código fuente instalará de nuevo todas las dependencias del proyecto. Dado que las dependencias no es algo que cambie con frecuencia nos interesa que al construir la imagen estas capas se usen desde el caché. Para ello podemos hacer la siguiente modificación.

```docker
FROM node

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY ./src ./src

CMD node index.js

```

De esta forma la primera mitad del fichero `Dockerfile` hasta `RUN npm install` será usado desde caché, ya que no cambia cuando hacemos nuevos desarrollos en nuestra aplicación. Como puede ser: añadir un nuevo *endpoint.*

## Agrupar capas

Otra opción muy común cuando trabajamos con imágenes que parten de un sistema linux, por ejemplo, y queremos instalar ciertas dependencias es agrupar en una misma capa toda la instalación de paquetes. Esta idea está dentro de la documentación de [buenas prácticas](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#minimize-the-number-of-layers)

```docker
FROM ubuntu

RUN apt-get update && apt-get install -y \
  bzr \
  cvs \
  git \
  mercurial \
  node

WORKDIR /app
COPY ./src ./src

CMD node index.js
```

## *Multi stage building*

Otra opción común si queremos evitar tener dependencias en el despliegue las cuales son necesarias en la construcción de nuestra aplicación podemos usar *multi stage build* (construcción de imágenes multi-estado)

Esta técnica también se encuentra dentro del manual de [buenas prácticas](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#use-multi-stage-builds) de Docker. Con ella podemos crear varias imágenes en un solo fichero `Dockerfile` las cuales construyen parte de nuestra aplicación y copiar en la imagen final solamente los ficheros que necesitamos para funcionar.

En este caso partimos de una imagen de node a la que le damos el nombre de `builder`, instalamos las dependencias y construimos la aplicación. Esta aplicación queda guardada en el directorio `/build` dentro de la primera imagen. A continuación, creamos una nueva imagen y copiamos solo la parte que hemos construido necesaria para que nuestra app funcione al público y la arrancamos.

```docker
FROM node:10-alpine as builder

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install

COPY ./src /app/src

RUN npm run build

FROM node:10-alpine

WORKDIR /app

COPY --from=builder /app/build/index.js ./index.js
COPY --from=builder /app/node_modules ./node_modules/

EXPOSE 8080

CMD node ./index.js
```

Con esta forma de construir imágenes docker nos ahorramos en la imagen final todos los datos y ficheros necesarios en la parte de construcción. Esto hace que la imagen final sea menos pesada al tener menos información.

## Comandos útiles

En el CLI de docker existen muchas opciones, aquí te dejo las que más suelo usar explicadas.

### `docker container run`

- `-d IMAGE` segundo plano
- `-i IMAGE` mantiene el input abierto (interactivo)
- `-t IMAGE` asigna un pseudo terminal. Estas dos últimas las suelo usar juntas casi siempre `-it` de esta forma (si la imagen lo permite) al arrancar se me queda una terminal abierta esperando ser usada desde dentro del contenedor.
- `-p 8000:5000 IMAGE` mapear el puerto para poder acceder. El 8000 mi máquina se asigna al 5000 del contenedor
- `--rm IMAGE` elimina el contenedor al pararlo
- `-e MY_VARIABLE=foo IMAGE` al crear el contenedor establece la variable de entorno `MY_VARIABLE` con el valor `foo`

### `docker container`

- `ls -a` muestra todos los contenedores equivalente a `docker ps -a`
- `ls -q` lista los contenedores arrancados y solo muestra los ID equivalente a `docker ps -q`
- `exec CONTAINER COMMAND`, ejecuta dentro del contenedor en comando. Uno bastante sencillo sería `docker exec -it ubuntu bash`
- `inspect CONTAINER`, muestra las propiedades el contenedor

### Limpiar Docker

Este apartado lo considero bastante importante porque de primeras puede parecer que Docker no genera archivos pero después de un tiempo trabajando con él puedes tener en tu disco duro varios GB de volúmenes sin usar. Conviene limpiar de vez en cuando.

- `docker container prune` elimina todos los contenedores parados
- `docker container rm CONTAINER` elimina el contenedor
- `docker container rm -v CONTAINER` elimina el contenedor y el volumen asociado
- `docker system prune --volumes` elimina todas las imágenes, contenedores y sus volúmenes asociados.

## Conectar con IDE

Si eres de esas personas que no le gusta mucho trabajar desde el terminal o, simplemente tienes un día en el que no te apetece escribir mucho, estás de enhorabuena. Existen varias extensiones tanto para Visual Studio Code como intellij con las que podrás gestionar docker, sus contenedores y mucho más.

## Visual Studio Code

Para este editor existen dos extensiones que harán tú día a día con Docker mucho más cómodo. La primera de ellas tiene prácticamente todo lo que necesitas: auto completado, crear imágenes con tan solo hacer click derecho en un dockerfile y decirle que haga el build y la parte que más me gusta un panel dónde puedes gestionar todo, TODO 😲

![00-vscode.png](00-vscode.png)

Este panel se abre cuando pulsamos sobre la extension y podremos ver todos nuestros contenedores arrancados o parados. Las imágenes que tenemos localmente y sus diferentes etiquetas, volúmenes, redes y lo que más me gusta podremos hacer limpieza de manera cómoda y visual.

Y esto es solo lo que destaco de esta extensión para Docker, si quieres saber más no dudes en consultar su documentación

[Docker - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

### Conectarme a un contenedor

Si a esta primera extensión le sumamos la que te voy a presentar a continuación podrás salir de más de un apuro.

En ocasiones me ha pasado que estoy desarrollando y dentro de un contenedor el código no funciona como yo quiero y no tengo logs o necesito revisar si el código está tal cual yo espero. Esto lo puedo hacer desde consola, accediendo a los ficheros por terminal pero, porque no hacerlo con un editor 😉

Con esta extension podemos ir a nuestro apartado de contenedores, dar click derecho y seleccionar "Attach Visual Studio Code". Después de unos segundos tendremos un editor el cual está conectado directamente al contenedor. Con él podremos acceder y modificar ficheros dentro del mismo además de, tener tantas terminales como queramos sin problema alguno.

[Remote - Containers - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Intellij

Si en tu caso usas el Intellij tengo buenas y no tan buenas noticias para ti. Existe la posibilidad de hacer esto mismo desde nuestro Intellij IDEA. Podemos gestionar nuestros contenedores e imágenes de manera visual y cómoda, ver un resumen de cada contenedor, que puertos expone, abrir un terminal asociado con el mismo, etc. Pero, no podremos abrir un IDE asociado al contenedor como hemos visto hace un momento.

Todo ello desde la pestaña de "servicios"

![01-intellij.png](01-intellij.png)

Y ahora es cuando te cuento la parte no tan buena... esta funcionalidad a día de hoy solo está disponible en la versión ultimate de este editor. Así que tendrás que tener una licencia para poder hacer uso de ella 🙄

## Preguntas

## Referencias

## Despedida

## BONUS, Persistencia

He escuchado varias veces decir que alguien no usa Docker porque al borrar el contenedor o al parar una base de datos toda la información se perderá en el olvido pero, nada más lejos de la realidad. Docker persiste la información en nuestro sistema no lo crea y lo mantiene en un limbo virtual 👻

Con esto quiero decir que cuando creamos un contenedor de Docker automáticamente, si no se lo indicamos, nos creará un directorio en nuestro sistema para guardar toda la información que se encuentre dentro del mismo. La clave está en que nosotros podemos definir dónde queremos que haga este mapeo, incluso decirle que directorio concreto queremos que mapee dentro del contenedor. Esto se hace con los **volúmenes**

Por ejemplo, si partimos de nuestra ***fake-api*** que hemos creado anteriormente en la cual primero copiamos nuestro código en el momento de la creación de la imagen con la sentencia `COPY . /app` dentro de nuestro archivo de configuración Dockerfile.

En el momento de la creación de la imagen no tenemos que hacer nada especial, ejecutaremos la sentencia igual que hasta ahora

```bash
docker build -t criskrus/fake-api .
```

La diferencia viene cuando creamos el contenedor. En este caso tendremos que indicar al contenedor que directorio tenemos que mapear. A nosotros para este ejemplo nos interesa que nuestro código fuente el cual modificamos en la máquina anfitriona se modifique automáticamente en el contenedor para mostrar los cambios. Esto es de bastante utilidad cuando estamos en fases de desarrollo.

Para hacer esto tendremos que añadir una nueva opción en el comando de creación indicando que el directorio actual dónde está todo nuestro código corresponde con el código que se ejecuta dentro del contenedor. Esto se hace de la siguiente forma `-v $(pwd):/app`, con esta opción decimos que el directorio actual se mapee al directorio `/app` del contenedor. Tenemos que usar el comando `pwd` porque tenemos que indicar la ruta absoluta.

Por lo tanto el nuevo comando con el que crearemos el contenedor queda de la siguiente forma.

```bash
docker run --rm -it  -p 8080:8080 -v $(pwd):/app criskrus/fake-api
```

Ahora, sin parar el contenedor, podemos hacer modificaciones en el código y veremos como se actualiza de manera automática en el contenedor. Como tenemos instalado `nodemon` esta actualización del servidor ocurrirá automáticamente al actualizar el código sin necesidad de actualizar o hacer nada en nuestro contenedor.

Con esto podremos persistir y mantener en nuestra máquina local lo que ocurra en el contenedor y nos interese mantener: configuración, logs, copias de seguridad de una base de datos, etc