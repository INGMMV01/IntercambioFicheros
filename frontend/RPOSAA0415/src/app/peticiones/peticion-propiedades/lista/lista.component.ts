import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IJsonApiData } from '@morphe/common';
import { Observable } from 'rxjs';
import { IFiltros } from 'src/app/models/propiedad-peticion/Filtros';
import { IEstadosPosiblesDeUnaPeticionResponseAttributes } from 'src/app/models/RPOS415/EstadosPosiblesDeUnaPeticionResponseAttributes';
import { IPropiedadPeticionResponseAttributes } from 'src/app/models/RPOS415/PropiedadPeticionResponseAttributes';
import { EstadoBusquedaPropiedadesPeticionService } from 'src/app/services/propiedad-peticion/estado-busqueda-propiedades-peticion.service';
import { FiltroPropiedadesPeticionService } from 'src/app/services/propiedad-peticion/filtro-propiedades-peticion.service';
import { LayoutMedidasService } from 'src/app/services/propiedad-peticion/layout-medidas.service';
import { PropiedadPeticionService } from 'src/app/services/propiedad-peticion/propiedad-peticion.service';
import { PropiedadPeticionEstadoService } from 'src/app/services/propiedad-peticion/propiedad-peticion-estado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropiedadPeticionEditableService } from 'src/app/services/propiedad-peticion/propiedad-peticion-editable.service';
import { IPropiedadPeticionResponse } from 'src/app/models/RPOS415/PropiedadPeticionResponse';

