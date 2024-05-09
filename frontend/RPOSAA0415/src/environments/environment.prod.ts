import { registerLocaleData } from '@angular/common';
import localeConfig from '@angular/common/locales/es';
import localeExtraConfig from '@angular/common/locales/extra/es';
import { MorpheAngularEnviroment } from '@morphe/common';
const locale = 'es-ES';
registerLocaleData(localeConfig, locale, localeExtraConfig);
export const environment: MorpheAngularEnviroment = {
    production: true,
    locale,
};
