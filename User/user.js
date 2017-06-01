let indexedDB = window.indexedDB || 
				window.mozIndexedDB || 
				window.webkitIndexedDB || 
				window.msIndexedDB || 
				window.shimIndexedDB;

function alterarCadastro()
{
	//checa de o browser consegue trabalhar com indexeDB
	if(!indexedDB)
	{
		console.log("Seu navegador não suporta indexedDB.");
		return;		
	}

	//abre o pseudo banco (ou cria, caso não exista)
	let request=indexedDB.open("usersDB",2);

	//se IndexedDB der erro
	request.onerror = (event) => {alert("Erro ao utilizar IndexedDB.");};

	//cria o schema do banco
	request.onupgradeneeded = (event) => 
	{ 
		let db=request.result;
		let store=db.createObjectStore("users", {keyPath: "email"});
	};
	
	//realiza os operacoes no pseudobanco 
	request.onsuccess = (event) => 
	{
		let db=request.result;
		let tx=db.transaction("users", "readwrite");
		let store=tx.objectStore("users");	
		
		//se browser suporta storage
		if (typeof(Storage) !== "undefined") 
		{
			let logado = localStorage.getItem("atualLogado");	//recupera pessoa logada
			console.log("Logado(storage):"+logado);
			
			let atualiza = store.openCursor();
			atualiza.onsuccess = (event) => 
			{
				let cursor = event.target.result;
				if(cursor) {
					if(cursor.value.email == logado) 
					{
						let dados = cursor.value;				//recupera dados no banco
						
						let nome=document.getElementById("nome").value;
						let email=document.getElementById("email").value;
						let telefone=document.getElementById("telefone").value;
						let endereco=document.getElementById("endereco").value;
						let cidade=document.getElementById("cidade").value;
						let estado=document.getElementById("estado").value;
						
						//se alguma dos inputs estiverem vazios, nao alterar nada no banco
						if(nome!=="")
							dados.nome = nome;
						if(email!=="") 
						{
							console.log("entrou fuck");
							dados.email = email;
							localStorage.setItem("atualLogado", email); //troca email logado tb
						}
						if(telefone!=="")
							dados.telefone = telefone;
						if(endereco!=="")
							dados.endereco = endereco;
						if(cidade!=="")
							dados.cidade = cidade;
						if(estado!=="")
							dados.estado = estado;
						if(nome=="" && email=="" && telefone=="" && endereco=="" && cidade=="" && estado=="") 
						{
							alert("Pelo menos um dos campos devem ser preechidos");
							return;
						}						
							
						//atualiza banco
						console.log("Novo nome: "+dados.nome);
						let atualizaBD = cursor.update(dados);
						atualizaBD.onsuccess = () => {alert("Os dados foram atualizados com sucesso");};
						
						atualizaBD.onerror = () => {alert("Não foi possível atualizar o Banco de Dados");};						
					}
					//nao encontrou ninguem com o email logado, no banco
					else {alert("Não foi possível encontrar o usuário do email "+logado);}
				}
				//nao conseguiu reabrir o banco para o update
				else {alert("Não foi possível reabrir o banco;");}	
			};			
		}
		else {alert("Seu navegador não suporte Local Storage");}
		
		//encerra banco
		tx.oncomplete = () => {db.close();}	
	};
}