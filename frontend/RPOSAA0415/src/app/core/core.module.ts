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
    Environment,
    ExecutionContextModule,
    InformacionPuestoModule,
    Instance,
    KeyValueConfig,
    NetworkZone
} from '@morphe/common';
import { IntranetModule } from '@morphe/seguridad';


export const apiRegistryConfig: Array<ApiInformationRegistryConfigSimple> = [
    {
        cgdnCode: 'RPOS415',
        allApikey: 'E7C9B19C-C12B-4640-9AEA-8054178433A7',
        baseUriCustomizations: [],
        // baseUriCustomizations: [
        //     {
        //         apikey: 'E7C9B19C-C12B-4640-9AEA-8054178433A7',
        //         rootPath: 'http://localhost/RPOS415/',
        //         contextConfig: {
        //             environment: Environment.Local,
        //             instance: Instance.España,
        //             networkZone: NetworkZone.Intranet,
        //             profile: null
        //         }
        //     }
        // ],
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
