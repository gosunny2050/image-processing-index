const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

// 定义每页获取的数量和总页数
const perPage = 30;  // 每页30个结果
const totalPages = 5;  // 总共抓取5页


// 创建 dist 目录（如果不存在）
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}


// 获取 GitHub 图像处理相关仓库，分页处理
async function fetchRepos() {
    let allRepos = [];  // 存储所有仓库

    // 循环获取每一页的数据
    for (let page = 1; page <= totalPages; page++) {
        console.log(`Fetching page ${page}...`);
        const response = await fetch(`https://api.github.com/search/repositories?q=image+processing&sort=stars&order=desc&per_page=${perPage}&page=${page}`);
        const data = await response.json();

        // 合并所有仓库数据到allRepos
        allRepos = allRepos.concat(data.items);
    }

    // 构建 HTML 内容
    let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Image Processing Repositories</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1>Image Processing Repositories</h1>
        <div id="repo-list">
    `;

    // 循环添加每个仓库的信息
    allRepos.forEach(repo => {
        htmlContent += `
        <div>
            <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
            <p>${repo.description}</p>
            <p>🌟 Stars: ${repo.stargazers_count}</p>
        </div>
        `;
    });

    // 关闭 HTML 标签
    htmlContent += `
        </div>
    </body>
    </html>
    `;

    // 写入到 index.html 文�
    const outputPath = path.join(distDir, 'index.html');
    fs.writeFileSync(outputPath, htmlContent, 'utf8');
    console.log('index.html 文件已生成！');
}

// 调用函数生成 index.html
fetchRepos().catch(error => console.error('发生错误:', error));

