let produtos=JSON.parse(dados_produtos);

for(let i=0;i<produtos.length;i++){
    let obj=produtos[i];	
	document.getElementById("produtos").innerHTML+='\
							<div class="produto">\
								<img src="'+obj.url+'" alt="'+obj.nome+'" style="width:160px;height:160px">\
								<p>'+obj.nome+'</p>\
								<p>R$'+obj.preco.toFixed(2).toString().replace('.', ',')+' cada</p>\
								<button type="button" onclick="adicionar('+i+')">Adicionar ao carrinho</button>\
							</div>';
}
