lista_apagar();

function adicionar_produto() {
	//verifica se o indexedDB está disponível
	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}
	
	//como não é possivel adicionar arquivos pelo Javascript, a função de adicionar fotos não está realmente implementada
	//quando o usuário adiciona uma foto, na verdade é utilizada uma imagem de erro, já presente
	let url="Produtos/error.jpg";
	let nome=document.getElementById("nome_produto").value;
	let descricao=document.getElementById("descricao_produto").value;
	//o + serve para pegar como number
	let preco=+document.getElementById("preco_produto").value;
	let quantidade=+document.getElementById("quantidade_produto").value;
	
	if(nome=="" || descricao=="" || preco=="" || quantidade=="") {
		alert("Insira todos os dados do animal");
		return;
	}

	let db;
	//tenta abrir a base de produtos
	let request=indexedDB.open("produtosDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		//se a base não existir, é criada
		let db=request.result;
		let store=db.createObjectStore("produtos", {keyPath: "id", autoIncrement: true});
	};
	
	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("produtos", "readwrite");
		let store=tx.objectStore("produtos");
		
		//adiciona o produto
		let teste=store.put({url: url, nome: nome, quantidade: quantidade, vendidos: 0, descricao: descricao, preco: preco});		

		tx.oncomplete=()=> {
			db.close();
		};
	};
}

function lista_apagar() {
	//Esse texto permanecerá aparente apenas se não houver produtos
	document.getElementById("lista_apagar").innerHTML='\
				<div class="produto-carrinho">\
					<div class="produto">\
						<p>Não há produtos para listar</p>\
					</div>\
				</div>';

	if(!window.indexedDB) {
		//verifica se o indexedDB está disponível
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}

	let db;
	//tenta abrir a base de produtos
	let request=indexedDB.open("produtosDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		//se a base não existir, é criada
		let db=request.result;
		let store=db.createObjectStore("produtos", {keyPath: "id", autoIncrement: true});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("produtos", "readwrite");
		let store=tx.objectStore("produtos");
		
		//flag utilizada para saber se há pelo menos um produto
		let flag=0;
		
		store.openCursor().onsuccess=(event)=> {
			let cursor=event.target.result;
			
			if(cursor) {
				if(flag==0) {
					//quando o primeiro produto é encontrado, a lista é limpa
					document.getElementById("lista_apagar").innerHTML='';
					flag=1;
				}
				
				//insere todos os produtos
				//o usuário pode apagá-lo clicando em qualquer ligar do div
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
	//apaga o produto selecionado (ou entrado pelo user)
	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}
	
	if(arguments.length==0) {
		//só argumento quando é chamada ao clicar na lista
		//se não há argumentos, é utilizado o id entrado pelo usuário		
		let id=+document.getElementById("apagar_produto").value;
		
		if(id=="") {
			alert("Insira o ID do produto");
			return;
		}
	}

	let db;
	//tenta abrir a base de produtos
	let request=indexedDB.open("produtosDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		//se a base não existe, é criada
		let db=request.result;
		let store=db.createObjectStore("produtos", {keyPath: "id", autoIncrement: true});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("produtos", "readwrite");
		let store=tx.objectStore("produtos");
		
		//apaga o objeto
		let apagar=store.delete(id);

		apagar.onsuccess = (event) =>{
			//refaz a lista
			lista_apagar();
		};
		tx.oncomplete=()=> {
			db.close();
		};
	};
}

function relatorio_produtos() {
	//mensagem só é exibida se não há produtos
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
	//tenta abrir a base de produtos
	let request=indexedDB.open("produtosDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		//se a base não existe, é criada
		let db=request.result;
		let store=db.createObjectStore("produtos", {keyPath: "id", autoIncrement: true});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("produtos", "readwrite");
		let store=tx.objectStore("produtos");
		
		//flag indica se há pelo menos um produto para listar
		let flag=0;
		
		store.openCursor().onsuccess=(event)=> {
			let cursor=event.target.result;
			//abre um cursor com todos os produtos
			if(cursor) {
				if(flag==0) {	
					//no primeiro produto, apaga a mensagem de erro e seta a flag
					document.getElementById("consultar_prod").innerHTML='';
					flag=1;
				}
				
				//adiciona os produtos ao DOM
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