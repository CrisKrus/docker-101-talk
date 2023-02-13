Docker 101 talk
===============================================================================

Hola si estás aquí es porque estás interesado en la formación sobre Docker que
he impartido. En este repositorio están todos los recursos que he usado para
ello, incluidos los ejemplos que he puesto en las diapositivas.

Además de esto en [mi blog][blog] puedes consultar las notas que he redactado
para esta sesión.

[blog]:https://www.criskrus.com/tags/docker/

Si quieres ver las diapositivas online puedes entrar en [este enlace][diapositivas]

[diapositivas]:https://criskrus.github.io/docker-formation/slides.html#/

Dudas
-------------------------------------------------------------------------------

¡Si tienes alguna pregunta sobre este tema no dudes en contactar por mis redes 
sociales o abrir un issue en este mismo repositorio, lo que te sea más cómodo!

- [Instagram 📷](http://bit.ly/cristian-suarez-instagram)
- [Blog](http://bit.ly/cristian-suarez-blog)
- [Youtube 📺🎥](http://bit.ly/cristian-suarez-directos)

Construir imagen
-------------------------------------------------------------------------------

Desde dentro del directorio de examples `cd examples`

`docker build -t criskrus/fake-api:1 -f Dockerfile-1 .`

Arrancar la imagen
-------------------------------------------------------------------------------

`docker run -p 8080:8080 --rm --name fake-api criskrus/fake-api:1`
