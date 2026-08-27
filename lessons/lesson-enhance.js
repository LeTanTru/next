/* ===== lesson-enhance.js — tăng cường UX cho mọi bài: nút Copy + nút 🏠 nổi + quiz ===== */
(function () {
  // --- 1) Chèn nút Copy vào thanh header (.code-label) của mỗi khối code ---
  document.querySelectorAll(".code-block").forEach(function (block) {
    var pre = block.querySelector("pre");
    if (!pre) return;
    var label = block.querySelector(".code-label");
    if (!label) {
      label = document.createElement("span");
      label.className = "code-label";
      block.insertBefore(label, pre);
    }
    var btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      var code = pre.innerText;
      navigator.clipboard.writeText(code).then(function () {
        btn.textContent = "Đã copy ✓";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 1500);
      });
    });
    label.appendChild(btn);
  });

  // --- 2) Chèn nút 🏠 nổi cố định (về mục lục) ---
  if (!document.querySelector(".home-fab")) {
    var fab = document.createElement("a");
    fab.className = "home-fab";
    fab.href = "index.html";
    fab.title = "Về mục lục";
    fab.textContent = "🏠";
    document.body.appendChild(fab);
  }

  // --- 3) Quiz tương tác: feedback tức thì ---
  document.querySelectorAll(".quiz").forEach(function (quiz) {
    var groups = [];
    var current = null;

    quiz.querySelectorAll(".q, .opt, .feedback").forEach(function (node) {
      if (node.classList.contains("q")) {
        current = { options: [], lastOpt: null, feedback: null };
        groups.push(current);
      } else if (node.classList.contains("opt")) {
        if (!current) {
          current = { options: [], lastOpt: null, feedback: null };
          groups.push(current);
        }
        current.options.push(node);
        current.lastOpt = node;
      } else if (current && !current.feedback) {
        current.feedback = node;
      }
    });

    groups.forEach(function (group) {
      if (!group.options.length) return;

      if (!group.feedback) {
        var fb = document.createElement("div");
        fb.className = "feedback";
        group.lastOpt.parentNode.insertBefore(fb, group.lastOpt.nextSibling);
        group.feedback = fb;
      }

      group.options.forEach(function (opt) {
        opt.addEventListener("click", function () {
          var isCorrect = opt.getAttribute("data-correct") === "true";
          group.options.forEach(function (other) {
            other.classList.add("disabled");
            if (other.getAttribute("data-correct") === "true") other.classList.add("correct");
          });
          if (!isCorrect) opt.classList.add("wrong");
          group.feedback.textContent = opt.getAttribute("data-explain") || "";
          group.feedback.classList.add("show", isCorrect ? "good" : "bad");
        });
      });
    });
  });
})();
