
let equipe = [];
let currentFilter = "Tous";
let currentSearch = "";
let selectedCreature = creatures[0];

document.addEventListener("DOMContentLoaded", () => {
    renderGrid(creatures);
    if (creatures.length > 0) {
        showDetail(creatures[0]);
    }
    updateTeamUI();
});

function renderGrid(data) {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    const countSpan = document.getElementById("creature-count");
    if (countSpan) countSpan.textContent = creatures.length;

    if (data.length === 0) {
        grid.innerHTML = `<p class="col-span-full text-center text-muted py-8">Aucune créature trouvée.</p>`;
        return;
    }

    data.forEach(creature => {
        const totalStats = creature.stats.hp + creature.stats.attack + creature.stats.defence;

        const card = document.createElement("article");
        card.className = "flex w-full max-w-md flex-col gap-3 rounded-card bg-white p-4 pb-5 shadow-sm border border-line cursor-pointer hover:shadow-md transition";
        card.dataset.id = creature.id;

        card.innerHTML = `
            <div class="relative flex h-36 items-center justify-center rounded-xl bg-white overflow-hidden">
                <img src="${creature.image}" alt="${creature.name}" class="h-full w- object-cover p-2">
                <span class="absolute left-3 top-2 font-mono text-sm font-bold text-muted bg-white/80 px-2 py-0.5 rounded-md">${creature.id}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
                <h3 class="font-display text-xl font-semibold">${creature.name}</h3>
                <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-brand-dark">${creature.type}</span>
            </div>
            <p class="text-sm text-muted">${creature.level} · Total ${totalStats}</p>
            <button type="button" class="btn-ajouter border-2 border-ink py-2 rounded-xl font-bold hover:bg-ink hover:text-white transition" data-id="${creature.id}">Ajouter à l'équipe</button>
        `;
        grid.appendChild(card);
    });
}

function showDetail(creature) {
    selectedCreature = creature;
    const detailSection = document.getElementById("detail");

    detailSection.querySelector(".font-mono").textContent = `${creature.id} · Détail`;
    detailSection.querySelector("img").src = creature.image;
    detailSection.querySelector("img").alt = creature.name;
    detailSection.querySelector("h2").textContent = creature.name;
    
    const typeBadge = detailSection.querySelector("h2 + span");
    if (typeBadge) typeBadge.textContent = creature.type;

    detailSection.querySelector("p.text-gray-700, p:not([class])").textContent = creature.description;

    const statsContainer = detailSection.querySelector(".flex.flex-col.gap-2.text-sm");
    if (statsContainer) {
        const maxStat = 999;
        const hpPct = Math.min(Math.round((creature.stats.hp / maxStat) * 100), 100);
        const atkPct = Math.min(Math.round((creature.stats.attack / maxStat) * 100), 100);
        const defPct = Math.min(Math.round((creature.stats.defence / maxStat) * 100), 100);

        statsContainer.innerHTML = `
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">PV</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full bg-brand" style="width: ${hpPct}%"></span></span><span class="text-right font-mono">${creature.stats.hp}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Attaque</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full bg-brand" style="width: ${atkPct}%"></span></span><span class="text-right font-mono">${creature.stats.attack}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Défense</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full bg-brand" style="width: ${defPct}%"></span></span><span class="text-right font-mono">${creature.stats.defence}</span></div>
        `;
    }
}

const gridElement = document.getElementById("grid");
gridElement.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".btn-ajouter");
    if (addBtn) {
        e.stopPropagation();
        const creature = creatures.find(c => c.id === addBtn.dataset.id);
        addToTeam(creature);
        return;
    }

    const card = e.target.closest("article");
    if (card) {
        const creature = creatures.find(c => c.id === card.dataset.id);
        if (creature) showDetail(creature);
    }
});

const detailAddBtn = document.querySelector("#detail .btn-primary");
if (detailAddBtn) {
    detailAddBtn.addEventListener("click", () => {
        if (selectedCreature) addToTeam(selectedCreature);
    });
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    filterAndSearch();
});

const filterButtons = document.querySelectorAll("#filters button");
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => {
            b.className = "chip shrink-0 px-3 py-1.5 rounded-full border-2 border-line hover:border-brand transition";
        });
        btn.className = "chip bg-ink text-white border-ink shrink-0 px-4 py-2 rounded-full font-bold";

        currentFilter = btn.textContent.trim();
        filterAndSearch();
    });
});

function filterAndSearch() {
    let result = creatures;

    if (currentFilter !== "Tous") {
        result = result.filter(c => c.type.toLowerCase() === currentFilter.toLowerCase());
    }

    if (currentSearch !== "") {
        result = result.filter(c => 
            c.name.toLowerCase().includes(currentSearch) || 
            c.id.toLowerCase().includes(currentSearch)
        );
    }

    renderGrid(result);
}

