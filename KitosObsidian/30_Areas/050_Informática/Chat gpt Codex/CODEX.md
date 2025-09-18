
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

5. Uso de CODEX
	1. introduce prompt, preferiblemente escrito en notepad para poder retomarlo más tarde. Es necesario establecer la rama de partida y el número de respuestas que dará
	2. Una vez tenidas las respuestas, se revisan una a una para ver cuál es la más adecuada y se hace 'Solicitud de extracción' que crea una rama en Github. Es mejor pedir cosas bastante concretas para que la cantidad de código no sea enorme.
	3. (*Configuración de tareas en VsCode)
	4. Con la task "Branch: Probar rama", coger la rama de gitlab escogida. Esto la bajará, se mueve a ella, recompila y lanza la app si estaba corriendo con ng serve
	5. Si no te gusta, puedes probar otras ramas haciendo de nuevo 'Solicitud de extracción'. Si te gusta, se hace en github el merge de esa nueva rama a la rama de trabajo donde estuvieses, por ejemplo develop.
	6. En VsCode, ejecutas la rama "Branch: Actualizar rama de prueba" para que vuelva a bajarse develop después de haber sido mergeada
	7. Solo quedaría eliminar la rama temporal del desarrollo para dejarlo todo limpio en github

6. Configuración de tareas en VsCode
	1. copiar los ficheros (adjuntos en esta carpeta) ".vscode\tasks.json" y "scripts\branch-helper.cmd"

