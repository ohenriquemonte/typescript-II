var Views;
(function (Views) {
    class View {
        constructor(seletor) {
            this._elemento = $(seletor);
        }
        update(model) {
            this._elemento.html(this.template(model));
        }
    }
    Views.View = View;
})(Views || (Views = {}));
