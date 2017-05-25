//parte do IndexedDB foi baseada no tutorial da MDN,
//disponível em https://developer.mozilla.org/pt-BR/docs/IndexedDB/Usando_IndexedDB
//parte do IndexedDB foi baseada nesse exemplo:
//https://gist.github.com/BigstickCarpet/a0d6389a5d0e3a24814b
//parte do IndexedDB foi baseada nos slides de aula

function cadastrar() {
	let nome=document.getElementById("nome").value;
	if(nome=="") {
		alert("Insira seu nome.");
		return;
	}
	let email=document.getElementById("email").value;
	if(email=="") {
		alert("Insira seu email.");
		return;
	}
	let senha=document.getElementById("senha").value;
	if(senha=="") {
		alert("Insira uma senha.");
		return;
	}
	let senha_confirme=document.getElementById("senha_confirme").value;
	if(senha_confirme!=senha) {
		alert("As senhas não conferem.");
		return;
	}
	let telefone=document.getElementById("telefone").value;
	if(telefone=="") {
		alert("Insira seu telefone.");
		return;
	}
	let endereco=document.getElementById("endereco").value;
	if(endereco=="") {
		alert("Insira seu endereço.");
		return;
	}
	let cidade=document.getElementById("cidade").value;
	if(cidade=="") {
		alert("Insira sua cidade.");
		return;
	}
	let estado=document.getElementById("estado").value;
	if(estado=="") {
		alert("Selecione um estado.");
		return;
	}

	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
		return;
	}

	let db;
	let request=indexedDB.open("usersDB",2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		let db=request.result;
		let store=db.createObjectStore("users", {keyPath: "email"});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("users", "readwrite");
		let store=tx.objectStore("users");

		store.put({nome: nome, email: email, senha: senha,
			telefone: telefone, endereco: endereco, cidade: cidade, estado: estado});

		tx.oncomplete=()=> {
			db.close();
		};
	};

	alert("Cadastro de "+nome+" realizado com sucesso.")
}

function login() {
	let email=document.getElementById("cadastrado_email").value;
	if(email=="") {
		alert("Insira seu email.");
		return;
	}
	let senha=document.getElementById("cadastrado_senha").value;
	if(senha=="") {
		alert("Insira uma senha.");
		return;
	}
	
	if(!window.indexedDB) {
		console.log("Seu navegador não suporta indexedDB.");
	}

	let db;
	let request=indexedDB.open("usersDB",2);

	request.onerror=(event)=> {
		alert("Erro ao utilizar IndexedDB.");
	};

	request.onupgradeneeded=(event)=> { 
		let db=request.result;
		let store=db.createObjectStore("users", {keyPath: "email"});
	};

	request.onsuccess=(event)=> {
		let db=request.result;
		let tx=db.transaction("users", "readwrite");
		let store=tx.objectStore("users");
		
		let senha_salva;		
		let getUser=store.get(email);
	
		getUser.onsuccess=()=> {
			try {
				senha_salva=getUser.result.senha;
			}
			catch(err) {
				alert("Email incorreto. Possui cadastro?");
				return;
			}
			if(senha_salva==senha) {
				alert("Login feito com sucesso.");
			}
			else {
				alert("Senha incorreta.");
			}
		};	

		tx.oncomplete=()=> {
			db.close();
		};
	};
}
	