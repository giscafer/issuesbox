import { staticalIssues } from './issues';
import { buildHtml, getSiteStyle, isGitlab, isIssuesPage } from './util';

// Get button style based on the current page

// const siteStyle = getSiteStyle();
let siteStyle = '';

// Scan for code snippets and append buttons

function init() {

    if (!isGitlab()) return;

    console.log('gitlab site');

    if (!isIssuesPage()) return;

    console.log('gitlab issues page');

    const snippet = document.querySelectorAll('div.issues-filters')[0];

    staticalIssues().then(obj => {
        console.log(obj)
        let htmlTmpl = buildHtml(obj);
        const parent = snippet.parentNode;
        parent.insertAdjacentHTML('afterbegin', htmlTmpl);
    });

}

init();