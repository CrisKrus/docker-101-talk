Docker Formation
===============================================================================

Hola si estás aquí es porque estás interesado en la formación sobre Docker que
he impartido. En este repositorio están todos los recursos que he usado para
ello además de los ejemplos que he puesto en las diapositivas.

Además de esto en [mi blog][blog] puedes consultar las notas que he redactado
para esta sesión.

[blog]:https://www.criskrus.com/tags/docker/

Si quieres ver las diapositivas online puedes entrar en [este enlace][diapositivas]

[diapositivas]:https://criskrus.github.io/docker-formation/slides.html#/

Dudas
-------------------------------------------------------------------------------

Si tienes dudas sobre este tema no dudes en contactar por mis redes sociales o
abrir un issue en este mismo repositorio, lo que te sea más cómodo!

- Instagram 📷 http://bit.ly/cristian-suarez-instagram
- Blog http://bit.ly/cristian-suarez-blog
- Twitch 📺 http://bit.ly/cristian-suarez-twitch
- Youtube 🎥 http://bit.ly/cristian-suarez-youtube
- Youtube directos 📺🎥 http://bit.ly/cristian-suarez-directos

Construir imagen
-------------------------------------------------------------------------------

`docker build -t criskrus/fake-api:1 -f Dockerfile-1 .`

Arrancar la imagen
-------------------------------------------------------------------------------

`docker run -P --rm --name fake-api criskrus/fake-api:1`
