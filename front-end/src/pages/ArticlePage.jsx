import { useParams } from "react-router-dom";
import articles from "../article-content";
import ArticlesList from "../components/ArticlesList";
export default function ArticlePage() {
  const { name } = useParams();

  const article = articles.find((a) => a.name === name);

  return (
    <>
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-8">
            <h1>{article.title}</h1>
            {article.content.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="col-md-4">
            <h2>Articles</h2>
            <ArticlesList articles={articles} />
          </div>
        </div>
      </div>
    </>
  );
}
