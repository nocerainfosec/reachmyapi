# ReachmyAPI

Reachability tester for Swagger / OpenAPI APIs. Import one or many specs, run the endpoints, and read a color-coded status for each route - green (reachable / 2xx–3xx), amber (reachable but rejected / 4xx), red (failed / 5xx, timeout or unreachable). Built for security and QA workflows.

🔗 **reachmyapi.io** · Created by **Guilherme Nocera** — [nocerainfosec.com.br](https://nocerainfosec.com.br)

<img width="3416" height="2140" alt="image" src="https://github.com/user-attachments/assets/245c9dd1-12a5-4c50-ac07-eb32ca65b82c" />

<img width="3420" height="2136" alt="image" src="https://github.com/user-attachments/assets/bb57a905-bf44-47af-8dde-28f1332ddbcc" />

<img width="2154" height="1808" alt="image" src="https://github.com/user-attachments/assets/1208c23a-1922-4164-8c95-9148a92b24aa" />



---

## Features

- **Import from anywhere** — paste `swagger.json` / `openapi.json`, upload files, fetch from a spec URL or a Swagger UI URL (auto-discovers the spec), or add a single route by URL.
- **Security-scanner sheets** — import `.xlsx` exports (or any `.csv` / `.txt` with URLs); a URL/API column becomes routes and any finding details (issue, severity, score, CWE, status, event link) travel with them.
- **Test any method** — toggle GET / POST / PUT / PATCH / DELETE. Non-GET calls send an empty JSON body; path params like `{id}` are replaced with `1`.
- **Per-route detail** — click a row to see the full response (headers + body) and a ready-to-run `curl` command.
- **Authentication** — per spec, tick “Test with authentication” to send a token/header, so you can check access control (e.g. whether a normal user reaches management endpoints).
- **CORS proxy** — route requests through a configurable proxy so the browser can read real status codes; curl commands always stay direct.
- **Scheduling** — automatic re-runs (1 min → 1 hour) with a live countdown.
- **Reports** — printable / PDF report per run; every run is saved in the sidebar history.
- **Multi-language** — English, Português, Español.
- **Themes** — dark / light, fullscreen, and an optional guided tour.

## Usage

Open `index.html` in a browser. That's it — everything runs client-side; imported files are read in memory and never uploaded to a server.

### Strict Content-Security-Policy hosts

The runtime loads React from a CDN. If your host blocks external scripts (CSP), self-host React — see `vendor/README.txt`. Your CSP must also allow the API calls themselves (e.g. `connect-src *`).

### Optional: local server + proxy

`server.js` (Node, no dependencies) serves the app and forwards requests like curl, so no external proxy is needed and internal/VPN hosts become reachable:

```bash
node server.js        # http://localhost:8787
# CORS proxy box: http://localhost:8787/proxy?url={url}
```

## Notes & limitations

- A browser can only read cross-origin responses when the server sends CORS headers; a proxy (public, local, or `server.js`) works around that.
- A public proxy only reaches hosts on the open internet, and sees your traffic — use your own proxy for anything sensitive.
- Scheduled runs need the tab to stay open.

## License

**ReachmyAPI Source-Available License v1.0** — see [`LICENSE`](./LICENSE).
Free to use and redistribute **unmodified**. You may **not** modify, fork, or create derivative works without the author's prior written consent (contact: contato@nocerainfosec.com.br). Attribution to Guilherme Nocera / ReachmyAPI must be kept.

---

Made with ♥ by Guilherme Nocera · [nocerainfosec.com.br](https://nocerainfosec.com.br)
