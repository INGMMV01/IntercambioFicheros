
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
