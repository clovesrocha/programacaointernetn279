document.addEventListener("DOMContentLoaded", function() {
    // Troca de abas
    document.querySelectorAll("nav ul li").forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove a classe 'active' de todas as abas e conteúdos
            document.querySelectorAll("nav ul li").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

            // Adiciona a classe 'active' na aba clicada e no conteúdo correspondente
            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });

    // Modal
    const modal = document.getElementById("petModal");
    const btn = document.getElementById("addPetBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = () => {
        modal.style.display = "flex";
    };
    span.onclick = () => modal.style.display = "none";
    window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };

    // Cadastro de pets
    document.getElementById("petForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("petName").value;
        const age = document.getElementById("petAge").value;
        const breed = document.getElementById("petBreed").value || "Sem raça definida";
        const vaccinated = document.getElementById("petVaccinated").value;
        const temperament = document.getElementById("petTemperament").value;
        const notes = document.getElementById("petNotes").value;

        const petCard = document.createElement("div");
        petCard.classList.add("pet-card");
        petCard.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Idade:</strong> ${age}</p>
            <p><strong>Raça:</strong> ${breed}</p>
            <p><strong>Vacinado:</strong> ${vaccinated}</p>
            <p><strong>Temperamento:</strong> ${temperament}</p>
            <p><strong>Observações:</strong> ${notes || "Nenhuma"}</p>
            <button>Adotar ${name}</button>
        `;

        document.getElementById("petList").appendChild(petCard);
        modal.style.display = "none";
        this.reset();
    });
});