En esta serie de publicaciones explicaré todo lo que necesitas saber de __Docker__ desde cero. De tal forma que alguien que si no sabes que es Docker o no sabes por dónde empezar podrás quitarte el miendo y comenzar a jugar con él.

Todas estas publicaciones han salido de una presentación que he hecho para mis compañeros en [Lean Mind][leanmind] en un día de formación. La presentación duró casi una hora y está el [vídeo completo][video] en youtube si quieres verlo.

[leanmind]: leanmind.es
[video]: https://www.youtube.com/watch?v=vKXCtHuM7Mk

## Que es docker

Docker es la forma de tener una misma configuración de un proyecto independientemente de la máquina o el sistema en el que te encuentres, siempre que tenga Docker instalado. Facilitando así los despliegues y desarrollos de aplicaciones.

Además de esto con Docker podrás trabajar y jugar con distintas herramientas y tecnologías sin llenar de paquetes que no te interesan en tu máquina.

Quiero dejar claro que Docker no es una máquina virtual, aunque de primeras puede parecerse bastante cuando veamos como funciona realmente comprobaremos que no se parece en nada. De primeras puedes pensarlo de esta forma, te hará más fácil entender el resto de conceptos, pero quiero dejar claro que __no es una máquina virtual__

Como podemos ver en la imagen siguiente una máquina virtual necesita tener un sistema operativo desde cero sobre el de nuestra máquina *host*. Y luego, encima de este nuevo sistema tendremos las librerías necesarias y las aplicaciones que queremos probar.

En cambio, Docker comparte el mismo núcleo del sistema y aisla las librerías que queremos usar dentro del contenedor. Es decir, en el fondo, Docker se está ejecutando en tu máquina, no en un sistema nuevo, pero aisla todos estos procesos y paquetes en una zona privada a la que nadie puede acceder (contenedor). Explicaré en otro post con más detalle.

