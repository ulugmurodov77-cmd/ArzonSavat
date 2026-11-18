"use strict";

// ========================================
// ARZONSAVAT — ASOSIY SOZLAMALAR
// ========================================

const $ = (selector) => document.querySelector(selector);

const productGrid = $("#productGrid");
const searchInput = $("#searchInput");
const searchButton = $("#searchButton");
const sortSelect = $("#sortSelect");
const productCount = $("#productCount");
const productsTitle = $("#productsTitle");
const productsSubtitle = $("#productsSubtitle");
const emptyState = $("#emptyState");
const loadMoreButton = $("#loadMoreButton");
const cartOverlay = $("#cartOverlay");
const cartItems = $("#cartItems");
const cartCount = $("#cartCount");
const cartTotal = $("#cartTotal");
const toast = $("#toast");

const PRODUCTS_PER_PAGE = 20;

let activeCategory = "all";
let visibleCount = PRODUCTS_PER_PAGE;
let searchQuery = "";
let toastTimer;

// ========================================
// RASMLAR
// Internet mavjud bo‘lganda rasmlar yuklanadi.
// ========================================

const foodImages = [
    "photo-1560806887-1e4cd0b6cbd6",
    "photo-1571771894821-ce9b6c11b08e",
    "photo-1547514701-42782101795e",
    "photo-1550258987-190a2d41a8ba",
    "photo-1592924357228-91a4daadcfea",
    "photo-1540420773420-3366772f4999",
    "photo-1518977676601-b53f82aba655",
    "photo-1518843875459-f738682238a6",
    "photo-1550583724-b2692b85b150",
    "photo-1563636619-e9143da7973b",
    "photo-1528825871115-3581a5387919",
    "photo-1553279768-865429fa0078",
    "photo-1577234286642-fc512a5f8f11",
    "photo-1568702846914-96b305d2aaeb",
    "photo-1601493700631-2b16ec4b4716",
    "photo-1603052875302-d376b7c0638a",
    "photo-1542838132-92c53300491e",
    "photo-1543168256-418811576931",
    "photo-1587049352851-8d4e89133924",
    "photo-1607623814075-e51df1bdc82f"
];

const clothingImages = [
    "photo-1521572163474-6864f9cf17ab",
    "photo-1529139574466-a303027c1d8b",
    "photo-1542272604-787c3835535d",
    "photo-1542291026-7eec264c27ff",
    "photo-1548036328-c9fa89d128fa",
    "photo-1551028719-00167b16eac5",
    "photo-1434389677669-e08b4cac3105",
    "photo-1483985988355-763728e1935b",
    "photo-1490481651871-ab68de25d43d",
    "photo-1515886657613-9f3515b0c78f",
    "photo-1523398002811-999ca8dec234",
    "photo-1551488831-00ddcb6c6bd3",
    "photo-1591047139829-d91aecb6caea",
    "photo-1551232864-3f0890e580d9",
    "photo-1548126032-079a0fb0099d",
    "photo-1521369909029-2afed882baee",
    "photo-1523381210434-271e8be1f52b",
    "photo-1495555961986-6d4c1ecb7be3",
    "photo-1460353581641-37baddab0fa2",
    "photo-1543163521-1bf539c55dd2"
];

