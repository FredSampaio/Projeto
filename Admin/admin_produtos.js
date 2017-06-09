lista_apagar();

function adicionar_produto() {
	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}
	
	let url="Produtos/error.jpg";
	let nome=document.getElementById("nome_produto").value;
	let descricao=document.getElementById("descricao_produto").value;
	let preco=+document.getElementById("preco_produto").value;
	let quantidade=+document.getElementById("quantidade_produto").value;
	
	if(nome=="" || descricao=="" || preco=="" || quantidade=="") {
		alert("Insira todos os dados do animal");
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
		

		let teste=store.put({url: url, nome: nome, quantidade: quantidade, vendidos: 0, descricao: descricao, preco: preco});		

		tx.oncomplete=()=> {
			db.close();
		};
	};
}

function lista_apagar() {
	document.getElementById("lista_apagar").innerHTML='\
				<div class="produto-carrinho">\
					<div class="produto">\
						<p>Não há produtos para listar</p>\
					</div>\
				</div>';

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
		
		let flag=0;
		
		store.openCursor().onsuccess=(event)=> {
			let cursor=event.target.result;
			
			if(cursor) {
				if(flag==0) {					
					document.getElementById("lista_apagar").innerHTML='';
					flag=1;
				}
				
				document.getElementById("lista_apagar").innerHTML+='\
								<div class="produto" onclick="apagar_produto('+cursor.value.id+')">\
									<img src="'+cursor.value.url+'"\
									alt="'+cursor.value.nome+'" style="width:160px;height:160px">\
									<p>'+cursor.value.nome+'</p>\
								</div>\
								<div class="quantidade">\
									<p>ID: '+cursor.value.id+'</p>\
								</div>\
							<br>';
				cursor.continue();
			}
		};
	};
}
	

function apagar_produto(id) {
	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}
	
	if(arguments.length==0) {
		
		let id=+document.getElementById("apagar_produto").value;
		
		if(id=="") {
			alert("Insira o ID do produto");
			return;
		}
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
		

		let apagar=store.delete(id);

		apagar.onsuccess = (event) =>{
			lista_apagar();
		};
		tx.oncomplete=()=> {
			db.close();
		};
	};
}

function relatorio_produtos() {
	document.getElementById("consultar_prod").innerHTML='\
				<div class="produto-carrinho">\
					<div class="produto">\
						<p>Não há produtos para listar</p>\
					</div>\
				</div>';

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
		
		let flag=0;
		
		store.openCursor().onsuccess=(event)=> {
			let cursor=event.target.result;
			
			if(cursor) {
				if(flag==0) {					
					document.getElementById("consultar_prod").innerHTML='';
					flag=1;
				}
				
				document.getElementById("consultar_prod").innerHTML+='\
							<div class="produto-carrinho">\
								<div class="produto">\
									<img src="'+cursor.value.url+'" alt="'+cursor.value.nome+'" style="width:160px;height:160px">\
									<p>'+cursor.value.nome+'</p>\
								</div>\
								<div class="quantidade">\
									<p>Quantidade em estoque:</p>\
									<p>'+cursor.value.quantidade+'</p>\
								</div>\
								<div class="quantidade">\
									<p>Preço unitário:</p>\
									<p>'+cursor.value.preco.toFixed(2).toString().replace('.', ',')+'</p>\
								</div>\
								<div class="quantidade">\
									<p>ID:</p>\
									<p>'+cursor.value.id+'</p>\
								</div>\
								<div class="quantidade">\
									<p>Vendidos:</p>\
									<p>'+cursor.value.vendidos+'</p>\
								</div>\
							</div>\
							<br>';
				cursor.continue();
			}
		};
	};
}