![](https://i.imgur.com/3eoPoqH.png)


## Conceptos

Antes de empezar necesitamos tener una serie de conceptos claros que nombraremos bastante a menudo. Estos son __imagen__, __contenedor__ y __volumen__. Estas palabras las usaremos con frecuencia ya que son la base de Docker.


### Imagen

Una __imagen__ es una configuración para un contenedor, podemos hacer el símil cuando creamos una clase para instanciar un objeto en programación. Creamos un molde con cierta configuración y funciones en su interior que podemos instanciar (crear) tantas veces como queramos en varios objetos y siempre será de la misma forma.

Una imagen de Docker sería nuestra clase en programación. Para configurar esta imagen como si de un fichero de programación se tratase Docker dispone de los __Dockerfile__, los cuales explicaremos más adelante. En ellos pondremos todos los datos que necesitamos para que funcione correctamente como las variables de entorno, comandos que ejecuta, etc.

### Contenedor

Siguiendo con el símil anterior de la clase de programación y el objeto, un __contenedor__ sería una instancia de la clase que hemos creado. Es decir, creamos una instancia que tiene toda la configuración que y funciones que le hemos indicado. Podremos crear tantas como queramos. 

Con esta clase ya definida da igual en que parte de nuestra aplicación la usemos siempre partirá de la misma base. De forma que siempre podremos trabajar con ella partiendo del mismo punto. 

Podemos crear tantos contenedores como nos sea necesario gestionándolos a nuestro gusto. Con esto quiero decir que un contenedor lo podemos crear, eliminar, parar, volver a arrancarlo, conectarnos a él, dejarlo en segundo plano, exponer los puertos que nos interesen, etc. Iremos viendo como hacer cuando llegue el momento.

### Volumen

Además, cada contenedor tiene asociado con él un __volumen__. Los volúmenes son donde cada contenedor guarda la información que tiene en su interior como si de un "disco duro" propio se tratase.

Estos volúmenes se encuentran en nuestro sistema y no dejan de ser carpetas que podemos ver. Este punto es importante tenerlo claro porque puede parecer "magia" cómo y dónde guarda la información los contenedores ya que no está a simple vista en el sistema y solo la vemos dentro del propio contenedor.

Y digo que es importante tenerlo en cuenta porque es normal en algún momento hacerse la pregunta: ¿Se pierde la informacion cuando apago el contenedor?

La respuesta corta es no, la información no se pierde, como he dicho está en nuestro sistema en algúń punto. La respuesta larga es que si paramos un contenedor la siguiente vez que lo arranquemos seguirá con todos los mismos datos en su interior tal cual lo habíamos dejado.

Dado que como cada una de estas tres partes (imagen, contenedor, volumen) son __independientes__ entre sí, una vez eliminamos un contenedor el volumen sigue existiendo en nuestro sistema, durante un tiempo. 

## Como funciona

Para comenzar basta con instalar Docker en nuestra máquina. Dependiendo de nuestro sistema operativo tendremos que seguir unos pasos u otros. La [documentación oficial de Docker][docker-installation] es muy buena y nos hará de guía en este proceso.

[docker-installation]: https://docs.docker.com/install/#supported-platforms

El caso de Windows es un poco especial, tienes que tener en cuenta que no puedes al mismo tiempo usar las máquinas virtuales y Docker porque da problemas con el Hyper-V. No estoy al día con este tema, uso Ubuntu, pero he escuchado hablar mucho sobre este problema a mis compañeros. Existen otra casuística dónde Docker no puede acceder al disco duro de la máquina y tienes que ir a la configuración de *Docker Desktop* para compartir el disco duro de la máquina.

Una vez instalado nos basta con abrir nuestra terminal y ejecutar este comando `docker run -it ubuntu`. Cuando se ejecute esta instrucción estaremos dentro de una terminal nativa de ubuntu y tendremos una máquina linux lista para trabajar desde la consola sin problemas.

Dentro de esta consola podremos ejecutar comandos como `apt update` `apt install wget` o lo que queramos. Todo lo que hagamos se mantendrá dentro de nuestro contenedor. Cuando queramos salir tendremos que ejecutar `exit` y volveremos a estar en nuestra máquina *host*.

Y te preguntarás <<*¿cómo es todo esto posible? ¿Como puedo tan rápidamente trabajar con una máquina linux sin miedos a contaminar mi máquina local?*>> Todo esto es posible gracias a los *[namespaces]* y los *[cgroups]*. Con estas dos tecnologías podemos lograr que los contenedores consuman tantos recursos como nosotros le digamos (*[cgroups]*) y vean tanto como les correspondan (*[namespaces]*).

Estas tecnologías no son para nada nuevas han existido en los sistemas *unix* desde hace años. En el caso de los *[namespaces]* desde el 2002 y los *[cgroups]* en el año 2007 fue su primera versión estable. Con esto quiero decir, que es una tecnología estable de la cual podemos confiar el correcto funcionamiento, no es la última moda que han sacado y están en su primera versión prematura.

[cgroups]: https://en.wikipedia.org/wiki/Cgroups
[namespaces]: https://en.wikipedia.org/wiki/Linux_namespaces

### Comprobar que no es una máquina virtual

Para ver que realmente estos procesos que ejecutamos dentro de nuestro contenedor están en nuestra máquina *host* podemos hacer un `sleep` en nuestro Docker de Ubuntu y, comprobar como se está ejecutando en nuestra máquina local. Para ello iniciamos en un terminal un contenedor de Ubuntu y dentro de él ejecutas `sleep` de 30 segundos, esto congelará la terminal durante 30 segundos.

```bash
docker run -it --rm ubuntu
sleep 30
```

Mientras este `sleep` siga en funcionamiento, en otra terminal en nuestro equipo donde hemos arrancado el contenedor hacemos lo siguiente `ps -ejH` y buscamos entre toda la salida que obtenemos el proceso del contenedor que debe de estar como proceso hijo de docker. El resultado debe ser algo similar a lo siguiente.

```bash
ps -ejH

# [...]
 3358  3358  3358 ?        00:00:09   dockerd
 3793  3793  3793 ?        00:00:14     docker-containe
 9967  9967  3793 ?        00:00:00       docker-containe
 9991  9991  9991 pts/0    00:00:00         bash
10776 10776  9991 pts/0    00:00:00           sleep
# [...]
```

Como hemos podido ver los comandos del contenedor están siendo ejecutados en nuestra máquina pero con la ayuda de los *[namespaces]* docker no nos da visión de los mismos y desde dentro del contenedor no podemos ver nada de lo que ocurre en la máquina host.

### Organización en capas

Otra cosa más a tener en cuenta es que las imágenes se organizan en capas. Como veremos más adelante en nuestros *Dockerfile* cuando configuramos nuestra imagen ejecutamos ciertos comandos y cada uno de ellos es considerado una capa. Con cada nueva instrucción de nuestra imagen tenemos una nueva capa que se pone sobre la anterior. Cuando nosotros creamos una imagen basada en `Node`, por ejemplo, esta imagen que creamos está basada en la capa de node que viene de [DockerHub] de node. Y, sobre de ella, nosotros decidimos que más ponerle. Como puede ser nuestros ficheros fuentes, instalar nuestras dependencias, etc.

[DockerHub]: (https://hub.docker.com/)

Lo bueno de que funcione de esta forma es que la primera vez que creamos la imagen tardará un poco en instalar todas las dependencias de nuestro proyecto y ejecutar todos los comandos que le hemos indicado. Pero, una vez esto por primera vez, Docker guarda en caché las capas y automáticamente comrpobará que si la capa que vamos a crear es la misma que ya teníamos antes y la estamos creando sobre la misma que estaba antes el resultado será el mismo de siempre. Y Docker usará la misma que tiene guardada ahorrando tiempo en la creación de la nueva imagen.

En este tema entraremos más en profundidad en un apartado de optimización de imagenes.

## ¿Como crear mi primer contenedor?

Primero debemos crear la imagen, para esto crearemos un fichero de configuración de Docker. Este fichero se llama `Dockerfile`, en él se indican todas las instrucciones que tiene que seguir para crear la imagen y su contenido. Una vez tenemos el fichero en la consola nos bastaría con ejecutar `docker build -t leanmind .` en el mismo directorio dónde se encuentra el fichero.

Con este comando le estamos diciento a Docker lo siguiente: 
- que nos construya una imagen `build` 
- con el *tag* (etiqueta) leanmind `-t leanmind`. Este punto es importante si queremos diferenciarla de otras imágenes que no queremos sobrescribir
- en el directorio actual `.`. En este directorio es donde buscará el fichero Dockerfile

### Ejemplo dockerfile

> todo una vez arrancada el contenedor acceder a la web para ver como esta funcionando
> todo explicar los diferentes parametros de los dockerfile de manera corta

Vamos a ver un ejemplo simple en el que crearemos un contenedor con un servidor Node.

Para ello vamos a crear primero un directorio donde guardar todo el contenido del proyecto y dentro de este directorio de proyecto crearemos nuestro *EndPoint* de nuestro servidor. 

```javascript
// index.js
const http = require('http');

let app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    res.end('Hello World!\n');
});

app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');
```

```dockerfile
# Dockerfile
FROM node

WORKDIR /app

COPY . /app

RUN npm install

CMD node index.js
```

Para comprobar si la imagen se ha creado correctamente ejecutamos `docker images` en la consola nos debe devolver algo similar a esto

```bash
@criskrus:~/WorkSpace/node-example$ docker images
REPOSITORY      TAG           IMAGE ID         CREATED            SIZE
node            leanmind      8dd8c5d26f3d     Few seconds ago    125MB
```

Con la imagen ya creada en el paso anterior arrancamos el contenedor basado en esa imagen con `docker run node:leanmind`

### Instrucciones del Dockerfile

Como hemos visto en el Dockerfile aparecen ciertas palabras, llamemosla __instrucciones__, con las que hemos modificado el estado de la imagen. 

#### `FROM`

Partimos de un `FROM` y esto siempre es necesario toda imagen de Docker parte de una base, bien puede ser una ya creada con cierto set de herramientas como es nuestro caso `FROM node` o bien desde una imagen vacía `FROM alphine`. Además en esta base podemos especificar la versión con las etiquetas, normalmente cuando creamos una imagen Docker podemos ponerle un *tag* o etiqueta como vimos anteriormente. Lo que se suele hacer es que se le dan nombre a las etiquetas con las versiones en las que nos encontramos, por ejemplo `FROM node:12`. Estas etiquetas las podemos ver en el [DockerHub][dockerhub-node-tags-12] en el apartado de *tags*

[dockerhub-node-tags-12]: https://hub.docker.com/_/node?tab=tags&page=1&name=12

1. `WORKDIR`
2. `RUN`
3. `COPY`
4. `ADD`
5. `ENV`
6. `ENTRYPOINT`
7. `CMD`

[dockerfile-docs]: https://docs.docker.com/engine/reference/builder/

## CMD vs ENTRYPOINT

- `ENTRYPOINT` es lo que se ejecutará al finalizar la construcción del contenedor
    - El por defecto es `/bin/sh`
- `CMD` son los argumentos que recibe por defecto el `ENTRYPOINT`

```dockerfile
FROM debian

ENTRYPOINT ["/bin/ping"]

CMD ["localhost"]
```

## Optimización de imágenes

Imagen optimizada para usar las capas cacheadas hasta `npm install`

```dockerfile
FROM node

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY ./src ./src

CMD node index.js
```

Imagen optimizada para que en una sola capa instale las extensiones y las descargue.

```dockerfile
FROM node

WORKDIR /app

RUN npm install --save-dev somethig@^2.0.4 \
    && npm install --save-dev my-dev-dependency@^1.1.5 \
    && npm install --save-dev whatever@^1.8.0

COPY ./src ./src

CMD node index.js
```

*Multi stage building*

```dockerfile
FROM node:10-alpine as builder

WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY . .

RUN npm run build

FROM node:10-alpine

WORKDIR /app
VOLUME [ "/app/uploads" ]

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY --from=builder /app/build ./build

CMD node build/index.js
```

## Comandos típicos

`docker container run -d IMAGE` segundo plano

`docker container run -i IMAGE` mantiene el input abierto (interactivo)

`docker container run -t IMAGE` asigna un seudo terminal

`docker container run -p 8000:5000 IMAGE` mapear el puerto para poder acceder 8000 mi máquina 5000 contenedor

`docker container run --rm IMAGE` elimina el contenedor si ya existe

`docker container run -e MY_VARIABLE=foo IMAGE` elimina el contenedor si ya existe

`docker container ls -a` muestra todos los containers

`docker ps -a`

`docker container ls -q` solo muestra los IDs de los contenedores

`docker ps -q`

`docker container exec CONTAINER COMMAND`

`docker container inspect CONTAINER`

`docker container inspect CONTAINER | grep IPAddress`

`docker container prune` elimina todos los contenedores parados

`docker container rm CONTAINER` elimina el contenedor

`docker container rm -v CONTAINER` elimina el contenedor y el volumen asociado

`docker rm -v $(docker ps -aq)` elimina todos los contenedores y sus volumenes

`docker exec -it bash`

`docker system prune` hace prune de todo menos los volumenes

`docker system prune --volumes` hace prune de todo y de los volumenes, mejor hacer el anterior primero porque si el volume esta vinculado un contenedor no lo eliminara

## Seguridad

https://www.stackrox.com/post/2019/09/docker-security-101/

https://security.stackrox.com/rs/219-UEH-533/images/StackRox_Whitepaper_HardeningDocker.pdf

### Notas de los enlaces anteriores

- CAP DROP or CAP ADD
- eliminar todo lo inecesario para tener menoss superficie de ataque
- estar seguros de las imagenes que descargamos
- un fallo en una imagen puede afectar a muchos contenedores
- no entrar como root en los contenedores de prod
- no guardar claves en los contenedores
- limitar los recursos que puede hacer el contenedor del sistema, supongo que para que no colapse el sistema
-
