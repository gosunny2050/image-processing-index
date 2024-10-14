const repoList = document.getElementById("repo-list");

async function fetchRepos() {
    const response = await fetch('https://api.github.com/search/repositories?q=image+processing&sort=stars&order=desc');
    const data = await response.json();
    
    data.items.forEach(repo => {
        const repoItem = document.createElement('div');
        repoItem.innerHTML = `
            <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
            <p>${repo.description}</p>
            <p>🌟 Stars: ${repo.stargazers_count}</p>
        `;
        repoList.appendChild(repoItem);
    });
}

fetchRepos();

