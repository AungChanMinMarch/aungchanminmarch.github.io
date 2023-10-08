import { Octokit, App } from "octokit";

const log = console.log;
const token = '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';
const owner = "AungChanMinMarch";
const repo = "aungchanminmarch.github.io";

const octokit = new Octokit({
    auth: token
});

window.MathJax = {
    loader: {load: ['[tex]/newcommand']},
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']]
    },
    svg: {
        fontCache: 'global'
    }
};
function loadMathJax() {
  var script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3.2.0/es5/tex-mml-chtml.js";
  script.async = true;
  document.head.appendChild(script);
};

document.querySelector('.show_history_btn').onclick = function(){
    document.body.classList.add('show_history');
    fetchCommits();
};
function closeHistory(){
    document.body.classList.remove('show_history');
}
document.querySelector('.history_overlay').onclick = closeHistory;
document.querySelector('.hide_history_btn').onclick = closeHistory;

async function fetchCommits() {
    const commitHistory = document.querySelector('.history_body');
    commitHistory.innerHTML = '<h1 class="loading">Loading... Please wait...</h1>';

    const pathName = window.location.pathname;
    let filePath = '';
    if(pathName.endsWith('/')) filePath = pathName.slice(0, -1) + '.html';
    else if(pathName.endsWith('index.html')) filePath = pathName.replace('/index', '');
    else filePath = pathName

    try {
        const response = await octokit.request(`GET /repos/${owner}/${repo}/commits?path=${filePath}`, {
            owner: owner,
            repo: repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        // const commits = await response.json();
        const commits = response.data;

        // Display commit history
        commitHistory.innerHTML = "";
        if (commits.length === 0) {
            commitHistory.innerHTML = '<p>No edit history found for this file.</p>';
        } else {
            console.log(commits);
            commits.forEach(commit => {
                // const commit = commits[2];
                const commitElement = document.createElement('div');
                commitElement.innerHTML = `
                        <h2 class='edit_history_title'>${commit.commit.message}</h2>
                        <p class='edit_history_info'>Made by${commit.commit.author.name}</p>
                        <p class='edit_history_info'>At ${commit.commit.author.date}</p>
                        <p class='edit_history_info'><a href="https://github.com/${owner}/${repo}/commit/${commit.sha}">More Detail</a></p>
                        <details class='edit_history_info'>
                            <summary>Show More</summary>
                            <p class='commit-body'></p>
                        </details>
                `;
                commitHistory.appendChild(commitElement);
                const diffContainer = commitElement.querySelector('.commit-body');
                console.log(diffContainer)

                fetchCommitChanges(owner, repo, commit.sha, filePath, diffContainer);
            });
        }
    } catch (error) {
        console.error('Error fetching commit history:', error);
    }
}

async function fetchCommitChanges(owner, repo, sha, filePath, diffContainer) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`;
    
    try {
        const commit = await octokit.request(`GET /repos/${owner}/${repo}/commits/${sha}`, {
            owner: owner,
            repo: repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        // const commit = await response.json();
        console.log(commit)

        let fileContent = '';
        const filename = filePath.substring(1);
        commit.data.files.forEach(function(file){
            console.log(file.filename);
            console.log(filename);
            if(file.filename == filename) fileContent = file.patch;
        })
        diffContainer.innerHTML = fileContent;
    } catch (error) {
        console.error('Error fetching commit changes:', error);
    }
}
window.onload = function() {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    if(searchParams.get('download')){
        document.getElementById("style").href= '/assets/pdf.css';
        Array.from(document.body.children).forEach(function(child){
            if(child.tagName === 'MAIN' || child.tagName === 'SCRIPT' || child.tagName==='DIV') return;
            child.remove();
        })
    }
    else{
        const width = window.innerWidth;
        document.body.style.setProperty('--width', '780px');
        document.body.style.setProperty('--scale', width/780);
    }
    loadMathJax();
};