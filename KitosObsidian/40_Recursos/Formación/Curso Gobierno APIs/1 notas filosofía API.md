
### Referencia
[[1. Filosofía REST.pdf]]

### Introducción a servicios Web
Transferencia de estado representacional
	
**Definición** Buscando una definición sencilla, REST es cualquier interfaz entre sistemas que use HTTP para obtener datos o generar operaciones sobre esos datos en todos los formatos posibles, como XML y JSON.

##### Características
- Cliente servidor
	- Cada petición tiene la información necesaria para ser ejecutada
	- verbos/métodos: POST, GET, PUT, DELETE
- Sin estado
	- imprescindible para la escalabilidad: servidores, granjas...
	- cada petición envía información completa e independiente
		- cabecera, cuerpo, parámetros, contexto
		- ausencia de sesiones
- información cacheable
	- mejora la eficiencia
- Interfaz uniforme
	- uso de verbos HTTP
	- un recurso es una página lógica, no física, no hace falta una página HTML
	- el cliente no sabe nada de la implementación. Esto facilita la sustitución
- acceso a recursos por nombre
	- intuitivas, predecibles y fáciles
	- estructura jerárquica
- recursos relacionados
	- no mostrar toda la información de una vez: trocearla en objetos relacionados
	- minimiza el uso de red
- respuesta en un formato conocido
	- estado actual de un recurso
	- formato comprensible
	- diferentes clientes
	- formato habitual: JSON, XML, CSV
	- Hipermedia:
		- Dada una URI o URL inicial, es posible navegar a partir de las respuestas: Listado-detalle, objeto-referencias...
		
##### Ventajas
- Separación cliente-servidor
	- aplicaciones monolíticas: llamadas locales IU, negocio y persistencia
	- aplicaciones remotas: IU en cliente (llamada remota) vs negocio y persistencia
	- soluciones modulares
	- Visibilidad, fiablilidad y escalabilidad
	- independiente del tipo de plataformas y lenguajes
	- lo único fijo debe ser el lenguaje de intercambio
	- nivel de granularidad en la escalabilidad
		- es posible dar más recursos a distintas capas por separado: más BD, más lógica, más recursos al servidor web...

### HTTP
* Protocolo de transferencia basado en WWW
* Clientes hacen peticiones que son respondidas por servidores a través de proxies
* Servidor escucha continuamente el puerto de comunicaciones TCP
* El cliente establece conexión para hacer solicitudes 
* El servidor responde con el estado de la petición (códigos HTTP) y los datos adecuados
* Se identifican los recursos mediante URLs

##### Peticiones HTTP
- método: verbo
- path: URL
- Protocolo: HTTP y versión
- Headers: key:value, datos del navegador, cookies...
- Body
##### Respuestas HTTP
- Protocolo: 
- Status code: http code
- Headers
	- datos del servidor
	- tipo MIME
- Body
##### Cabeceras HTTP
https://hmong.es/wiki/List_of_HTTP_header_fields
información adicional a la petición o respuesta
* Accept: Este campo informa al servidor sobre qué tipo de datos se pueden retornar.
* Accept-Charset
* Accept-Encoding
* Accept-Language
* Authorization
* Cookie
* Refer
* User-Agent: envía al servidor info sobrel el ciente, por ejemplo, el navegador

##### Códigos HTTP
aplican a las respuestas RFC 2616.
- 1XX: Respuestas informativas.
- 2XX: Peticiones correctas.
- 3XX: Redirecciones.
- 4XX: Errores del cliente.
- 5XX: Errores de servidor.

##### CRUD
| CRUD | SQL | REST |
|- |-------| -----|
| Create | insert | POST | 
| Read | select | GET| 
| Update | update | PUT| 
| Delete | Delete | Delete

##### HATEOAS
Es una de los principios de REST 
Hypermedia as the engine of applicacion state (en castellano, hipermedia como el motor del
estado de la aplicación)
El cliente debe moverse por la aplicación únicamente siguiendo los identificadores únicos en formato hipermedia
* Formato href y src 
* con elementos JSON o XML

###### HATEOAS y REST: el paradigma hipermedia
- Para comprender el significado de HATEOAS para las aplicaciones REST, puede ayudar entender
primero el marco general. Tal como Fielding define su concepto, son 5 los principios fundamentales que ha de cumplir un servicio para que sea considerado REST.
- En primer lugar, ha de basarse siempre en una estructura cliente-servidor que permita
la comunicación sin estado entre el servidor y los clientes, lo que significa que todas las peticiones
de los clientes al servidor se tratan de forma independiente a peticiones anteriores.
- El servicio debe estar estructurado en capas y utilizar las ventajas del caching HTTP
(almacenamiento en caché) para que la utilización del servicio sea lo más sencilla posible para el
cliente que realiza la petición.
- Por último, ha de tener una interfaz unitaria 

Para la conexión entre el servidor y el cliente Fielding define estas cuatro características:
- **Identificación inequívoca** de todos los recursos: todos los recursos han de poder identificarse con una URI (Unique Resource Identifier).
- **Interacción con los recursos por medio de representaciones**: si un cliente necesita un recurso, el
servidor le envía una representación (p. ej., HTML, JSON o XML) para que el cliente pueda
modificar o borrar el recurso original.
- **Mensajes explícitos**: cada mensaje intercambiado por el servidor y el cliente ha de contener todos los datos necesarios para entenderse.
- **HATEOAS**: este principio también integra una API REST. Esta estructura basada en hipermedia
facilita a los clientes el acceso a la aplicación, puesto que de este modo no necesitan saber nada
más de la interfaz para poder acceder y navegar por ella.

HATEOAS es, en definitiva, una de las propiedades más elementales de las API REST y como tal,
imprescindible en cualquier servicio REST

##### Buenas prácticas para el diseño de una API RESTful
- Introducción.
- Usar nombres pero no verbos.
- Métodos GET y los parámetros de consulta no deben alterar el estado.
- Usar nombres en plural.
- Usar subrecursos para establecer relaciones.
- Usar cabeceras HTTP para la serialización de formatos.
- Filtrado, Ordenación, Paginación y Selección de campos.
- Versionar la API.
- Manejar errores con código de estado HTTP.