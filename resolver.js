import { abi, contractAddress } from './contract.js';

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
const contract = new ethers.Contract(contractAddress, abi, provider);

const domainInput = document.getElementById('domainInput');
const resolveBtn  = document.getElementById('resolveBtn');
const statusEl    = document.getElementById('status');
const miniBrowser = document.getElementById('miniBrowser');

resolveBtn.addEventListener('click', async () => {
  const domain = domainInput.value.trim();
  if (!domain) return alert('Please enter a .dweb domain');

  statusEl.textContent = 'Resolving…';
  miniBrowser.innerHTML = '';

  try {
    // 1) Lookup CID on-chain
    const cid = await contract.getCID(domain);
    statusEl.textContent = `Resolved CID: ${cid}`;
    console.log('[dWeb] Got CID:', cid);

    // 2) Fetch & unzip
    const resp = await fetch(`https://ipfs.io/ipfs/${cid}`);
    const buf  = await resp.arrayBuffer();
    const zip  = await JSZip.loadAsync(buf);

    // 3) Transpile & blobify
    const files = {}, blobs = {};
    await Promise.all(Object.entries(zip.files).map(async ([name, file]) => {
      let content = await file.async('string');
      let mime    = 'text/plain';

      if (/\.(ts|tsx|jsx)$/.test(name)) {
        // Use Babel to transpile TS / TSX / JSX => plain JS
        const isTSX = name.endsWith('.tsx') || name.endsWith('.jsx');
        const code = Babel.transform(
          content,
          {
            presets: ['ts', 'react'],
            filename: name
          }
        ).code;
        content = code;
        mime    = 'application/javascript';
      }
      else if (name.endsWith('.js'))  mime = 'application/javascript';
      else if (name.endsWith('.css')) mime = 'text/css';
      else if (name.endsWith('.html')) mime = 'text/html';

      files[name] = content;
      blobs[name] = URL.createObjectURL(new Blob([content], { type: mime }));
    }));

    // 4) Find and rewrite index.html
    const indexName = Object.keys(files).find(n => n.endsWith('index.html'));
    if (!indexName) throw new Error('No index.html in ZIP');

    let html = files[indexName];
    html = html.replace(/(src|href)=["']([^"']+)["']/g,
      (_, attr, path) => blobs[path] ? `${attr}="${blobs[path]}"` : `${attr}="${path}"`
    );

    // 5) Render in sandboxed iframe
    const iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    iframe.style.width  = '100%';
    iframe.style.height = '600px';
    iframe.srcdoc = html;
    miniBrowser.appendChild(iframe);

    statusEl.textContent = '✅ Site loaded!';
  } catch (err) {
    console.error('[dWeb] Error:', err);
    statusEl.textContent = '❌ ' + err.message;
  }
});
