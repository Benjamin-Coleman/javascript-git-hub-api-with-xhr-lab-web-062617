function displayRepositories(event, data){
	let username = document.getElementById('username').value
	var repos = JSON.parse(this.responseText)
	console.log(repos)
    const repoList = '<ul>' + repos.map(r => {
   return (`
          <li>
            <h2><a href="${r.html_url}">${r.name}</a></h2>
            <p><a href="#" data-username="${username}" data-repository="${r.name}" onclick="getCommits(this)">Get Commits</a></p>
            <p><a href="#" data-username="${username}" data-repository="${r.name}" onclick="getBranches(this)">Get Branches</a></p>
          </li>`
          )
  }).join('') + "</ul>"
    document.getElementById("repositories").innerHTML = repoList
}

function getRepositories(){
	// e.preventDefault()
	// let username = e.target["0"].value
	let username = document.getElementById('username').value
	const req = new XMLHttpRequest()
	req.addEventListener("load", displayRepositories);
	req.open("GET", `https://api.github.com/users/${username}/repos`)
	req.setRequestHeader('Authorization','Basic ' + 'e2b16e764e33889e5858273afb8e7fb9ef2f91c5');
	req.send()
}

const getUserForm = document.getElementById('find-user')

getUserForm.addEventListener('submit', getRepositories)

function displayCommits() {
	const commits = JSON.parse(this.responseText)
	const filtered = commits.filter(commit => { if (commit.author != null) {
		return commit
	}})
	console.log(filtered)
	const commitsList = `<ul>${filtered.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' ' + commit.commit.message + '</li>').join('')}</ul>`
	document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
	// debugger
	const name = el.dataset.repository
	const username = el.dataset.username
	const req = new XMLHttpRequest()
	req.addEventListener("load", displayCommits)
	req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
	req.setRequestHeader('Authorization','Basic ' + 'e2b16e764e33889e5858273afb8e7fb9ef2f91c5');
	req.send()
}

function displayBranches(){
	const branches = JSON.parse(this.responseText)
	console.log(branches)
	const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> - ' + '</li>').join('')}</ul>`
	document.getElementById("details").innerHTML = branchesList

}

function getBranches(el){
	const name = el.dataset.repository
	const username = el.dataset.username
	const req = new XMLHttpRequest()
	req.addEventListener("load", displayBranches)
	req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/branches')
	req.setRequestHeader('Authorization','Basic ' + 'e2b16e764e33889e5858273afb8e7fb9ef2f91c5');
	req.send()
}