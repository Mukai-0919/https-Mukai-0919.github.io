# https-Mukai-0919.github.io
# Todo App

## 概要
このアプリはブラウザ上で動作するシンプルな Todo アプリです。  
タスクの追加・完了・削除が可能で、完了済みのタスクは下に表示されます。  
合計タスク数と完了済みタスク数もリアルタイムで表示されます。

- HTML / CSS / JavaScript 分離で作成
- ローカルストレージにタスクを保存
- 完了済みタスクは下に並び替え
- Enterキーでもタスク追加可能

---

## 使い方

1. index.html をブラウザで開きます。
2. 入力欄にタスクを入力して「追加」ボタンをクリック、または Enter キーで追加。
3. タスクの横にある「完了」ボタンで完了状態に切り替え。
4. 完了済みのタスクは下に移動し、テキストに取り消し線が入り、色が付きます。
5. 「削除」ボタンでタスクを削除。
6. 画面下に「合計タスク数 / 完了済みタスク数」が表示されます。

---

## ファイル構成
├─ index.html # HTML構造
├─ style.css # 見た目のスタイル
└─ script.js # 動作を制御するJS

---

## 使用技術

- HTML5
- CSS3
- JavaScript（ES6+）
- LocalStorage（ブラウザのローカル保存）

## コードのポイント

1. IDで管理
タスクには `id` を付与し、配列操作（完了/削除）でズレが起きないようにしています。

const newTask = { id: Date.now(), text: taskText, completed: false };

2. 完了タスク
function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveTasks();
    renderTasks();
}

3. ソートして表示
完了済みタスクを下に並べるため、コピー配列をソートして描画しています。
const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

4. カウント表示
const total = tasks.length;
const completed = tasks.filter(t => t.completed).length;
taskCount.textContent = `合計: ${total} / 完了済み: ${completed}`;

課題と解決策
1. タスク入力後の重複

課題：タスクを追加した後、入力欄がクリアされていなかったため、同じ内容を誤って複数回追加してしまうことがあった。

解決策：input.value = ""; を追加して、タスク追加後に入力欄を空にするようにした。

2. 完了済みタスクが分かりにくい

課題：完了したタスクが画面上で他のタスクと区別しづらかった。

解決策：完了済みのタスクに取り消し線と文字色を薄くすることで視覚的に分かるようにした。また、完了タスクは下に表示するように並び替えを行った。

3. ページ更新でタスクが消える

課題：ブラウザをリロードすると、追加したタスクが消えてしまう。

解決策：localStorage にタスクを保存・読み込みするように変更し、ページ更新後も前回のタスクが残るようにした。

