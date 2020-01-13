# Docker Formation

Construir imagen
----------------

`docker build -t criskrus/fake-api:1 -f Dockerfile-1 .`

Arrancar la imagen
------------------

`docker run --rm -d --name fake-api criskrus/fake-api:1`

Comandos útiles
---------------

`docker container run -d IMAGE` segundo plano

`docker container run -i IMAGE` mantiene el input abierto (interactivo)

`docker container run -t IMAGE` asigna un seudo terminal

`docker container run -p 8000:5000 IMAGE` mapear el puerto para poder acceder 8000 mi máquina 5000 contenedor

`docker container run --rm IMAGE` elimina el contenedor al salir de él

`docker container run -e MY_VARIABLE=foo IMAGE` inicializa una variable de entorno

`docker container ls` muestra los contenedores arrancados

`docker container ls -a` muestra todos los contenedores (parados y arrancados)

`docker ps` funciona igual que `container ls`

`docker container ls -q` solo muestra los IDs de los contenedores

`docker container exec CONTAINER COMMAND` lanza un comando dentro de un contenedor

`docker exec -it my_container bash` lanza un bash dentro de unex contenedor

`docker container inspect CONTAINER` inspecciona los datos de un contenedor

`docker container inspect CONTAINER | grep IPAddress`

`docker container prune` elimina todos los contenedores parados

`docker container rm CONTAINER` elimina el contenedor indicado

`docker container rm -v CONTAINER` elimina el contenedor y el volumen asociado

`docker rm -v $(docker ps -aq)` elimina todos los contenedores y sus volumenes

`docker system prune` elimina todos los contenedores e imagenes sin usar

`docker system prune --volumes` igual que el anterior pero además limpia los volúmenes