@Component({
    selector: 'abanca-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, AfterViewInit {

    @ViewChild('tablaScroll') tablaScroll: ElementRef | undefined;
    @ViewChild('paginatorTable') paginatorTable: MatPaginator | undefined;

    dataSource: MatTableDataSource<IJsonApiData<IPropiedadPeticionResponseAttributes>> = new MatTableDataSource();
    columnasVisibles: Array<string> = [
        // 'clave',
        'nombre',
        'valor',
        'fechaDeModificacion',
        'acciones'
    ];
    pageIndex = 0;
    pageSize = 10;
    sortActive = '';
    sortDirection: SortDirection = 'asc';
    filtros: IFiltros;

    @ViewChild(MatSort)
    public set matSort(sort: MatSort) {
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
                case 'clave':
                    return (item.attributes.clave || '').toLowerCase();
                case 'nombre':
                    return (item.attributes.nombre || '').toLowerCase();
                case 'valor':
                    return (item.attributes.valor || '').toLowerCase();
                case 'fechaDeModificacion': {
                    const dateValue: Date | null = item.attributes[property];

                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    return dateValue ? new Date(dateValue).getTime() : Number.MIN_SAFE_INTEGER;
                }
                default:
                    return '';
            }
        };
        this.dataSource.sort = sort;
    }

    @ViewChild(MatPaginator)
    public set matPaginator(paginator: MatPaginator) {
        this.dataSource.paginator = paginator;
    }

    idPeticion = this.activatedRoute.snapshot.params['idPeticion'];
    estados: IJsonApiData<IEstadosPosiblesDeUnaPeticionResponseAttributes>[] = [];
    constructor(
        private activatedRoute: ActivatedRoute,
        private datePipe: DatePipe,
        private paginator: MatPaginatorIntl,
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        private snackBar: MatSnackBar,
        private propiedadPeticionService: PropiedadPeticionService,
        private propiedadesEstadoService: PropiedadPeticionEstadoService,
        private estadoBusquedaService: EstadoBusquedaPropiedadesPeticionService,
        private propiedadPeticionEditableService: PropiedadPeticionEditableService,
        private filtroService: FiltroPropiedadesPeticionService,
        private layoutMedidasService: LayoutMedidasService,
        private cdRef: ChangeDetectorRef
    ) {
        this.filtros = new Object() as IFiltros;
        this.registrarIconos(iconRegistry, sanitizer);
        this.paginator.itemsPerPageLabel = 'Elementos por página';
        this.paginator.firstPageLabel = 'Primera página';
        this.paginator.lastPageLabel = 'Última página';
        this.paginator.nextPageLabel = 'Página siguiente';
        this.paginator.previousPageLabel = 'Página anterior';
        this.paginator.getRangeLabel = (page: number, pageSize: number, length: number) => {
            if (length === 0 || pageSize === 0) {
                return `0 de ${length}`;
            }
            const startIndex = page * pageSize;
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

            return `${startIndex + 1} – ${endIndex} de ${length}`;
        };

        this.filtroService.getFiltros$().subscribe((filtros: IFiltros) => {
            this.filtros = filtros;
            this.dataSource.filter = JSON.stringify(filtros);

        });

        this.propiedadPeticionService.getData$().subscribe(data => {
            // recorre el data y añade a cada elemento un atributo con la descripción del estado
            data.forEach(propiedad => {
                this.propiedadesEstadoService.resuelvePropiedadEstado$(propiedad.attributes).subscribe(estado => {
                    propiedad.attributes.valor = estado;
                });
            });
            this.dataSource.data = data;
        });
    }

    ngAfterViewInit(): void {
        this.layoutMedidasService.getFiltroForm$().subscribe((filtroFormHeight: number) => {
            this.cdRef.detectChanges();
            if (this.tablaScroll) {
                // Con barra de navegación
                // this.tablaScroll.nativeElement.style.height = `calc(100vh - 4rem - ${filtroFormHeight}px - 3.7rem)`;
                // Sin barra de navegación
                this.tablaScroll.nativeElement.style.height = `calc(100vh - 3rem - ${filtroFormHeight}px - 3.7rem)`;
            }

        });
    }

    ngOnInit(): void {
        this.pageIndex = this.estadoBusquedaService.pageIndex;
        this.pageSize = this.estadoBusquedaService.pageSize;

        this.dataSource.filterPredicate = (data, filter: string): boolean => {
            const filtros = JSON.parse(filter);

            return this.coincideFiltro(data, filtros);
        };
    }

    public resolverEstado$(propiedad: IJsonApiData<IPropiedadPeticionResponseAttributes>): Observable<string> {
        return this.propiedadesEstadoService.resuelvePropiedadEstado$(propiedad.attributes);
    }

    public sortChange(event: Sort): void {
        this.estadoBusquedaService.sortActive = event.active;
        this.estadoBusquedaService.sortDirection = event.direction;
    }

    public onPaginateChange(event: PageEvent): void {
        this.estadoBusquedaService.pageIndex = event.pageIndex;
        this.estadoBusquedaService.pageSize = event.pageSize;
    }

    public get cargandoPropiedadesPeticion(): boolean {
        const cargando: boolean = this.propiedadPeticionService.cargando;

        return cargando;
    }

    public esEliminable(propiedad: IJsonApiData<IPropiedadPeticionResponseAttributes>): boolean {
        return this.propiedadPeticionEditableService.esPropiedadEditable(propiedad.attributes)
            && this.esClaveNumerica(propiedad.attributes.clave);
    }

    public eliminar(idPropiedad: string): void {
        const observable = this.propiedadPeticionService.getEntity$(this.idPeticion, idPropiedad);

        observable.subscribe((respuesta: IPropiedadPeticionResponseAttributes) => {
            setTimeout(() => {
                if (confirm(`¿Confirma que desea eliminar la propiedad de petición '${respuesta.nombre}'?`)) {
                    this.propiedadPeticionService.delete$(this.idPeticion, idPropiedad).subscribe(() => {
                        this.snackBar.open(`La propiedad de petición '${respuesta.nombre}' se ha eliminado correctamente.`,
                            undefined, { duration: 3000 });
                    });
                }
            }, 100);
        });
    }

    private esClaveNumerica(clave: string): boolean {
        return /^[0-9]+$/.test(clave);
    }

    private registrarIconos(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
        iconRegistry.addSvgIcon(
            'clock',
            sanitizer.bypassSecurityTrustResourceUrl('http://cdn.abanca.io/assets/icons/material/clock.svg')
        );
    }

    private comprobarCoincidencia(attribute1: string, attribute2?: string, filterValue?: string | null): boolean {
        if (filterValue !== undefined && filterValue !== null) {
            const combinedValue = (attribute1 ? attribute1 : '') + (attribute2 ? attribute2 : '');

            return combinedValue.toLowerCase().includes(filterValue.toString().toLowerCase());
        } else {
            return true;
        }
    }

    private coincideFiltro(data: any, filtros: any): boolean {
        // Copia el objeto de filtros para evitar alterar el original
        const filtrosCopia = { ...filtros };

        // Define los campos que queremos comprobar contra los filtros.
        const camposAComprobar: { [clave: string]: { atributoPrincipal: string; atributoSecundario?: string } } = {
            clave: { atributoPrincipal: data.attributes.clave },
            nombre: { atributoPrincipal: data.attributes.nombre },
            valor: { atributoPrincipal: data.attributes.valor },
            fechaDeModificacion: {
                atributoPrincipal: this.datePipe.transform(data.attributes.fechaDeModificacion, 'dd/MM/yyyy') ?? ''
            }
        };

        // Comprueba cada filtro contra el campo de datos correspondiente.
        return Object.keys(filtrosCopia).every(claveFiltro =>
            this.comprobarCoincidencia(
                camposAComprobar[claveFiltro].atributoPrincipal,
                camposAComprobar[claveFiltro].atributoSecundario,
                filtrosCopia[claveFiltro]
            )
        );
    }
}
