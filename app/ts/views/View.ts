import { logarTempoDeExecucao } from "../helpers/decorators/index";

export abstract class View<T> {

    protected _elemento: JQuery;
    private _escapar: boolean;

    constructor(seletor: string, escapar: boolean = false) {
        this._escapar = escapar;
        this._elemento = $(seletor);
    }

    // @logarTempoDeExecucao(true)
    update(model: T) {
        let template = this.template(model);

        if (this._escapar)
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');

        this._elemento.html(this.template(model));
    }

    abstract template(model: T): string;

}