function addToTeam(creature) {
    if (equipe.length >= 6) {
        alert("L'équipe est complète ! Maximum 6 Digimon.");
        return;
    }
    if (equipe.some(c => c.id === creature.id)) {
        alert("Ce Digimon est déjà dans votre équipe !");
        return;
    }

    equipe.push(creature);
    updateTeamUI();
}

function removeFromTeam(id) {
    equipe = equipe.filter(c => c.id !== id);
    updateTeamUI();
}

function updateTeamUI() {
    const teamContainer = document.querySelector("#team .grid");
    const counter = document.getElementById("team-slot-count");
    
    counter.textContent = equipe.length;
    teamContainer.innerHTML = "";

    equipe.forEach(creature => {
        const item = document.createElement("div");
        item.className = "relative flex h-20 items-center justify-center rounded-xl border-2 border-line bg-white p-2 shadow-sm cursor-pointer group";
        item.innerHTML = `
            <img src="${creature.image}" alt="${creature.name}" class="h-full w-full object-cover p-2">
            <button class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition btn-remove" data-id="${creature.id}">✕</button>
        `;
        teamContainer.appendChild(item);
    });

    const remaining = 6 - equipe.length;
    for (let i = 0; i < remaining; i++) {
        const emptySlot = document.createElement("div");
        emptySlot.className = "flex h-20 items-center justify-center rounded-xl border-2 border-dashed border-line bg-ground text-muted font-bold text-sm";
        emptySlot.textContent = "Vide";
        teamContainer.appendChild(emptySlot);
    }
}

const teamSection = document.getElementById("team");
teamSection.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".btn-remove");
    if (removeBtn) {
        removeFromTeam(removeBtn.dataset.id);
    }
});

const form = document.getElementById("creature-form");
if (form) {
    const regexRules = {
        id: /^#\d{3}$/,
        name: /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 '.-]{1,29}$/,
        stat: /^\d{1,3}$/,
        image: /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i,
        description: /^[\s\S]{10,200}$/
    };

    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach(input => {
        input.addEventListener("blur", () => validateField(input));
    });

    function validateField(input) {
        const val = input.value.trim();
        let isValid = true;
        let errorMsg = "";
        const errorSpan = input.nextElementSibling;

        if (input.name === "id") {
            if (!regexRules.id.test(val)) {
                isValid = false;
                errorMsg = "Format requis : #013";
            } else if (creatures.some(c => c.id === val)) {
                isValid = false;
                errorMsg = "Ce numéro existe déjà.";
            }
        } else if (input.name === "name") {
            if (!regexRules.name.test(val)) {
                isValid = false;
                errorMsg = "2 à 30 caractères requis.";
            }
        } else if (input.name === "type") {
            if (val === "") {
                isValid = false;
                errorMsg = "Choisissez un type.";
            }
        } else if (input.name === "stat1" || input.name === "stat2" || input.name === "stat3") {
            if (!regexRules.stat.test(val) || Number(val) < 0 || Number(val) > 999) {
                isValid = false;
                errorMsg = "Nombre 0 à 999.";
            }
        } else if (input.name === "image") {
            if (!regexRules.image.test(val)) {
                isValid = false;
                errorMsg = "Lien https valide requis.";
            }
        } else if (input.name === "description") {
            if (!regexRules.description.test(val)) {
                isValid = false;
                errorMsg = "10 à 200 caractères.";
            }
        }

        if (isValid) {
            input.classList.remove("border-red-500");
            input.classList.add("border-green-500");
            if (errorSpan) {
                errorSpan.textContent = "";
                errorSpan.className = "error-message text-sm font-normal text-green-600";
            }
        } else {
            input.classList.remove("border-green-500");
            input.classList.add("border-red-500");
            if (errorSpan) {
                errorSpan.textContent = errorMsg;
                errorSpan.className = "error-message text-sm font-normal text-red-500";
            }
        }
        return isValid;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let allValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) allValid = false;
        });

        if (!allValid) {
            alert("Veuillez corriger les erreurs du formulaire.");
            return;
        }

        const newCreature = {
            id: form.querySelector("[name='id']").value.trim(),
            name: form.querySelector("[name='name']").value.trim(),
            type: form.querySelector("[name='type']").value,
            level: form.querySelector("[name='level']").value.trim() || "Rookie",
            stats: {
                hp: Number(form.querySelector("[name='stat1']").value.trim()),
                attack: Number(form.querySelector("[name='stat2']").value.trim()),
                defence: Number(form.querySelector("[name='stat3']").value.trim())
            },
            image: form.querySelector("[name='image']").value.trim(),
            description: form.querySelector("[name='description']").value.trim()
        };

        creatures.push(newCreature);
        filterAndSearch();
        form.reset();
        
        inputs.forEach(input => input.classList.remove("border-green-500", "border-red-500"));
        alert("Digimon ajouté avec succès !");
    });
}