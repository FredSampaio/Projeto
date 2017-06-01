let indexedDB = window.indexedDB || 
				window.mozIndexedDB || 
				window.webkitIndexedDB || 
				window.msIndexedDB || 
				window.shimIndexedDB;
				
let logado = localStorage.getItem("atualLogado");

//preenche input do email com o email do usuario logado
document.getElementById("email").setAttribute('value',logado);

//usuario logado fica escrito na tela
let spanLogado = document.createElement("span");
let texto = document.createTextNode("Usuário: " +logado);
spanLogado.appendChild(texto);
spanLogado.setAttribute("id", "usuario_logado");

let element = document.getElementById("logo");
element.appendChild(spanLogado);

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
			
			let atualiza = store.openCursor();					//abre cursor para atualizar
			atualiza.onsuccess = (event) => 
			{
				let cursor = event.target.result;
				if(cursor) {
					if(cursor.value.email == logado) 
					{
						let dados = cursor.value;				//recupera dados no banco
						//console.log(dados);
						
						let nome=document.getElementById("nome").value;
						let email=document.getElementById("email").value;
						let telefone=document.getElementById("telefone").value;
						let endereco=document.getElementById("endereco").value;
						let cidade=document.getElementById("cidade").value;
						let estado=document.getElementById("estado").value;
						
						//se alguma dos inputs estiverem vazios, nao alterar nada no banco
						if(nome!=="")
							dados.nome = nome;
						//if(email!=="") 
						//{
							//dados.email = email;
							//localStorage.setItem("atualLogado", email); //troca email logado tb
						//}
						if(telefone!=="")
							dados.telefone = telefone;
						if(endereco!=="")
							dados.endereco = endereco;
						if(cidade!=="")
							dados.cidade = cidade;
						if(estado!=="")
							dados.estado = estado;
						if(nome=="" && (email==""  || email == logado) && telefone=="" && endereco=="" && cidade=="" && estado=="") 
						{
							document.getElementById("email").value = localStorage.getItem("atualLogado");
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