function imageUrl(photoId) {
    return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=600&q=80`;
}

// ========================================
// MAHSULOT NOMLARI
// ========================================

const foodNames = [
    ["Olma", "Meva", 12000, "kg"],
    ["Banan", "Meva", 22000, "kg"],
    ["Apelsin", "Meva", 18000, "kg"],
    ["Mandarin", "Meva", 16000, "kg"],
    ["Nok", "Meva", 15000, "kg"],
    ["Uzum", "Meva", 25000, "kg"],
    ["Anor", "Meva", 20000, "kg"],
    ["Shaftoli", "Meva", 18000, "kg"],
    ["O‘rik", "Meva", 17000, "kg"],
    ["Qulupnay", "Meva", 30000, "kg"],
    ["Tarvuz", "Meva", 7000, "kg"],
    ["Qovun", "Meva", 9000, "kg"],
    ["Limon", "Meva", 22000, "kg"],
    ["Kivi", "Meva", 28000, "kg"],
    ["Mango", "Meva", 35000, "dona"],
    ["Kartoshka", "Sabzavot", 6000, "kg"],
    ["Piyoz", "Sabzavot", 5000, "kg"],
    ["Sabzi", "Sabzavot", 6000, "kg"],
    ["Pomidor", "Sabzavot", 14000, "kg"],
    ["Bodring", "Sabzavot", 10000, "kg"],
    ["Karam", "Sabzavot", 5000, "kg"],
    ["Qizil qalampir", "Sabzavot", 18000, "kg"],
    ["Baqlajon", "Sabzavot", 12000, "kg"],
    ["Sarimsoq", "Sabzavot", 25000, "kg"],
    ["Lavlagi", "Sabzavot", 7000, "kg"],
    ["Mol go‘shti", "Go‘sht", 95000, "kg"],
    ["Qo‘y go‘shti", "Go‘sht", 105000, "kg"],
    ["Tovuq go‘shti", "Go‘sht", 32000, "kg"],
    ["Tovuq filesi", "Go‘sht", 42000, "kg"],
    ["Mol qiymasi", "Go‘sht", 85000, "kg"],
    ["Sut", "Sut mahsuloti", 12000, "litr"],
    ["Qatiq", "Sut mahsuloti", 9000, "dona"],
    ["Kefir", "Sut mahsuloti", 11000, "litr"],
    ["Pishloq", "Sut mahsuloti", 65000, "kg"],
    ["Sariyog‘", "Sut mahsuloti", 25000, "dona"],
    ["Qaymoq", "Sut mahsuloti", 18000, "dona"],
    ["Tuxum", "Sut mahsuloti", 18000, "10 dona"],
    ["Yogurt", "Sut mahsuloti", 8000, "dona"],
    ["Guruch", "Yorma", 18000, "kg"],
    ["Makaron", "Yorma", 12000, "kg"],
    ["Un", "Yorma", 10000, "kg"],
    ["Grechka", "Yorma", 16000, "kg"],
    ["Mosh", "Yorma", 18000, "kg"],
    ["Loviya", "Yorma", 20000, "kg"],
    ["No‘xat", "Yorma", 16000, "kg"],
    ["Shakar", "Oziq-ovqat", 14000, "kg"],
    ["Tuz", "Oziq-ovqat", 4000, "kg"],
    ["Kungaboqar yog‘i", "Oziq-ovqat", 22000, "litr"],
    ["Zaytun yog‘i", "Oziq-ovqat", 85000, "litr"],
    ["Asal", "Oziq-ovqat", 55000, "dona"],
    ["Oq non", "Non va shirinlik", 4000, "dona"],
    ["Patir non", "Non va shirinlik", 10000, "dona"],
    ["Baton", "Non va shirinlik", 7000, "dona"],
    ["Shokolad", "Non va shirinlik", 12000, "dona"],
    ["Pechenye", "Non va shirinlik", 16000, "qadoq"],
    ["Vafli", "Non va shirinlik", 14000, "qadoq"],
    ["Konfet", "Non va shirinlik", 30000, "kg"],
    ["Tort", "Non va shirinlik", 85000, "dona"],
    ["Muzqaymoq", "Non va shirinlik", 10000, "dona"],
    ["Qulupnay murabbosi", "Oziq-ovqat", 28000, "banka"],
    ["Ko‘k choy", "Ichimlik", 18000, "qadoq"],
    ["Qora choy", "Ichimlik", 22000, "qadoq"],
    ["Qahva", "Ichimlik", 35000, "qadoq"],
    ["Ichimlik suvi", "Ichimlik", 4000, "butilka"],
    ["Olma sharbati", "Ichimlik", 12000, "litr"],
    ["Apelsin sharbati", "Ichimlik", 15000, "litr"],
    ["Gazli ichimlik", "Ichimlik", 10000, "butilka"],
    ["Mineral suv", "Ichimlik", 5000, "butilka"],
    ["Limonad", "Ichimlik", 11000, "butilka"],
    ["Mayonez", "Sous", 14000, "dona"],
    ["Ketchup", "Sous", 12000, "dona"],
    ["Tomat pastasi", "Sous", 16000, "banka"],
    ["Kolbasa", "Go‘sht", 45000, "kg"],
    ["Sosiska", "Go‘sht", 38000, "qadoq"],
    ["Baliq", "Go‘sht", 55000, "kg"],
    ["Muzlatilgan chuchvara", "Yarim tayyor", 35000, "qadoq"],
    ["Muzlatilgan manti", "Yarim tayyor", 40000, "qadoq"],
    ["Tvorog", "Sut mahsuloti", 28000, "kg"],
    ["Margarin", "Sut mahsuloti", 10000, "dona"],
    ["Zaytun", "Oziq-ovqat", 35000, "banka"],
    ["Makkajo‘xori konservasi", "Konserva", 16000, "banka"],
    ["Yashil no‘xat konservasi", "Konserva", 14000, "banka"],
    ["Tuzlangan bodring", "Konserva", 18000, "banka"],
    ["Quritilgan o‘rik", "Quritilgan meva", 45000, "kg"],
    ["Mayiz", "Quritilgan meva", 35000, "kg"],
    ["Yong‘oq", "Yong‘oq", 65000, "kg"],
    ["Bodom", "Yong‘oq", 90000, "kg"],
    ["Pista", "Yong‘oq", 85000, "kg"],
    ["Yeryong‘oq", "Yong‘oq", 35000, "kg"],
    ["Limon kislotasi", "Oziq-ovqat", 8000, "qadoq"],
    ["Vanilin", "Oziq-ovqat", 5000, "qadoq"],
    ["Kakao", "Oziq-ovqat", 22000, "qadoq"],
    ["Suli yormasi", "Yorma", 18000, "qadoq"],
    ["Makkajo‘xori yormasi", "Yorma", 14000, "kg"],
    ["Tort bezagi", "Non va shirinlik", 12000, "qadoq"],
    ["Quruq xamirturush", "Oziq-ovqat", 5000, "qadoq"],
    ["Lavash noni", "Non va shirinlik", 12000, "qadoq"],
    ["Pita noni", "Non va shirinlik", 10000, "qadoq"],
    ["Zanjabil", "Sabzavot", 25000, "kg"]
];

const clothingNames = [
    ["Erkaklar futbolkasi", "Erkaklar kiyimi", 65000, "dona"],
    ["Ayollar futbolkasi", "Ayollar kiyimi", 60000, "dona"],
    ["Bolalar futbolkasi", "Bolalar kiyimi", 45000, "dona"],
    ["Erkaklar ko‘ylagi", "Erkaklar kiyimi", 140000, "dona"],
    ["Ayollar bluzkasi", "Ayollar kiyimi", 110000, "dona"],
    ["Erkaklar jinsi", "Erkaklar kiyimi", 180000, "dona"],
    ["Ayollar jinsi", "Ayollar kiyimi", 170000, "dona"],
    ["Bolalar jinsi", "Bolalar kiyimi", 95000, "dona"],
    ["Erkaklar shimlari", "Erkaklar kiyimi", 150000, "dona"],
    ["Ayollar shimlari", "Ayollar kiyimi", 130000, "dona"],
    ["Ayollar ko‘ylagi", "Ayollar kiyimi", 190000, "dona"],
    ["Yozgi ko‘ylak", "Ayollar kiyimi", 160000, "dona"],
    ["Erkaklar kurtkasi", "Erkaklar kiyimi", 350000, "dona"],
    ["Ayollar kurtkasi", "Ayollar kiyimi", 320000, "dona"],
    ["Bolalar kurtkasi", "Bolalar kiyimi", 210000, "dona"],
    ["Erkaklar kostyumi", "Erkaklar kiyimi", 650000, "dona"],
    ["Ayollar kostyumi", "Ayollar kiyimi", 420000, "dona"],
    ["Sport kostyumi", "Sport kiyimi", 220000, "dona"],
    ["Sport shimlari", "Sport kiyimi", 120000, "dona"],
    ["Sport futbolkasi", "Sport kiyimi", 85000, "dona"],
    ["Hudi", "Kundalik kiyim", 180000, "dona"],
    ["Sviter", "Kundalik kiyim", 160000, "dona"],
    ["Kardigan", "Kundalik kiyim", 175000, "dona"],
    ["Jemper", "Kundalik kiyim", 145000, "dona"],
    ["Qishki palto", "Ustki kiyim", 450000, "dona"],
    ["Yengil kurtka", "Ustki kiyim", 250000, "dona"],
    ["Yomg‘irpo‘sh", "Ustki kiyim", 190000, "dona"],
    ["Erkaklar shortigi", "Erkaklar kiyimi", 75000, "dona"],
    ["Ayollar shortigi", "Ayollar kiyimi", 65000, "dona"],
    ["Bolalar shortigi", "Bolalar kiyimi", 50000, "dona"],
    ["Ayollar yubkasi", "Ayollar kiyimi", 120000, "dona"],
    ["Bolalar ko‘ylagi", "Bolalar kiyimi", 90000, "dona"],
    ["Maktab formasi", "Bolalar kiyimi", 220000, "to‘plam"],
    ["Bolalar pijamasi", "Bolalar kiyimi", 95000, "to‘plam"],
    ["Erkaklar pijamasi", "Uy kiyimi", 140000, "to‘plam"],
    ["Ayollar pijamasi", "Uy kiyimi", 130000, "to‘plam"],
    ["Paypoq", "Aksessuar", 15000, "juft"],
    ["Sport paypog‘i", "Aksessuar", 20000, "juft"],
    ["Erkaklar ichki kiyimi", "Ichki kiyim", 35000, "dona"],
    ["Ayollar ichki kiyimi", "Ichki kiyim", 45000, "dona"],
    ["Bolalar ichki kiyimi", "Ichki kiyim", 25000, "dona"],
    ["Erkaklar krossovkasi", "Oyoq kiyim", 320000, "juft"],
    ["Ayollar krossovkasi", "Oyoq kiyim", 290000, "juft"],
    ["Bolalar krossovkasi", "Oyoq kiyim", 190000, "juft"],
    ["Erkaklar tuflisi", "Oyoq kiyim", 350000, "juft"],
    ["Ayollar tuflisi", "Oyoq kiyim", 280000, "juft"],
    ["Bolalar tuflisi", "Oyoq kiyim", 150000, "juft"],
    ["Erkaklar etiklari", "Oyoq kiyim", 420000, "juft"],
    ["Ayollar etiklari", "Oyoq kiyim", 380000, "juft"],
    ["Bolalar etiklari", "Oyoq kiyim", 220000, "juft"],
    ["Ayollar sandali", "Oyoq kiyim", 180000, "juft"],
    ["Erkaklar shippagi", "Oyoq kiyim", 65000, "juft"],
    ["Ayollar shippagi", "Oyoq kiyim", 55000, "juft"],
    ["Bolalar shippagi", "Oyoq kiyim", 40000, "juft"],
    ["Klassik kamar", "Aksessuar", 85000, "dona"],
    ["Charm kamar", "Aksessuar", 130000, "dona"],
    ["Erkaklar hamyoni", "Aksessuar", 95000, "dona"],
    ["Ayollar hamyoni", "Aksessuar", 110000, "dona"],
    ["Ayollar sumkasi", "Aksessuar", 250000, "dona"],
    ["Kundalik ryukzak", "Aksessuar", 180000, "dona"],
    ["Maktab ryukzagi", "Aksessuar", 220000, "dona"],
    ["Qishki qalpoq", "Aksessuar", 55000, "dona"],
    ["Kepka", "Aksessuar", 45000, "dona"],
    ["Sharf", "Aksessuar", 65000, "dona"],
    ["Qo‘lqop", "Aksessuar", 50000, "juft"],
    ["Quyosh ko‘zoynagi", "Aksessuar", 85000, "dona"],
    ["Galstuk", "Aksessuar", 75000, "dona"],
    ["Kapalak galstuk", "Aksessuar", 55000, "dona"],
    ["Sport kepkasi", "Aksessuar", 60000, "dona"],
    ["Jinsi kurtka", "Ustki kiyim", 270000, "dona"],
    ["Charm kurtka", "Ustki kiyim", 480000, "dona"],
    ["Yelek", "Ustki kiyim", 150000, "dona"],
    ["Yomg‘ir uchun etik", "Oyoq kiyim", 160000, "juft"],
    ["Uy uchun tapochka", "Oyoq kiyim", 50000, "juft"],
    ["Erkaklar sandal", "Oyoq kiyim", 125000, "juft"],
    ["Ayollar baletkasi", "Oyoq kiyim", 175000, "juft"],
    ["Sport butsasi", "Oyoq kiyim", 260000, "juft"],
    ["Futbol formasi", "Sport kiyimi", 180000, "to‘plam"],
    ["Basketbol futbolkasi", "Sport kiyimi", 95000, "dona"],
    ["Yoga legginsi", "Sport kiyimi", 110000, "dona"],
    ["Ayollar legginsi", "Ayollar kiyimi", 90000, "dona"],
    ["Jinsi shortik", "Kundalik kiyim", 100000, "dona"],
    ["Klassik shim", "Erkaklar kiyimi", 170000, "dona"],
    ["Oq ko‘ylak", "Erkaklar kiyimi", 135000, "dona"],
    ["Polo futbolka", "Erkaklar kiyimi", 95000, "dona"],
    ["Uzun yengli futbolka", "Kundalik kiyim", 80000, "dona"],
    ["Yozgi sandal", "Oyoq kiyim", 145000, "juft"],
    ["Qishki sviter", "Kundalik kiyim", 190000, "dona"],
    ["Ayollar kardigani", "Ayollar kiyimi", 175000, "dona"],
    ["Bolalar sport kostyumi", "Sport kiyimi", 160000, "to‘plam"],
    ["Bolalar maktab tuflisi", "Oyoq kiyim", 175000, "juft"],
    ["Erkaklar sport sumkasi", "Aksessuar", 150000, "dona"],
    ["Ayollar bel sumkasi", "Aksessuar", 100000, "dona"],
    ["Trikotaj ko‘ylak", "Ayollar kiyimi", 145000, "dona"],
    ["Klassik ayollar tuflisi", "Oyoq kiyim", 300000, "juft"],
    ["Yumshoq uy xalati", "Uy kiyimi", 170000, "dona"]
];

// ========================================
// 200 TA MAHSULOTNI YARATISH
// ========================================

function createProducts(items, category, images, startId) {
    return items.map((item, index) => ({
        id: startId + index,
        name: item[0],
        subcategory: item[1],
        price: item[2],
        unit: item[3],
        category,
        image: imageUrl(images[index % images.length]),
        badge: index % 7 === 0 ? "Ommabop" : ""
    }));
}

const products = [
    ...createProducts(foodNames, "food", foodImages, 1),
    ...createProducts(clothingNames, "clothes", clothingImages, 101)
];

// ========================================
// NARXLARNI FORMATLASH
// ========================================

function formatPrice(price) {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so‘m";
}

// ========================================
// MAHSULOTLARNI SARALASH VA QIDIRISH
// ========================================

function getFilteredProducts() {
    let result = products.filter((product) => {
        const categoryMatches =
            activeCategory === "all" ||
            product.category === activeCategory;

        const searchableText = (
            product.name + " " +
            product.subcategory + " " +
            (product.category === "food" ? "oziq ovqat" : "kiyim kechak")
        ).toLocaleLowerCase("uz");

        const queryMatches = searchableText.includes(
            searchQuery.toLocaleLowerCase("uz")
        );

        return categoryMatches && queryMatches;
    });

    const sortValue = sortSelect.value;

    if (sortValue === "price-asc") {
        result.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
        result.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name") {
        result.sort((a, b) => a.name.localeCompare(b.name, "uz"));
    }

    return result;
}

// ========================================
// MAHSULOT KARTOCHKASI
// ========================================

function renderProduct(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const favorite = getFavorites().includes(product.id);

    card.innerHTML = `
        <div class="product-image-wrap">
            <img
                class="product-image"
                src="${product.image}"
                alt="${escapeHTML(product.name)}"
                loading="lazy"
            >

            ${product.badge
                ? `<span class="product-badge">${product.badge}</span>`
                : ""}

            <button
                class="favorite-button ${favorite ? "is-favorite" : ""}"
                data-favorite="${product.id}"
                aria-label="Sevimlilarga qo‘shish"
                title="Sevimlilarga qo‘shish"
            >${favorite ? "♥" : "♡"}</button>
        </div>

        <div class="product-details">
            <div class="product-category">
                ${escapeHTML(product.subcategory)}
            </div>

            <h3 class="product-name">
                ${escapeHTML(product.name)}
            </h3>

            <p class="product-unit">
                O‘lchov: ${escapeHTML(product.unit)}
            </p>

            <div class="product-price-row">
                <span class="product-price">
                    ${formatPrice(product.price)}
                </span>

                <button
                    class="add-to-cart"
                    data-add="${product.id}"
                    aria-label="${escapeHTML(product.name)} savatga qo‘shish"
                    title="Savatga qo‘shish"
                >+</button>
            </div>
        </div>
    `;

    const img = card.querySelector(".product-image");

    img.addEventListener("error", () => {
        img.src = "https://placehold.co/600x400/f1f5f1/526057?text=ArzonSavat";
    }, { once: true });

    return card;
}

function renderProducts() {
    const filtered = getFilteredProducts();
    const shown = filtered.slice(0, visibleCount);

    productGrid.replaceChildren();

    const fragment = document.createDocumentFragment();

    shown.forEach((product) => {
        fragment.appendChild(renderProduct(product));
    });

    productGrid.appendChild(fragment);

    productCount.textContent =
        `${filtered.length} ta mahsulot topildi`;

    emptyState.hidden = filtered.length !== 0;
    productGrid.hidden = filtered.length === 0;

    loadMoreButton.hidden = shown.length >= filtered.length;

    if (activeCategory === "food") {
        productsTitle.textContent = "Oziq-ovqat";
        productsSubtitle.textContent =
            "Mevalar, sabzavotlar, go‘sht, ichimliklar va boshqa mahsulotlar.";
    } else if (activeCategory === "clothes") {
        productsTitle.textContent = "Kiyim-kechak";
        productsSubtitle.textContent =
            "Erkaklar, ayollar va bolalar kiyimlari, poyabzal va aksessuarlar.";
    } else {
        productsTitle.textContent = "Barcha mahsulotlar";
        productsSubtitle.textContent =
            "Oziq-ovqat va kiyim-kechak — barchasi bir joyda.";
    }

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.toggle(
            "active",
            link.dataset.category === activeCategory
        );
    });
}

// HTML ichiga matn kiritishda xavfsiz ko‘rinishda chiqarish
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}

// ========================================
// KATEGORIYALAR
// ========================================

function selectCategory(category) {
    activeCategory = category;
    visibleCount = PRODUCTS_PER_PAGE;
    renderProducts();

    $("#products").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

document.querySelectorAll("[data-category]").forEach((element) => {
    element.addEventListener("click", (event) => {
        event.preventDefault();
        selectCategory(element.dataset.category);
    });
});

// ========================================
// QIDIRUV
// ========================================

function performSearch() {
    searchQuery = searchInput.value.trim();
    visibleCount = PRODUCTS_PER_PAGE;
    renderProducts();
}

searchInput.addEventListener("input", performSearch);
searchButton.addEventListener("click", performSearch);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        performSearch();
        $("#products").scrollIntoView({ behavior: "smooth" });
    }
});

sortSelect.addEventListener("change", () => {
    visibleCount = PRODUCTS_PER_PAGE;
    renderProducts();
});

loadMoreButton.addEventListener("click", () => {
    visibleCount += PRODUCTS_PER_PAGE;
    renderProducts();
});

$("#resetSearchButton").addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    activeCategory = "all";
    visibleCount = PRODUCTS_PER_PAGE;
    sortSelect.value = "default";
    renderProducts();
});

// ========================================
// LOCALSTORAGE — MA'LUMOTLARNI SAQLASH
// ========================================

function readStorage(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch (error) {
        return fallback;
    }
}

function saveStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn("Brauzer ma'lumotni saqlay olmadi.");
    }
}

let cart = readStorage("arzonsavat_cart", []);

cart = Array.isArray(cart)
    ? cart.filter((item) =>
        products.some((product) => product.id === item.id) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    )
    : [];

function saveCart() {
    saveStorage("arzonsavat_cart", cart);
}

// ========================================
// SEVIMLI MAHSULOTLAR
// ========================================

function getFavorites() {
    const favorites = readStorage("arzonsavat_favorites", []);
    return Array.isArray(favorites) ? favorites : [];
}

function toggleFavorite(id) {
    let favorites = getFavorites();

    if (favorites.includes(id)) {
        favorites = favorites.filter((itemId) => itemId !== id);
        showToast("Sevimlilar ro‘yxatidan olib tashlandi.");
    } else {
        favorites.push(id);
        showToast("❤️ Sevimlilarga qo‘shildi!");
    }

    saveStorage("arzonsavat_favorites", favorites);
    renderProducts();
}

// ========================================
// SAVATGA MAHSULOT QO‘SHISH
// ========================================

function addToCart(id) {
    const product = products.find((item) => item.id === id);

    if (!product) return;

    const existing = cart.find((item) => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
    showToast(`🛒 ${product.name} savatga qo‘shildi!`);
}

// ========================================
// SAVATNI CHIQARISH
// ========================================

function renderCart() {
    cart = cart.filter((item) =>
        products.some((product) => product.id === item.id) &&
        item.quantity > 0
    );

    saveCart();

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = formatPrice(totalPrice);

    cartItems.replaceChildren();

    if (cart.length === 0) {
        const empty = document.createElement("div");
        empty.className = "cart-empty";
        empty.innerHTML = `
            <span>🛍️</span>
            <strong>Savatingiz hozircha bo‘sh</strong>
            <p style="margin-top:8px;">Mahsulot tanlab, savatga qo‘shing.</p>
        `;

        cartItems.appendChild(empty);
        return;
    }

    const fragment = document.createDocumentFragment();

    cart.forEach((item) => {
        const product = products.find((p) => p.id === item.id);

        if (!product) return;

        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
            <img src="${product.image}" alt="${escapeHTML(product.name)}">

            <div>
                <div class="cart-item-name">${escapeHTML(product.name)}</div>
                <div class="cart-item-price">
                    ${formatPrice(product.price * item.quantity)}
                </div>

                <div class="quantity-controls">
                    <button data-decrease="${product.id}" aria-label="Kamaytirish">−</button>
                    <span>${item.quantity}</span>
                    <button data-increase="${product.id}" aria-label="Ko‘paytirish">+</button>
                </div>
            </div>

            <button
                class="remove-item"
                data-remove="${product.id}"
                aria-label="Mahsulotni o‘chirish"
            >O‘chirish</button>
        `;

        const img = row.querySelector("img");

        img.addEventListener("error", () => {
            img.src = "https://placehold.co/100x100/f1f5f1/526057?text=Mahsulot";
        }, { once: true });

        fragment.appendChild(row);
    });

    cartItems.appendChild(fragment);
}

