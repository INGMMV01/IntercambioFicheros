
crea carpeta para el proyecto 
crear proyecto en gitlab y clonar a esa carpeta
abre VS Code modo admin


```
morphe-ia install
morphe-ia init
```

hemos tenido problemas para bajarnos las skills porque el script hace referencia a un branch (release 1.0.0) que no existe. Hemos intentando tirar de la rama main pero falla, hemos salido del paso clonando el repo de Angular a local e instalándolo desde ahí

```
git clone https://gitlab.abanca.io/morphe/ia/angular.git D:/Aplicaciones/morphe-angular
skills add "D:/Aplicaciones/morphe-angular/skills/morphe-angular-developer" --skill morphe-angular-developer --agent claude-code -y
```



