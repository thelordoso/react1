import express from "express";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

const articleInfo = [
  { name: "learn-node", upvotes: 0, comments: [] },
  { name: "learn-react", upvotes: 0, comments: [] },
  { name: "mongodb", upvotes: 0, comments: [] },
];

const client = new DynamoDBClient({
  region: "local-env",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "ea5c3sb",
    secretAccessKey: "prb5fj",
  },
});
const docClient = DynamoDBDocumentClient.from(client);

const app = express();

app.use(express.json());

async function obtenerArticuloLocal() {
  const tableName = "Articles";
  const partitionKeyName = "pk";
  const partitionKeyValue = "article#1";

  const params = {
    TableName: tableName,
    Key: {
      [partitionKeyName]: partitionKeyValue,
    },
  };

  try {
    const command = new GetCommand(params);
    const data = await docClient.send(command);

    if (data.Item) {
      return data.Item;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

app.get("/tables", async (req, res) => {
  try {
    const command = new ListTablesCommand();
    const data = await client.send(command);

    if (data.TableNames) {
      res.status(200).json({ tables: data });
    } else {
      res.status(200).json({ tables: [] });
    }
  } catch (error) {
    console.error("Error al listar tablas:", error);
    res.status(500).send("Error interno del servidor al listar tablas.");
  }
});

app.get("/", async (req, res) => {
  try {
    const item = await obtenerArticuloLocal();

    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).send("Artículo no encontrado en la base de datos.");
    }
  } catch (error) {
    console.error("Error al obtener el artículo de DynamoDB:", error);
    res
      .status(500)
      .send("Error interno del servidor al acceder a la base de datos.");
  }
});

app.get("/api/articles/:name", (req, res) => {
  const article = articleInfo.find((a) => a.name === req.params.name);
  res.json(article);
});

app.post("/api/articles/:name/upvote", (req, res) => {
  const article = articleInfo.find((a) => a.name === req.params.name);
  article.upvotes += 1;

  res.json(article);
});

app.post("/api/articles/:name/comments", (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  const article = articleInfo.find((a) => a.name === name);

  article.comments.push({
    postedBy,
    text,
  });

  res.json(article);
});

app.listen(8001, function () {
  console.log("Server is listening on port 8001");
});
