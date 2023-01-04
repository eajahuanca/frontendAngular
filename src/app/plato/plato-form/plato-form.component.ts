import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmitForm } from 'src/app/modelo/emit.model';
import { Plato } from 'src/app/modelo/plato.model';
import { ValidatorService } from 'src/app/modelo/validator';
import { ServiceService } from 'src/app/service.service';

@Component({
	selector: 'app-plato-form',
	templateUrl: './plato-form.component.html',
	styleUrls: ['./plato-form.component.css']
})
export class PlatoFormComponent implements OnInit {

	@Input() tipo: number;
	@Input() pkdata: number;
	@Input() objectodata: Plato;
	@Output() mostrarformulario = new EventEmitter<EmitForm>();

	private formSubscription: Subscription | undefined;
	public formFormulario: FormGroup;
	public pk: number = 0;
	public labelAlert: string = 'registrar';
	matcher = new ValidatorService();

	constructor(private formBuilder: FormBuilder,
		private formService: ServiceService,) {
		this.formFormulario = new FormGroup({});
		this.tipo = 1;
		this.pkdata = 0;
		this.objectodata = {} as Plato;
	}

	ngOnInit(): void {
		this.getFormBuilderFormulario();
		if (this.pkdata > 0) {
			this.labelAlert = 'actualizar';
		}
	}

	public getFormBuilderFormulario() {
		let valor = null;
		if (this.pkdata > 0) {
			valor = this.objectodata.id;
		}
		this.formFormulario = this.formBuilder.group({
			color: ['', [Validators.required]],
			precio: [9, [Validators.required, Validators.pattern(/^[0-9]{1,2}$/)]],
			campos: ['', [Validators.required]],
			nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
			fecha_inicio: ['', [Validators.required]],
			oferta: ['', [Validators.required]]
		});
	}

	public accionClick() {
		if (this.formFormulario.valid) {
			let data = this.formFormulario.value

			if (this.pkdata == 0) {
				this.formSubscription = this.formService.postPlato(data as Plato).subscribe(
					response => {
						this.cerrarFormulario(1);
					}
				);
			} else {
				this.formSubscription = this.formService.putPlato(data as Plato, this.pkdata).subscribe(
					response => {
						this.cerrarFormulario(1);
					}
				);
			}

		}
	}

	public cerrarFormulario(tipo: number) {
		this.formFormulario.reset();
		let actualizar = true;
		if (tipo == 0) {
			actualizar = false;
		}
		let form = {
			actualizar: actualizar,
			cerrar: true
		}
		this.mostrarformulario.emit(form);
	}
	ngOnDestroy(): void {
		this.formSubscription?.unsubscribe();
	}

}
