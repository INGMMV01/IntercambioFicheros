import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationManifestModule, BasicHttpClientModule } from '@morphe/api';
import {
    ApiInformationRegistryConfigSimple,
    ApiRegistryModule,
    ApplicationModule,
    DateConfigService,
    DateFnsHelper,
    DateModule,
    ExecutionContextModule,
    InformacionPuestoModule
} from '@morphe/common';
import { IntranetModule } from '@morphe/seguridad';


export const apiRegistryConfig: Array<ApiInformationRegistryConfigSimple> = [
    {
        cgdnCode: 'CGDNCODEAPI',
        allApikey: 'XXXXX-XXXX-XXXX-XXXX-XXXXXX',
        baseUriCustomizations: [],
    },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ApplicationModule.forRoot('RPOSAA0415'),
        ExecutionContextModule.forRoot(),
        InformacionPuestoModule.forRoot(),
        ApiRegistryModule.forRoot(apiRegistryConfig),
        IntranetModule.forRoot(),
        ApplicationManifestModule.forRoot(),
        BasicHttpClientModule.forRoot(),
        DateModule.forRoot(),
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: DateFnsHelper.configureDateFns,
            deps: [DateConfigService],
            multi: true
        }
    ],
    declarations: [],
})
export class CoreModule { }
