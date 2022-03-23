# Angular

Template de proyecto que incluye solo items angular

### CONFIGURACIÓN MÍNIMA
---
1. Renombrado de directorios: Renombrar el directorio dentro de frontend llamados ITEMCGDN por el nombre que corresponda

2. Sustituir ITEM_CGDN en .gitlab-ci.yml: sustituir en todos los archivos .gitlab-ci.yml ITEMCGDN por el valor correspondiente (encontraremos 1 por nivel de directorio).

3. Configuración mínima de variables frontend (ejemplo):

        ITEM_CGDN: "<item_cgdn_name>"       
        WORKSPACE_NAME: "$ITEM_CGDN"               
        LIBRARY_NAME: "<library_name>" 


LIBRARY_NAME: Corresponde al nombre de la carpeta que se genera en dist/ al hacer el build. Ej "production, release, <item_cgdn_name>, etc."

**Para más info** está disponible la documentación actualizada sobre los templates CI-CD del proyecto: [Wiki Templates CI-CD](https://gitlab.abanca.io/infraestructura/ci-cd-definitions/-/wikis/home)
