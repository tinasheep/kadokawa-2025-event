document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       MOBILE DRAWER MENU
    ============================ */
    const toggle = document.getElementById("mobileMenuToggle");
    const drawer = document.getElementById("mobileMenu");
    const closeBtn = document.querySelector(".drawer-close");

    function closeDrawer() {
        drawer.classList.remove("open");
        toggle.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (toggle) {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("active");
            drawer.classList.toggle("open");
            document.body.style.overflow = drawer.classList.contains("open") ? "hidden" : "";
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeDrawer);
    }

    /* ===========================
       SCROLL TO SECTION
    ============================ */
    document.querySelectorAll("[data-target]").forEach((item) => {
        item.addEventListener("click", () => {
            const id = item.getAttribute("data-target");
            const el = document.getElementById(id);
            if (el) {
                const top = el.offsetTop - 70;
                window.scrollTo({
                    top,
                    behavior: "smooth",
                });
            }
            closeDrawer();
        });
    });

    /* ===========================
       LIGHTBOX — 自動掃描所有 <a href="*.jpg|png|jpeg">
       自動啟用放大功能（無需加 class）
    =========================== */
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightbox-img");
    const lbCap = document.getElementById("lightbox-caption");
    const lbClose = document.querySelector(".lightbox-close");

    if (lightbox && lbImg && lbCap && lbClose) {

        // 自動掃描所有圖片連結
        document.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"]').forEach((link) => {
            link.addEventListener("click", (e) => {
                // 如果裡面沒有 img 就忽略（避免一般連結被吃掉）
                const img = link.querySelector("img");
                if (!img) return;

                e.preventDefault(); // 停止預設跳頁

                const bigSrc = link.getAttribute("href"); // 原圖（大圖）
                const caption = img.getAttribute("alt") || ""; // 用 img 的 alt 當 caption

                lightbox.classList.add("show");
                lbImg.src = bigSrc;
                lbCap.textContent = caption;
                document.body.style.overflow = "hidden";
            });
        });

        // ✦ 關閉 Lightbox（按 ×）
        lbClose.addEventListener("click", () => {
            lightbox.classList.remove("show");
            document.body.style.overflow = "";
        });

        // ✦ 點背景關閉
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("show");
                document.body.style.overflow = "";
            }
        });
    }

    /* ===========================
       TABS 切換
    ============================ */
    const tabButtons = document.querySelectorAll(".tab-buttons button");
    const tabPanels = document.querySelectorAll(".tab-panel");

    if (tabButtons.length && tabPanels.length) {
        tabButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const target = btn.getAttribute("data-tab");

                tabButtons.forEach((b) => b.classList.remove("active"));
                tabPanels.forEach((p) => p.classList.remove("active"));

                btn.classList.add("active");
                const panel = document.getElementById(target);
                if (panel) {
                    panel.classList.add("active");
                    window.scrollTo({
                        top: document.querySelector(".goods-tabs").offsetTop - 70,
                        behavior: "smooth",
                    });
                }
            });
        });
    }

});

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});