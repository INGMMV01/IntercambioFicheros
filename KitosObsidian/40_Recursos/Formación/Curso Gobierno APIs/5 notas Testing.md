
##### Referencia
[[5. Herramientas de testing.pdf]]

- Concepto de colección
	- en configuración podemos ver APIs
- podemos cargar un API desde su fichero de definición que luego podemos cargar en una colección. Esto hace:
	- muestra en forma de árbol todos los recursos, esquemas, operaciones, resultados...
	- nos crea todos los request posibles del API
- Test
	- test: se escriben pruebas unitarias con arrange, act y asset en la zona Test del request
	- se basa en el objeto "pm" al que se le puede preguntar por el request, response, json
	- ejemplo
	````
	pm.test("nombreTest",function(){
	  let nombre = pm.response.json().tags[0].name
	  //pm.expect(nombre == "pepe","coincide")  
	  pm.expect(nombre).to.equal("whiskers")
	})
	```