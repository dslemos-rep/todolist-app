import app from "./app.js";
import { PORT } from "./config/env.js";
app.listen(PORT || 5500, () => {
  console.log(`TodoList app running on http://localhost:${PORT || 5500}`);
});
