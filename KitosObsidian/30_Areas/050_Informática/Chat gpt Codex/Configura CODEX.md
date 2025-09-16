
1. Es necesario tener Chat GPT plus

2. Carga repositorios en GitHub
	1. Repositorios de referencia y repo de trabajo
		1. morphe-common
		2. morphe-eslint
		3. RPOSAA0401
		4. RPOSAA0415
	2. Proceso (para cada uno de ellos):
		1. se clona a local desde Abanca Gitlab
		2. se crea un segundo remote contra Github, se sube a este y se elimina el de gitlab
			1. git remote add github https://github.com/INGMMV01/morphe-common.git
			2. git remote -v
			3. git remote remove origin (esto no se hace para el repo de trabajo: RPOSAA0415)
			4. git branch -m main
			5. git push github main

3. Genera token en github
	1. settings\developer settings\Fine-grained personal access tokens
		- sin expiración, todos repositorios
		- permisos repositorio:
			- comit statuses
			- contents
			- pull request
			- actions
		- permisos cuenta:
			- watching

4. Entorno Codex
	1. Crea entorno
	2. crea script configuración (fichero adjunto script configuracion.txt)
	3. crea agente IA (fichero adjunto agent.md) que se sube al root del repo
