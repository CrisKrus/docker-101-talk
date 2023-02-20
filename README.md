Docker 101 talk
===============================================================================

Hola si estás aquí es porque estás interesado en la formación sobre Docker que
he impartido. En este repositorio están todos los recursos que he usado para
ello, incluidos los ejemplos que he puesto en las diapositivas.

Además de esto en [mi blog][blog] puedes consultar las notas que he redactado
para esta sesión.

[blog]:https://www.criskrus.com/tags/docker/

Si quieres ver las diapositivas online puedes entrar en [este enlace][diapositivas]

[diapositivas]:https://criskrus.github.io/docker-101-talk/slides.html

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

<h2 align="center">Hi 👋, I'm Cristian Suarez Dev</h2>
<h3 align="center">A developer that loves learning</h3>

- 👨‍💻 All of my projects are available at [cristiansuarez.dev](https://www.cristiansuarez.dev/)

- 📫 How to reach me **mail@criskrus.com**

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://twitter.com/criskrus995" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="criskrus995" height="30" width="40" /></a>
<a href="https://instagram.com/cristian_suarez_dev" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="cristian_suarez_dev" height="30" width="40" /></a>
<a href="https://www.youtube.com/@cristian_suarez_dev" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg" alt="cristian suarez youtube" height="30" width="40" /></a>
</p>


<h3 align="left">Support:</h3>
<p><a href="https://www.buymeacoffee.com/cristianSuarez"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="cristianSuarez" /></a></p><br><br>

<!--
source link:
https://rahuldkjain.github.io/gh-profile-readme-generator/
-->