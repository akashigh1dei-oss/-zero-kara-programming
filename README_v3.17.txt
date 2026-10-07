v3.17 404/URL normalization fix (2026-10-01)

- /index.html -> /
- /lessons/1/ .. /lessons/9/ -> zero-padded canonical URLs (/lessons/01/ etc.)
- /lessons/NN/index.html -> /lessons/NN/
- /editorial/51/index.html etc. -> canonical editorial URL
- Existing real 404 status is preserved for genuinely missing pages/assets.
- Internal link/site guard remains enabled.
