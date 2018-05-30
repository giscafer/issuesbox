// import styles from '../data/styles';


export function buildHtml(obj) {
    let _html = `
    <table class="table table-bordered">
        <thead>
          <tr>
          ${iterator(1)}
          </tr>
        </thead>
        <tbody class="oauth-applications">
            <tr>${iterator()}</tr>
        </tbody>
    </table>`


    function iterator(type) {
        let thStr = '',
            tdStr = '';
        Object.keys(obj).forEach((key) => {
            thStr += ` <th>${key}</th>`;
            tdStr += ` <td>${obj[key]}</td>`;
        });

        if (type === 1) {
            return thStr;
        }

        return tdStr;
    }

    return _html;
}

export function getSiteStyle() {
    var currentStyle;

    /* Object.keys(styles).forEach((style) => {
        if (styles[style].indexOf(document.location.hostname) !== -1) {
            currentStyle = style;
        }
    }); */

    return currentStyle || 'small';
};


export function isGitlab() {
    return location.host.includes('git.1ziton.com') || location.host.includes('gitlab');
}

export function isIssuesPage() {
    return location.href.includes('/issues');
}