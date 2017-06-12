function adicionar_produto() {
	if(!window.indexedDB) {
		//testa se a o indexedDB est� dispn�vel
		console.log("Seu navegador n�o suporta indexedDB.");
		return;
	}
	
	//o upload de fotos n�o funciona pela limita��o do javascript de manipular arquivos
	//ao inv�s de usar a foto do usu�rio e uma foto padr�o de erro � usada
	let url="Produtos/error.jpg";
	let nome=document.getElementById("nome_produto").value;
	let descricao=document.getElementById("descricao_produto").value;
	//o + � utilizado para converter para number
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
		//se o banco n�o est� dispon�vel, � criado
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