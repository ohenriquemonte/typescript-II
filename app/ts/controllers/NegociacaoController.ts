import { NegociacaoService } from './../service/NegociacaoService';
import { NegociacoesView, MensagemView } from '../views/index';
import { logarTempoDeExecucao, domInject, throttle } from '../helpers/decorators/index';
import { Negociacao, Negociacoes } from '../models/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _service = new NegociacaoService();

    constructor() {
        // this._inputData = $('#data');
        // this._inputQuantidade = $('#quantidade');
        // this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    // @logarTempoDeExecucao()
    @throttle(1000)
    adiciona() {
        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update(`Somente negocoações em dias úteis, por favor!`);
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    private _ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle()
    importaDados() {
        this._service
            .obterNegociacoes(res => {
                if (res.ok) return res;
                throw new Error(res.statusText);
            })
            .then(negociacoes => {
                negociacoes.forEach(negociacao =>
                    this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes);
            });

    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}