let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Themen + Unterthemen
const themen = {
    Mathe: ["Algebra", "Geometrie", "Analysis"],
    Physik: ["Mechanik", "Elektrizität", "Optik"]
};

// Unterthemen dynamisch ändern
function updateSubthemen() {
    const thema = document.getElementById("thema").value;
    const unter = document.getElementById("unterthema");

    unter.innerHTML = '<option value="">Unterthema wählen</option>';

    if (themen[thema]) {
        themen[thema].forEach(u => {
            const opt = document.createElement("option");
            opt.value = u;
            opt.textContent = u;
            unter.appendChild(opt);
        });
    }
}

// Beim Laden anzeigen
window.onload = function () {
    renderPosts();
};

// Beitrag hinzufügen
function addPost() {
    const thema = document.getElementById("thema").value;
    const unterthema = document.getElementById("unterthema").value;
    const formel = document.getElementById("formel").value;
    const beschreibung = document.getElementById("beschreibung").value;
    const name = document.getElementById("name").value;

    if (!thema || !unterthema || !formel || !beschreibung || !name) {
        alert("Bitte alles ausfüllen!");
        return;
    }

    const postData = { thema, unterthema, formel, beschreibung, name };

    posts.push(postData);
    localStorage.setItem("posts", JSON.stringify(posts));

    renderPosts();

    // reset
    document.getElementById("formel").value = "";
    document.getElementById("beschreibung").value = "";
    document.getElementById("name").value = "";
}

// ALLES neu rendern (sortiert!)
function renderPosts() {
    const container = document.getElementById("posts");
    container.innerHTML = "";

    const grouped = {};

    // gruppieren
    posts.forEach(p => {
        if (!grouped[p.thema]) grouped[p.thema] = {};
        if (!grouped[p.thema][p.unterthema]) grouped[p.thema][p.unterthema] = [];

        grouped[p.thema][p.unterthema].push(p);
    });

    // anzeigen
    for (let thema in grouped) {
        const h2 = document.createElement("h2");
        h2.textContent = thema;
        container.appendChild(h2);

        for (let unter in grouped[thema]) {
            const h3 = document.createElement("h3");
            h3.textContent = unter;
            container.appendChild(h3);

            grouped[thema][unter].forEach(p => {
                const post = document.createElement("div");
                post.classList.add("post");

                post.innerHTML = `
                    <div class="formel">${p.formel}</div>
                    <p>${p.beschreibung}</p>
                    <div class="name">von ${p.name}</div>
                `;

                container.appendChild(post);
            });
        }
    }
}

// löschen
function clearPosts() {
    localStorage.removeItem("posts");
    posts = [];
    renderPosts();
}