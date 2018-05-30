import * as _ from 'lodash';

let map = {},
    totalPage = 4;

function queryIssues(page, pageSize) {
    // issues api
    fetch(`https://git.1ziton.com/api/v4/projects/8/issues?scope=all&state=opened&labels=BUG&per_page=${pageSize}&page=${page}&private_token=khNsmX391h6fehX5W12N`, {
        method: 'get',
        "Private-Token": 'khNsmX391h6fehX5W12N'
    }).then(reps => {
        return reps.json()
    }).then(json => {
        dataHandler(page, json);
        // console.log(json)
    }).catch(err => {
        console.log(err)
        console.log('接口请求异常');
    });
}


function dataHandler(page, issues) {
    // console.log(issues)
    let names = _.map(issues, item => {
        if (item.assignee && item.assignee.name && item.assignee.name !== 'undefined') {
            return item.assignee.name;
        }
    });
    names = _.uniq(names);

    for (const name of names) {
        let arr = _.filter(issues, issue => {
            return issue.assignee && issue.assignee.name === name && issue.assignee.name !== 'undefined'
        });
        map[name] = map[name] || 0;
        map[name] += arr.length;
    }

    delete map.undefined;
}


/* function staticalIssues() {
    map = {};
    for (let i = 1; i < totalPage; i++) {
        queryIssues(i, 60);
    }

    setTimeout(() => {
        console.log('scm项目BUG统计：', map)
    }, 3000)
} */

export function staticalIssues() {

    return new Promise((resolve, reject) => {
        map = {};
        for (let i = 1; i < totalPage; i++) {
            queryIssues(i, 60);
        }
        setTimeout(() => {
            resolve(map);
        }, 3000)
    })
}