function changeQuantity(id, amount) {
    const item = cart.find((product) => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter((product) => product.id !== id);
    }

    saveCart();
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    saveCart();
    renderCart();
    showToast("Mahsulot savatdan olib tashlandi.");
}

// Mahsulot kartochkalari va savat tugmalari
// uchun yagona hodisa tinglovchisi.

document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");
    const favoriteButton = event.target.closest("[data-favorite]");
    const increaseButton = event.target.closest("[data-increase]");
    const decreaseButton = event.target.closest("[data-decrease]");
    const removeButton = event.target.closest("[data-remove]");

    if (addButton) {
        addToCart(Number(addButton.dataset.add));
    }

    if (favoriteButton) {
        toggleFavorite(Number(favoriteButton.dataset.favorite));
    }

    if (increaseButton) {
        changeQuantity(Number(increaseButton.dataset.increase), 1);
    }

    if (decreaseButton) {
        changeQuantity(Number(decreaseButton.dataset.decrease), -1);
    }

    if (removeButton) {
        removeFromCart(Number(removeButton.dataset.remove));
    }
});

// ========================================
// SAVAT OYNASINI OCHISH VA YOPISH
// ========================================

function openCart() {
    cartOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    renderCart();
    $("#closeCartButton").focus();
}

function closeCart() {
    cartOverlay.hidden = true;
    document.body.style.overflow = "";
    $("#openCartButton").focus();
}

