import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch(
          "https://railway.bulletinboard.techtrain.dev/threads"
        );
        
        if (!response.ok) {
          throw new Error("スレッドの取得に失敗しました");
        }
        
        const data = await response.json();
        
        console.log(data);
        
        setThreads(data.threads ?? data);
      } catch (error) {
        console.error(error);
        setError("スレッド一覧を取得できませんでした");
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  if(loading) {
    return <p>読み込み中・・・</p>;
  }

  if(error) {
    return <p>{error}</p>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>掲示板</h1>
      </header>

      <main className="main">
        <h2>スレッド一覧</h2>

        <div className="thread-list">
          {threads.map((thread) => (
            <div className="thread-card" key={thread.id}>
              <h3>{thread.title}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default App;
