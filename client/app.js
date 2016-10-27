//component
var tISM = {};

//model
tISM.Key = function(data) {
	this.Id = m.prop(data.Id);
	this.Name = m.prop(data.Name);
	this.CreationTime = m.prop(data.CreationTime);
}
tISM = { 

	keys:  function(token) {
		return m.request({
			method: "POST",
		       	url: "key/list",
			data: { "token": token },
			type: tISM.Key
		})
	},
};

//controller
tISM.controller = function() {
	this.token = m.prop("")
	this.keys = m.prop([])

	this.submit = function(d) {
		this.keys = tISM.keys(this.token)
	}.bind(this)

};

//view
tISM.view = function(ctrl) {
	return m("div"), [
		m("ol", ctrl.keys().map( function(key, index) {
			return m("li", key.Id, key.Name, key.CreationTime)
		})),
		m("input", {
			oninput: m.withAttr("value", ctrl.token),
			value: ctrl.token()
		}),
		m("button", { onclick: ctrl.submit }, "Submit")
	]

};


//initialize
m.mount(document.getElementById("app"), tISM);
