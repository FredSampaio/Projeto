function adicionar_produto() {
	if(!window.indexedDB) {
		//testa se a o indexedDB está dispnível
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}
	
	//o upload de fotos não funciona pela limitação do javascript de manipular arquivos
	//ao invés de usar a foto do usuário e uma foto padrão de erro é usada
	let url="Produtos/error.jpg";
	let nome=document.getElementById("nome_produto").value;
	let descricao=document.getElementById("descricao_produto").value;
	//o + é utilizado para converter para number
	let preco=+document.getElementById("preco_produto").value;
	let quantidade=+document.getElementById("quantidade_produto").value;
	
	if(nome=="" || descricao=="" || preco=="" || quantidade=="") {
		alert("Insira todos os dados do animal");
		return;
	}

	let db;
	//tenta abrir o banco de produtos
	let request=indexedDB.open("produtosDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		//se o banco não está disponível, é criado
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