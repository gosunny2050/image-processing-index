// 获取treeview元素
const treeview = document.getElementById('treeview');

// 动态生成目录项
fetch('../dist/fileList.json')
    .then(response => response.json())
    .then(data => {
        data.files.forEach((file, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `pages/${file}`;
            a.textContent = `章节 ${index + 1}`;
            li.appendChild(a);
            treeview.appendChild(li);

            // 添加点击事件，更新iframe内容
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const iframe = document.getElementById('iframeContent');
                iframe.src = e.target.getAttribute('href');
            });
        });
    })
    .catch(error => console.error('Error loading file list:', error));