$("#openCartButton").addEventListener("click", openCart);
$("#closeCartButton").addEventListener("click", closeCart);
$("#continueShoppingButton").addEventListener("click", closeCart);

cartOverlay.addEventListener("click", (event) => {
    if (event.target === cartOverlay) {
        closeCart();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !cartOverlay.hidden) {
        closeCart();
    }
});

// ========================================
// BILDIRISHNOMA
// ========================================

function showToast(message) {
    clearTimeout(toastTimer);

    toast.textContent = message;
    toast.classList.add("show");

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// ========================================
// BUYURTMA BERISH
// Hozircha demo: backend ulanmagan.
// ========================================

$("#checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Avval savatga mahsulot qo‘shing.");
        return;
    }

    showToast("Buyurtma tizimi uchun backend ulash kerak.");
});

// ========================================
// SAYTNI ISHGA TUSHIRISH
// ========================================

$("#currentYear").textContent = new Date().getFullYear();

renderProducts();
renderCart();

console.log("ArzonSavat ishga tushdi!");
console.log("Jami mahsulotlar:", products.length);
console.log(
    "Oziq-ovqat:",
    products.filter((p) => p.category === "food").length
);
console.log(
    "Kiyim-kechak:",
    products.filter((p) => p.category === "clothes").length
);