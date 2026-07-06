install

init

- claude.md
	- cosas a tener en cuenta para el proyecto
	- hay que decírselo todo. Si no hay uno, se carga el de morphe

```

	 	  - Principios generales: SOLID, KISS, YAGNI, DRY y arquitectura limpia (separación presentación / negocio / datos).
  - Patrones GoF: preferir patrones clásicos (Factory, Strategy, Adapter, Facade, Observer…) y justificar su uso.   
  - TDD: ciclo Red → Green → Refactor; tests centrados en comportamiento público.                                 
  - Clean Code: nombres descriptivos, funciones pequeñas, sin números mágicos, inmutabilidad, fail-fast, un concepto
   por fichero, composición sobre herencia.
  - Linting obligatorio: cero warnings, ejecutar lint/format antes de cerrar tarea.
  - Refactor: Boy Scout con alcance limitado, tests de caracterización antes de tocar legado, cambios incrementales,
   no mezclar formato y lógica.
  - Documentación: comentarios solo para el “por qué”, JSDoc/TypeDoc en interfaces públicas.
  - Seguridad: sanitizar inputs, nada de secretos hardcodeados, Conventional Commits.
  - Stack Angular específico: standalone components, signals (signal, computed, linkedSignal), nuevo flujo de
  control (@if/@for), input()/output() basados en signals, formularios reactivos tipados, inject(), guards
  funcionales, lazy loading, Karma/Jasmine + Playwright, librerías Morphe.
  
```



LSP
programa residente


MCP
	enlaces a otras aplicaciones como pruebas, raml...
	
	
plugin: uno o varios skills, uno o varios mcp
	plugin de desarrollo en Angular

morphe reviewer


cómo arrancar?
-VS Code extensión
-plan mode para dar tareas
-execution plan para trabajar

http://145-docs-documentar-uso-de-herramientas-de-ia.core.morphe.abanca.io/angular/aplicaciones-angularv20/ia/

secuencia
- crea proyecto en gitlab y clono a local
- ng new
- morphe ia init
- prompt angular 20 ya no hace falta
