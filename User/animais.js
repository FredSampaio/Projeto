let dados_animais=`[
    {"url":"Animais/fifi.jpg", "nome":"Fifi", "id":1, "raca":"Poodle", "idade":3},
	{"url":"Animais/rex.jpg", "nome":"Rex", "id":2, "raca":"Pit Bull", "idade":2},
	{"url":"Animais/pantera.jpg", "nome":"Pantera", "id":3, "raca":"Bengal", "idade":1},
	{"url":"Animais/lorde.jpg", "nome":"Lorde", "id":4, "raca":"Persa", "idade":6},
	{"url":"Animais/cenoura.jpg", "nome":"Cenoura", "id":5, "raca":"Coelho", "idade":3},
	{"url":"Animais/faisca.jpg", "nome":"Faísca", "id":6, "raca":"Calopsita", "idade":2},
    {"url":"Animais/haroldo.jpg", "nome":"Haroldo", "id":7, "raca":"Furão", "idade":8}
]`;

let animais=JSON.parse(dados_animais);

for(let i=0;i<animais.length;i++){
    let obj=animais[i];	
	document.getElementById("animais").innerHTML+='\
						<div class="animal">\
							<img src="'+obj.url+'" alt="'+obj.nome+'" style="width:160px;height:160px">\
						</div>\
						<div class="quantidade">\
							<p>Nome:</p>\
							<p>'+obj.nome+'</p>\
						</div>\
						<div class="quantidade">\
							<p>ID:</p>\
							<p>'+obj.id+'</p>\
						</div>\
						<div class="quantidade">\
							<p>Raça:</p>\
							<p>'+obj.raca+'</p>\
						</div>\
						<div class="quantidade">\
							<p>Idade:</p>\
							<p>'+obj.idade+' anos</p>\
						</div>\
						<br>';
}