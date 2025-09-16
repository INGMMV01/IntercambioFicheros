### Código de referencia (no se compila)
- El repo RPOSAA0401 está clonado en `refs/RPOSAA0401/`, son los fuentes del paquete @abanca/cgdn-services.
- El repo morphe-common está clonado en `refs/morphe-common/` son los fuentes del paquete @morphe/common.
- El repo morphe2-eslint está clonado en `refs/morphe2-eslint/` son los fuentes del paquete @morphe/eslint-config.
- Sirve solo como contexto para que el agente entienda los tipos e interfaces.
- **No** se ejecutan `npm ci` ni `ng build` ahí.
- No instales dependencias que provengan de https://packages.abanca.com.

## Lint
- Ejecuta lint sólo si el usuario lo pide.
- Antes de subir los cambios ejecuta usando las reglas corporativas que están en refs/morphe2-eslint/src/eslintrc.js
- Arregla sólo los errores, no los warnings.
- No uses el tipo unknown, es preferible any.
- Siempre que sea posible mantén un tipado fuerte con tipos explícitos.

```bash
npx --yes eslint -c refs/morphe2-eslint/src/eslintrc.js "{src,projects}/**/*.{ts,html}" --fix
