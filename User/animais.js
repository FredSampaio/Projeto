function popular_animais() {		
	let dados_animais=`[
		{"url":"Animais/fifi.jpg", "nome":"Fifi", "id":1, "raca":"Poodle", "idade":3},
		{"url":"Animais/rex.jpg", "nome":"Rex", "id":2, "raca":"Pit Bull", "idade":2},
		{"url":"Animais/pantera.jpg", "nome":"Pantera", "id":3, "raca":"Bengal", "idade":1},
		{"url":"Animais/lorde.jpg", "nome":"Lorde", "id":4, "raca":"Persa", "idade":6},
		{"url":"Animais/cenoura.jpg", "nome":"Cenoura", "id":5, "raca":"Coelho", "idade":3},
		{"url":"Animais/faisca.jpg", "nome":"Faísca", "id":6, "raca":"Calopsita", "idade":2},
		{"url":"Animais/haroldo.jpg", "nome":"Haroldo", "id":7, "raca":"Furão", "idade":8}
	]`;

	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}

	let db;
	let request=indexedDB.open("animaisDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		let db=request.result;
		let store=db.createObjectStore("animais", {keyPath: "id", autoIncrement: true});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("animais", "readwrite");
		let store=tx.objectStore("animais");
		
		let animais=JSON.parse(dados_animais);

		for(let i=0;i<animais.length;i++){
			let obj=animais[i];
			let teste=store.put({url: obj.url, nome: obj.nome, raca: obj.raca, idade: obj.idade});
		}

		tx.oncomplete=()=> {
			db.close();
		};
	};
	exibir_animais();
}

function exibir_animais() {	

	document.getElementById("animais").innerHTML='';

	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}

	let db;
	let request=indexedDB.open("animaisDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		let db=request.result;
		let store=db.createObjectStore("animais", {keyPath: "id"});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("animais", "readwrite");
		let store=tx.objectStore("animais");
		
		store.openCursor().onsuccess=(event)=> {
			let cursor=event.target.result;
			
			if(cursor) {
							
				document.getElementById("animais").innerHTML+='\
					<div class="animal">\
						<img src="'+cursor.value.url+'" alt="'+cursor.value.nome+'" style="width:160px;height:160px">\
					</div>\
					<div class="quantidade">\
						<p>Nome:</p>\
						<p>'+cursor.value.nome+'</p>\
					</div>\
					<div class="quantidade">\
						<p>ID:</p>\
						<p>'+cursor.value.id+'</p>\
					</div>\
					<div class="quantidade">\
						<p>Raça:</p>\
						<p>'+cursor.value.raca+'</p>\
					</div>\
					<div class="quantidade">\
						<p>Idade:</p>\
						<p>'+cursor.value.idade+' anos</p>\
					</div>\
					<br>';
				
				cursor.continue();
			}
		};
	};
}

function adicionar_animal() {	
	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}
	
	let url="Animais/error.jpg";
	let nome=document.getElementById("nome_animal").value;
	let raca=document.getElementById("raca_animal").value;
	let idade=document.getElementById("idade_animal").value;
	
	if(nome=="" || raca=="" || idade=="") {
		alert("Insira todos os dados do animal");
		return;
	}

	let db;
	let request=indexedDB.open("animaisDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		let db=request.result;
		let store=db.createObjectStore("animais", {keyPath: "id", autoIncrement: true});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("animais", "readwrite");
		let store=tx.objectStore("animais");
		
		let teste=store.put({url: url, nome: nome, raca: raca, idade: idade});
		

		tx.oncomplete=()=> {
			db.close();
		};
	};
	exibir_animais();
}

