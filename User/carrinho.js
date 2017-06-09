//parte do IndexedDB foi baseada no tutorial da MDN,
//disponível em https://developer.mozilla.org/pt-BR/docs/IndexedDB/Usando_IndexedDB
//parte do IndexedDB foi baseada nesse exemplo:
//https://gist.github.com/BigstickCarpet/a0d6389a5d0e3a24814b
//parte do IndexedDB foi baseada nos slides de aula
//a parte de cursores foi baseada em:
//https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor

povoarCarrinho();

function finalizar() {
	document.getElementById("finalizar").innerHTML='\
			<div class="formulario">\
				<div class="formulario">\
					<p>Número do cartão de crédito:</p>\
					<input type="number" id="numero_cartao">\
				</div>\
				<div class="formulario">\
					<p>Nome como está escrito no cartão:</p>\
					<input type="text" id="nome_cartao">\
				</div>\
				<div class="formulario">\
					<p>Data de validade:</p>\
					<input type="month" id="mes_cartao">\
				</div>\
				<div class="formulario">\
					<p>Código de segurança:</p>\
					<input type="number" id="cvv_cartao">\
				</div>\
				<div class="formulario">\
					<button onclick="pagar()">Pagar</button>\
				</div>\
			</div>';
	
}

function povoarCarrinho() {
	
	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}

	let db;
	let request=indexedDB.open("carrinhoDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		let db=request.result;
		let store=db.createObjectStore("produtos", {keyPath: "id"});
	};
			
	document.getElementById("carrinho").innerHTML='';
	
	let preco_total=0;

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("produtos", "readwrite");
		let store=tx.objectStore("produtos");
		
		store.openCursor().onsuccess=(event)=> {
			let cursor=event.target.result;
			
			if(cursor) {
				
				if(cursor.value.quantidade!=0) {
					document.getElementById("carrinho").innerHTML+='\
						<div class="produto-carrinho">\
							<div class="produto">\
								<img src="'+cursor.value.url+'" alt="'+cursor.value.nome+'" style="width:160px;height:160px">\
								<p>'+cursor.value.nome+'</p>\
							</div>\
							<div class="quantidade">\
								<p>Quantidade:</p>\
								<p>'+cursor.value.quantidade+'</p>\
								<button onclick="remover('+cursor.value.id+',\''
								+cursor.value.url+'\',\''+cursor.value.nome+'\','+cursor.value.quantidade_disponivel+','+cursor.value.preco+')">-</button>\
								<button onclick="adicionar('+cursor.value.id+',\''
								+cursor.value.url+'\',\''+cursor.value.nome+'\','+cursor.value.quantidade_disponivel+','+cursor.value.preco+')">+</button>\
							</div>\
							<div class="quantidade">\
								<p>Preço total:</p>\
								<p>'+(cursor.value.quantidade*cursor.value.preco).toFixed(2).toString().replace('.', ',')+'</p>\
							</div>\
						</div>\
						<br>';
					
					preco_total+=cursor.value.quantidade*cursor.value.preco;
				}
				
				cursor.continue();
			}
			else {
				document.getElementById("carrinho").innerHTML+='\
					<div id="total"><!--soma de todos os produtos do carrinho-->\
						<p>Total geral:</p>\
						<p id="total">R$'+preco_total.toFixed(2).toString().replace('.', ',')+'</p><br>\
						<button type="button" onclick="finalizar()">Finalizar</button>\
					</div>';
			}
		};
	};
}

function adicionar(id, url, nome, quantidade_disponivel, preco) {	
	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}

	let db;
	let request=indexedDB.open("carrinhoDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		let db=request.result;
		let store=db.createObjectStore("produtos", {keyPath: "id"});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("produtos", "readwrite");
		let store=tx.objectStore("produtos");
		
		let getProduto=store.get(id);
		let quantidade;
		
		getProduto.onsuccess=()=> {
			try {
				quantidade=getProduto.result.quantidade;
			}
			catch(err) {
				quantidade=0;
			}
			if(quantidade+1<=quantidade_disponivel) {
				store.put({id: id, quantidade: (quantidade+1), quantidade_disponivel: quantidade_disponivel, url: url, nome: nome, preco: preco});
				povoarCarrinho();
			}
			else {
				alert("A quantidade desejada não está disponível");
			}
		}

		tx.oncomplete=()=> {
			db.close();
		};
	};
}

function remover(id, url, nome, quantidade_disponivel, preco) {	
	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}

	let db;
	let request=indexedDB.open("carrinhoDB", 2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		let db=request.result;
		let store=db.createObjectStore("produtos", {keyPath: "id"});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("produtos", "readwrite");
		let store=tx.objectStore("produtos");
		
		let getProduto=store.get(id);
		let quantidade;
		
		getProduto.onsuccess=()=> {
			try {
				quantidade=getProduto.result.quantidade;
			}
			catch(err) {
				quantidade=0;
			}
			if(quantidade>0) {
				store.put({id: id, quantidade: (quantidade-1), quantidade_disponivel: quantidade_disponivel, url: url, nome: nome, preco: preco});
				povoarCarrinho();
			}
		}

		tx.oncomplete=()=> {
			db.close();
		};
	};
}

	
