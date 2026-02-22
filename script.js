// データ読み込み（letにして再代入を許可）
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 要素取得
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const taskCount = document.getElementById("task-count");

// 保存
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// タスク追加
form.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const taskText = input.value.trim();
    if (!taskText) return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    input.value = ""; // 入力欄をクリア
});

// 描画
function renderTasks() {
    ul.innerHTML = "";
    
    // 表示用にソートした配列を作成
    const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

    sortedTasks.forEach(task => {
        const li = document.createElement("li");
        if (task.completed) {
            li.style.backgroundColor = "#e8f5e9"; // 薄い緑色
            li.style.borderColor = "#c8e6c9";     // 枠線も少し濃い緑に
        }
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "#888";
        }

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "戻す" : "完了";
        completeBtn.className = "complete-btn";
        completeBtn.onclick = () => toggleTask(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "削除";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });

    updateCount();
}

// 完了切り替え
function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveTasks();
    renderTasks();
}

// 削除
function deleteTask(id) {
    if (!confirm("本当に削除しますか？")) return; // 間違えて消さないように
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

// カウント更新
function updateCount() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    if (taskCount) {
        taskCount.textContent = `合計: ${total} / 完了済み: ${completed}`;
    }
}

// 初回描画
renderTasks();
