
Documentación github:
https://github.com/IconoTC/-Angular-13-AF-46970---GR-65993
https://github.com/INGMMV01/Curso-Angular-13 (documentación y proyectos)

## Typescript
### qué es: 
- Lenguaje tipado para ampliar a JS
- tipos básicos
  - number
  - string: comillas simples, dobles y la vertical para cadenas dinámicas con llaves
  - enum
  - any
- Interfaces
- Decoradores: clases, parámetros, métodos y propiedades

### tipos 
tipos 

## Instalaciones previas
- node
- npm
- angular cli
- visual studio code

## Angular
 - data binding
   - interpolación
   - property binding
   - event binding
 - Directivas
   -  componentes
   - estructurales
   - atributos
   - personalizadas: sirven para personalizar la presentación de un elemento. Pueden manipular lo que se muestra o escuchar eventos
     - HostListener: eventos
     - HostBinding: propiedades


## Bootstrap
- install bootstrap, jquey y popper
- incluir en angular.json los estilos y scripts de las tres dependencias

## Trucos


## Proyecto 1: Binding
-  data binding
   - interpolación
   - property binding
   - event binding


## Proyecto 2
 - Directivas
   -  componentes
   - estructurales
   - atributos
   - personalizadas: sirven para personalizar la presentación de un elemento. Pueden manipular lo que se muestra o escuchar eventos
     - HostListener: eventos
     - HostBinding: propiedades
## Proyecto 3: Routing
- Routes en app.modules
- routerlink, queryparams
- router-outlet
- parámetros
- recoger parámetros
  - activatedRoute (snapshot)

## Proyecto ejemplo Museos
- servicios
	- HttpClient
	- httpHeaders
	- Observable
	- inyectable
- componentes
  - inyección
  - suscribe
  - callback
- modules
- servicios
## Proyecto 4: Pokemon
- genera servicio
- http en servicio y módulos
- en module.ts incluye httpmodule y formsmodule

## Proyecto 5: Internalización
- instala dependencias: 
  - "@ngx-translate/core": "^14.0.0",
  - "@ngx-translate/http-loader": "^7.0.0"
- module.ts: es una parte constante
- carpeta por idioma en assets/i18n
  - fichero por idioma
- inyección de servicio de tranducción
  - establece idioma por defecto
  - función de cambio de idioma
- pipe translate

## Proyecto 6: PIPEs
- Referencia: https://v13.angular.io/api?type=pipe
- locale
  - npm i @angular/localize
  - angular.jason=> "i18n": {"sourceLocale": "es"},

## Proyecto 7: Formularios reactivos
- importa FormsModules y ReactiveFormsModule
- genera una variable de tipo FormGroup con tantas propiedades como quieras enlazar
- genera un formulario en HTML con varios campos y enlaza el formulario con la variable del codebehing y cada control con una propiedad del mismo

## Proyecto 8: Angular material
- ng add en lugar de npm install porque es parte de material
- página de Material para ver componentes
- Importar el módulo de cada componente
- Usar los ejemplos de la página de documentación para incluirlos en nuestro código

## Proyecto 9: Firebase
- https://console.firebase.google.com/?pli=1
- herramienta cloud para despliegue de aplicaciones, BD, login...
- npm install o incluir dependencias en packages.json
  - "@angular/fire": "^6.1.4",     "firebase": "^8.3.2"
- Firebase web: Crea y registra proyecto
- copia fireBaseConfig al fichero enviroment.ts
- configura app.module.ts importando enviroments y firebase en import, imports y providers
- uso en servicio
  - servicio angularFirestore

- Despliegue
- 