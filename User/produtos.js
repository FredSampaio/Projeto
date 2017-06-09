
exibir_produtos();

function popular_produtos() {		
	let dados_produtos=`[
		{"url":"Produtos/racao-golden.jpg", "nome":"Ração Golden 1 Kg", "quantidade":5, "vendidos":0, "descricao":"Produto de teste. Excelente ração para cachorro, 1 Kg.", "preco":19.90},
		{"url":"Produtos/racao-pedigree.jpg", "nome":"Ração Pedigree 1 Kg", "quantidade":4, "vendidos":1, "descricao":"Produto de teste. Excelente ração para cachorro, 1 Kg.", "preco":21.30},
		{"url":"Produtos/racao-champ.jpg", "nome":"Ração Champ 1 Kg", "quantidade":15, "vendidos":0, "descricao":"Produto de teste. Excelente ração para cachorro, 1 Kg.", "preco":15.50},
		{"url":"Produtos/racao-magnus.jpg", "nome":"Ração Magnus 1 Kg", "quantidade":12, "vendidos":0, "descricao":"Produto de teste. Excelente ração para cachorro, 1 Kg.", "preco":17.90},
		{"url":"Produtos/racao-quatree.jpg", "nome":"Ração Quatree 1 Kg", "quantidade":2, "vendidos":0, "descricao":"Produto de teste. Excelente ração para cachorro, 1 Kg.", "preco":21.90},
		{"url":"Produtos/racao-whiskas.jpg", "nome":"Ração Whiskas 1 Kg", "quantidade":2, "vendidos":3, "descricao":"Produto de teste. Excelente ração para gato, 1 Kg.", "preco":18.90},
		{"url":"Produtos/racao-granplus.jpg", "nome":"Ração Gran Plus 1 Kg", "quantidade":13, "vendidos":0, "descricao":"Produto de teste. Excelente ração para gato, 1 Kg.", "preco":20.90},
		{"url":"Produtos/osso.jpg", "nome":"Ossinho de couro", "quantidade":109, "vendidos":8, "descricao":"Produto de teste. Ossingo de couro para cachorro.", "preco":1.10},
		{"url":"Produtos/coleira-vermelha.jpg", "nome":"Coleira vermelha", "quantidade":9, "vendidos":0, "descricao":"Produto de teste. Coleira vermelha para cachorro.", "preco":7.50},
		{"url":"Produtos/coleira-preta.jpg", "nome":"Coleira preta", "quantidade":2, "vendidos":0, "descricao":"Produto de teste. Coleira para cachorro.", "preco":8.20},
		{"url":"Produtos/bifinho-carne.jpg", "nome":"Bifinho de carne", "quantidade":8, "vendidos":0, "descricao":"Produto de teste. Bifinho para cachorro sabor carne (o bife, não o cachorro).", "preco":4.40},
		{"url":"Produtos/bifinho-frango.jpg", "nome":"Bifinho de frango", "quantidade":7, "vendidos":0, "descricao":"Produto de teste. Bifinho para cachorro sabor frango (o bife, não o cachorro).", "preco":4.20}
	]`;


	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}

	let db;
	let request=indexedDB.open("produtosDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		let db=request.result;
		let store=db.createObjectStore("produtos", {keyPath: "id", autoIncrement: true});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("produtos", "readwrite");
		let store=tx.objectStore("produtos");
		
		let produtos=JSON.parse(dados_produtos);

		for(let i=0;i<produtos.length;i++){
			let obj=produtos[i];
			let teste=store.put({url: obj.url, nome: obj.nome, quantidade: obj.quantidade, vendidos: obj.vendidos, descricao: obj.descricao, preco: obj.preco});
		}

		tx.oncomplete=()=> {
			db.close();
		};
	};
	exibir_produtos();
}

function exibir_produtos() {	

	document.getElementById("produtos").innerHTML='';

	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}

	let db;
	let request=indexedDB.open("produtosDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		let db=request.result;
		let store=db.createObjectStore("produtos", {keyPath: "id", autoIncrement: true});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("produtos", "readwrite");
		let store=tx.objectStore("produtos");
		
		store.openCursor().onsuccess=(event)=> {
			let cursor=event.target.result;
			
			if(cursor) {	
				document.getElementById("produtos").innerHTML+='\
							<div class="produto">\
								<img onclick="alert(\''+cursor.value.descricao+'\')" src="'+cursor.value.url+'" alt="'+cursor.value.nome+'" style="width:160px;height:160px">\
								<p>'+cursor.value.nome+'</p>\
								<p>R$'+cursor.value.preco.toFixed(2).toString().replace('.', ',')+' cada</p>\
								<p>Quantidade disponível: '+cursor.value.quantidade+'</p>\
								<button type="button" onclick="adicionar('+cursor.value.id+',\''
								+cursor.value.url+'\',\''+cursor.value.nome+'\','+cursor.value.quantidade+','+cursor.value.preco+')">Adicionar ao carrinho</button>\
							</div>';
				cursor.continue();
			}
		};
	};
}