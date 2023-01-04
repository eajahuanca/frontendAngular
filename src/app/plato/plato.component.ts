import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmitForm } from '../modelo/emit.model';
import { Plato } from '../modelo/plato.model';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {
  readonly allowedPageSizes = [10, 20, "all"];
	readonly displayModes = [
		{ text: "Display Mode 'full'", value: "full" },
		{ text: "Display Mode 'compact'", value: "compact" },
	];

	public dataRegistro: Plato[] = [];
	private formSubscription: Subscription | undefined;
	public showFormulario: boolean = false;
	public accionTipo: number = 1;  /** 1=>Guardar, 2=>Editar **/
	public pkData: number = 0;
	public dataSelectGrid: Plato = {} as Plato;

	constructor(private platoService: ServiceService) { }

	ngOnInit(): void {
		this.getPlatos();
	}

	public getPlatos() {
		this.formSubscription = this.platoService.getPlatos().subscribe(
			response => {
				this.dataRegistro = response;
			}
		);
	}

	public reestablecer() {
		this.showFormulario = false;
		this.accionTipo = 1;
		this.pkData = 0;
		this.dataSelectGrid = {} as Plato;
	}

	public accionclickAdicionar() {
		this.showFormulario = true;
		this.accionTipo = 1;
		this.pkData = 0;
		this.dataSelectGrid = {} as Plato;
	}

	public accionclickEditar() {
		if (this.dataSelectGrid.id > 0) {
			this.showFormulario = true;
			this.accionTipo = 2;
			this.pkData = this.dataSelectGrid.id;
		} else {
      alert("Debe seleccionar un registro para editar");
    }
	}

	public accionclickEliminar() {
		if (this.dataSelectGrid.id > 0) {
      		this.formSubscription = this.platoService.deletePlato(this.dataSelectGrid.id).subscribe(
        		response => {
          			alert("Eliminado");
          			this.dataRegistro = this.dataRegistro.filter((e) => e.id != this.dataSelectGrid.id);
        		}
      		);
		} else {
			alert("Debe seleccionar un registro para eliminar");
		}
	}

	public onRowClickGrid(e: any) {
		this.dataSelectGrid = e.data;
	}

	public showViewForm(tipo: EmitForm): void {
		this.showFormulario = !tipo.cerrar as boolean;
		if (tipo.actualizar == true) {
			this.getPlatos();
			this.dataSelectGrid = {} as Plato;
		}
	}

	ngOnDestroy(): void {
		this.formSubscription?.unsubscribe();
	}


}
