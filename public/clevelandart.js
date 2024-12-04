// Helper function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch("http://localhost:3000/api/clevelandart");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
}

// Function to populate the artist dropdown
async function getCreators() {
    const data = await fetchData();
    if (data && Array.isArray(data.data)) {
        const creators = data.data;
        const dropdownHtml = creators
            .map(creator => `<option value="${creator.name}">${creator.name}</option>`)
            .join("");
        document.querySelector("#artist-select").innerHTML += dropdownHtml;
    } else {
        console.error("Invalid creators data format");
    }
}

// Function to update the detailed information and artworks based on selected artist
async function getCreators2() {
    const data = await fetchData();
    if (data && Array.isArray(data.data)) {
        const creators = data.data;
        const artistSelect = document.getElementById("artist-select");

        artistSelect.addEventListener("change", function() {
            const selectedArtistName = this.value;
            if (selectedArtistName) {
                const selectedArtist = creators.find(creator => creator.name === selectedArtistName);
                if (selectedArtist) {
                    displayArtistInfo(selectedArtist);
                    displayArtworks(selectedArtist.artworks);
                }
            } else {
                document.getElementById("actor").innerHTML = "";
                document.getElementById("artworks-info").innerHTML = "";
            }
        });
    } else {
        console.error("Invalid creators data format");
    }
}

// Function to display artist information
function displayArtistInfo(artist) {
    const actorDiv = document.getElementById("actor");
    actorDiv.innerHTML = `
        <h2>${artist.name} (${artist.birth_year}–${artist.death_year})</h2>
        <p><strong>Nationality:</strong> ${artist.nationality}</p>
        <p>${artist.description || "No description available."}</p>
    `;
}

// Function to display artworks as a table
function displayArtworks(artworks) {
    const artworksInfoDiv = document.getElementById("artworks-info");

    // Create the table structure
    let tableHtml = `
        <h3>Artworks:</h3>
        <table border="1" cellpadding="10">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Add each artwork in a table row
    artworks.forEach(artwork => {
        tableHtml += `
            <tr>
                <td>${artwork.title}</td>
                <td><a href="${artwork.url}" target="_blank">View Artwork</a></td>
            </tr>
        `;
    });

    // Close the table
    tableHtml += `
            </tbody>
        </table>
    `;

    artworksInfoDiv.innerHTML = tableHtml;
}

// Initialize data fetching and interaction
getCreators(); // Fetch creators to populate dropdown
getCreators2(); // Setup event listener for dropdown change
