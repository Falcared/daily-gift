// =========================
// CONFIG
// =========================

// Date de départ du cadeau (YYYY-MM-DD)
const START_DATE = new Date("2025-12-27");

// =========================
// UTILS
// =========================

function daysBetween(dateA, dateB) {
    const oneDay = 1000 * 60 * 60 * 24;

    // On neutralise l'heure pour éviter les bugs à minuit
    const utcA = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
    const utcB = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());

    return Math.floor((utcA - utcB) / oneDay);
}

// =========================
// MAIN
// =========================

async function loadQuote() {
    const quoteEl = document.getElementById("quote");
    const dateEl = document.getElementById("date");

    const today = new Date();

    // Affichage de la date
    dateEl.textContent = today.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // Chargement des citations
    const res = await fetch("quotes.json", { cache: "no-store" });
    const quotes = await res.json();

    // Calcul du jour depuis la date de départ
    let dayIndex = daysBetween(today, START_DATE);

    // Sécurité : si on ouvre avant la date de départ
    if (dayIndex < 0) dayIndex = 0;

    // Boucle sur les citations
    const index = dayIndex % quotes.length;

    // Affichage
    quoteEl.textContent = `“${quotes[index]}”`;
}

// =========================
// INIT
// =========================

loadQuote().catch(() => {
    document.getElementById("quote").textContent =
        "Impossible de charger la citation.";
});
