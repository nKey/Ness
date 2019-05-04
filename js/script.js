var abaActived = 0;
var full = [];
var search = [];

showUsersTable();

searchInput.onkeyup = function(){
	search = [];
	if(abaActived == 0){
		full.map(
			function(item, index){
				if(item.id.toString().toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1 || item.name.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1 || item.email.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1){
					search.push(item);
				}
			});
		mountTableUser(search);
	}else{
		full.map(
			function(item, index){
				if(item.id.toString().toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1 || item.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1){
					search.push(item);
				}
			});
		mountTablePublication(search);
	}
}

abaUsers.onclick = function(){
	showUsersTable();
	abaActived = 0;
	searchInput.value = "";
}

abaPublications.onclick = function(){
	showPublicationTable();
	abaActived = 1;
	searchInput.value = "";
}

function showUsersTable(){
	httpRequest = new XMLHttpRequest();

	httpRequest.open('GET', 'https://jsonplaceholder.typicode.com/users');
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	httpRequest.onreadystatechange = function(){
		if(httpRequest.readyState === 4){
			var data = JSON.parse(httpRequest.responseText);
			titulo.innerHTML = "Lista de usuários";
			mountTableUser(data);
			full = data;
		}
	};

	httpRequest.send();
}

function showPublicationTable(){
	httpRequest = new XMLHttpRequest();

	httpRequest.open('GET', 'https://jsonplaceholder.typicode.com/posts');
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	httpRequest.onreadystatechange = function(){
		if(httpRequest.readyState === 4){
			var data = JSON.parse(httpRequest.responseText);
			titulo.innerHTML = "Lista de publicações";
			mountTablePublication(data);
			full = data;
		}
	};

	httpRequest.send();
}

function mountTableUser(data){

	var thead = document.getElementById("users-thead");
	while(thead.lastChild){
		thead.removeChild(thead.lastChild);
	}
	var tbody = document.getElementById("users");
	while(tbody.lastChild){
		tbody.removeChild(tbody.lastChild);
	}
	while(info.lastChild){
		info.removeChild(info.lastChild);
	}

	if(!data.length){
		var tr = document.createElement("tr");
		var tdNothig = document.createElement("td");
		tdNothig.innerHTML = "Nenhum resultado encontrado."
		tr.appendChild(tdNothig);
		tbody.appendChild(tr);
	}

	for(var i = 0; i<data.length; i++){
		if(!i){
			var trHead = document.createElement("tr");
			var thId = document.createElement("th");
			thId.innerHTML = "ID";
			thId.classList.add("cellWithoutSize");
			var thNome = document.createElement("th");
			thNome.innerHTML = "Nome";
			var thEmail = document.createElement("th");
			thEmail.innerHTML = "Email";
			trHead.appendChild(thId);
			trHead.appendChild(thNome);
			trHead.appendChild(thEmail);
			thead.appendChild(trHead);
		}

		var tr = document.createElement("tr");
		var tdId = document.createElement("td");
		tdId.innerHTML = data[i].id;
		tdId.classList.add("cellWithoutSize");
		var tdNome = document.createElement("td");
		tdNome.innerText = data[i].name;
		var tdEmail = document.createElement("td");
		tdEmail.innerText = data[i].email;
		tr.appendChild(tdId);
		tr.appendChild(tdNome);
		tr.appendChild(tdEmail);
		tr.dataset.id = data[i].id;
		tr.onclick = function(){
			httpRequestInfo = new XMLHttpRequest();

			httpRequestInfo.open('GET', ' https://jsonplaceholder.typicode.com/users/'+this.dataset.id);
			httpRequestInfo.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			httpRequestInfo.onreadystatechange = function(){
				if(httpRequestInfo.readyState === 4){
					var dataInfo = JSON.parse(httpRequestInfo.responseText);
					while(info.lastChild){
						info.removeChild(info.lastChild);
					}
					objectToHTML(dataInfo);

				}
			};

			httpRequestInfo.send();

		}
		tbody.appendChild(tr);
	}
}

function mountTablePublication(data){
	var thead = document.getElementById("users-thead");

	while(thead.lastChild){
		thead.removeChild(thead.lastChild);
	}
	var tbody = document.getElementById("users");
	while(tbody.lastChild){
		tbody.removeChild(tbody.lastChild);
	}
	while(info.lastChild){
		info.removeChild(info.lastChild);
	}

	if(!data.length){
		var tr = document.createElement("tr");
		var tdNothig = document.createElement("td");
		tdNothig.innerHTML = "Nenhum resultado encontrado."
		tr.appendChild(tdNothig);
		tbody.appendChild(tr);
	}

	for(var i = 0; i<data.length; i++){
		if(!i){
			var trHead = document.createElement("tr");
			var thId = document.createElement("th");
			thId.innerHTML = "ID";
			thId.classList.add("cellWithoutSize");
			var thTitulo = document.createElement("th");
			thTitulo.innerHTML = "Titulo";
			trHead.appendChild(thId);
			trHead.appendChild(thTitulo);
			thead.appendChild(trHead);
		}

		var tr = document.createElement("tr");
		var tdId = document.createElement("td");
		tdId.innerHTML = data[i].id;
		tdId.classList.add("cellWithoutSize");
		var tdTitulo = document.createElement("td");
		tdTitulo.innerText = data[i].title;

		tr.appendChild(tdId);
		tr.appendChild(tdTitulo);
		tr.dataset.id = data[i].id;
		tr.onclick = function(){
			httpRequestInfo = new XMLHttpRequest();

			httpRequestInfo.open('GET', 'https://jsonplaceholder.typicode.com/posts/'+this.dataset.id);
			httpRequestInfo.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			httpRequestInfo.onreadystatechange = function(){
				if(httpRequestInfo.readyState === 4){
					var dataInfo = JSON.parse(httpRequestInfo.responseText);
					while(info.lastChild){
						info.removeChild(info.lastChild);
					}
					objectToHTML(dataInfo);

				}
			};

			httpRequestInfo.send();

		}
		tbody.appendChild(tr);
	}
}

function objectToHTML(data, property){
	for(a in data){
		if(typeof(data[a]) == "object"){
			objectToHTML(data[a], a);
		}else{
			var p = document.createElement("p");
			var b = document.createElement("b");
			b.innerHTML = property?property+"."+a+": ":a+": ";
			var span = document.createElement("span");
			span.innerHTML = data[a];
			p.appendChild(b);
			p.appendChild(span);
			info.appendChild(p);
		}
	}
}
