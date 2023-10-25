document.addEventListener("DOMContentLoaded", function () {
    var addStyleButton = document.getElementById("addStyle");

    addStyleButton.addEventListener("click", async function () {
        // Query per trovare la scheda attiva
        console.log(await chrome.tabs)
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0) {
                const tabId = tabs[0].id;

                // Esegui il codice per aggiungere il link al foglio di stile
                const code = `
                    var link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.type = "text/css";
                    link.href = "style.css"; // Sostituisci con il percorso del tuo foglio di stile
                    document.head.appendChild(link);
                `;

                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    function: (code) => {
                        eval(code);
                    },
                    args: [code]
                })
            } else {
                console.error("Nessuna scheda attiva trovata.");
            }
        });
    });
});
