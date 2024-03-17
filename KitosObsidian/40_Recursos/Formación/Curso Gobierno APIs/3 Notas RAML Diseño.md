
##### Referencia
[[3. RAML.pdf]]

Todo software que se comunica con otro tiene algún tipo de acoplamiento: fuerte o débil
El acoplamiento positivo es aquel que diseña un sistema antes de implementarlo
Contract first - API first

Lenguajes de definición del API
- RAML (raml.org): diseño del API y documentación antes de la implementación
	- lenguaje de modelado para el api y todo lo relocionado
		- recursos
		- esquemas
		- respuestas
- Swager

### RAML
- Referencia: https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md/
- Basado en lenguaje YAML
- Formato de datos legible por humanos
- claves, valores y etiquetas
- Sintaxis
	- dos elementos fundamentales: 
		- diccionarios: estructura clave-valor
		- arrays o listas de elementos
	- Las listas se forman por elementos con el mismo nivel de identación, cada elemento está definido por un guión y un espacio (- )
	- Caracteres especiales para varias líneas
		- | un valor con varias líneas
		- > se considera una sola línea aunque se escriba en varias
		- cuidado con los dos puntos. Si termina en :, hay que incluirlo entre comillas "c:"
- Herramientas
	- Visual Studio Code con extensión RAML
	- cabecera
	- información básica, nodos raíz:
		- title, baseURI, versión, protocols...
	- recursos: a nivel raíz (sin identación), se define con una /
		- puede haber recursos anidados con identación
		- para cada recurso
			- métodos
			- parámetros
			- body
			- responses

### Creación de RAML
#### Pasos
1. cabecera, tipos comunes
2. Métodos
3. respuestas a cada método: 200, 404...
4. propiedades de métodos: parámetros, descripción...
	1. query parameters son los que van en la URL
	2. body
5. tipos
	1. herencia
	2. sustitución en los bodies
6. Eliminación de redundancia
	1. resource types: plantillas de recursos
		1. parámetros reservados: resourcePath, resourcePathName
		2. parámetros de usuario, por ejemplo, NombreEntidad
		3. parámetros funciones: pipes como toSingular, toPlural, toLowerCase...
7. Includes: para evitar tamaños demasiado grandes y reutilizar tipos
	- extracción de elementos a otros ficheros: Cada fichero debe definir su tipo en la cabecera (fragment-type) (PDF, página 108) y contener únicamente ese tipo
		- tipos
		- resouceTypes
		- traits
	- se incluyen el la definición del API con !include
8. Libraries
	- es un tipo de include que puede contener distintos tipos de fragmentos
	- agrupa varias includes en un solo fichero para que la definición del servicio importe un solo fichero 
	- en lugar de usar !include, se incluyen con uses y se le da un nombre como de variable
		 uses:
			miLibreria: !include ./libreria.raml 
	- luego se usa como un objeto
			miLibreria.miTipoDeRecurso
			miLibrería.miTipo

#### Pasos avanzados
1. tipos y tipos de recursos
2. includes
3. librerías