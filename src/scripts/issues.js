import * as _ from 'lodash';



let map = {},
    pageSize = 60,
    totalPage = 4;
// issues api
const getUrl = (page, pageSize, labels) => {
    labels = labels || 'BUG';
    return `https://git.1ziton.com/api/v4/projects/8/issues?scope=all&state=opened&labels=${labels}&per_page=${pageSize}&page=${page}&private_token=khNsmX391h6fehX5W12N`
}

const options = {
    "method": 'get',
    "mode": 'cors',
    "Content-Type": 'application/json',
    "Private-Token": 'khNsmX391h6fehX5W12N'
};

function queryIssues(page, pageSize, labels) {
    let url = getUrl(page, pageSize, labels);
    url = encodeURI(url);
    return new Promise((resolve, reject) => {
        fetch(url, options).then(response => {
            if (response.headers.get('content-type').match(/application\/json/)) {
                return response.json();
            }
            return [];
        }).then(json => {
            resolve(json);
        }).catch(err => {
            console.log('接口请求异常');
            reject(err);
        });
    });
}


function dataHandler(issues) {
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


export function staticalIssues(labels) {
    return new Promise((resolve, reject) => {
        map = {};
        let promiseArr = [];
        for (let i = 1; i < totalPage; i++) {
            promiseArr.push(queryIssues(i, pageSize, labels));
        }
        Promise.all(promiseArr).then(result => {
            try {
                for (let issues of result) {
                    if (issues && issues.length) {
                        dataHandler(issues);
                    }
                }
                resolve(map);
            } catch (e) {
                reject(e);
            }
        });
    })
}