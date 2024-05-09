import { registerLocaleData } from '@angular/common';
import localeConfig from '@angular/common/locales/es';
import localeExtraConfig from '@angular/common/locales/extra/es';
import { MorpheAngularEnviroment } from '@morphe/common';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const locale = 'es-ES';
registerLocaleData(localeConfig, locale, localeExtraConfig);
export const environment: MorpheAngularEnviroment = {
    production: false,
    locale,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
