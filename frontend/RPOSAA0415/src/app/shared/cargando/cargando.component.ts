import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'abanca-cargando',
    templateUrl: './cargando.component.html',
    styleUrls: ['./cargando.component.scss']
})
export class CargandoComponent implements OnInit {

    @Input() valorLoading!: boolean;
    @Input() msg!: string;
    constructor(iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,) {
        this.registrarIconos(iconRegistry, sanitizer);
    }

    ngOnInit(): void {
        this.msg = this.msg ? this.msg : 'Cargando...';
    }

    private registrarIconos(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
        iconRegistry.addSvgIcon(
            'clock',
            sanitizer.bypassSecurityTrustResourceUrl('http://cdn.abanca.io/assets/icons/material/clock.svg')
        );
    }

}
