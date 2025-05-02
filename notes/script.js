let currentCategory = '';
let dataCache = {};
let activePath = [];

document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category-select");
  const listMenu = document.getElementById("list-menu");
  const content = document.getElementById("content");
  const toggleMenuBtn = document.getElementById("toggleMenu");
  const darkToggle = document.getElementById("darkModeToggle");

  // ðŸŒ™ Dark mode toggle
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // â˜° Toggle sidebar
  toggleMenuBtn.addEventListener("click", () => {
    listMenu.classList.toggle("collapsed");
    content.classList.toggle("fullscreen");
  });

  // ðŸ“¥ Load providers (AWS, GCP, Azure, etc.)
  fetch("providers.json")
    .then(response => response.json())
    .then(providers => {
      providers.forEach(provider => {
        const option = document.createElement("option");
        option.value = provider.file;
        option.textContent = `${provider.icon || ''} ${provider.name}`;
        categorySelect.appendChild(option);
      });

      // Auto-load first provider
      if (providers.length > 0) {
        categorySelect.value = providers[0].file;
        loadCategory(providers[0].file);
      }
    });

  // ðŸ”„ Change category (cloud provider)
  categorySelect.addEventListener("change", (e) => {
    loadCategory(e.target.value);
  });

  // ðŸ“‚ Load selected category file
  function loadCategory(file) {
    currentCategory = file;
    fetch(`${file}`)
      .then(res => res.json())
      .then(data => {
        dataCache = data;
        listMenu.innerHTML = ''; // clear existing
        const menuTree = createMenuFromData(data, listMenu);
        listMenu.appendChild(menuTree);
      })
      .catch(err => {
        listMenu.innerHTML = `<p style="color:red;">Error loading ${file}: ${err.message}</p>`;
      });
  }

  // ðŸ“š Create dynamic nested menu from data
  function createMenuFromData(data, container, level = 0, parentPath = []) {
    const ul = document.createElement("ul");

    Object.entries(data).forEach(([key, value]) => {
      const li = document.createElement("li");
      const currentPath = [...parentPath, key];

      if (Array.isArray(value)) {
        // Leaf group
        const groupSpan = document.createElement("span");
        groupSpan.textContent = key;
        groupSpan.classList.add("group");
        li.appendChild(groupSpan);

        const childUl = document.createElement("ul");
        value.forEach(item => {
          const childLi = document.createElement("li");
          childLi.classList.add("leaf");
          childLi.textContent = item.name;
          childLi.dataset.path = item.file;

          childLi.addEventListener("click", () => {
            highlightPath([...currentPath, item.name]);
            if (item.file && typeof item.file === "string") {
              loadContent(item.file);
            } else {
              content.innerHTML = `<p style="color:red;">Missing file path for ${item.name}</p>`;
            }
          });

          childUl.appendChild(childLi);
        });

        li.appendChild(childUl);
      } else if (typeof value === "object") {
        // Nested group
        const groupSpan = document.createElement("span");
        groupSpan.textContent = key;
        groupSpan.classList.add("group");
        li.appendChild(groupSpan);

        const nested = createMenuFromData(value, container, level + 1, currentPath);
        li.appendChild(nested);

        li.classList.add("group", "collapsed");
        groupSpan.addEventListener("click", () => {
          collapsePeers(li);
          li.classList.toggle("collapsed");
        });
      }

      ul.appendChild(li);
    });

    return ul;
  }

  // ðŸŽ¯ Highlight current path
  function highlightPath(path) {
    document.querySelectorAll("li").forEach(el => el.classList.remove("active"));
    const spans = document.querySelectorAll("li span, li");
    spans.forEach(span => {
      const text = span.textContent.trim();
      if (text === path[path.length - 1]) {
        span.classList.add("active");
      }
    });
  }

  // ðŸ‘¥ Collapse sibling groups
  function collapsePeers(node) {
    const parent = node.parentElement;
    Array.from(parent.children).forEach(sibling => {
      if (sibling !== node && sibling.classList.contains("group")) {
        sibling.classList.add("collapsed");
      }
    });
  }

  // ðŸ“„ Load and render content
  function loadContent(path) {
    if (!path || typeof path !== "string") {
      console.error("Invalid path:", path);
      content.innerHTML = `<p style="color:red;">Invalid or missing file path.</p>`;
      return;
    }

    const ext = path.split('.').pop();
    fetch(path)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load: ${path}`);
        if (["md", "txt", "py", "html"].includes(ext)) return res.text();
        if (["png", "jpg", "jpeg"].includes(ext)) return res.blob();
      })
      .then(data => {
        if (["md", "txt", "py", "html"].includes(ext)) {
          if (ext === "md") content.innerHTML = marked.parse(data);
          else content.innerHTML = `<pre><code>${escapeHTML(data)}</code></pre>`;
        } else {
          const url = URL.createObjectURL(data);
          content.innerHTML = `<img src="${url}" alt="image" style="max-width:100%">`;
        }
      })
      .catch(err => {
        content.innerHTML = `<p style="color:red;">Error: ${err.message}<br>Path: ${path}</p>`;
      });
  }

  // ðŸ”’ Escape HTML for code blocks
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[tag]);
  }
});